//! An adapter described by a [`Spec`]: the app's command registry and run tool, and the MCP tools
//! the model gets as they are (schemas cleaned for small models) under plain names.

use std::collections::HashSet;

use serde_json::{Map, Value, json};

use super::{Adapter, Command, confirm, confirmed, err, generic_catalog, ok, same_file, without_confirmed};
use crate::mcp::{Mcp, ToolResult};

pub struct Spec {
    /// The tool that lists the command registry.
    pub catalog: &'static str,
    /// The tool that runs a command, and the name of its id argument (`id` or `command`).
    pub run: (&'static str, &'static str),
    /// `(MCP tool, name the model sees, description)`: tools passed through. An empty name keeps
    /// the tool's own; an empty description keeps the server's.
    pub keep: &'static [(&'static str, &'static str, &'static str)],
    /// The tool that returns a picture of the work, with fixed arguments (JSON).
    pub look: Option<(&'static str, &'static str)>,
    /// Tools or commands that bring in the user's files, and their path argument (a path or a list
    /// of paths): those files are originals, never saved over without the user's consent.
    pub opens: &'static [(&'static str, &'static str)],
    /// Tools or commands that write a file, and their path argument.
    pub saves: &'static [(&'static str, &'static str)],
    pub hidden: fn(&str) -> bool,
    /// One line on the app after a change.
    pub state: Option<fn(&mut Mcp) -> String>,
    /// Tools (names the model sees) whose result gets the state line.
    pub after: &'static [&'static str],
    /// Keys dropped from JSON tool results (noise for the model); numbers are rounded too.
    pub drop: &'static [&'static str],
    /// Tools made of commands run in order (fewer steps for a small model).
    pub macros: &'static [Macro],
    /// Tools written in code (unit conversions and the like).
    pub helpers: &'static [Helper],
    /// Advice added to a failure whose text contains the first string (e.g. the doc id the model guessed).
    pub hints: &'static [(&'static str, &'static str)],
    /// Apps driven through files: save what a step changed, returning the file written.
    pub autosave: Option<fn(&mut Mcp) -> Option<String>>,
}

/// A tool written in code: `run(mcp, spec, args)` may call the app's tools and commands.
pub struct Helper {
    pub name: &'static str,
    pub desc: &'static str,
    /// JSON schema properties of the tool.
    pub props: &'static str,
    pub required: &'static [&'static str],
    pub run: fn(&mut Mcp, &Spec, &Value) -> ToolResult,
}

impl Spec {
    /// Run a registry command (`run` is the app's run tool and its id argument).
    pub fn command(&self, mcp: &mut Mcp, id: &str, params: Value) -> ToolResult {
        let (tool, key) = self.run;
        mcp.call(tool, json!({key: id, "params": params}))
    }
}

/// A tool that runs commands in order. In `steps`, a string param `"$name"` takes the tool's
/// argument `name` (left out when the model didn't give it).
pub struct Macro {
    pub name: &'static str,
    pub desc: &'static str,
    /// JSON schema properties of the tool.
    pub props: &'static str,
    pub required: &'static [&'static str],
    /// `(command id, params template JSON)`.
    pub steps: &'static [(&'static str, &'static str)],
}

fn fill(template: &Value, args: &Value) -> Value {
    match template {
        Value::String(s) if s.starts_with('$') => args.get(&s[1..]).cloned().unwrap_or(Value::Null),
        Value::Object(o) => Value::Object(o.iter().map(|(k, v)| (k.clone(), fill(v, args))).filter(|(_, v)| !v.is_null()).collect()),
        Value::Array(a) => Value::Array(a.iter().map(|v| fill(v, args)).collect()),
        other => other.clone(),
    }
}

/// Tool-result JSON without the noisy keys, numbers to one decimal, minified.
pub fn compact(text: &str, drop: &[&str]) -> String {
    fn walk(v: &mut Value, drop: &[&str]) {
        match v {
            Value::Object(o) => {
                o.retain(|k, x| !drop.contains(&k.as_str()) && !x.is_null());
                for x in o.values_mut() {
                    walk(x, drop);
                }
            }
            Value::Array(a) => a.iter_mut().for_each(|x| walk(x, drop)),
            Value::Number(n) => {
                if let Some(f) = n.as_f64().filter(|f| f.fract() != 0.0) {
                    *v = json!((f * 10.0).round() / 10.0);
                }
            }
            _ => {}
        }
    }
    match serde_json::from_str::<Value>(text) {
        Ok(mut v) => {
            walk(&mut v, drop);
            v.to_string()
        }
        Err(_) => text.to_string(),
    }
}

pub struct Generic {
    spec: &'static Spec,
    /// The user's files (originals) opened or imported in this chat.
    opened: std::sync::Mutex<Vec<String>>,
    /// The kept tools' specs, built from the server's list once it is up.
    tools: Vec<Value>,
}

impl Generic {
    pub fn new(spec: &'static Spec) -> Self {
        Self { spec, opened: std::sync::Mutex::new(Vec::new()), tools: Vec::new() }
    }

