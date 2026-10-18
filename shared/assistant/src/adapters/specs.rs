//! The apps served by the generic adapter: which MCP tools the model gets, and their guides.

use serde_json::{Value, json};

use super::generic::{Helper, Macro, Spec};
use crate::mcp::Mcp;

fn num(v: &Value, k: &str) -> f64 {
    v.get(k).and_then(Value::as_f64).unwrap_or(0.0)
}

/// Reesha: the artboard and where the selection is (centre included), so the model can check placement.
fn reesha_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("doc_inspect", json!({"depth": 0})) else { return String::new() };
    let mut out = String::new();
    if let Some(a) = d.get("artboards").and_then(Value::as_array).and_then(|a| a.first()) {
        let (w, h) = (num(a, "width"), num(a, "height"));
        out += &format!("artboard {w:.0}×{h:.0} pt (centre {:.0},{:.0})", num(a, "x") + w / 2.0, num(a, "y") + h / 2.0);
    }
    let n = d.get("objects").and_then(Value::as_u64).unwrap_or(0);
    out += &format!(", {n} objects");
    let sel = d.get("selection").and_then(Value::as_array).map(|s| s.len()).unwrap_or(0);
    if let Some(b) = d.get("selectionBounds").filter(|b| b.is_object()) {
        let (x, y, w, h) = (num(b, "x"), num(b, "y"), num(b, "width"), num(b, "height"));
        out += &format!(", selected {sel}: x {x:.0}..{:.0}, y {y:.0}..{:.0} (centre {:.0},{:.0})", x + w, y + h, x + w / 2.0, y + h / 2.0);
    }
    out
}

