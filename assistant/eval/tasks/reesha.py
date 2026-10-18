"""Reesha (reesha) tasks. Each starts with a new 800×600 pt document."""
import json
import os


def doc(m):
    ok, t, _ = m.call("doc_inspect", {})
    return json.loads(t)


def objects(d):
    out = []

    def walk(items):
        for o in items:
            if o.get("kind") == "Layer":
                walk(o.get("children", []))
            else:
                out.append(o)
                walk(o.get("children", []))
    walk(d.get("layers", []))
    return out


def rgb(h):
    h = (h or "").lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) if len(h) == 6 else None


def is_color(h, name):
    c = rgb(h)
    if not c:
        return False
    r, g, b = c
    return {"red": r > 150 and g < 110 and b < 110, "yellow": r > 180 and g > 160 and b < 120, "blue": b > 140 and r < 110,
            "green": g > 120 and r < 120 and b < 140}[name]


def center(o):
    b = o["bounds"]
    return b["x"] + b["width"] / 2, b["y"] + b["height"] / 2


def setup(m, ad, work):
    m.call("command_run", {"id": "file.new", "params": {"width": 800, "height": 600, "name": "work"}})
    return "app state: a new document is already open in the app (one artboard 800×600 pt, empty); work in it"


def three_shapes(m, work):
    for x, c in ((60, "#ff0000"), (250, "#00aa00"), (620, "#ffcc00")):
        m.call("draw_shape", {"shape": "rectangle", "x": x, "y": 250, "width": 100, "height": 100, "fill": c, "stroke": "none"})


def uneven_shapes(m, work):
    for x in (50, 200, 650):
        m.call("draw_shape", {"shape": "rectangle", "x": x, "y": 250, "width": 100, "height": 100, "fill": "#888888", "stroke": "none"})


def one_rect(m, work):
    m.call("draw_shape", {"shape": "rectangle", "x": 300, "y": 200, "width": 200, "height": 120, "fill": "#3366cc", "stroke": "none"})


def c_red_circle(m, a, w):
    os_ = [o for o in objects(doc(m)) if o.get("kind") in ("Ellipse", "Path") and is_color(o.get("fill"), "red")]
    if not os_:
        return 0, "no red circle"
    cx, cy = center(os_[0])
    return (1, "red circle centred") if abs(cx - 400) < 60 and abs(cy - 300) < 60 else (0.5, f"red circle at {cx:.0f},{cy:.0f}")


def c_title(m, a, w):
    t = [o for o in objects(doc(m)) if o.get("kind") == "Type" and "ورشة" in (o.get("text") or "")]
    if not t:
        return 0, "no title"
    b = t[0]["bounds"]
    return (1, "big title at top") if b["y"] < 200 and b["height"] >= 30 else (0.5, f"title at y={b['y']:.0f} h={b['height']:.0f}")


def c_logo(m, a, w):
    o = objects(doc(m))
    texts = [x for x in o if x.get("kind") == "Type" and "قهوة" in (x.get("text") or "")]
    shapes = [x for x in o if x.get("kind") not in ("Type", "Group")]
    grouped = any(x.get("kind") == "Group" for x in o)
    return round(0.4 * bool(texts) + 0.4 * bool(shapes) + 0.2 * grouped, 2), f"text={bool(texts)} shapes={len(shapes)} grouped={grouped}"


def c_star(m, a, w):
    s = [o for o in objects(doc(m)) if o.get("kind") in ("Star", "Path", "Polygon") and is_color(o.get("fill"), "yellow")]
    return (1, "yellow star") if s else (0, "no yellow star")


def c_png(m, a, w):
    f = os.path.join(w, "logo.png")
    return (1, "exported") if os.path.exists(f) and os.path.getsize(f) > 500 else (0, "no logo.png")


def c_all_blue(m, a, w):
    o = [x for x in objects(doc(m)) if x.get("kind") not in ("Group",)]
    blue = [x for x in o if is_color(x.get("fill"), "blue")]
    return (1, "all blue") if o and len(blue) == len(o) else (round(len(blue) / max(1, len(o)), 2), f"{len(blue)}/{len(o)} blue")


def c_rotated(m, a, w):
    d = doc(m)
    return (1, "rotated") if any("rotat" in h.lower() for h in d.get("history", [])) else (0, f"history {d.get('history')}")


def c_undone(m, a, w):
    # The test rectangle is three history steps (Rectangle, Fill Color, Stroke Color): one undo removes the last.
    h = doc(m).get("history", [])
    return (1, f"undone ({len(h)} left)") if len(h) < 3 else (0, f"history {h}")


def c_spaced(m, a, w):
    o = sorted((x for x in objects(doc(m)) if x.get("kind") not in ("Group",)), key=lambda x: x["bounds"]["x"])
    if len(o) != 3:
        return 0, f"{len(o)} objects"
    g1 = o[1]["bounds"]["x"] - (o[0]["bounds"]["x"] + o[0]["bounds"]["width"])
    g2 = o[2]["bounds"]["x"] - (o[1]["bounds"]["x"] + o[1]["bounds"]["width"])
    return (1, f"gaps {g1:.0f}/{g2:.0f}") if abs(g1 - g2) < 3 else (0, f"gaps {g1:.0f}/{g2:.0f}")


def c_shadow(m, a, w):
    d = doc(m)
    return (1, "shadow") if any("shadow" in h.lower() for h in d.get("history", [])) else (0, f"history {d.get('history')}")


def c_centered(m, a, w):
    o = [x for x in objects(doc(m)) if x.get("kind") not in ("Group",)]
    if len(o) < 3:
        return 0, f"{len(o)} objects"
    xs = [center(x)[0] for x in o]
    return (1, "all centred") if all(abs(x - 400) < 5 for x in xs) else (0.3, f"centres {[round(x) for x in xs]}")


TASKS = [
    ("ارسم دائرة حمراء في وسط الصفحة", None, c_red_circle),
    ("اكتب كلمة ورشة كعنوان كبير في أعلى الصفحة", None, c_title),
    ("صمم شعار بسيط لمقهى اسمه قهوة", None, c_logo),
    ("ارسم نجمة صفراء", None, c_star),
    ("صدّر العمل صورة PNG باسم logo.png في المجلد {work}", one_rect, c_png),
    ("خلي كل الأشكال لونها أزرق", three_shapes, c_all_blue),
    ("دوّر المستطيل 45 درجة", one_rect, c_rotated),
    ("تراجع عن آخر خطوة", one_rect, c_undone),
    ("وزّع الأشكال الثلاثة بمسافات متساوية أفقياً", uneven_shapes, c_spaced),
    ("ضيف ظل للمستطيل", one_rect, c_shadow),
    ("وسّط كل الأشكال أفقياً في الصفحة", three_shapes, c_centered),
]
