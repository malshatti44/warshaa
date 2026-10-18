"""Mukhattat (CAD) tasks. Each starts with a new metric drawing (millimetres)."""
import glob
import json
import os


def drawing(m):
    return json.loads(m.call("inspect_drawing", {})[1])


def entities(m):
    return json.loads(m.call("query_entities", {})[1]).get("entities") or []


def setup(m, ad, work):
    m.call("new_drawing", {})
    return "app state: a new empty drawing is open (millimetres, layer 0); work in it"


def with_room(m, work):
    m.call("execute", {"command": "rectang", "params": {"p1": [0, 0], "p2": [5000, 4000]}})


def vertices(e):
    g = e.get("geometry") or {}
    return [(v["p"]["x"], v["p"]["y"]) for v in g.get("vertices") or []]


def size(e):
    vs = vertices(e)
    if not vs:
        return None
    xs, ys = [v[0] for v in vs], [v[1] for v in vs]
    return round(max(xs) - min(xs)), round(max(ys) - min(ys))


def c_rect(m, a, w):
    sizes = [size(e) for e in entities(m) if e.get("type") == "Polyline"]
    if any(s and sorted(s) == [3000, 4000] for s in sizes):
        return 1, "4 × 3 m rectangle"
    return (0.3 if sizes else 0), f"polylines {sizes}"


def c_circle(m, a, w):
    cs = [(e.get("geometry") or {}) for e in entities(m) if e.get("type") == "Circle"]
    if any(abs(c.get("radius", 0) - 500) < 1 for c in cs):
        return 1, "circle r=500 (diameter 1 m)"
    return (0.3 if cs else 0), f"circles {[c.get('radius') for c in cs]}"


def c_layer(m, a, w):
    d = drawing(m)
    names = [l["name"] for l in d.get("layers") or []]
    hit = [l for l in d.get("layers") or [] if l["name"].lower() in ("walls", "جدران", "الجدران")]
    if not hit:
        return 0, f"layers {names}"
    return (1, f"layer {hit[0]['name']} {hit[0]['color']}") if hit[0].get("color", "").lower() == "red" else (0.6, f"colour {hit[0].get('color')}")


def c_offset(m, a, w):
    sizes = sorted([size(e) for e in entities(m) if e.get("type") == "Polyline" and size(e)], key=lambda s: s[0])
    if any(sorted(s) == [3600, 4600] for s in sizes) or any(sorted(s) == [4400, 5400] for s in sizes):
        return 1, f"offset wall: {sizes}"
    return (0.3 if len(sizes) > 1 else 0), f"polylines {sizes}"


def c_dim(m, a, w):
    dims = [e for e in entities(m) if "dim" in (e.get("type") or "").lower()]
    return (1, f"{len(dims)} dimension(s)") if dims else (0, f"types {[e.get('type') for e in entities(m)]}")


def c_text(m, a, w):
    t = [e for e in entities(m) if (e.get("type") or "").lower() in ("text", "mtext")]
    found = [e for e in t if "غرفة" in json.dumps(e, ensure_ascii=False)]
    if found:
        return 1, "room label"
    return (0.4 if t else 0), f"{len(t)} text entities"


def c_save(m, a, w):
    found = glob.glob(os.path.join(w, "**", "*.dxf"), recursive=True)
    return (1, os.path.basename(found[0])) if found else (0, "no .dxf written")


def c_move(m, a, w):
    sizes = [(vertices(e), e) for e in entities(m) if e.get("type") == "Polyline"]
    for vs, _ in sizes:
        xs = [v[0] for v in vs]
        if xs and abs(min(xs) - 1000) < 1:
            return 1, "moved 1 m right"
    return 0, f"x ranges {[(min(v[0] for v in vs), max(v[0] for v in vs)) for vs, _ in sizes if vs]}"


TASKS = [
    ("ارسم مستطيل ٤ متر في ٣ متر", None, c_rect),
    ("ارسم دائرة قطرها متر", None, c_circle),
    ("سوّ طبقة للجدران لونها أحمر", None, c_layer),
    ("هذا مخطط غرفة، سوّ الجدار الداخلي بسماكة ٢٠ سم", with_room, c_offset),
    ("أضف بُعد (قياس) لطول الغرفة", with_room, c_dim),
    ("اكتب اسم «غرفة النوم» في وسط الغرفة", with_room, c_text),
    ("احفظ المخطط كملف DXF في المجلد {work}", with_room, c_save),
    ("حرّك الغرفة متر لليمين", with_room, c_move),
]