static REESHA: Spec = Spec {
    catalog: "command_list",
    run: ("command_run", "id"),
    keep: &[
        ("open_file", "", ""),
        ("save_file", "", ""),
        ("export", "", ""),
        ("doc_inspect", "document_info", "The document: artboards, every object (id, kind, bounds, fill, text), selection, history."),
        ("draw_shape", "", ""),
        ("draw_path", "", ""),
        ("add_text", "", ""),
        ("set_paint", "", "Set fill, stroke and/or stroke width on the objects in `ids` (every id is in document_info). Without `ids` only the current selection changes."),
        ("transform", "", "Rotate, scale, reflect or move (dx/dy) the objects in `ids`, relative to where they are. `origin` is only the pivot of a rotation or scale; it doesn't move anything."),
        ("pathfinder", "", ""),
        ("apply_effect", "", ""),
        ("undo", "", ""),
    ],
    look: Some(("render_preview", r#"{"max_side": 768}"#)),
    opens: &[("open_file", "path")],
    saves: &[("save_file", "path"), ("export", "path")],
    hidden: |id| id.starts_with("file.") && !matches!(id, "file.new" | "file.newFromTemplate" | "file.close"),
    state: Some(reesha_state),
    after: &["draw_shape", "draw_path", "add_text", "set_paint", "transform", "pathfinder", "apply_effect", "undo", "align_objects", "distribute_objects", "group_objects"],
    drop: &["strokeOptions", "preview", "printable", "template", "dimImages", "clip", "locked", "visible", "labelColor", "layerRows",
            "pasteRemembersLayers", "isolation", "key", "target", "appearanceItem", "fillActive", "redo", "revision", "previewMode"],
    helpers: &[],
    macros: &[
        Macro {
            name: "align_objects",
            desc: "Align objects (by id) to the artboard or to each other, e.g. centre them on the artboard.",
            props: r#"{"ids": {"type": "array", "items": {"type": "integer"}}, "horizontal": {"type": "string", "enum": ["left", "center", "right"]},
                       "vertical": {"type": "string", "enum": ["top", "center", "bottom"]}, "to": {"type": "string", "enum": ["artboard", "selection"]}}"#,
            required: &["ids"],
            steps: &[("select.set", r#"{"ids": "$ids"}"#), ("object.align", r#"{"horizontal": "$horizontal", "vertical": "$vertical", "to": "$to"}"#)],
        },
        Macro {
            name: "distribute_objects",
            desc: "Space objects (by id) evenly, horizontally or vertically (optionally with a fixed gap in pt).",
            props: r#"{"ids": {"type": "array", "items": {"type": "integer"}}, "axis": {"type": "string", "enum": ["horizontal", "vertical"]}, "spacing": {"type": "number"}}"#,
            required: &["ids", "axis"],
            steps: &[("select.set", r#"{"ids": "$ids"}"#), ("object.distributeSpacing", r#"{"axis": "$axis", "spacing": "$spacing"}"#)],
        },
        Macro {
            name: "group_objects",
            desc: "Group objects (by id) into one group.",
            props: r#"{"ids": {"type": "array", "items": {"type": "integer"}}}"#,
            required: &["ids"],
            steps: &[("select.set", r#"{"ids": "$ids"}"#), ("object.group", "{}")],
        },
    ],
    hints: &[],
    autosave: None,
};

/// Minbar: how many slides, the theme, and the current slide.
/// The JSON a command returned (or Null).
fn command_json(mcp: &mut Mcp, spec: &Spec, id: &str, params: Value) -> Result<Value, String> {
    let r = spec.command(mcp, id, params);
    if !r.ok {
        return Err(r.text);
    }
    Ok(serde_json::from_str(&r.text).unwrap_or(Value::Null))
}

/// Tayf: a rating from 0 to 5 stars on the active photo.
fn tayf_rate(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    match args.get("stars").and_then(Value::as_u64).filter(|n| *n <= 5) {
        Some(n) => spec.command(mcp, "photo.rate", json!({"rating": n})),
        None => super::err("stars: 0 to 5"),
    }
}

/// Tayf: flag the active photo as a pick or a reject, or clear the flag.
fn tayf_flag(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    match args.get("flag").and_then(Value::as_str) {
        Some(f @ ("pick" | "reject" | "none")) => spec.command(mcp, "photo.flag", json!({"flag": f})),
        _ => super::err("flag: pick, reject or none"),
    }
}

/// Tayf: change develop controls by an amount ("a bit brighter", "warmer"): reads the current values and sets the sums.
fn tayf_adjust(mcp: &mut Mcp, _spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let Some(changes) = args.get("changes").and_then(Value::as_object) else {
        return super::err("changes: {\"light.exposure\": 0.5, \"wb.temp\": 800, …}");
    };
    let current = match mcp.call_json("get_develop", json!({})) {
        Ok(d) => d,
        Err(e) => return super::err(e),
    };
    let mut values = serde_json::Map::new();
    for (control, delta) in changes {
        let Some(delta) = delta.as_f64() else { return super::err(format!("{control}: a number to add (negative to lower)")) };
        let now = control.split('.').try_fold(&current, |v, k| v.get(k)).and_then(Value::as_f64);
        let Some(now) = now else { return super::err(format!("no control `{control}` (list_controls has them)")) };
        values.insert(control.clone(), json!(now + delta));
    }
    mcp.call("set_develop", json!({"values": values}))
}

/// Tayf: crop the active photo to a ratio ("1:1", "16:9", "4:5"), centred, as large as it fits.
fn tayf_crop_ratio(mcp: &mut Mcp, _spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let ratio = args.get("ratio").and_then(Value::as_str).unwrap_or("");
    let parts: Vec<f64> = ratio.split([':', '/', 'x', '×']).filter_map(|p| p.trim().parse().ok()).collect();
    let r = match parts.as_slice() {
        [w, h] if *w > 0.0 && *h > 0.0 => w / h,
        _ => return super::err("ratio such as \"1:1\", \"16:9\" or \"4:5\""),
    };
    let Ok(lib) = mcp.call_json("doc_inspect", json!({})) else { return super::err("no library") };
    let lib = lib.get("library").cloned().unwrap_or(lib);
    let Some(id) = lib.pointer("/selection/active").and_then(Value::as_u64) else { return super::err("no active photo") };
    let photos = mcp.call_json("query_photos", json!({"filter": {}, "limit": 1000})).ok().and_then(|q| q.get("photos").and_then(Value::as_array).cloned()).unwrap_or_default();
    let Some(p) = photos.iter().find(|p| p.get("id").and_then(Value::as_u64) == Some(id)) else { return super::err("the active photo isn't in the library") };
    let (w, h) = (p.get("width").and_then(Value::as_f64).unwrap_or(1.0), p.get("height").and_then(Value::as_f64).unwrap_or(1.0));
    let (fw, fh) = if w / h > r { (r * h / w, 1.0) } else { (1.0, w / (r * h)) };
    mcp.call("crop", json!({"rect": [(1.0 - fw) / 2.0, (1.0 - fh) / 2.0, (1.0 + fw) / 2.0, (1.0 + fh) / 2.0]}))
}

/// Nasaq: margins (cm) and columns of every page.
fn nasaq_margins_columns(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    const PT_PER_CM: f64 = 72.0 / 2.54;
    let mut p = json!({});
    if let Some(n) = args.get("columns").and_then(Value::as_u64) {
        p["columns"] = json!(n);
    }
    if let Some(cm) = args.get("margins_cm").and_then(Value::as_f64) {
        p["margins"] = json!((cm * PT_PER_CM * 100.0).round() / 100.0);
    }
    if let Some(mm) = args.get("gutter_mm").and_then(Value::as_f64) {
        p["gutter"] = json!((mm * PT_PER_CM / 10.0 * 100.0).round() / 100.0);
    }
    if p.as_object().is_none_or(|o| o.is_empty()) {
        return super::err("give columns, margins_cm and/or gutter_mm");
    }
    spec.command(mcp, "layout.marginsAndColumns", p)
}

/// Sada: fade in and/or out on a clip (the first one, or the first on `track`).
fn sada_fade(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let Ok(s) = mcp.call_json("inspect_session", json!({})) else { return super::err("no session") };
    let sr = s.get("sample_rate").and_then(Value::as_f64).unwrap_or(48000.0);
    let want = args.get("track").and_then(Value::as_str).unwrap_or("");
    let tracks = s.get("tracks").and_then(Value::as_array).cloned().unwrap_or_default();
    let found = tracks.iter().filter(|t| want.is_empty() || t.get("name").and_then(Value::as_str) == Some(want)).find_map(|t| {
        let c = t.get("clips")?.as_array()?.first()?.clone();
        Some((t.get("id")?.clone(), c))
    });
    let Some((track, clip)) = found else { return super::err("no clip to fade") };
    let start = clip.get("start").and_then(Value::as_f64).unwrap_or(0.0);
    let end = clip.get("end").and_then(Value::as_f64).unwrap_or(start);
    let longest = (end - start) / 3.0;
    let mut done = Vec::new();
    for (key, at_start) in [("fade_in_seconds", true), ("fade_out_seconds", false)] {
        let Some(secs) = args.get(key).and_then(Value::as_f64).filter(|s| *s > 0.0) else { continue };
        let n = (secs * sr).min(longest).round();
        let (a, b) = if at_start { (start, start + n) } else { (end - n, end) };
        let r = spec.command(mcp, "edit.fades_create", json!({"tracks": [track], "start": a.round() as i64, "end": b.round() as i64}));
        if !r.ok {
            return r;
        }
        done.push(if at_start { "fade in" } else { "fade out" });
    }
    if done.is_empty() {
        return super::err("give fade_in_seconds and/or fade_out_seconds");
    }
    super::ok(format!("{} on clip {}", done.join(" and "), clip.get("name").and_then(Value::as_str).unwrap_or("")))
}

/// Mukhattat: move entities (all of them, when no handles are given) by dx, dy drawing units.
fn mukhattat_move(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let (dx, dy) = (args.get("dx").and_then(Value::as_f64).unwrap_or(0.0), args.get("dy").and_then(Value::as_f64).unwrap_or(0.0));
    let mut handles: Vec<Value> = args.get("handles").and_then(Value::as_array).cloned().unwrap_or_default();
    if handles.is_empty() {
        handles = mcp
            .call_json("query_entities", json!({}))
            .ok()
            .and_then(|q| q.get("entities").and_then(Value::as_array).cloned())
            .unwrap_or_default()
            .iter()
            .filter_map(|e| e.get("handle").cloned())
            .collect();
    }
    if handles.is_empty() {
        return super::err("nothing to move");
    }
    spec.command(mcp, "move", json!({"handles": handles, "delta": [dx, dy]}))
}

/// Satr: format paragraph N in one call: alignment, style and/or list.
fn satr_format_paragraph(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let r = satr_go_to_paragraph(mcp, spec, args);
    if !r.ok {
        return r;
    }
    let mut done = Vec::new();
    if let Some(a) = args.get("align").and_then(Value::as_str).filter(|a| !a.is_empty()) {
        let r = spec.command(mcp, "para.align", json!({"value": a}));
        if !r.ok {
            return r;
        }
        done.push(format!("aligned {a}"));
    }
    if let Some(st) = args.get("style").and_then(Value::as_str).filter(|s| !s.is_empty()) {
        let r = spec.command(mcp, "para.style", json!({"style": st}));
        if !r.ok {
            return r;
        }
        done.push(format!("style {st}"));
    }
    match args.get("list").and_then(Value::as_str) {
        Some("bullets") => {
            let r = spec.command(mcp, "para.bullets", json!({}));
            if !r.ok {
                return r;
            }
            done.push("bullets".into());
        }
        Some("numbering") => {
            let r = spec.command(mcp, "para.numbering", json!({}));
            if !r.ok {
                return r;
            }
            done.push("numbering".into());
        }
        _ => {}
    }
    if done.is_empty() {
        return super::err("give align, style and/or list");
    }
    super::ok(done.join(", "))
}

/// Wamda: delete layers (ids or names).
fn wamda_delete_layers(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let layers: Vec<Value> = args.get("layers").and_then(Value::as_array).cloned().unwrap_or_default();
    if layers.is_empty() {
        return super::err("layers: ids or names from get_comp");
    }
    spec.command(mcp, "edit.clear", json!({"layers": layers}))
}

/// Mukhattat: a parallel copy of a closed outline (a wall's other face), inside by default.
fn mukhattat_offset_wall(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let Some(distance) = args.get("distance").and_then(Value::as_f64).filter(|d| *d > 0.0) else {
        return super::err("distance: the wall thickness in drawing units (mm)");
    };
    let entities = mcp.call_json("query_entities", json!({})).ok().and_then(|q| q.get("entities").and_then(Value::as_array).cloned()).unwrap_or_default();
    let want = args.get("handle").and_then(Value::as_str);
    let Some(e) = entities.iter().find(|e| match want {
        Some(h) => e.get("handle").and_then(Value::as_str) == Some(h),
        None => e.get("type").and_then(Value::as_str) == Some("Polyline") && e.pointer("/geometry/closed").and_then(Value::as_bool) == Some(true),
    }) else {
        return super::err("no closed outline (a polyline or rectangle) to offset");
    };
    let pts: Vec<(f64, f64)> = e
        .pointer("/geometry/vertices")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .filter_map(|v| Some((v.pointer("/p/x")?.as_f64()?, v.pointer("/p/y")?.as_f64()?)))
        .collect();
    if pts.is_empty() {
        return super::err("the outline has no vertices");
    }
    let (minx, maxx) = pts.iter().fold((f64::MAX, f64::MIN), |(a, b), p| (a.min(p.0), b.max(p.0)));
    let (miny, maxy) = pts.iter().fold((f64::MAX, f64::MIN), |(a, b), p| (a.min(p.1), b.max(p.1)));
    let inside = args.get("inside").and_then(Value::as_bool).unwrap_or(true);
    let side = if inside { [(minx + maxx) / 2.0, (miny + maxy) / 2.0] } else { [maxx + distance * 3.0, (miny + maxy) / 2.0] };
    spec.command(mcp, "offset", json!({"handle": e.get("handle").cloned().unwrap_or(Value::Null), "distance": distance, "side": side}))
}

/// Sada: a plug-in on a track (the first track when none is named), in its first free insert slot.
fn sada_add_effect(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let Some(plugin) = args.get("plugin").and_then(Value::as_str).filter(|p| !p.is_empty()) else {
        return super::err("plugin: room_reverb, plate_reverb, eq_7band, compressor, de_esser, expander_gate, mod_delay, maximizer, saturator or chorus");
    };
    let Ok(s) = mcp.call_json("inspect_session", json!({})) else { return super::err("no session") };
    let want = args.get("track").and_then(Value::as_str).unwrap_or("");
    let tracks = s.get("tracks").and_then(Value::as_array).cloned().unwrap_or_default();
    let Some(t) = tracks.iter().find(|t| want.is_empty() || t.get("name").and_then(Value::as_str) == Some(want)) else {
        return super::err("no such track");
    };
    let used = t.get("inserts").and_then(Value::as_array).map(Vec::len).unwrap_or(0);
    let name = t.get("name").cloned().unwrap_or(Value::Null);
    let mut p = json!({"track": name, "slot": used, "plugin": plugin});
    if let Some(params) = args.get("params").filter(|v| v.is_object()) {
        p["params"] = params.clone();
    }
    spec.command(mcp, "mix.insert", p)
}

/// Watheeq: pages of the open document copied into a new PDF next to it.
fn watheeq_extract(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let pages: Vec<u64> = args.get("pages").and_then(Value::as_array).into_iter().flatten().filter_map(Value::as_u64).filter(|n| *n >= 1).collect();
    if pages.is_empty() {
        return super::err("pages: page numbers counting from 1, e.g. [2, 3]");
    }
    let docs = mcp.call_json("doc_list", json!({})).ok().and_then(|d| d.get("documents").and_then(Value::as_array).cloned()).unwrap_or_default();
    let Some(d) = docs.last() else { return super::err("no document open yet: doc_open the file first") };
    let id = d.get("doc").cloned().unwrap_or(Value::Null);
    let out = match args.get("out").and_then(Value::as_str).filter(|o| !o.is_empty()) {
        Some(o) => o.to_string(),
        None => {
            let src = d.get("path").and_then(Value::as_str).unwrap_or("");
            let stem = src.strip_suffix(".pdf").or_else(|| src.strip_suffix(".PDF")).unwrap_or(src);
            let list: Vec<String> = pages.iter().map(u64::to_string).collect();
            format!("{stem}-pages-{}.pdf", list.join("-"))
        }
    };
    let mut r = spec.command(mcp, "page.extract", json!({"doc": id, "pages": pages, "out": out}));
    if r.ok {
        r.saved = Some(out.clone());
        r.text = format!("pages {pages:?} written to {out}");
    }
    r
}

/// Wamda: a solid colour layer (a background goes to the back).
fn wamda_solid(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let color = args.get("color").and_then(Value::as_str).unwrap_or("#000000");
    let name = args.get("name").and_then(Value::as_str).unwrap_or("Background");
    let made = match command_json(mcp, spec, "layer.newSolid", json!({"name": name, "color": color})) {
        Ok(v) => v,
        Err(e) => return super::err(e),
    };
    let Some(layer) = made.get("layer").cloned() else { return super::err("the solid was not made") };
    if args.get("to_back").and_then(Value::as_bool).unwrap_or(true) {
        let r = spec.command(mcp, "layer.arrange", json!({"layers": [layer.clone()], "to": "back"}));
        if !r.ok {
            return r;
        }
    }
    super::ok(format!("solid layer {layer} \"{name}\" {color}"))
}

/// Monteer: a video transition at a clip's start (in) and/or end (out).
fn monteer_transition(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let Ok(seq) = mcp.call_json("sequence_inspect", json!({})) else { return super::err("no sequence open") };
    let clip = match args.get("clip").and_then(Value::as_u64) {
        Some(c) => json!(c),
        None => match seq.get("video").and_then(Value::as_array).into_iter().flatten().find_map(|t| t.get("items")?.as_array()?.first()?.get("clip").cloned()) {
            Some(c) => c,
            None => return super::err("no video clip on the timeline"),
        },
    };
    let num = seq.pointer("/settings/frame_rate/num").and_then(Value::as_f64).unwrap_or(30.0);
    let den = seq.pointer("/settings/frame_rate/den").and_then(Value::as_f64).unwrap_or(1.0);
    let frames = (args.get("seconds").and_then(Value::as_f64).unwrap_or(1.0) * num / den).round().max(1.0) as i64;
    let effect = args.get("effect").and_then(Value::as_str).filter(|e| !e.is_empty()).unwrap_or("cross_dissolve");
    let edges: &[&str] = match args.get("edge").and_then(Value::as_str).unwrap_or("in") {
        "out" | "end" => &["out"],
        "both" => &["in", "out"],
        _ => &["in"],
    };
    for edge in edges {
        let r = spec.command(mcp, "sequence.applyVideoTransition", json!({"clip": clip, "effect": effect, "frames": frames, "edge": edge}));
        if !r.ok {
            return r;
        }
    }
    super::ok(format!("{effect} at the {} of clip {clip}, {frames} frames", edges.join(" and ")))
}

fn minbar_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("inspect_document", json!({})) else { return String::new() };
    let slides = d.get("slides").and_then(Value::as_array).cloned().unwrap_or_default();
    let cur = d.pointer("/selection/slide").and_then(Value::as_u64);
    let mut out = format!("{} slides, theme {}", slides.len(), d.get("theme").and_then(Value::as_str).unwrap_or("?"));
    if let Some(s) = slides.iter().find(|s| s.get("index").and_then(Value::as_u64) == cur) {
        out += &format!(
            ", current slide {} \"{}\" ({}, {} shapes)",
            cur.unwrap_or(0),
            s.get("title").and_then(Value::as_str).unwrap_or(""),
            s.get("layout").and_then(Value::as_str).unwrap_or(""),
            s.get("shapes").and_then(Value::as_u64).unwrap_or(0)
        );
    }
    let untitled: Vec<String> = slides
        .iter()
        .filter(|s| s.get("title").and_then(Value::as_str).is_none_or(|t| t.trim().is_empty()))
        .filter_map(|s| s.get("index").and_then(Value::as_u64).map(|i| (i + 1).to_string()))
        .collect();
    if !untitled.is_empty() {
        out += &format!(", slides without a title placeholder (counting from 1): {}", untitled.join(", "));
    }
    // What the slides say (decks often put their titles in text boxes): the current slide's text,
    // and each slide's first line, so notes and summaries are about this deck.
    if let Some(c) = cur {
        let text = minbar_slide_text(mcp, c).join(" | ");
        if !text.is_empty() {
            out += &format!("; text on the current slide: \"{}\"", clip_chars(&text, 400));
        }
    }
    let outline: Vec<String> = (0..slides.len().min(12) as u64)
        .filter_map(|i| minbar_slide_text(mcp, i).into_iter().next().map(|t| format!("{} \"{}\"", i + 1, clip_chars(&t, 50))))
        .collect();
    if !outline.is_empty() {
        out += &format!("; slides (from 1): {}", outline.join(", "));
    }
    out
}

/// The text of a slide's shapes (groups included), one string per shape, spaces collapsed.
fn minbar_slide_text(mcp: &mut Mcp, index: u64) -> Vec<String> {
    fn walk(v: &Value, out: &mut Vec<String>) {
        if let Some(t) = v.get("text").and_then(Value::as_str) {
            let t = t.split_whitespace().collect::<Vec<_>>().join(" ");
            if !t.is_empty() {
                out.push(t);
            }
        }
        for c in v.get("children").and_then(Value::as_array).into_iter().flatten() {
            walk(c, out);
        }
    }
    let mut out = Vec::new();
    if let Ok(s) = mcp.call_json("inspect_slide", json!({"index": index})) {
        for sh in s.get("shapes").and_then(Value::as_array).into_iter().flatten() {
            walk(sh, &mut out);
        }
    }
    out
}

fn clip_chars(s: &str, n: usize) -> String {
    if s.chars().count() <= n { s.to_string() } else { s.chars().take(n).collect::<String>() + "…" }
}

/// A point without the bullet or number someone typed before it ("- ", "• ", "1. ", "١) ").
fn without_marker(p: &str) -> String {
    let t = p.trim().trim_start_matches(['-', '•', '*', '·', '–', '—', '▪', '●']).trim_start();
    let digits = t.char_indices().take_while(|(_, c)| c.is_ascii_digit() || ('\u{660}'..='\u{669}').contains(c)).last().map(|(i, c)| i + c.len_utf8());
    match digits {
        Some(end) if t[end..].starts_with(['.', ')', '-', '،']) => t[end + 1..].trim_start().to_string(),
        _ => t.to_string(),
    }
}

/// Minbar: a slide from its title and points.
fn minbar_new_slide(mcp: &mut Mcp, _spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let title = args.get("title").and_then(Value::as_str).unwrap_or("").trim().to_string();
    if title.is_empty() {
        return super::err("title is needed");
    }
    let points: Vec<String> =
        args.get("points").and_then(Value::as_array).into_iter().flatten().filter_map(Value::as_str).map(without_marker).filter(|p| !p.is_empty()).collect();
    let layout = args.get("layout").and_then(Value::as_str).filter(|l| !l.is_empty()).unwrap_or(if points.is_empty() { "title" } else { "titleAndContent" });
    let mut a = json!({"layout": layout, "title": title});
    if !points.is_empty() {
        a["body"] = json!(points.join("\n"));
    }
    mcp.call("add_slide", a)
}

/// Minbar: a whole presentation in one call: the first slide's title (and subtitle), then the content slides.
fn minbar_build(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let title = args.get("title").and_then(Value::as_str).unwrap_or("").trim().to_string();
    let slides = args.get("slides").and_then(Value::as_array).cloned().unwrap_or_default();
    if title.is_empty() || slides.is_empty() {
        return super::err("title and slides ([{title, points}]) are needed");
    }
    let thin: Vec<String> = slides
        .iter()
        .filter(|s| s.get("points").and_then(Value::as_array).is_none_or(|p| p.len() < 3))
        .filter_map(|s| s.get("title").and_then(Value::as_str).map(str::to_string))
        .collect();
    if !thin.is_empty() {
        return super::err(format!("give every slide 3 to 5 points; these have fewer: {}", thin.join(", ")));
    }
    // The first slide is the title slide: fill its placeholders.
    let first = mcp.call_json("inspect_slide", json!({"index": 0})).ok().and_then(|s| s.get("shapes").and_then(Value::as_array).cloned()).unwrap_or_default();
    let place = |kinds: &[&str]| first.iter().find(|s| s.get("placeholder").and_then(Value::as_str).is_some_and(|p| kinds.contains(&p))).and_then(|s| s.get("id").cloned());
    if let Some(id) = place(&["ctrTitle", "title"]) {
        let r = mcp.call("set_text", json!({"id": id, "text": title}));
        if !r.ok {
            return r;
        }
    }
    if let (Some(id), Some(sub)) = (place(&["subTitle", "body"]), args.get("subtitle").and_then(Value::as_str).filter(|s| !s.is_empty())) {
        let _ = mcp.call("set_text", json!({"id": id, "text": sub}));
    }
    let _ = mcp.call("go_to_slide", json!({"index": 0}));
    for s in &slides {
        let r = minbar_new_slide(mcp, spec, s);
        if !r.ok {
            return r;
        }
    }
    super::ok(format!("title slide \"{title}\" and {} content slides", slides.len()))
}

/// The 0-based slide index of a 1-based `slide` argument.
fn slide_index(args: &Value) -> Result<u64, crate::mcp::ToolResult> {
    args.get("slide").and_then(Value::as_u64).filter(|n| *n >= 1).map(|n| n - 1).ok_or_else(|| super::err("slide: 1 for the first slide, 2 for the second…"))
}

fn minbar_delete_slide(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    match slide_index(args) {
        Ok(i) => spec.command(mcp, "slide.delete", json!({"index": i})),
        Err(e) => e,
    }
}

/// Minbar: an entrance animation on the current slide's points, title or shapes (their ids found here).
fn minbar_animate(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let effect = args.get("effect").and_then(Value::as_str).filter(|e| !e.is_empty()).unwrap_or("appear");
    let target = args.get("target").and_then(Value::as_str).unwrap_or("points");
    let shapes = match mcp.call_json("inspect_slide", json!({})) {
        Ok(s) => s.get("shapes").and_then(Value::as_array).cloned().unwrap_or_default(),
        Err(e) => return super::err(e),
    };
    let is_title = |s: &Value| matches!(s.get("placeholder").and_then(Value::as_str), Some("title" | "ctrTitle"));
    let ids: Vec<Value> = shapes
        .iter()
        .filter(|s| match target {
            "title" => is_title(s),
            "all" => true,
            _ => !is_title(s) && s.get("text").and_then(Value::as_str).is_some_and(|t| !t.trim().is_empty()),
        })
        .filter_map(|s| s.get("id").cloned())
        .collect();
    if ids.is_empty() {
        return super::err(format!("the current slide has no {target} to animate"));
    }
    spec.command(mcp, "animation.set", json!({"effect": effect, "ids": ids}))
}

fn minbar_speaker_notes(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let text = args.get("text").and_then(Value::as_str).unwrap_or("");
    match slide_index(args) {
        Ok(i) => spec.command(mcp, "slide.notes", json!({"text": text, "index": i})),
        Err(e) => e,
    }
}

static MINBAR: Spec = Spec {
    catalog: "list_commands",
    run: ("run_command", "command"),
    keep: &[
        ("new_presentation", "", ""),
        ("open_presentation", "", ""),
        ("save_presentation", "", ""),
        ("export", "", ""),
        ("inspect_document", "document_info", "The presentation: slides (index, id, title, layout, shape count, transition, animations, notes), theme, current slide."),
        ("inspect_slide", "slide_info", ""),
        ("go_to_slide", "", ""),
        ("add_shape", "", ""),
        ("add_text_box", "", ""),
        ("set_text", "", ""),
        ("insert_picture", "", ""),
        ("insert_table", "", ""),
        ("insert_chart", "", ""),
        ("select", "", ""),
    ],
    look: Some(("render_slide", "{}")),
    opens: &[("open_presentation", "path")],
    saves: &[("save_presentation", "path"), ("export", "path")],
    hidden: |id| id.starts_with("file.") && id != "file.new",
    state: Some(minbar_state),
    after: &["build_presentation", "new_slide", "delete_slide", "speaker_notes", "animate", "go_to_slide", "add_shape", "add_text_box", "set_text", "insert_picture", "insert_table", "insert_chart", "transition_all"],
    drop: &["layouts", "media", "redo", "comments", "rotation", "preset", "sections", "dirty"],
    helpers: &[
        Helper {
            name: "build_presentation",
            desc: "Make a whole presentation in one call: the title slide (title, subtitle) and the content slides, each with its title and 3 to 5 short points.",
            props: r#"{"title": {"type": "string"}, "subtitle": {"type": "string"},
                       "slides": {"type": "array", "items": {"type": "object", "properties": {"title": {"type": "string"}, "points": {"type": "array", "items": {"type": "string"}}}, "required": ["title", "points"]}}}"#,
            required: &["title", "slides"],
            run: minbar_build,
        },
        Helper {
            name: "new_slide",
            desc: "Add a slide after the current one: its title and its points (the layout draws the bullets, so no -, • or numbers). Without points it is a title slide.",
            props: r#"{"title": {"type": "string"}, "points": {"type": "array", "items": {"type": "string"}, "description": "one short point per item"},
                       "layout": {"type": "string", "description": "titleAndContent (default with points), title (default without), sectionHeader, twoContent, comparison, titleOnly, blank"}}"#,
            required: &["title"],
            run: minbar_new_slide,
        },
        Helper {
            name: "delete_slide",
            desc: "Delete slide N (1 = the first slide, as people count).",
            props: r#"{"slide": {"type": "integer", "description": "1 = first"}}"#,
            required: &["slide"],
            run: minbar_delete_slide,
        },
        Helper {
            name: "speaker_notes",
            desc: "Write the speaker notes of slide N (1 = the first slide), replacing what is there.",
            props: r#"{"slide": {"type": "integer", "description": "1 = first"}, "text": {"type": "string"}}"#,
            required: &["slide", "text"],
            run: minbar_speaker_notes,
        },
        Helper {
            name: "animate",
            desc: "Animate the current slide's points, title or everything (they appear one after another in the show).",
            props: r#"{"effect": {"type": "string", "description": "appear, fade, fly, zoom or wipe"},
                       "target": {"type": "string", "description": "points (default), title or all"}}"#,
            required: &["effect"],
            run: minbar_animate,
        },
    ],
    macros: &[Macro {
        name: "transition_all",
        desc: "Give every slide the same transition (fade, push, wipe, morph, …).",
        props: r#"{"kind": {"type": "string"}, "duration": {"type": "integer", "description": "ms"}}"#,
        required: &["kind"],
        steps: &[("transition.set", r#"{"kind": "$kind", "duration": "$duration"}"#), ("transition.applyAll", "{}")],
    }],
    hints: &[],
    autosave: None,
};

/// Satr: the caret to the start of paragraph N (1-based, negative from the end).
fn satr_go_to_paragraph(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let Some(n) = args.get("paragraph").and_then(Value::as_i64).filter(|n| *n != 0) else {
        return super::err("paragraph: 1 for the first, 2 for the second…, -1 for the last");
    };
    let blocks = mcp.call_json("inspect_document", json!({})).ok().and_then(|d| d.get("blocks").and_then(Value::as_array).cloned()).unwrap_or_default();
    let len = blocks.len() as i64;
    let i = if n > 0 { n - 1 } else { len + n };
    let Some(b) = usize::try_from(i).ok().and_then(|i| blocks.get(i)) else {
        return super::err(format!("the document has {len} paragraphs"));
    };
    let block = b.get("index").and_then(Value::as_u64).unwrap_or(i as u64);
    spec.command(mcp, "caret.set", json!({"pos": {"block": block, "off": 0}}))
}

/// Satr: paragraphs, pages and where the caret is.
fn satr_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("inspect_document", json!({})) else { return String::new() };
    let blocks = d.get("blocks").and_then(Value::as_array).cloned().unwrap_or_default();
    let mut out = format!("{} paragraphs, {} pages", blocks.len(), d.get("pages").and_then(Value::as_u64).unwrap_or(1));
    let at = d.pointer("/selection/focus/path/0").and_then(Value::as_u64);
    if let Some(b) = blocks.iter().find(|b| b.get("index").and_then(Value::as_u64) == at) {
        let text: String = b.get("text").and_then(Value::as_str).unwrap_or("").chars().take(40).collect();
        out += &format!(", caret in paragraph {} ({}): \"{text}\"", at.unwrap_or(0), b.get("style").and_then(Value::as_str).unwrap_or(""));
    }
    if d.pointer("/selection/anchor") != d.pointer("/selection/focus") {
        out += ", text selected";
    }
    out
}

static SATR: Spec = Spec {
    catalog: "list_commands",
    run: ("execute", "command"),
    keep: &[
        ("new_document", "", ""),
        ("open_document", "", ""),
        ("save_document", "", ""),
        ("type_text", "", ""),
        ("select_text", "", ""),
        ("get_text", "", ""),
        ("inspect_document", "document_info", "The document: paragraphs (index, style, text), pages, sections, caret and selection."),
    ],
    look: Some(("render_page", r#"{"page": 1}"#)),
    opens: &[("open_document", "path")],
    saves: &[("save_document", "path")],
    hidden: |id| id.starts_with("file."),
    state: Some(satr_state),
    after: &["type_text", "select_text", "go_to_paragraph", "replace_all", "format_paragraph"],
    drop: &["properties", "docGrid", "headers", "footers", "pageBorders", "lineNumbers", "comments", "parts", "canRedo", "canUndo", "len", "props"],
    helpers: &[
        Helper {
            name: "format_paragraph",
            desc: "Format paragraph N (1 = the first line, -1 = the last) in one call: align (right, center, left, justify), style (Title, Heading 1, Heading 2, Normal) and/or list (bullets, numbering).",
            props: r#"{"paragraph": {"type": "integer"}, "align": {"type": "string"}, "style": {"type": "string"}, "list": {"type": "string", "description": "bullets or numbering"}}"#,
            required: &["paragraph"],
            run: satr_format_paragraph,
        },
    Helper {
        name: "go_to_paragraph",
        desc: "Put the caret at the start of paragraph N (1 = the first line, -1 = the last), before a paragraph command such as para.heading1, para.align or para.bullets.",
        props: r#"{"paragraph": {"type": "integer", "description": "1 = first, 2 = second…, -1 = last"}}"#,
        required: &["paragraph"],
        run: satr_go_to_paragraph,
    }],
    hints: &[],
    autosave: None,
    macros: &[Macro {
        name: "replace_all",
        desc: "Replace a word or phrase with another everywhere in the document, in one call.",
        props: r#"{"text": {"type": "string"}, "with": {"type": "string"}}"#,
        required: &["text", "with"],
        steps: &[("edit.replaceAll", r#"{"text": "$text", "with": "$with"}"#)],
    }],
};

/// Kashf: the active sheet's used range, active cell and selection.
fn kashf_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("inspect_workbook", json!({})) else { return String::new() };
    let sheets = d.get("sheets").and_then(Value::as_array).cloned().unwrap_or_default();
    let i = d.get("activeSheet").and_then(Value::as_u64).unwrap_or(0) as usize;
    let s = sheets.get(i).or_else(|| sheets.first()).cloned().unwrap_or(Value::Null);
    format!(
        "sheet \"{}\" used range {}, active cell {}, selection {}",
        s.get("name").and_then(Value::as_str).unwrap_or(""),
        s.get("usedRange").and_then(Value::as_str).unwrap_or("none"),
        d.get("activeCell").and_then(Value::as_str).unwrap_or(""),
        d.get("selection").map(Value::to_string).unwrap_or_default()
    )
}

static KASHF: Spec = Spec {
    catalog: "list_commands",
    run: ("execute_command", "command"),
    keep: &[
        ("new_workbook", "", ""),
        ("open_workbook", "", ""),
        ("save_workbook", "", ""),
        ("inspect_workbook", "document_info", "The workbook: sheets (name, used range, tables, charts), names, selection, active cell, undo history."),
        ("read_range", "", ""),
        ("write_range", "", ""),
        ("set_cell", "", ""),
        ("get_cell", "", ""),
        ("evaluate_formula", "", ""),
        ("select", "", ""),
        ("format_range", "", ""),
        ("insert_chart", "", ""),
        ("create_table", "", ""),
        ("sort_range", "", ""),
        ("filter", "", ""),
        ("undo", "", ""),
        ("list_functions", "", ""),
    ],
    look: None,
    opens: &[("open_workbook", "path")],
    saves: &[("save_workbook", "path")],
    hidden: |id| id.starts_with("file."),
    state: Some(kashf_state),
    after: &["write_range", "set_cell", "format_range", "insert_chart", "create_table", "sort_range", "filter", "undo"],
    drop: &["redo", "dirty", "mode", "calcMode", "protected", "visibility", "zoom", "tabColor", "validations", "comments", "images", "shapes"],
    helpers: &[],
    hints: &[],
    autosave: None,
    macros: &[Macro {
        name: "freeze_top_row",
        desc: "Freeze the header row (ثبّت صف العناوين / الصف الأول) so it stays visible while scrolling. Changes no cell.",
        props: "{}",
        required: &[],
        steps: &[("view.freezeTopRow", "{}")],
    }],
};

/// Monteer counts time in ticks.
const TICKS_PER_SECOND: f64 = 254_016_000_000.0;

fn seconds(args: &Value, key: &str) -> Option<f64> {
    args.get(key).and_then(Value::as_f64).filter(|s| s.is_finite() && *s >= 0.0)
}

/// Place a project item on the timeline, times in seconds.
fn monteer_place_clip(mcp: &mut Mcp, spec: &Spec, args: &Value) -> crate::mcp::ToolResult {
    let Some(item) = args.get("item").and_then(Value::as_u64) else { return super::err("item (a project item id from document_info) is needed") };
    let mut p = json!({"item": item, "seconds": seconds(args, "at_seconds").unwrap_or(0.0), "insert": args.get("insert").and_then(Value::as_bool).unwrap_or(false)});
    if let Some(t) = args.get("track").and_then(Value::as_str).filter(|t| !t.is_empty()) {
        p["track"] = json!(t);
    }
    if let Some(d) = seconds(args, "duration_seconds") {
        p["duration"] = json!((d * TICKS_PER_SECOND).round() as i64);
    }
    if let Some(s) = seconds(args, "source_in_seconds") {
        p["sourceIn"] = json!((s * TICKS_PER_SECOND).round() as i64);
    }
    for k in ["video", "audio"] {
        if let Some(b) = args.get(k).and_then(Value::as_bool) {
            p[k] = json!(b);
        }
    }
    spec.command(mcp, "timeline.place", p)
}

/// Monteer: the active sequence, its length, and the clips per track.
fn monteer_state(mcp: &mut Mcp) -> String {
    let Ok(s) = mcp.call_json("sequence_inspect", json!({})) else { return "no sequence open".into() };
    if s.is_null() {
        return "no sequence open".into();
    }
    let name = s.get("name").and_then(Value::as_str).unwrap_or("");
    // sequence.inspect: {"video": [{name, items: [{name, startFrame, endFrame…}], transitions}], "audio": […],
    // "durationFrames", "settings": {"frame_rate": {num, den}}}; older shapes used "tracks"/"clips".
    let lists: Vec<&Value> = ["video", "audio", "tracks"].iter().filter_map(|k| s.get(*k)).collect();
    let fps = s.pointer("/settings/frame_rate").and_then(|r| Some(r.get("num")?.as_f64()? / r.get("den")?.as_f64()?.max(1.0)));
    let secs = |c: &Value, key: &str| -> Option<f64> { Some(c.get(key)?.as_f64()? / fps.filter(|f| *f > 0.0)?) };
    let tracks: Vec<String> = lists
        .iter()
        .filter_map(|l| l.as_array())
        .flatten()
        .filter_map(|t| {
            let items = t.get("items").or_else(|| t.get("clips")).and_then(Value::as_array);
            let n = items.map(Vec::len).unwrap_or(0);
            let label = t.get("name").or_else(|| t.get("id")).map(|v| v.as_str().map(str::to_string).unwrap_or_else(|| v.to_string())).unwrap_or_default();
            // The clips the commands take (`{"clips":[id]}`): the clip id, then name and place.
            let first: Vec<String> = items
                .into_iter()
                .flatten()
                .take(4)
                .map(|c| {
                    let id = c.get("clip").or_else(|| c.get("id")).map(Value::to_string).unwrap_or_default();
                    let name = c.get("name").and_then(Value::as_str).unwrap_or("");
                    match (secs(c, "startFrame"), secs(c, "endFrame")) {
                        (Some(a), Some(b)) => format!("clip #{id} {name} {a:.1}–{b:.1} s"),
                        _ => format!("clip #{id} {name}"),
                    }
                })
                .collect();
            let transitions = t.get("transitions").and_then(Value::as_array).map(Vec::len).unwrap_or(0);
            let locked = t.get("locked").and_then(Value::as_bool) == Some(true);
            (n > 0).then(|| {
                let mut d = format!("{label}{}: {n} clips ({}{})", if locked { " (locked)" } else { "" }, first.join(", "), if n > 4 { ", …" } else { "" });
                if transitions > 0 {
                    d += &format!(" and {transitions} transitions");
                }
                d
            })
        })
        .collect();
    let end = s
        .pointer("/duration/seconds")
        .or_else(|| s.get("durationSeconds"))
        .and_then(Value::as_f64)
        .or_else(|| Some(s.get("durationFrames")?.as_f64()? / fps.filter(|f| *f > 0.0)?));
    format!(
        "sequence \"{name}\"{}, {}",
        end.map(|e| format!(" {e:.1} s long")).unwrap_or_default(),
        if tracks.is_empty() { "empty".to_string() } else { tracks.join(", ") }
    )
}

static MONTEER: Spec = Spec {
    catalog: "command_list",
    run: ("command_run", "id"),
    keep: &[
        ("media_import", "", "Import media files (video, audio, pictures) into the project by absolute path. Returns the new item ids."),
        ("doc_inspect", "document_info", "The project (items with ids and durations, bins, sequences) and the active sequence (tracks, clips, transitions, playhead)."),
    ],
    look: Some(("render_preview", r#"{"max_side": 768}"#)),
    opens: &[("media_import", "paths"), ("file.open", "path")],
    saves: &[("file.saveAs", "path"), ("file.exportMedia", "path")],
    hidden: |id| matches!(id, "file.exit" | "file.close"),
    state: Some(monteer_state),
    after: &["place_clip", "media_import", "add_transition"],
    drop: &["thumbnail", "waveform", "peaks", "metadata"],
    macros: &[],
    helpers: &[Helper {
        name: "place_clip",
        desc: "Put a project item (video, sound or picture) on the active sequence's timeline at a time in seconds. Returns the new clip id.",
        props: r#"{"item": {"type": "integer", "description": "project item id"}, "at_seconds": {"type": "number"},
                   "track": {"type": "string", "description": "V1, V2… for video, A1… for sound only, or new"},
                   "duration_seconds": {"type": "number"}, "source_in_seconds": {"type": "number", "description": "start this far into the source"},
                   "video": {"type": "boolean"}, "audio": {"type": "boolean"}, "insert": {"type": "boolean", "description": "push later clips along"}}"#,
        required: &["item", "at_seconds"],
        run: monteer_place_clip,
    },
        Helper {
            name: "add_transition",
            desc: "Add a video transition (cross_dissolve by default: a fade) at a clip's start (edge in), end (out) or both.",
            props: r#"{"edge": {"type": "string", "description": "in, out or both"}, "seconds": {"type": "number"}, "effect": {"type": "string"}, "clip": {"type": "integer", "description": "clip id; default the first video clip"}}"#,
            required: &[],
            run: monteer_transition,
        },
    ],
    hints: &[],
    autosave: None,
};

/// A count of a JSON array at `key` (0 when missing).
fn count(v: &Value, key: &str) -> usize {
    v.get(key).and_then(Value::as_array).map(Vec::len).unwrap_or(0)
}

/// Nasaq: pages, items and stories that don't fit (overset).
fn nasaq_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("inspect_document", json!({})) else { return String::new() };
    let items: usize = d.get("spreads").and_then(Value::as_array).into_iter().flatten().map(|s| count(s, "items")).sum();
    let overset: Vec<String> = d
        .get("stories")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .filter(|s| s.get("overset").is_some_and(|o| o.as_bool() == Some(true) || o.as_u64().is_some_and(|n| n > 0)))
        .filter_map(|s| s.get("id").map(Value::to_string))
        .collect();
    let pages = d.get("pageCount").and_then(Value::as_u64).map_or_else(|| count(&d, "pages"), |n| n as usize);
    let mut out = format!("{pages} pages, {items} items");
    if !overset.is_empty() {
        out += &format!(", OVERSET (text doesn't fit) in stories {}", overset.join(", "));
    }
    // The stories by id with their first words, so text is found without guessing ids.
    let stories: Vec<String> = d
        .get("stories")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .filter_map(|s| {
            let id = s.get("id")?;
            let preview: String = s.get("preview").and_then(Value::as_str)?.split_whitespace().collect::<Vec<_>>().join(" ");
            (!preview.is_empty()).then(|| format!("{id} \"{}\"", clip_chars(&preview, 40)))
        })
        .take(12)
        .collect();
    if !stories.is_empty() {
        out += &format!("; stories (id \"start\"): {}", stories.join(", "));
    }
    out
}

static NASAQ: Spec = Spec {
    catalog: "list_commands",
    run: ("execute", "command"),
    keep: &[
        ("new_document", "", ""),
        ("open_document", "", ""),
        ("save_document", "", ""),
        ("inspect_document", "document_info", "The document: pages (bounds, margins, columns), spreads with items (id, kind, bounds, story), stories (id, overset), styles, swatches, selection."),
        ("get_story", "", ""),
        ("set_story_text", "", ""),
        ("place_image", "", ""),
        ("export_png", "", ""),
    ],
    look: Some(("render_page", "{}")),
    opens: &[("open_document", "path"), ("place_image", "path")],
    saves: &[("save_document", "path"), ("export_png", "path"), ("file.exportPdf", "path")],
    hidden: |id| matches!(id, "file.exit" | "file.close"),
    state: Some(nasaq_state),
    after: &["set_story_text", "place_image", "new_document", "margins_and_columns"],
    drop: &["preview", "swatches", "layers"],
    helpers: &[
        Helper {
            name: "margins_and_columns",
            desc: "Set the margins (in centimetres) and/or the number of columns of every page.",
            props: r#"{"columns": {"type": "integer"}, "margins_cm": {"type": "number", "description": "the same on all sides"}, "gutter_mm": {"type": "number", "description": "space between columns"}}"#,
            required: &[],
            run: nasaq_margins_columns,
        },
    ],
    hints: &[],
    autosave: None,
    macros: &[],
};

/// Watheeq: save every changed document to `<name>-edited.pdf` next to it (in place once it is that
/// copy); the original is never written. Returns the last file written.
fn watheeq_autosave(mcp: &mut Mcp) -> Option<String> {
    let docs = mcp.call_json("doc_list", json!({})).ok()?.get("documents")?.as_array()?.clone();
    let mut written = None;
    for d in docs.iter().filter(|d| d.get("dirty").and_then(Value::as_bool) == Some(true)) {
        let (Some(id), Some(path)) = (d.get("doc").cloned(), d.get("path").and_then(Value::as_str)) else { continue };
        let stem = path.strip_suffix(".pdf").or_else(|| path.strip_suffix(".PDF")).unwrap_or(path);
        let (args, target) = if stem.ends_with("-edited") {
            (json!({"doc": id}), path.to_string())
        } else {
            let t = format!("{stem}-edited.pdf");
            (json!({"doc": id, "path": t}), t)
        };
        if mcp.call("doc_save", args).ok {
            written = Some(target);
        }
    }
    written
}

/// Watheeq: the documents its server has open, and whether they have changes to save.
fn watheeq_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("doc_list", json!({})) else { return String::new() };
    let docs: Vec<String> = d
        .get("documents")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .map(|x| {
            format!(
                "doc {} \"{}\" ({} pages{})",
                x.get("doc").and_then(Value::as_u64).unwrap_or(0),
                x.get("name").and_then(Value::as_str).unwrap_or(""),
                x.get("pages").and_then(Value::as_u64).unwrap_or(0),
                if x.get("dirty").and_then(Value::as_bool).unwrap_or(false) { ", changes not saved yet: doc_save to a new file" } else { "" }
            )
        })
        .collect();
    if docs.is_empty() { "no document open yet: doc_open the file first".into() } else { format!("open: {}", docs.join(", ")) }
}

static WATHEEQ: Spec = Spec {
    catalog: "command_list",
    run: ("command_run", "id"),
    keep: &[
        ("doc_open", "", ""),
        ("doc_info", "document_info", "A document's metadata, page sizes, bookmarks, annotations, form fields, links, fonts and security."),
        ("text_extract", "", ""),
        ("text_find", "", ""),
        ("doc_combine", "", ""),
        ("doc_split", "", ""),
        ("doc_save", "", ""),
        ("edit_undo", "", ""),
    ],
    look: Some(("render_preview", r#"{"max_side": 768}"#)),
    opens: &[("doc_open", "path"), ("doc_combine", "paths"), ("page.insert", "path")],
    saves: &[("doc_save", "path"), ("doc_combine", "out"), ("page.extract", "out"), ("optimize.reduce", "path"), ("export.docx", "path")],
    hidden: |_| false,
    state: Some(watheeq_state),
    after: &["doc_open", "doc_save", "doc_combine", "doc_split", "edit_undo", "extract_pages"],
    drop: &["fonts", "repair"],
    helpers: &[Helper {
        name: "extract_pages",
        desc: "Copy pages of the open document into a new PDF next to it (pages counted from 1). Writes the file itself; no doc_save needed.",
        props: r#"{"pages": {"type": "array", "items": {"type": "integer"}}, "out": {"type": "string", "description": "optional path of the new PDF"}}"#,
        required: &["pages"],
        run: watheeq_extract,
    }],
    hints: &[("no open document with id", "Don't guess ids: doc_open the file (its path is in the app state) and use the doc id it returns.")],
    autosave: Some(watheeq_autosave),
    macros: &[],
};

/// Sada: tracks and their clips.
fn sada_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("inspect_session", json!({"detail": "summary"})) else { return String::new() };
    let tracks: Vec<String> = d
        .get("tracks")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .map(|t| format!("{} ({} clips)", t.get("name").and_then(Value::as_str).unwrap_or("?"), count(t, "clips")))
        .collect();
    if tracks.is_empty() { "no tracks".into() } else { format!("tracks: {}", tracks.join(", ")) }
}

static SADA: Spec = Spec {
    catalog: "list_commands",
    run: ("execute", "command"),
    keep: &[
        ("new_session", "", ""),
        ("open_session", "", ""),
        ("save_session", "", ""),
        ("import_audio", "", "Import an audio file (WAV, AIFF, FLAC, MP3, OGG, M4A…) onto a new or existing track; `at` as {\"seconds\": n}."),
        ("bounce_mix", "", ""),
        ("inspect_session", "document_info", "The session: tracks (clips, inserts, sends), busses, markers, selection, transport."),
    ],
    look: Some(("screenshot", "{}")),
    opens: &[("open_session", "path"), ("import_audio", "path")],
    saves: &[("save_session", "path"), ("bounce_mix", "path")],
    hidden: |id| matches!(id, "file.exit" | "file.close"),
    state: Some(sada_state),
    after: &["import_audio", "new_session", "fade_clip", "add_effect"],
    drop: &["peaks", "waveform", "automation"],
    helpers: &[
        Helper {
            name: "add_effect",
            desc: "Put a plug-in on a track (the first track if none is named): room_reverb or plate_reverb (صدى), eq_7band, compressor, de_esser, expander_gate (noise), mod_delay, maximizer, saturator, chorus.",
            props: r#"{"plugin": {"type": "string"}, "track": {"type": "string", "description": "track name"}, "params": {"type": "object"}}"#,
            required: &["plugin"],
            run: sada_add_effect,
        },
        Helper {
            name: "fade_clip",
            desc: "Fade a clip in at its start and/or out at its end (the first clip, or the first on `track`).",
            props: r#"{"fade_in_seconds": {"type": "number"}, "fade_out_seconds": {"type": "number"}, "track": {"type": "string", "description": "track name"}}"#,
            required: &[],
            run: sada_fade,
        },
    ],
    hints: &[],
    autosave: None,
    macros: &[],
};

/// Tayf: the active photo and the selection.
fn tayf_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("doc_inspect", json!({})) else { return String::new() };
    // library.state: {"selection": {"active": 27, "ids": [27]}, "sourceLabel", "visibleCount", …}
    let sel = d.pointer("/library/selection").or_else(|| d.get("selection"));
    let active = sel
        .and_then(|s| s.get("active"))
        .or_else(|| d.pointer("/library/active"))
        .filter(|v| !v.is_null())
        .map(Value::to_string)
        .unwrap_or_else(|| "none".into());
    let selected = sel.and_then(|s| s.get("ids").or(Some(s))).and_then(Value::as_array).map(Vec::len).unwrap_or(0);
    let source = d.pointer("/library/sourceLabel").and_then(Value::as_str).filter(|s| !s.is_empty());
    let visible = d.pointer("/library/visibleCount").and_then(Value::as_u64);
    let mut out = format!("active photo {active}, {selected} selected");
    if let (Some(s), Some(n)) = (source, visible) {
        out += &format!(", showing \"{s}\" ({n} photos)");
    }
    out
}

static TAYF: Spec = Spec {
    catalog: "command_list",
    run: ("command_run", "id"),
    keep: &[
        ("import", "", ""),
        ("query_photos", "", ""),
        ("select_photos", "", ""),
        ("list_controls", "", ""),
        ("get_develop", "", ""),
        ("set_develop", "", "Set develop controls to absolute values (`values` {\"light.exposure\": 0.5, …}). For more or less of something (brighter, warmer, more vivid) use `adjust`."),
        ("apply_preset", "", ""),
        ("crop", "", "Crop with `rect` [x0,y0,x1,y1] as fractions (0..1) of the photo's width and height, or `angle`. For a ratio (square, 16:9) use `crop_to_ratio`."),
        ("export", "", ""),
        ("doc_inspect", "document_info", "The library: current source, filter, sort, selection, active photo, undo history and counts."),
    ],
    look: Some(("render_photo", r#"{"size": 768, "format": "jpeg"}"#)),
    opens: &[("import", "paths")],
    saves: &[("export", "path")],
    hidden: |id| matches!(id, "file.exit" | "library.delete"),
    state: Some(tayf_state),
    after: &["set_develop", "select_photos", "import", "crop", "adjust", "crop_to_ratio", "rate_photo", "flag_photo"],
    drop: &["thumbnail", "histogram", "exif"],
    helpers: &[
        Helper {
            name: "adjust",
            desc: "Change develop controls BY an amount (+ or -): «فتّحها» light.exposure +0.5, «أدفى» wb.temp +800 (kelvin), «أحيا» color.vibrance +20, «تباين» light.contrast +15.",
            props: r#"{"changes": {"type": "object", "description": "control → amount to add, e.g. {\"wb.temp\": 800}"}}"#,
            required: &["changes"],
            run: tayf_adjust,
        },
        Helper {
            name: "crop_to_ratio",
            desc: "Crop the active photo to a ratio, centred and as large as it fits: 1:1 (square), 16:9, 4:5, 9:16.",
            props: r#"{"ratio": {"type": "string"}}"#,
            required: &["ratio"],
            run: tayf_crop_ratio,
        },
        Helper {
            name: "rate_photo",
            desc: "Give the active photo a star rating (0 to 5).",
            props: r#"{"stars": {"type": "integer"}}"#,
            required: &["stars"],
            run: tayf_rate,
        },
        Helper {
            name: "flag_photo",
            desc: "Flag the active photo: pick (مختارة), reject (مرفوضة) or none.",
            props: r#"{"flag": {"type": "string", "description": "pick, reject or none"}}"#,
            required: &["flag"],
            run: tayf_flag,
        },
    ],
    hints: &[],
    autosave: None,
    macros: &[],
};

/// Wamda: the active composition and its layers.
fn wamda_state(mcp: &mut Mcp) -> String {
    let Ok(c) = mcp.call_json("get_comp", json!({})) else { return "no composition open".into() };
    let layers: Vec<String> = c
        .get("layers")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .take(12)
        .map(|l| format!("#{} {}", l.get("id").map(Value::to_string).unwrap_or_default(), l.get("name").and_then(Value::as_str).unwrap_or("")))
        .collect();
    format!("composition \"{}\" with {} layers: {}", c.get("name").and_then(Value::as_str).unwrap_or(""), count(&c, "layers"), layers.join(", "))
}

static WAMDA: Spec = Spec {
    catalog: "command_list",
    run: ("command_run", "id"),
    keep: &[
        ("doc_inspect", "document_info", "The project overview and the active composition."),
        ("get_comp", "", ""),
        ("get_layer", "", ""),
        ("get_property", "", ""),
        ("set_property", "", "Set a layer property (path from get_layer, e.g. transform/opacity 50). Leave out `time` for a fixed value; give `time` only to animate (it adds a keyframe)."),
        ("add_keyframe", "", ""),
        ("add_effect", "", ""),
        ("list_effects", "", ""),
        ("open_project", "", ""),
        ("save_project", "", ""),
        ("undo", "", ""),
    ],
    look: Some(("render_frame", r#"{"max_side": 768}"#)),
    opens: &[("open_project", "path")],
    saves: &[("save_project", "path"), ("renderQueue.add", "output")],
    hidden: |id| matches!(id, "file.exit" | "file.close"),
    state: Some(wamda_state),
    after: &["set_property", "add_keyframe", "add_effect", "undo", "new_solid", "delete_layers"],
    drop: &["thumbnail"],
    helpers: &[
        Helper {
            name: "delete_layers",
            desc: "Delete layers of the active composition (ids or names from get_comp).",
            props: r#"{"layers": {"type": "array", "items": {"type": ["integer", "string"]}}}"#,
            required: &["layers"],
            run: wamda_delete_layers,
        },
        Helper {
            name: "new_solid",
            desc: "Add a solid colour layer, e.g. a black background (it goes to the back unless to_back is false).",
            props: r##"{"color": {"type": "string", "description": "#RRGGBB"}, "name": {"type": "string"}, "to_back": {"type": "boolean"}}"##,
            required: &["color"],
            run: wamda_solid,
        },
    ],
    hints: &[("os error 5", "`path` must be a file such as <folder>\\project.ecproj, not a folder.")],
    autosave: None,
    macros: &[],
};

/// Mukhattat: how many entities and the drawing's extents.
fn mukhattat_state(mcp: &mut Mcp) -> String {
    let Ok(d) = mcp.call_json("inspect_drawing", json!({})) else { return String::new() };
    // inspect_drawing: {"entityCount": 427, "counts": {"Line": 345, …}, "entities": [ … ], "extents", "currentLayer", "layers"}
    let n = d
        .get("entityCount")
        .and_then(Value::as_u64)
        .or_else(|| d.get("entities").and_then(Value::as_u64))
        .or_else(|| d.get("entities").and_then(Value::as_array).map(|a| a.len() as u64))
        .unwrap_or(0);
    let kinds: Vec<String> = d
        .get("counts")
        .and_then(Value::as_object)
        .map(|c| c.iter().filter_map(|(k, v)| Some(format!("{} {k}", v.as_u64()?))).collect())
        .unwrap_or_default();
    let layers: Vec<&str> = d.get("layers").and_then(Value::as_array).into_iter().flatten().filter_map(|l| l.get("name").and_then(Value::as_str)).take(12).collect();
    let mut out = format!(
        "{n} entities{}, extents {}, current layer {}",
        if kinds.is_empty() { String::new() } else { format!(" ({})", kinds.join(", ")) },
        d.get("extents").map(Value::to_string).unwrap_or_else(|| "empty".into()),
        d.get("currentLayer").or_else(|| d.get("clayer")).map(Value::to_string).unwrap_or_default()
    );
    if layers.len() > 1 {
        out += &format!(", layers: {}", layers.join(", "));
    }
    out
}

static MUKHATTAT: Spec = Spec {
    catalog: "list_commands",
    run: ("execute", "command"),
    keep: &[
        ("new_drawing", "", ""),
        ("open", "", ""),
        ("save", "", ""),
        ("inspect_drawing", "document_info", "The drawing: units, extents, layers, styles, blocks, counts, selection, undo history."),
        ("query_entities", "", ""),
    ],
    look: Some(("render", r#"{"fit": true, "width": 900, "height": 640}"#)),
    opens: &[("open", "path")],
    saves: &[("save", "path")],
    hidden: |id| matches!(id, "quit" | "exit" | "close"),
    state: Some(mukhattat_state),
    after: &["move_entities", "offset_wall"],
    drop: &["styles", "blocks"],
    helpers: &[
        Helper {
            name: "offset_wall",
            desc: "Draw a wall's other face: a parallel copy of a closed outline (the first rectangle or polyline, or `handle`) at `distance` mm, inside unless inside is false.",
            props: r#"{"distance": {"type": "number", "description": "wall thickness, mm"}, "inside": {"type": "boolean"}, "handle": {"type": "string"}}"#,
            required: &["distance"],
            run: mukhattat_offset_wall,
        },
        Helper {
            name: "move_entities",
            desc: "Move entities by dx, dy drawing units (mm in a metric drawing): all of them, or those in `handles`.",
            props: r#"{"dx": {"type": "number"}, "dy": {"type": "number"}, "handles": {"type": "array", "items": {"type": "string"}, "description": "from query_entities; none = everything"}}"#,
            required: &[],
            run: mukhattat_move,
        },
    ],
    hints: &[],
    autosave: None,
    macros: &[],
};

pub fn spec(app: &str) -> Option<&'static Spec> {
    match app {
        "monteer" => Some(&MONTEER),
        "reesha" => Some(&REESHA),
        "minbar" => Some(&MINBAR),
        "satr" => Some(&SATR),
        "kashf" => Some(&KASHF),
        "nasaq" => Some(&NASAQ),
        "watheeq" => Some(&WATHEEQ),
        "sada" => Some(&SADA),
        "tayf" => Some(&TAYF),
        "wamda" => Some(&WAMDA),
        "mukhattat" => Some(&MUKHATTAT),
        _ => None,
    }
}

pub fn guide(app: &str) -> &'static str {
    match app {
        "reesha" => include_str!("../../knowledge/reesha.md"),
        "minbar" => include_str!("../../knowledge/minbar.md"),
        "satr" => include_str!("../../knowledge/satr.md"),
        "kashf" => include_str!("../../knowledge/kashf.md"),
        "monteer" => include_str!("../../knowledge/monteer.md"),
        "nasaq" => include_str!("../../knowledge/nasaq.md"),
        "watheeq" => include_str!("../../knowledge/watheeq.md"),
        "sada" => include_str!("../../knowledge/sada.md"),
        "tayf" => include_str!("../../knowledge/tayf.md"),
        "wamda" => include_str!("../../knowledge/wamda.md"),
        "mukhattat" => include_str!("../../knowledge/mukhattat.md"),
        _ => "",
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn typed_bullets_and_numbers_go() {
        for (typed, point) in [("- نقطة", "نقطة"), ("• نقطة", "نقطة"), ("1. نقطة", "نقطة"), ("١) نقطة", "نقطة"), ("2020 كان عاماً", "2020 كان عاماً"), ("نقطة", "نقطة")] {
            assert_eq!(super::without_marker(typed), point);
        }
    }
}
