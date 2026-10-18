"""Specs of Nasaq, Watheeq, Sada, Tayf, Wamda and Mukhattat (as adapters/specs.rs)."""
import json

UP = r"E:\warsha-src\upstream"


def _j(m, tool, args=None):
    ok, t, _ = m.call(tool, args or {})
    if not ok:
        return None
    try:
        return json.loads(t)
    except ValueError:
        return None


def nasaq_state(m):
    d = _j(m, "inspect_document")
    if not d:
        return ""
    items = sum(len(s.get("items") or []) for s in d.get("spreads") or [])
    over = [str(s.get("id")) for s in d.get("stories") or [] if s.get("overset") not in (None, False, 0)]
    pages = d.get("pageCount", len(d.get("pages") or []))
    out = f"{pages} pages, {items} items" + (f", OVERSET (text doesn't fit) in stories {', '.join(over)}" if over else "")
    stories = [f"{s['id']} \"{' '.join(s['preview'].split())[:40]}\"" for s in d.get("stories") or [] if s.get("preview", "").strip()][:12]
    return out + (f"; stories (id \"start\"): {', '.join(stories)}" if stories else "")


def sada_state(m):
    d = _j(m, "inspect_session", {"detail": "summary"})
    if not d:
        return ""
    t = [f"{x.get('name')} ({len(x.get('clips') or [])} clips)" for x in d.get("tracks") or []]
    return "tracks: " + ", ".join(t) if t else "no tracks"


def tayf_state(m):
    d = _j(m, "doc_inspect")
    if not d:
        return ""
    lib = d.get("library") or d
    sel = lib.get("selection") or {}
    if isinstance(sel, list):
        sel = {"ids": sel}
    active = sel.get("active", lib.get("active"))
    out = f"active photo {active if active is not None else 'none'}, {len(sel.get('ids') or [])} selected"
    if lib.get("sourceLabel") and lib.get("visibleCount") is not None:
        out += f", showing \"{lib['sourceLabel']}\" ({lib['visibleCount']} photos)"
    return out


def watheeq_state(m):
    d = _j(m, "doc_list")
    if d is None:
        return ""
    docs = [f"doc {x.get('doc')} \"{x.get('name')}\" ({x.get('pages')} pages"
            + (", changes not saved yet: doc_save to a new file" if x.get("dirty") else "") + ")" for x in d.get("documents") or []]
    return "open: " + ", ".join(docs) if docs else "no document open yet: doc_open the file first"


def wamda_state(m):
    c = _j(m, "get_comp")
    if not c:
        return "no composition open"
    layers = [f"#{l.get('id')} {l.get('name')}" for l in (c.get("layers") or [])[:12]]
    return f"composition \"{c.get('name')}\" with {len(c.get('layers') or [])} layers: " + ", ".join(layers)


def mukhattat_state(m):
    d = _j(m, "inspect_drawing")
    if not d:
        return ""
    n = d.get("entityCount")
    if n is None:
        e = d.get("entities")
        n = e if isinstance(e, int) else len(e or [])
    kinds = ", ".join(f"{v} {k}" for k, v in (d.get("counts") or {}).items() if isinstance(v, int))
    layers = [l.get("name") for l in d.get("layers") or [] if isinstance(l, dict)][:12]
    out = f"{n} entities{f' ({kinds})' if kinds else ''}, extents {d.get('extents')}, current layer {d.get('currentLayer') or d.get('clayer')}"
    return out + (f", layers: {', '.join(layers)}" if len(layers) > 1 else "")


def _jd(text):
    try:
        return json.loads(text)
    except (TypeError, ValueError):
        return None


def tayf_rate(ad, args):
    n = args.get("stars")
    return ad.command("photo.rate", {"rating": n}) if isinstance(n, int) and 0 <= n <= 5 else (False, "stars: 0 to 5")


def tayf_flag(ad, args):
    f = args.get("flag")
    return ad.command("photo.flag", {"flag": f}) if f in ("pick", "reject", "none") else (False, "flag: pick, reject or none")


def tayf_adjust(ad, args):
    changes = args.get("changes")
    if not isinstance(changes, dict) or not changes:
        return False, 'changes: {"light.exposure": 0.5, "wb.temp": 800, …}'
    ok, t, _ = ad.mcp.call("get_develop", {})
    cur = _jd(t) if ok else None
    if cur is None:
        return False, t
    values = {}
    for control, delta in changes.items():
        if not isinstance(delta, (int, float)):
            return False, f"{control}: a number to add (negative to lower)"
        v = cur
        for k in control.split("."):
            v = v.get(k) if isinstance(v, dict) else None
        if not isinstance(v, (int, float)):
            return False, f"no control `{control}` (list_controls has them)"
        values[control] = v + delta
    ok, t, _ = ad.mcp.call("set_develop", {"values": values})
    return ok, t


