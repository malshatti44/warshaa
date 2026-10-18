//! Retoush (retoush).

use std::collections::HashSet;

use serde_json::{Value, json};

use super::{Adapter, confirm, confirmed, err, func, ok, same_file};
use crate::mcp::{Mcp, ToolResult};

/// `file.*` commands automation allows (the rest reach the filesystem and are refused).
const FILE_OK: &[&str] = &[
    "file.new", "file.newFromClipboard", "file.close", "file.closeAll", "file.closeOthers", "file.fileInfo",
    "file.automate.fitImage", "file.automate.conditionalModeChange", "file.scripts.flattenAllLayerEffects",
    "file.scripts.flattenAllMasks", "file.scripts.deleteAllEmptyLayers",
];

#[derive(Default)]
pub struct Retoush {
    /// Files opened in this chat: saved over only when the user asks.
    opened: Vec<String>,
}

impl Retoush {
    fn doc(mcp: &mut Mcp) -> Option<Value> {
        mcp.call_json("doc_inspect", json!({})).ok()
    }
}

impl Adapter for Retoush {
    fn hidden(&self, id: &str) -> bool {
        if id.starts_with("file.") {
            return !FILE_OK.contains(&id);
        }
        (id.starts_with("layer.smartObjects.") && id != "layer.smartObjects.convertToSmartObject")
            || id.starts_with("layer.videoLayers.")
            || matches!(id, "pattern.import" | "pattern.export" | "edit.presets.migratePresets" | "measurementLog.export" | "plugin.reload")
    }

    fn run(&self, mcp: &mut Mcp, id: &str, params: Value) -> ToolResult {
        mcp.call("command_run", json!({"id": id, "params": params}))
    }

    fn tools(&self) -> Vec<Value> {
        vec![
            func("open_file", "Open an image or document file (jpg, png, psd, tif, webp, raw, …) and make it the active document.",
                 json!({"path": {"type": "string"}}), &["path"]),
            func("new_document", "Create a new blank document.",
                 json!({"width": {"type": "integer"}, "height": {"type": "integer"},
                        "background": {"type": "string", "description": "white | black | transparent | #rrggbb"}, "name": {"type": "string"}}), &[]),
            func("save_file", "Save or export the active document. The extension picks the format (jpg, png, psd, tif, webp). \
                  Use a new file name next to the original (e.g. name-edited.jpg); saving over the opened original asks the user first.",
                 json!({"path": {"type": "string"}}), &["path"]),
            func("document_info", "The active document: name, file, size, layers (top first), recent history, selection.", json!({}), &[]),
            func("look", "See the current image (a picture of the app window with the document).", json!({}), &[]),
            func("crop_to_ratio", "Crop the image to an aspect ratio, keeping the largest centred area ('1:1' square, '4:5', '9:16', '16:9'), \
                  and optionally resize it to a width in the same call (Instagram: width 1080).",
                 json!({"ratio": {"type": "string"}, "width": {"type": "integer", "description": "resize to this width after cropping (optional)"},
                        "anchor": {"type": "string", "description": "center (default) | top | bottom | left | right"}}), &["ratio"]),
        ]
    }

