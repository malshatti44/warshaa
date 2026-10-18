"""Wamda (motion graphics) tasks, on the demo project: the active composition has the text layer
«WAMDA» (id 362) and the precomp «Lower Third» (id 477)."""
import glob
import json
import os

CLI_ARGS = ["--demo"]


def comp(m):
    return json.loads(m.call("get_comp", {})[1])


def layers(m):
    return comp(m).get("layers") or []


def prop(m, layer, path):
    ok, t, _ = m.call("get_property", {"layer": layer, "path": path})
    return json.loads(t) if ok else {}


BASE = set()


def setup(m, ad, work):
    BASE.clear()
    BASE.update(l.get("id") for l in layers(m))
    names = ", ".join(f"#{l['id']} {l['name']} ({l['type']})" for l in layers(m))
    return f"app state: the composition \"{comp(m).get('name', 'Main')}\" is open (1920 × 1080, 10 s) with layers: {names}; work in it"


def c_text(m, a, w):
    for l in layers(m):
        if l.get("id") in (362, 477):
            continue
        st = prop(m, l["id"], "text/sourceText").get("value")
        if st and "مرحبا" in str(st):
            return 1, "text layer «مرحبا»"
    return 0, f"layers {[l.get('name') for l in layers(m)]}"


def c_opacity(m, a, w):
    v = prop(m, 362, "transform/opacity")
    if v.get("animated"):
        return 0.5, "animated instead of set"
    return (1, "opacity 50") if abs((v.get("value") or 0) - 50) < 0.5 else (0, f"opacity {v.get('value')}")


def effects(m, layer):
    """(name, match id) of a layer's effects (the demo's «WAMDA» starts with Glow)."""
    out = []

    def walk(n):
        if isinstance(n, dict):
            if n.get("path") == "effects":
                out.extend((c.get("name") or "", c.get("match") or "") for c in n.get("children") or [])
            for v in n.values():
                walk(v)
        elif isinstance(n, list):
            for v in n:
                walk(v)

    walk(json.loads(m.call("get_layer", {"layer": layer, "depth": 2})[1]))
    return out


def c_blur(m, a, w):
    fx = effects(m, 362)
    return (1, "blur effect") if any("blur" in (n + i).lower() for n, i in fx) else (0, f"effects {fx}")


def c_fade_in(m, a, w):
    keys = prop(m, 362, "transform/opacity").get("keys") or []
    if len(keys) < 2:
        return 0, f"{len(keys)} keys"
    first, last = keys[0], keys[-1]
    t0, v0 = first.get("time", 0), first.get("value", 100)
    t1, v1 = last.get("time", 0), last.get("value", 0)
    if v0 <= 1 and v1 >= 99 and t1 - t0 <= 1.6:
        return 1, f"0 → 100 over {round(t1 - t0, 2)} s"
    return 0.5, f"keys {[(k.get('time'), k.get('value')) for k in keys]}"


def c_solid(m, a, w):
    new = [l for l in layers(m) if l.get("id") not in BASE and (l.get("type") or "").lower() in ("solid", "shape")]
    return (1, f"{new[0]['type']} layer") if new else (0, f"types {[l.get('type') for l in layers(m)]}")


def c_move(m, a, w):
    keys = prop(m, 362, "transform/position").get("keys") or []
    if len(keys) < 2:
        return 0, f"{len(keys)} position keys"
    x0, x1 = keys[0].get("value", [0])[0], keys[-1].get("value", [0])[0]
    dt = keys[-1].get("time", 0) - keys[0].get("time", 0)
    return (1, f"x {x0} → {x1} in {round(dt, 2)} s") if x1 > x0 and 1.5 <= dt <= 2.5 else (0.5, f"x {x0} → {x1} in {round(dt, 2)} s")


def c_save(m, a, w):
    found = [p for p in glob.glob(os.path.join(w, "**", "*"), recursive=True) if os.path.isfile(p)]
    return (1, os.path.basename(found[0])) if found else (0, "no project file")


def c_delete(m, a, w):
    ids = [l.get("id") for l in layers(m)]
    if 477 in ids:
        return 0, "Lower Third still there"
    return (1, "Lower Third deleted") if 362 in ids else (0.3, "deleted more than asked")


TASKS = [
    ("أضف نص «مرحبا» في التكوين", None, c_text),
    ("خلّ طبقة WAMDA شفافة ٥٠٪", None, c_opacity),
    ("أضف ضبابية على طبقة WAMDA", None, c_blur),
    ("خلّ طبقة WAMDA تظهر تدريجياً في أول ثانية", None, c_fade_in),
    ("أضف خلفية سوداء", None, c_solid),
    ("حرّك طبقة WAMDA من اليسار لليمين خلال ثانيتين", None, c_move),
    ("احفظ المشروع في المجلد {work}", None, c_save),
    ("احذف طبقة Lower Third", None, c_delete),
]