def tayf_crop_ratio(ad, args):
    parts = [p for p in __import__("re").split(r"[:/x×]", str(args.get("ratio") or "")) if p.strip()]
    try:
        w_, h_ = float(parts[0]), float(parts[1])
        r = w_ / h_
    except (IndexError, ValueError, ZeroDivisionError):
        return False, 'ratio such as "1:1", "16:9" or "4:5"'
    ok, t, _ = ad.mcp.call("doc_inspect", {})
    lib = (_jd(t) or {}).get("library") or {}
    pid = (lib.get("selection") or {}).get("active")
    ok, t, _ = ad.mcp.call("query_photos", {"filter": {}, "limit": 1000})
    p = next((x for x in (_jd(t) or {}).get("photos") or [] if x.get("id") == pid), None)
    if not p:
        return False, "no active photo"
    w, h = float(p.get("width") or 1), float(p.get("height") or 1)
    fw, fh = (r * h / w, 1.0) if w / h > r else (1.0, w / (r * h))
    ok, t, _ = ad.mcp.call("crop", {"rect": [(1 - fw) / 2, (1 - fh) / 2, (1 + fw) / 2, (1 + fh) / 2]})
    return ok, t


def nasaq_margins_columns(ad, args):
    pt_per_cm = 72 / 2.54
    p = {}
    if isinstance(args.get("columns"), int):
        p["columns"] = args["columns"]
    if isinstance(args.get("margins_cm"), (int, float)):
        p["margins"] = round(args["margins_cm"] * pt_per_cm, 2)
    if isinstance(args.get("gutter_mm"), (int, float)):
        p["gutter"] = round(args["gutter_mm"] * pt_per_cm / 10, 2)
    if not p:
        return False, "give columns, margins_cm and/or gutter_mm"
    return ad.command("layout.marginsAndColumns", p)


def sada_fade(ad, args):
    ok, t, _ = ad.mcp.call("inspect_session", {})
    s = _jd(t) if ok else None
    if not s:
        return False, "no session"
    sr = float(s.get("sample_rate") or 48000)
    want = args.get("track") or ""
    found = None
    for tr in s.get("tracks") or []:
        if want and tr.get("name") != want:
            continue
        if tr.get("clips"):
            found = (tr["id"], tr["clips"][0])
            break
    if not found:
        return False, "no clip to fade"
    track, clip = found
    start, end = float(clip.get("start") or 0), float(clip.get("end") or 0)
    longest = (end - start) / 3
    done = []
    for key, at_start in (("fade_in_seconds", True), ("fade_out_seconds", False)):
        secs = args.get(key)
        if not isinstance(secs, (int, float)) or secs <= 0:
            continue
        n = round(min(secs * sr, longest))
        a, b = (start, start + n) if at_start else (end - n, end)
        ok, t = ad.command("edit.fades_create", {"tracks": [track], "start": round(a), "end": round(b)})
        if not ok:
            return ok, t
        done.append("fade in" if at_start else "fade out")
    if not done:
        return False, "give fade_in_seconds and/or fade_out_seconds"
    return True, f"{' and '.join(done)} on clip {clip.get('name', '')}"


def mukhattat_move(ad, args):
    dx, dy = float(args.get("dx") or 0), float(args.get("dy") or 0)
    handles = args.get("handles") or []
    if not handles:
        ok, t, _ = ad.mcp.call("query_entities", {})
        handles = [e.get("handle") for e in (_jd(t) or {}).get("entities") or [] if e.get("handle")]
    if not handles:
        return False, "nothing to move"
    return ad.command("move", {"handles": handles, "delta": [dx, dy]})


def wamda_solid(ad, args):
    color, name = args.get("color") or "#000000", args.get("name") or "Background"
    ok, t = ad.command("layer.newSolid", {"name": name, "color": color})
    layer = (_jd(t) or {}).get("layer") if ok else None
    if layer is None:
        return False, t if not ok else "the solid was not made"
    if args.get("to_back", True):
        ok, t = ad.command("layer.arrange", {"layers": [layer], "to": "back"})
        if not ok:
            return ok, t
    return True, f'solid layer {layer} "{name}" {color}'


def wamda_delete_layers(ad, args):
    layers = args.get("layers") or []
    return ad.command("edit.clear", {"layers": layers}) if layers else (False, "layers: ids or names from get_comp")