    /// Would this call (tool or command `name`) write over an original? Then the user decides.
    fn guard(&self, name: &str, args: &Value) -> Option<ToolResult> {
        let (_, key) = self.spec.saves.iter().find(|(t, _)| *t == name)?;
        let path = args.get(*key).and_then(Value::as_str).unwrap_or("");
        let opened = self.opened.lock().ok()?;
        (!path.is_empty() && !confirmed(args) && opened.iter().any(|o| same_file(o, path))).then(|| confirm(path))
    }

    /// A save whose path is a folder with the extension stuck on (`…\project.dxf` when the user
    /// named the folder `…\project`): the file goes inside that folder, named after the open
    /// document (or "untitled"). Any other path is left as it is.
    fn into_folder(&self, name: &str, args: &Value) -> Value {
        let Some((_, key)) = self.spec.saves.iter().find(|(t, _)| *t == name) else { return args.clone() };
        let Some(path) = args.get(*key).and_then(Value::as_str) else { return args.clone() };
        let p = std::path::Path::new(path);
        let (Some(ext), Some(stem)) = (p.extension().and_then(|e| e.to_str()), p.file_stem()) else { return args.clone() };
        let folder = p.with_file_name(stem);
        if p.exists() || !folder.is_dir() {
            return args.clone();
        }
        let base = self
            .opened
            .lock()
            .ok()
            .and_then(|o| o.last().and_then(|f| std::path::Path::new(f).file_stem().and_then(|s| s.to_str()).map(str::to_string)))
            .unwrap_or_else(|| "untitled".into());
        let mut a = args.clone();
        a[*key] = json!(folder.join(format!("{base}.{ext}")).to_string_lossy());
        a
    }

    /// The file a save (tool or command `name`) writes.
    fn saved_path(&self, name: &str, args: &Value) -> Option<String> {
        let (_, key) = self.spec.saves.iter().find(|(t, _)| *t == name)?;
        args.get(*key).and_then(Value::as_str).filter(|p| !p.is_empty()).map(str::to_string)
    }

    /// Remember the files a successful open or import brought in.
    fn note_opened(&self, name: &str, args: &Value) {
        let Some((_, key)) = self.spec.opens.iter().find(|(t, _)| *t == name) else { return };
        let paths: Vec<String> = match args.get(*key) {
            Some(Value::String(p)) => vec![p.clone()],
            Some(Value::Array(a)) => a.iter().filter_map(|p| p.as_str().map(str::to_string)).collect(),
            _ => Vec::new(),
        };
        if let Ok(mut o) = self.opened.lock() {
            o.extend(paths);
        }
    }

    /// After a successful step: the spec's autosave, if any, and say where it wrote.
    fn autosave(&self, mcp: &mut Mcp, r: &mut ToolResult) {
        if let Some(f) = self.spec.autosave {
            if let Some(path) = f(mcp) {
                r.text = format!("{}\n(saved to {path}; the window opens it)", r.text);
                r.saved.get_or_insert(path);
            }
        }
    }

    /// A failure's advice from the spec's hints.
    fn hint(&self, mut r: ToolResult) -> ToolResult {
        if !r.ok {
            if let Some((_, h)) = self.spec.hints.iter().find(|(needle, _)| r.text.contains(needle)) {
                r.text = format!("{}
{h}", r.text);
            }
        }
        r
    }

    fn mcp_name(&self, model_name: &str) -> Option<&'static str> {
        if model_name == "look" {
            return self.spec.look.map(|l| l.0);
        }
        self.spec.keep.iter().find(|(m, n, _)| if n.is_empty() { *m == model_name } else { *n == model_name }).map(|(m, _, _)| *m)
    }

    fn with_state(&self, mcp: &mut Mcp, name: &str, mut r: ToolResult) -> ToolResult {
        if r.ok && self.spec.after.contains(&name) {
            let line = self.state_line(mcp);
            if !line.is_empty() {
                r.text += &format!("\n→ now: {line}");
            }
        }
        r
    }
}

/// A schema a 4B model reads well: no `$schema`, no `null` unions, no defaults, short descriptions.
pub fn clean_schema(v: &Value) -> Value {
    match v {
        Value::Object(o) => {
            let mut out = Map::new();
            for (k, x) in o {
                if matches!(k.as_str(), "$schema" | "default" | "format" | "minimum" | "maximum" | "additionalProperties" | "title" | "examples") {
                    continue;
                }
                let x = match (k.as_str(), x) {
                    ("type", Value::Array(ts)) => ts.iter().find(|t| t.as_str() != Some("null")).cloned().unwrap_or(json!("string")),
                    ("description", Value::String(s)) => json!(s.lines().next().unwrap_or("").chars().take(200).collect::<String>()),
                    ("anyOf" | "oneOf", Value::Array(alts)) => {
                        let non_null: Vec<&Value> = alts.iter().filter(|a| a.get("type").and_then(Value::as_str) != Some("null")).collect();
                        if non_null.len() == 1 {
                            // Inline the one real alternative.
                            if let Value::Object(inner) = clean_schema(non_null[0]) {
                                for (ik, iv) in inner {
                                    out.entry(ik).or_insert(iv);
                                }
                            }
                            continue;
                        }
                        Value::Array(alts.iter().map(clean_schema).collect())
                    }
                    _ => clean_schema(x),
                };
                out.insert(k.clone(), x);
            }
            Value::Object(out)
        }
        Value::Array(a) => Value::Array(a.iter().map(clean_schema).collect()),
        other => other.clone(),
    }
}

