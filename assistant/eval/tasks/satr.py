"""Satr (word processor) tasks. Each starts with a new blank document."""
import json
import os


def doc(m):
    return json.loads(m.call("inspect_document", {})[1])


def blocks(m):
    return [b for b in doc(m).get("blocks", []) if b.get("type") == "paragraph"]


def setup(m, ad, work):
    m.call("new_document", {"template": "blank"})
    return "app state: a new blank document is already open in the app (one empty paragraph); work in it"


def report_text(m, work):
    m.call("type_text", {"text": "تقرير الرحلة\nذهبنا إلى المتحف الوطني يوم الخميس.\nتعلمنا الكثير عن تاريخ الكويت.", "paragraphs": True})


def c_letter(m, a, w):
    t = "\n".join(b.get("text", "") for b in blocks(m))
    has = [k for k in ("المحترم", "تحية", "الموضوع", "وتفضلوا", "الاحترام") if k in t]
    n = len([b for b in blocks(m) if b.get("text", "").strip()])
    return round(min(1, 0.2 * len(has) + 0.4 * (n >= 5)), 2), f"{n} paragraphs, parts {has}"


def c_heading(m, a, w):
    b = blocks(m)
    first = b[0] if b else {}
    return (1, "title is Heading 1") if first.get("style") in ("Heading1", "Title") and "تقرير" in first.get("text", "") else (0, f"first {first.get('style')} {first.get('text', '')[:20]!r}")


def c_bold(m, a, w):
    for b in doc(m).get("blocks", []):
        for r in b.get("runs", []) or []:
            if "المتحف الوطني" in (r.get("text") or "") and (r.get("bold") or (r.get("props") or {}).get("bold")):
                return 1, "bold"
    t = json.dumps(doc(m), ensure_ascii=False)
    return (0.5, "maybe bold") if '"bold": true' in t or '"b": true' in t else (0, "not bold")


def c_bullets(m, a, w):
    b = blocks(m)
    listed = [x for x in b if x.get("list") or (x.get("props") or {}).get("numbering") or "List" in (x.get("style") or "")]
    return (1, f"{len(listed)} list items") if len(listed) >= 3 else (round(len(listed) / 3, 2), f"{len(listed)} list items")


def c_center(m, a, w):
    b = blocks(m)
    first = b[0] if b else {}
    al = (first.get("props") or {}).get("align") or first.get("align")
    return (1, f"align {al}") if al in ("center", "centre") else (0, f"align {al}")


def c_replace(m, a, w):
    t = m.call("get_text", {})[1]
    return (1, "replaced") if "الجمعة" in t and "الخميس" not in t else (0, "not replaced")


def c_pdf(m, a, w):
    f = os.path.join(w, "report.pdf")
    return (1, "pdf") if os.path.exists(f) and os.path.getsize(f) > 800 else (0, "no report.pdf")


def c_pagenum(m, a, w):
    d = doc(m)
    secs = d.get("sections") or [{}]
    f = ((secs[0].get("props") or {}).get("footers") or {}).get("default")
    return (1, "footer with page number") if f else (0, "no footer")


def c_count(m, a, w):
    return (1, "answered") if any(ch.isdigit() for ch in a) or any(x in a for x in ("كلمة", "كلمات")) else (0, a[:60])


def c_table(m, a, w):
    t = [b for b in doc(m).get("blocks", []) if b.get("type") == "table"]
    if not t:
        return 0, "no table"
    rows = t[0].get("rows")
    rows = len(rows) if isinstance(rows, list) else rows
    return (1, f"table rows {rows}") if rows in (3, 4) else (0.6, f"table rows {rows}")


TASKS = [
    ("اكتب خطاب رسمي لمدير المدرسة أطلب فيه إجازة يوم الأحد", None, c_letter),
    ("خلي السطر الأول عنوان رئيسي", report_text, c_heading),
    ("خل عبارة المتحف الوطني بخط عريض", report_text, c_bold),
    ("اكتب ثلاث نصائح للمذاكرة على شكل نقاط", None, c_bullets),
    ("وسّط السطر الأول", report_text, c_center),
    ("استبدل كلمة الخميس بكلمة الجمعة في كل المستند", report_text, c_replace),
    ("احفظ المستند PDF باسم report.pdf في المجلد {work}", report_text, c_pdf),
    ("ضيف أرقام الصفحات أسفل الصفحة في الوسط", report_text, c_pagenum),
    ("كم عدد الكلمات في المستند؟", report_text, c_count),
    ("ضيف جدول فيه أسماء ثلاث طلاب ودرجاتهم", None, c_table),
]