def mukhattat_offset_wall(ad, args):
    d = args.get("distance")
    if not isinstance(d, (int, float)) or d <= 0:
        return False, "distance: the wall thickness in drawing units (mm)"
    ok, t, _ = ad.mcp.call("query_entities", {})
    ents = (_jd(t) or {}).get("entities") or []
    want = args.get("handle")
    if want:
        e = next((x for x in ents if x.get("handle") == want), None)
    else:
        e = next((x for x in ents if x.get("type") == "Polyline" and (x.get("geometry") or {}).get("closed")), None)
    if not e:
        return False, "no closed outline (a polyline or rectangle) to offset"
    pts = [(v["p"]["x"], v["p"]["y"]) for v in (e.get("geometry") or {}).get("vertices") or []]
    if not pts:
        return False, "the outline has no vertices"
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    inside = args.get("inside", True)
    side = [(min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2] if inside else [max(xs) + d * 3, (min(ys) + max(ys)) / 2]
    return ad.command("offset", {"handle": e.get("handle"), "distance": d, "side": side})


def sada_add_effect(ad, args):
    plugin = args.get("plugin")
    if not plugin:
        return False, "plugin: room_reverb, plate_reverb, eq_7band, compressor, de_esser, expander_gate, mod_delay, maximizer, saturator or chorus"
    ok, t, _ = ad.mcp.call("inspect_session", {})
    s = _jd(t) or {}
    want = args.get("track") or ""
    tr = next((x for x in s.get("tracks") or [] if not want or x.get("name") == want), None)
    if not tr:
        return False, "no such track"
    p = {"track": tr.get("name"), "slot": len(tr.get("inserts") or []), "plugin": plugin}
    if isinstance(args.get("params"), dict):
        p["params"] = args["params"]
    return ad.command("mix.insert", p)


def watheeq_extract(ad, args):
    pages = [n for n in args.get("pages") or [] if isinstance(n, int) and n >= 1]
    if not pages:
        return False, "pages: page numbers counting from 1, e.g. [2, 3]"
    ok, t, _ = ad.mcp.call("doc_list", {})
    docs = (_jd(t) or {}).get("documents") or []
    if not docs:
        return False, "no document open yet: doc_open the file first"
    d = docs[-1]
    out = args.get("out")
    if not out:
        src = d.get("path") or ""
        stem = src[:-4] if src.lower().endswith(".pdf") else src
        out = f"{stem}-pages-{'-'.join(map(str, pages))}.pdf"
    ok, t = ad.command("page.extract", {"doc": d.get("doc"), "pages": pages, "out": out})
    return (True, f"pages {pages} written to {out}") if ok else (ok, t)


def watheeq_autosave(m):
    d = _j(m, "doc_list") or {}
    written = None
    for x in d.get("documents") or []:
        if not x.get("dirty") or not x.get("path"):
            continue
        path = x["path"]
        stem = path[:-4] if path.lower().endswith(".pdf") else path
        if stem.endswith("-edited"):
            args, target = {"doc": x["doc"]}, path
        else:
            target = f"{stem}-edited.pdf"
            args = {"doc": x["doc"], "path": target}
        ok, _, _ = m.call("doc_save", args)
        if ok:
            written = target
    return written


MORE = {
    "nasaq": dict(
        app_ar="نسق", ar="",
        catalog="list_commands", run=("execute", "command"),
        keep=[("new_document",), ("open_document",), ("save_document",),
              ("inspect_document", "document_info", "The document: pages (bounds, margins, columns), spreads with items (id, kind, bounds, story), stories (id, overset), styles, swatches, selection."),
              ("get_story",), ("set_story_text",), ("place_image",), ("export_png",)],
        look=("render_page", {}), opens=[("open_document", "path"), ("place_image", "path")],
        saves=[("save_document", "path"), ("export_png", "path"), ("file.exportPdf", "path")],
        hidden=lambda i: i in ("file.exit", "file.close"), state=nasaq_state,
        after=("set_story_text", "place_image", "new_document", "margins_and_columns"), drop=("preview", "swatches", "layers"), macros=[],
        helpers=[dict(name="margins_and_columns", desc="Set the margins (in centimetres) and/or the number of columns of every page.",
                      props={"columns": {"type": "integer"}, "margins_cm": {"type": "number", "description": "the same on all sides"},
                             "gutter_mm": {"type": "number", "description": "space between columns"}}, required=[], run=nasaq_margins_columns)]),
    "watheeq": dict(
        app_ar="وثيق", ar=UP + r"\watheeq\crates\ui-egui\src\i18n\ar.tsv",
        catalog="command_list", run=("command_run", "id"),
        keep=[("doc_open",), ("doc_info", "document_info", "A document's metadata, page sizes, bookmarks, annotations, form fields, links, fonts and security."),
              ("text_extract",), ("text_find",), ("doc_combine",), ("doc_split",), ("doc_save",), ("edit_undo",)],
        look=("render_preview", {"max_side": 768}),
        opens=[("doc_open", "path"), ("doc_combine", "paths"), ("page.insert", "path")],
        saves=[("doc_save", "path"), ("doc_combine", "out"), ("page.extract", "out"), ("optimize.reduce", "path"), ("export.docx", "path")],
        hidden=lambda i: False, state=watheeq_state, after=("doc_open", "doc_save", "doc_combine", "doc_split", "edit_undo", "extract_pages"),
        drop=("fonts", "repair"), macros=[],
        helpers=[dict(name="extract_pages", desc="Copy pages of the open document into a new PDF next to it (pages counted from 1). Writes the file itself; no doc_save needed.",
                      props={"pages": {"type": "array", "items": {"type": "integer"}}, "out": {"type": "string", "description": "optional path of the new PDF"}},
                      required=["pages"], run=watheeq_extract)],
        hints=[("no open document with id", "Don't guess ids: doc_open the file (its path is in the app state) and use the doc id it returns.")],
        autosave=watheeq_autosave),
    "sada": dict(
        app_ar="صدى", ar=UP + r"\sada\crates\ui-egui\src\ar.tsv",
        catalog="list_commands", run=("execute", "command"),
        keep=[("new_session",), ("open_session",), ("save_session",),
              ("import_audio", "", "Import an audio file (WAV, AIFF, FLAC, MP3, OGG, M4A…) onto a new or existing track; `at` as {\"seconds\": n}."),
              ("bounce_mix",), ("inspect_session", "document_info", "The session: tracks (clips, inserts, sends), busses, markers, selection, transport.")],
        look=None, opens=[("open_session", "path"), ("import_audio", "path")], saves=[("save_session", "path"), ("bounce_mix", "path")],
        hidden=lambda i: i in ("file.exit", "file.close"), state=sada_state,
        after=("import_audio", "new_session", "fade_clip", "add_effect"), drop=("peaks", "waveform", "automation"), macros=[],
        helpers=[dict(name="add_effect", desc="Put a plug-in on a track (the first track if none is named): room_reverb or plate_reverb (صدى), eq_7band, compressor, de_esser, expander_gate (noise), mod_delay, maximizer, saturator, chorus.",
                      props={"plugin": {"type": "string"}, "track": {"type": "string", "description": "track name"}, "params": {"type": "object"}},
                      required=["plugin"], run=sada_add_effect),
                 dict(name="fade_clip", desc="Fade a clip in at its start and/or out at its end (the first clip, or the first on `track`).",
                      props={"fade_in_seconds": {"type": "number"}, "fade_out_seconds": {"type": "number"}, "track": {"type": "string", "description": "track name"}},
                      required=[], run=sada_fade)],
        values=("eq_7band", "compressor", "de_esser", "expander_gate", "room_reverb", "plate_reverb", "mod_delay", "maximizer")),
    "tayf": dict(
        app_ar="طيف", ar="",
        catalog="command_list", run=("command_run", "id"),
        keep=[("import",), ("query_photos",), ("select_photos",), ("list_controls",), ("get_develop",), ("set_develop", "", "Set develop controls to absolute values (`values` {\"light.exposure\": 0.5, …}). For more or less of something (brighter, warmer, more vivid) use `adjust`."),
              ("apply_preset",), ("crop", "", "Crop with `rect` [x0,y0,x1,y1] as fractions (0..1) of the photo's width and height, or `angle`. For a ratio (square, 16:9) use `crop_to_ratio`."), ("export",), ("doc_inspect", "document_info", "The library: current source, filter, sort, selection, active photo, undo history and counts.")],
        look=("render_photo", {"size": 768, "format": "jpeg"}), opens=[("import", "paths")], saves=[("export", "path")],
        hidden=lambda i: i in ("file.exit", "library.delete"), state=tayf_state,
        after=("set_develop", "select_photos", "import", "crop", "adjust", "crop_to_ratio", "rate_photo", "flag_photo"),
        drop=("thumbnail", "histogram", "exif"), macros=[],
        helpers=[
            dict(name="adjust", desc="Change develop controls BY an amount (+ or -): «فتّحها» light.exposure +0.5, «أدفى» wb.temp +800 (kelvin), «أحيا» color.vibrance +20, «تباين» light.contrast +15.",
                 props={"changes": {"type": "object", "description": 'control → amount to add, e.g. {"wb.temp": 800}'}}, required=["changes"], run=tayf_adjust),
            dict(name="crop_to_ratio", desc="Crop the active photo to a ratio, centred and as large as it fits: 1:1 (square), 16:9, 4:5, 9:16.",
                 props={"ratio": {"type": "string"}}, required=["ratio"], run=tayf_crop_ratio),
            dict(name="rate_photo", desc="Give the active photo a star rating (0 to 5).", props={"stars": {"type": "integer"}}, required=["stars"], run=tayf_rate),
            dict(name="flag_photo", desc="Flag the active photo: pick (مختارة), reject (مرفوضة) or none.",
                 props={"flag": {"type": "string", "description": "pick, reject or none"}}, required=["flag"], run=tayf_flag),
        ],
        values=tuple(f"{a}.{b}" for a, b in [("light", "exposure"), ("light", "contrast"), ("light", "highlights"), ("light", "shadows"),
                                              ("light", "whites"), ("light", "blacks"), ("wb", "temp"), ("wb", "tint"), ("color", "vibrance"),
                                              ("color", "saturation"), ("effects", "clarity"), ("effects", "texture"), ("effects", "dehaze"),
                                              ("vignette", "amount"), ("grading", "highlights")])),
    "wamda": dict(
        app_ar="ومضة", ar="",
        catalog="command_list", run=("command_run", "id"),
        keep=[("doc_inspect", "document_info", "The project overview and the active composition."), ("get_comp",), ("get_layer",),
              ("get_property",), ("set_property", "", "Set a layer property (path from get_layer, e.g. transform/opacity 50). Leave out `time` for a fixed value; give `time` only to animate (it adds a keyframe)."), ("add_keyframe",), ("add_effect",), ("list_effects",), ("open_project",),
              ("save_project",), ("undo",)],
        look=("render_frame", {"max_side": 768}), opens=[("open_project", "path")], saves=[("save_project", "path"), ("renderQueue.add", "output")],
        hidden=lambda i: i in ("file.exit", "file.close"), state=wamda_state,
        after=("set_property", "add_keyframe", "add_effect", "undo", "new_solid", "delete_layers"), drop=("thumbnail",), macros=[],
        helpers=[dict(name="delete_layers", desc="Delete layers of the active composition (ids or names from get_comp).",
                      props={"layers": {"type": "array", "items": {"type": ["integer", "string"]}}}, required=["layers"], run=wamda_delete_layers),
                 dict(name="new_solid", desc="Add a solid colour layer, e.g. a black background (it goes to the back unless to_back is false).",
                      props={"color": {"type": "string", "description": "#RRGGBB"}, "name": {"type": "string"}, "to_back": {"type": "boolean"}},
                      required=["color"], run=wamda_solid)],
        hints=[("os error 5", "`path` must be a file such as <folder>\\project.ecproj, not a folder.")]),
    "mukhattat": dict(
        app_ar="مخطط", ar=UP + r"\mukhattat\crates\ui-egui\src\i18n\ar.tsv",
        catalog="list_commands", run=("execute", "command"),
        keep=[("new_drawing",), ("open",), ("save",),
              ("inspect_drawing", "document_info", "The drawing: units, extents, layers, styles, blocks, counts, selection, undo history."),
              ("query_entities",)],
        look=("render", {"fit": True, "width": 900, "height": 640}), opens=[("open", "path")], saves=[("save", "path")],
        hidden=lambda i: i in ("quit", "exit", "close"), state=mukhattat_state,
        after=("move_entities", "offset_wall"), drop=("styles", "blocks"), macros=[],
        helpers=[dict(name="offset_wall", desc="Draw a wall's other face: a parallel copy of a closed outline (the first rectangle or polyline, or `handle`) at `distance` mm, inside unless inside is false.",
                      props={"distance": {"type": "number", "description": "wall thickness, mm"}, "inside": {"type": "boolean"}, "handle": {"type": "string"}},
                      required=["distance"], run=mukhattat_offset_wall),
                 dict(name="move_entities", desc="Move entities by dx, dy drawing units (mm in a metric drawing): all of them, or those in `handles`.",
                      props={"dx": {"type": "number"}, "dy": {"type": "number"},
                             "handles": {"type": "array", "items": {"type": "string"}, "description": "from query_entities; none = everything"}},
                      required=[], run=mukhattat_move)]),
}
