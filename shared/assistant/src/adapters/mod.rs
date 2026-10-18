//! What differs per app: which MCP tools the model gets (under plain, stable names), how commands run,
//! which commands to hide, the state line after a change, and helpers such as crop-to-ratio.

use std::collections::HashSet;

use serde_json::{Value, json};

use crate::mcp::{Mcp, ToolResult};

mod generic;
mod retoush;
mod specs;
#[cfg(test)]
mod state_probe;


/// One command of the app's registry.
#[derive(Clone, Debug)]
pub struct Command {
    pub id: String,
    pub label: String,
    pub label_ar: String,
    pub menu: Vec<String>,
    pub menu_ar: Vec<String>,
    pub params: String,
}

pub trait Adapter: Send {
    /// The app's command registry.
    fn catalog(&self, mcp: &mut Mcp) -> Result<Vec<Command>, String> {
        generic_catalog(mcp, "command_list")
    }
    /// Commands the model never sees (refused under automation, or meaningless in a chat).
    fn hidden(&self, _id: &str) -> bool {
        false
    }
    fn run(&self, mcp: &mut Mcp, id: &str, params: Value) -> ToolResult;
    /// Called once the MCP server is up (its tool list is known).
    fn prepare(&mut self, _mcp: &Mcp) {}
    /// Tools beside `find_commands` and `run_command` (OpenAI function specs).
    fn tools(&self) -> Vec<Value>;
    /// Run one of `tools()`; `None` when `name` isn't one of them.
    fn call(&mut self, mcp: &mut Mcp, name: &str, args: &Value) -> Option<ToolResult>;
    /// One line on the app after a change (size, active layer, …): the model reads the real state.
    fn state_line(&self, _mcp: &mut Mcp) -> String {
        String::new()
    }
    /// A note on a search hit, such as a better alternative.
    fn annotate(&self, _id: &str, _ids: &HashSet<String>) -> Option<String> {
        None
    }
}

/// The adapter of an app id (`retoush`, …).
pub fn for_app(app: &str) -> Option<Box<dyn Adapter>> {
    match app {
        "retoush" => Some(Box::new(retoush::Retoush::default())),
        other => specs::spec(other).map(|s| Box::new(generic::Generic::new(s)) as Box<dyn Adapter>),
    }
}

/// The expert guide of an app (knowledge/<app>.md).
pub fn guide(app: &str) -> &'static str {
    match app {
        "retoush" => include_str!("../../knowledge/retoush.md"),
        other => specs::guide(other),
    }
}

/// An OpenAI-style function spec.
pub fn func(name: &str, desc: &str, props: Value, required: &[&str]) -> Value {
    json!({"type": "function", "function": {"name": name, "description": desc,
        "parameters": {"type": "object", "properties": props, "required": required}}})
}

pub fn ok(text: impl Into<String>) -> ToolResult {
    ToolResult { ok: true, text: text.into(), ..Default::default() }
}

pub fn err(text: impl Into<String>) -> ToolResult {
    ToolResult { ok: false, text: text.into(), ..Default::default() }
}

/// The call would save over `file`, which the user opened: the assistant asks them first and calls
/// again with `"confirmed": true` when they agree.
pub fn confirm(file: &str) -> ToolResult {
    ToolResult { ok: false, text: format!("saving over the original {file} needs the user's consent"), confirm: Some(file.to_string()), ..Default::default() }
}

/// Is this call one the user confirmed? (`confirmed` is added by the assistant, never by the model.)
pub fn confirmed(args: &Value) -> bool {
    args.get("confirmed").and_then(Value::as_bool).unwrap_or(false)
}

/// The arguments without the assistant's own `confirmed` flag.
pub fn without_confirmed(args: &Value) -> Value {
    let mut a = args.clone();
    if let Some(o) = a.as_object_mut() {
        o.remove("confirmed");
    }
    a
}

/// The registry from a list tool whose text is a JSON array (or an object holding one).
pub fn generic_catalog(mcp: &mut Mcp, tool: &str) -> Result<Vec<Command>, String> {
    let v = mcp.call_json(tool, json!({}))?;
    let list = match &v {
        Value::Array(a) => a.clone(),
        Value::Object(o) => o.values().find_map(|x| x.as_array().cloned()).unwrap_or_default(),
        _ => Vec::new(),
    };
    Ok(list
        .iter()
        .filter_map(|c| {
            let id = c.get("id")?.as_str()?.to_string();
            let label = c.get("label").and_then(Value::as_str).unwrap_or("").to_string();
            let menu = match c.get("menu").or_else(|| c.get("location")) {
                Some(Value::Array(a)) => a.iter().filter_map(|m| m.as_str().map(str::to_string)).collect(),
                Some(Value::String(s)) => vec![s.clone()],
                _ => Vec::new(),
            };
            let params = match c.get("params") {
                Some(Value::String(s)) => s.clone(),
                Some(Value::Null) | None => String::new(),
                Some(other) => other.to_string(),
            };
            Some(Command { id, label, label_ar: String::new(), menu, menu_ar: Vec::new(), params })
        })
        .collect())
}

/// The path of a file argument as the user's OS spells it, for comparing.
pub fn same_file(a: &str, b: &str) -> bool {
    let canon = |p: &str| {
        std::fs::canonicalize(p).map(|p| p.to_string_lossy().to_lowercase()).unwrap_or_else(|_| p.replace('/', "\\").to_lowercase())
    };
    canon(a) == canon(b)
}
