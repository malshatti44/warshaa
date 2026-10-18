"""Nasaq (page layout) tasks. Each starts with a new blank letter-size document (612 × 792 pt)."""
import glob
import json
import os
import struct
import zlib


def doc(m):
    return json.loads(m.call("inspect_document", {})[1])


def items(d):
    return [it for s in d.get("spreads") or [] for it in s.get("items") or []]


def story_text(m, sid):
    ok, t, _ = m.call("get_story", {"story": sid})
    if not ok:
        return ""
    try:
        return json.loads(t).get("text", "")
    except ValueError:
        return t


def texts(m, d):
    """(item, its story's text) for every text frame."""
    out = []
    for it in items(d):
        sid = it.get("story")
        if sid is not None:
            out.append((it, story_text(m, sid)))
    return out


def setup(m, ad, work):
    m.call("new_document", {})
    return "app state: a new blank document is open (1 letter page, 612 × 792 pt, margins 36 pt); work in it"


def png(path, w=64, h=48, rgb=(30, 120, 200)):
    raw = b"".join(b"\x00" + bytes(rgb) * w for _ in range(h))
    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    with open(path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b""))


def with_photo(m, work):
    png(os.path.join(work, "photo.png"))


def with_title(m, work):
    m.call("execute", {"command": "frame.create", "params": {"content": "text", "rect": [36, 36, 576, 100], "text": "مجلة ورشة"}})


def top(it):
    b = it.get("bounds") or [0, 0, 0, 0]
    return b[1]


def c_title(m, a, w):
    found = [(it, t) for it, t in texts(m, doc(m)) if "مجلة ورشة" in t]
    if not found:
        return 0, "no frame with the title"
    return (1, "title at the top") if top(found[0][0]) < 250 else (0.6, f"title at y={top(found[0][0])}")


def c_pages(m, a, w):
    n = doc(m).get("pageCount", 0)
    return (1, "3 pages") if n == 3 else (0, f"{n} pages")


def c_columns(m, a, w):
    pages = [p for s in doc(m).get("spreads") or [] for p in s.get("pages") or []]
    cols = [p.get("columns") for p in pages]
    return (1, "3 columns") if cols and all(c == 3 for c in cols) else (0, f"columns {cols}")


def c_square(m, a, w):
    shapes = [it for it in items(doc(m)) if it.get("story") is None and not it.get("asset") and it.get("kind") != "<text>"]
    for it in shapes:
        x0, y0, x1, y1 = (it.get("bounds") or [0, 0, 0, 0])[:4]
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        if abs(cx - 306) < 90 and abs(cy - 396) < 120:
            return 1, f"shape at the centre {it.get('kind')}"
    return (0.4 if shapes else 0), f"{len(shapes)} shapes, none at the centre"


def c_image(m, a, w):
    d = doc(m)
    kinds = [it.get("kind") for it in items(d)]
    placed = any(it.get("asset") or it.get("kind") == "<image>" for it in items(d))
    return (1, "image placed") if placed else (0, f"items {kinds}")


def c_export(m, a, w):
    found = glob.glob(os.path.join(w, "**", "*.png"), recursive=True) + glob.glob(os.path.join(w, "**", "*.jpg"), recursive=True)
    return (1, os.path.basename(found[0])) if found else (0, "no image file")


def c_paragraph(m, a, w):
    body = [t for it, t in texts(m, doc(m)) if "مجلة ورشة" not in t]
    longest = max((len(t.strip()) for t in body), default=0)
    title_kept = any("مجلة ورشة" in t for _, t in texts(m, doc(m)))
    if longest >= 60 and title_kept:
        return 1, f"paragraph of {longest} chars"
    return (0.5 if longest >= 60 else 0), f"longest body {longest} chars, title kept {title_kept}"


def c_margins(m, a, w):
    pages = [p for s in doc(m).get("spreads") or [] for p in s.get("pages") or []]
    ms = [p.get("margins") or {} for p in pages]
    ok = ms and all(all(abs(v - 56.69) < 2 for v in mm.values()) for mm in ms)
    return (1, "2 cm margins") if ok else (0, f"margins {ms}")


TASKS = [
    ("أضف عنوان «مجلة ورشة» أعلى الصفحة", None, c_title),
    ("أضف صفحتين جديدتين", None, c_pages),
    ("خلّ الصفحة بثلاثة أعمدة", None, c_columns),
    ("ارسم مربع في منتصف الصفحة", None, c_square),
    ("حط الصورة photo.png اللي بمجلد العمل {work} في الصفحة", with_photo, c_image),
    ("صدّر الصفحة كصورة PNG في مجلد العمل {work}", None, c_export),
    ("اكتب فقرة قصيرة عن الكويت تحت العنوان", with_title, c_paragraph),
    ("خلّ هوامش الصفحة ٢ سم من كل الجهات", None, c_margins),
]