    fn call(&mut self, mcp: &mut Mcp, name: &str, args: &Value) -> Option<ToolResult> {
        let s = |k: &str| args.get(k).and_then(Value::as_str).unwrap_or("").to_string();
        Some(match name {
            "open_file" => {
                let path = s("path");
                let r = mcp.call("doc_open", json!({"path": path}));
                if r.ok {
                    self.opened.push(path);
                }
                r
            }
            "new_document" => {
                let mut a = serde_json::Map::new();
                for k in ["width", "height", "background", "name"] {
                    if let Some(v) = args.get(k).filter(|v| !v.is_null() && v.as_str() != Some("")) {
                        a.insert(k.into(), v.clone());
                    }
                }
                mcp.call("doc_new", Value::Object(a))
            }
            "save_file" => {
                let path = s("path");
                let current = Self::doc(mcp).and_then(|d| d.get("path").and_then(Value::as_str).map(str::to_string));
                let original = self.opened.iter().chain(current.iter()).any(|o| same_file(o, &path));
                if original && !confirmed(args) {
                    return Some(confirm(&path));
                }
                let r = mcp.call("doc_save", json!({"path": path}));
                if r.ok && r.text.is_empty() { ok("saved") } else { r }
            }
            "document_info" => {
                let Some(d) = Self::doc(mcp) else { return Some(err("no document open")) };
                let layers: Vec<Value> = d
                    .get("layers")
                    .and_then(Value::as_array)
                    .into_iter()
                    .flatten()
                    .map(|l| {
                        let mut kind = l.get("kind").and_then(Value::as_str).unwrap_or("").to_string();
                        if kind == "Adjustment" {
                            if let Some(k) = l.get("adjustment").and_then(Value::as_object).and_then(|o| o.keys().next()) {
                                kind = format!("Adjustment:{k}");
                            }
                        }
                        json!({"id": l.get("id"), "name": l.get("name"), "kind": kind, "visible": l.get("visible"),
                               "opacity": l.get("opacity"), "mask": l.get("hasMask")})
                    })
                    .collect();
                let history: Vec<Value> = d.get("history").and_then(Value::as_array).map(|h| h.iter().rev().take(8).rev().cloned().collect()).unwrap_or_default();
                ok(json!({"name": d.get("name"), "file": d.get("path"), "width": d.get("width"), "height": d.get("height"),
                          "mode": d.get("mode"), "depth": d.get("depth"), "layers": layers, "history": history,
                          "selection": d.get("selectionBounds"), "activeLayer": d.get("activeLayer")}).to_string())
            }
            "look" => {
                let r = mcp.call("doc_render_preview", json!({"max_side": 768}));
                if r.image.is_some() { ToolResult { ok: true, text: "picture attached".into(), image: r.image, ..Default::default() } } else { err(if r.text.is_empty() { "no picture".into() } else { r.text }) }
            }
            "crop_to_ratio" => {
                let Some(d) = Self::doc(mcp) else { return Some(err("no document open")) };
                let (w0, h0) = (d["width"].as_f64().unwrap_or(0.0), d["height"].as_f64().unwrap_or(0.0));
                let ratio = s("ratio").replace('/', ":");
                let mut it = ratio.split(':').map(|x| x.trim().parse::<f64>());
                let (Some(Ok(a)), Some(Ok(b))) = (it.next(), it.next()) else { return Some(err("ratio must look like 1:1, 4:5 or 16:9")) };
                if a <= 0.0 || b <= 0.0 || w0 <= 0.0 {
                    return Some(err("bad ratio"));
                }
                let (w, h) = if w0 * b / a <= h0 { (w0, (w0 * b / a).round()) } else { ((h0 * a / b).round(), h0) };
                let anchor = s("anchor");
                let x = match anchor.as_str() { "left" => 0.0, "right" => w0 - w, _ => ((w0 - w) / 2.0).floor() };
                let y = match anchor.as_str() { "top" => 0.0, "bottom" => h0 - h, _ => ((h0 - h) / 2.0).floor() };
                let mut p = json!({"x": x, "y": y, "width": w, "height": h});
                let tw = args.get("width").and_then(Value::as_f64).filter(|t| *t > 0.0);
                if let Some(tw) = tw {
                    p["targetWidth"] = json!(tw.round());
                    p["targetHeight"] = json!((tw * h / w).round());
                }
                let r = self.run(mcp, "image.crop", p.clone());
                if !r.ok {
                    return Some(r);
                }
                let mut text = format!("cropped ({x},{y}) {w}×{h}");
                if tw.is_some() {
                    text += &format!(", resized to {}×{}", p["targetWidth"], p["targetHeight"]);
                }
                ok(format!("{text}. now: {}", self.state_line(mcp)))
            }
            _ => return None,
        })
    }

    fn state_line(&self, mcp: &mut Mcp) -> String {
        let Some(d) = Self::doc(mcp) else { return "no document open".into() };
        let active = d.get("activeLayer").cloned().unwrap_or(Value::Null);
        let layers = d.get("layers").and_then(Value::as_array).cloned().unwrap_or_default();
        let act = layers.iter().find(|l| l.get("id") == Some(&active));
        let mut kind = act.and_then(|l| l.get("kind")).and_then(Value::as_str).unwrap_or("?").to_string();
        if kind == "Pixel" && act.and_then(|l| l.get("bounds")).is_none_or(Value::is_null) {
            kind = "empty pixel layer".into();
        }
        let name = act.and_then(|l| l.get("name")).and_then(Value::as_str).unwrap_or("?");
        let sel = if d.get("hasSelection").and_then(Value::as_bool).unwrap_or(false) { "selection active" } else { "no selection" };
        format!("document {}×{}, {} layers, active layer #{} \"{name}\" ({kind}), {sel}", d["width"], d["height"], layers.len(), active)
    }

    fn annotate(&self, id: &str, ids: &HashSet<String>) -> Option<String> {
        let kind = id.strip_prefix("image.adjustments.")?;
        let alt = format!("layer.newAdjustmentLayer.{kind}");
        ids.contains(&alt).then(|| format!("prefer {alt}: same params, as an editable adjustment layer"))
    }
}
