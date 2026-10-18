"""Kashf (spreadsheet) tasks. Each starts with a new blank workbook."""
import json
import os


def wb(m):
    return json.loads(m.call("inspect_workbook", {})[1])


def read(m, rng, formulas=False):
    ok, t, _ = m.call("read_range", {"range": rng, "formulas": formulas})
    v = json.loads(t)
    return v.get("values", v) if isinstance(v, dict) else v


def cell(m, c):
    return json.loads(m.call("get_cell", {"cell": c})[1])


def setup(m, ad, work):
    m.call("new_workbook", {})
    return "app state: a new blank workbook is already open in the app (Sheet1, empty); work in it"


GRADES = [["الاسم", "الرياضيات", "العلوم"], ["أحمد", 90, 80], ["سارة", 85, 95], ["خالد", 40, 60], ["مريم", 70, 75]]


def grades(m, work):
    m.call("write_range", {"range": "A1", "values": GRADES})


def flat(rows):
    return [c for r in (rows or []) for c in (r or [])]


def c_table(m, a, w):
    v = read(m, "A1:D6")
    vals = flat(v)
    names = sum(1 for x in vals if isinstance(x, str) and x.strip())
    nums = sum(1 for x in vals if isinstance(x, (int, float)))
    return (1, f"{names} texts, {nums} numbers") if names >= 4 and nums >= 3 else (0.4 if vals else 0, f"{names} texts, {nums} numbers")


def c_sum(m, a, w):
    # a SUM formula over B2:B5 somewhere
    f = flat(read(m, "A1:F8", formulas=True))
    has = any(isinstance(x, str) and x.upper().startswith("=SUM(") and "B2" in x.upper() and "B5" in x.upper() for x in f)
    vals = flat(read(m, "A1:F8"))
    right = 285 in vals or 285.0 in vals
    return (1, "SUM formula = 285") if has and right else (0.5, "typed 285") if right else (0, "no total")


def c_avg(m, a, w):
    f = flat(read(m, "A1:H8", formulas=True))
    has = sum(1 for x in f if isinstance(x, str) and "AVERAGE(" in x.upper())
    return (1, f"{has} AVERAGE formulas") if has >= 4 else (round(has / 4, 2), f"{has} AVERAGE formulas")


def c_header(m, a, w):
    c = cell(m, "A1")
    style = json.dumps(c.get("style") or c, ensure_ascii=False).lower()
    bold = '"bold": true' in style
    fill = "fill" in style and '"fill": null' not in style
    return (1 if bold and fill else 0.5 if bold or fill else 0), f"bold={bold} fill={fill}"


def c_chart(m, a, w):
    s = wb(m)["sheets"][0]
    return (1, "chart") if s.get("charts") else (0, "no chart")


def c_sort(m, a, w):
    v = read(m, "A2:B5")
    col = [r[1] for r in v]
    return (1, f"{col}") if col == sorted(col, reverse=True) else (0, f"{col}")


def c_result(m, a, w):
    f = flat(read(m, "A1:H8", formulas=True))
    ifs = sum(1 for x in f if isinstance(x, str) and x.upper().startswith("=IF("))
    v = flat(read(m, "A1:H8"))
    words = sum(1 for x in v if x in ("ناجح", "راسب"))
    return (1, f"{ifs} IF formulas") if ifs >= 4 and words >= 4 else (round(min(ifs, 4) / 4, 2), f"{ifs} IF, {words} results")


def c_freeze(m, a, w):
    s = wb(m)["sheets"][0]
    return (1, "frozen") if s.get("freeze") else (0, "not frozen")


def c_save(m, a, w):
    f = os.path.join(w, "grades.xlsx")
    return (1, "saved") if os.path.exists(f) and os.path.getsize(f) > 1000 else (0, "no grades.xlsx")


TASKS = [
    ("سوّ جدول فيه أسماء 4 طلاب ودرجاتهم في الرياضيات", None, c_table),
    ("احسب مجموع درجات الرياضيات تحت العمود", grades, c_sum),
    ("ضيف عمود المعدل لكل طالب", grades, c_avg),
    ("نسّق صف العناوين: خط عريض ولون خلفية", grades, c_header),
    ("سوّ رسم بياني أعمدة للدرجات", grades, c_chart),
    ("رتّب الطلاب حسب درجة الرياضيات من الأعلى للأقل", grades, c_sort),
    ("ضيف عمود النتيجة: ناجح إذا الرياضيات 50 أو أكثر وإلا راسب", grades, c_result),
    ("ثبّت صف العناوين", grades, c_freeze),
    ("احفظ الملف باسم grades.xlsx في المجلد {work}", grades, c_save),
]