impl Adapter for Generic {
    fn catalog(&self, mcp: &mut Mcp) -> Result<Vec<Command>, String> {
        generic_catalog(mcp, self.spec.catalog)
    }

    fn hidden(&self, id: &str) -> bool {
        (self.spec.hidden)(id)
    }

    fn run(&self, mcp: &mut Mcp, id: &str, params: Value) -> ToolResult {
        let params = self.into_folder(id, &params);
        if let Some(r) = self.guard(id, &params) {
            return r;
        }
        let params = without_confirmed(&params);
        let mut r = self.spec.command(mcp, id, params.clone());
        if r.ok {
            self.note_opened(id, &params);
            r.saved = self.saved_path(id, &params);
            self.autosave(mcp, &mut r);
        }
        self.hint(r)
    }

    fn tools(&self) -> Vec<Value> {
        self.tools.clone()
    }

    fn prepare(&mut self, mcp: &Mcp) {
        let mut out = Vec::new();
        for (m, n, d) in self.spec.keep {
            let Some(t) = mcp.tools.iter().find(|t| t.get("name").and_then(Value::as_str) == Some(*m)) else { continue };
            let name = if n.is_empty() { *m } else { *n };
            let desc: String = if d.is_empty() { t.get("description").and_then(Value::as_str).unwrap_or("").chars().take(320).collect() } else { d.to_string() };
            let params = clean_schema(t.get("inputSchema").unwrap_or(&json!({"type": "object"})));
            out.push(json!({"type": "function", "function": {"name": name, "description": desc, "parameters": params}}));
        }
        if self.spec.look.is_some() {
            out.push(super::func("look", "See the current work (a picture), to check the result or what the user means.", json!({}), &[]));
        }
        for m in self.spec.macros {
            let props: Value = serde_json::from_str(m.props).unwrap_or(json!({}));
            out.push(super::func(m.name, m.desc, props, m.required));
        }
        for h in self.spec.helpers {
            let props: Value = serde_json::from_str(h.props).unwrap_or(json!({}));
            out.push(super::func(h.name, h.desc, props, h.required));
        }
        self.tools = out;
    }

    fn call(&mut self, mcp: &mut Mcp, name: &str, args: &Value) -> Option<ToolResult> {
        if let Some(h) = self.spec.helpers.iter().find(|h| h.name == name) {
            let mut r = (h.run)(mcp, self.spec, args);
            if r.ok {
                self.autosave(mcp, &mut r);
            }
            r.text = compact(&r.text, self.spec.drop).chars().take(3000).collect();
            return Some(self.with_state(mcp, name, r));
        }
        if let Some(mac) = self.spec.macros.iter().find(|m| m.name == name) {
            let mut results = Vec::new();
            for (id, template) in mac.steps {
                let params = fill(&serde_json::from_str(template).unwrap_or(json!({})), args);
                let r = self.run(mcp, id, params);
                if !r.ok {
                    return Some(err(format!("{id} failed: {}", r.text)));
                }
                results.push(compact(&r.text, self.spec.drop));
            }
            return Some(self.with_state(mcp, name, ok(results.join("\n"))));
        }
        let m = self.mcp_name(name)?;
        if name == "look" {
            let fixed: Value = self.spec.look.and_then(|l| serde_json::from_str(l.1).ok()).unwrap_or(json!({}));
            let r = mcp.call(m, fixed);
            return Some(if r.image.is_some() { ToolResult { ok: true, text: "picture attached".into(), image: r.image, ..Default::default() } } else { err(if r.text.is_empty() { "no picture".into() } else { r.text }) });
        }
        let args = &self.into_folder(m, args);
        if let Some(r) = self.guard(m, args) {
            return Some(r);
        }
        let args = &without_confirmed(args);
        let mut r = mcp.call(m, args.clone());
        if r.ok {
            self.note_opened(m, args);
            r.saved = self.saved_path(m, args);
            self.autosave(mcp, &mut r);
            if r.text.is_empty() {
                r.text = "done".into();
            }
        }
        r.text = compact(&r.text, self.spec.drop).chars().take(3000).collect();
        let r = self.hint(r);
        Some(self.with_state(mcp, name, r))
    }

    fn state_line(&self, mcp: &mut Mcp) -> String {
        self.spec.state.map(|f| f(mcp)).unwrap_or_default()
    }

    fn annotate(&self, _id: &str, _ids: &HashSet<String>) -> Option<String> {
        None
    }
}
