"""Tayf (photo library + develop) tasks, on the demo library; the active photo is «Alpenglow» (id 21)."""
import glob
import json
import os

CLI_ARGS = ["--demo"]
ACTIVE = 21


def develop(m):
    return json.loads(m.call("get_develop", {})[1])


def photo(m, pid=ACTIVE):
    q = json.loads(m.call("query_photos", {"filter": {}, "limit": 200})[1])
    return next((p for p in q.get("photos") or [] if p.get("id") == pid), {})


def setup(m, ad, work):
    return "app state: the photo library is open; the active photo is «Alpenglow» (id 21, 4000 × 6000); work on it"


def c_brighter(m, a, w):
    l = develop(m).get("light") or {}
    if l.get("exposure", 0) > 0 or l.get("shadows", 0) > 0:
        return 1, f"exposure {l.get('exposure')}, shadows {l.get('shadows')}"
    return 0, f"light {l}"


def c_bw(m, a, w):
    d = develop(m)
    if d.get("treatment") in ("bw", "blackAndWhite", "black_and_white", "monochrome"):
        return 1, f"treatment {d.get('treatment')}"
    if (d.get("color") or {}).get("saturation", 0) <= -100:
        return 0.7, "saturation -100"
    return 0, f"treatment {d.get('treatment')}"


def c_rating(m, a, w):
    r = photo(m).get("rating")
    return (1, "5 stars") if r == 5 else (0, f"rating {r}")


def c_square(m, a, w):
    c = develop(m).get("crop") or {}
    asp = c.get("aspect")
    r = ((c.get("geometry") or {}).get("rect")) or {}
    wpx = (r.get("x1", 1) - r.get("x0", 0)) * 4000
    hpx = (r.get("y1", 1) - r.get("y0", 0)) * 6000
    if abs(wpx - hpx) < 40:
        return 1, f"square crop ({round(wpx)} × {round(hpx)} px)"
    return (0.5 if asp in ("1:1", [1, 1], 1, 1.0) else 0), f"crop aspect {asp}, {round(wpx)} × {round(hpx)} px"


def c_vibrance(m, a, w):
    v = (develop(m).get("color") or {}).get("vibrance", 0)
    return (1, f"vibrance {v}") if v > 0 else (0, f"vibrance {v}")


def c_export(m, a, w):
    found = glob.glob(os.path.join(w, "**", "*.jp*g"), recursive=True)
    return (1, os.path.basename(found[0])) if found else (0, "no JPEG written")


def c_warm(m, a, w):
    wb = develop(m).get("wb") or {}
    return (1, f"temp {wb.get('temp')}") if wb.get("temp", 6500) > 6500 else (0, f"wb {wb}")


def c_pick(m, a, w):
    f = photo(m).get("flag")
    return (1, "picked") if f in ("pick", "picked") else (0, f"flag {f}")


TASKS = [
    ("الصورة غامقة، فتّحها شوي", None, c_brighter),
    ("حوّل الصورة أبيض وأسود", None, c_bw),
    ("قيّم الصورة خمس نجوم", None, c_rating),
    ("قص الصورة مربع", None, c_square),
    ("خلّ ألوانها أحيا شوي", None, c_vibrance),
    ("صدّر الصورة JPEG في المجلد {work}", None, c_export),
    ("خلّ ألوان الصورة أدفى", None, c_warm),
    ("علّم الصورة كمختارة", None, c_pick),
]
