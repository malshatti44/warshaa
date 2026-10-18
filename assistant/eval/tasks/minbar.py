"""Minbar (minbar) tasks. Each starts with a new presentation (one title slide)."""
import json
import os


def doc(m):
    return json.loads(m.call("inspect_document", {})[1])


def slide(m, i):
    return json.loads(m.call("inspect_slide", {"index": i})[1])


def setup(m, ad, work):
    m.call("new_presentation", {})
    return "app state: a new presentation is already open (1 slide: an empty title slide, current slide 0); work in it"


def three_slides(m, work):
    m.call("run_command", {"command": "text.set", "params": {"id": next(s["id"] for s in slide(m, 0)["shapes"] if s.get("placeholder") in ("ctrTitle", "title")), "text": "الفصل الأول"}})
    m.call("add_slide", {"layout": "titleAndContent", "title": "المقدمة", "body": "نقطة\nنقطة"})
    m.call("add_slide", {"layout": "titleAndContent", "title": "الخاتمة", "body": "نقطة"})


def content_slide(m, work):
    m.call("add_slide", {"layout": "titleAndContent", "title": "المحتوى", "body": "أولاً\nثانياً\nثالثاً"})


def body_lines(s):
    return [l for sh in s["shapes"] if sh.get("placeholder") in ("obj", "body") for l in (sh.get("text") or "").split("\n") if l.strip()]


def c_topic(m, a, w):
    d = doc(m)
    n = len(d["slides"])
    full = sum(1 for s in d["slides"] if len(body_lines(slide(m, s["index"]))) >= 2)
    titled = sum(1 for s in d["slides"] if (s.get("title") or "").strip())
    sc = 0.3 * (n >= 4) + 0.4 * min(1, full / 3) + 0.3 * (titled >= n - 0)
    return round(sc, 2), f"{n} slides, {full} with bullets, {titled} titled"


def c_goals(m, a, w):
    for s in doc(m)["slides"]:
        if "أهداف" in (s.get("title") or ""):
            n = len(body_lines(slide(m, s["index"])))
            return (1, "goals slide with 3 points") if n == 3 else (0.5, f"{n} points")
    return 0, "no goals slide"


def c_theme(m, a, w):
    t = doc(m).get("theme")
    return (1, "Ember") if t == "Ember" else (0, f"theme {t}")


def c_fade_all(m, a, w):
    tr = [s.get("transition") for s in doc(m)["slides"]]
    return (1, "fade on all") if all(t == "fade" for t in tr) else (round(sum(t == "fade" for t in tr) / len(tr), 2), f"{tr}")


def c_notes(m, a, w):
    n = doc(m)["slides"][0].get("notes") or ""
    return (1, "notes") if "رحب" in n or "رحّب" in n else (0, f"notes {n[:40]!r}")


def c_table(m, a, w):
    for s in doc(m)["slides"]:
        for sh in slide(m, s["index"])["shapes"]:
            if sh.get("kind") == "table":
                t = sh.get("table") or {}
                rows, cols = t.get("rows"), t.get("cols")
                if isinstance(rows, list):
                    rows = len(rows)
                return (1, f"table {rows}×{cols}") if (rows, cols) == (4, 3) else (0.6, f"table {rows}×{cols}")
    return 0, "no table"


def c_chart(m, a, w):
    for s in doc(m)["slides"]:
        for sh in slide(m, s["index"])["shapes"]:
            if sh.get("kind") == "chart":
                return 1, "chart"
    return 0, "no chart"


def c_deleted(m, a, w):
    titles = [s.get("title") for s in doc(m)["slides"]]
    return (1, "second slide deleted") if titles == ["الفصل الأول", "الخاتمة"] else (0, f"titles {titles}")


def c_pdf(m, a, w):
    f = os.path.join(w, "lesson.pdf")
    return (1, "pdf") if os.path.exists(f) and os.path.getsize(f) > 1000 else (0, "no lesson.pdf")


def c_title(m, a, w):
    t = doc(m)["slides"][0].get("title") or ""
    return (1, "title set") if "مرحب" in t else (0, f"title {t!r}")


def c_anim(m, a, w):
    s = doc(m)["slides"]
    return (1, "animated") if any(x.get("animations", 0) > 0 for x in s) else (0, "no animation")


TASKS = [
    ("سوّ عرض تقديمي عن أهمية الماء من 5 شرائح", None, c_topic),
    ("ضيف شريحة عنوانها أهداف الدرس وفيها ثلاث نقاط عن الكسور", None, c_goals),
    ("غيّر ثيم العرض إلى Ember", None, c_theme),
    ("ضيف انتقال تلاشي لكل الشرائح", three_slides, c_fade_all),
    ("اكتب في ملاحظات المتحدث للشريحة الأولى: رحب بالطلاب واسألهم عن الدرس السابق", None, c_notes),
    ("ضيف جدول من 3 أعمدة و4 صفوف في الشريحة الحالية", content_slide, c_table),
    ("ضيف رسم بياني أعمدة لدرجات الطلاب: أحمد 90، سارة 85، خالد 78", None, c_chart),
    ("احذف الشريحة الثانية", three_slides, c_deleted),
    ("صدّر العرض PDF باسم lesson.pdf في المجلد {work}", three_slides, c_pdf),
    ("خلي عنوان الشريحة الأولى: مرحباً بكم", None, c_title),
    ("ضيف حركة ظهور للنقاط في الشريحة الحالية", content_slide, c_anim),
]
