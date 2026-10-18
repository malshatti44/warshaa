"""Watheeq (PDF) tasks. Each starts with report.pdf (4 pages made from text) "open in the window";
the assistant works on the file and must save results to new files (the eval user declines
saving over the original)."""
import glob
import json
import os

PAGES = [("Introduction", "Welcome to the annual report."), ("Sales", "Sales grew in every region."),
         ("Budget", "The Budget for next year is ready."), ("Summary", "Thank you for reading.")]


def _pdf(m, work, name, pages):
    paths = []
    for i, (title, body) in enumerate(pages, 1):
        p = os.path.join(work, f"_{name}{i}.txt")
        with open(p, "w", encoding="utf-8") as f:
            f.write(f"Page {i}: {title}\n\n{body}\n")
        paths.append(p)
    m.call("doc_create_multiple", {"paths": paths, "mode": "combine", "out": os.path.join(work, f"{name}.pdf")})
    for p in paths:
        os.remove(p)


def setup(m, ad, work):
    _pdf(m, work, "report", PAGES)
    path = os.path.join(work, "report.pdf")
    return (f"app state: the PDF \"report.pdf\" is open in the window (4 pages), file {path}. You work on files: doc_open "
            "that file, then save the result to a new file next to it; the window opens the PDFs you save")


def appendix(m, work):
    _pdf(m, work, "appendix", [("Appendix A", "Tables."), ("Appendix B", "Charts.")])


def outputs(work):
    """The PDFs the assistant wrote (not the inputs), oldest first."""
    found = [p for p in glob.glob(os.path.join(work, "**", "*.pdf"), recursive=True)
             if os.path.basename(p) not in ("report.pdf", "appendix.pdf")]
    return sorted(found, key=os.path.getmtime)


def info(m, path):
    ok, t, _ = m.call("doc_open", {"path": path})
    if not ok:
        return None, []
    d = json.loads(t)["doc"]
    i = json.loads(m.call("doc_info", {"doc": d})[1])
    return d, i.get("pages") or []


def text(m, d, page):
    ok, t, _ = m.call("text_extract", {"doc": d, "pages": [page]})
    return t if ok else ""


def original_intact(m, work):
    _, pages = info(m, os.path.join(work, "report.pdf"))
    return len(pages) == 4 and all(p.get("rotation", 0) == 0 for p in pages)


def last_output(m, work):
    out = outputs(work)
    if not out:
        return None, None, []
    d, pages = info(m, out[-1])
    return out[-1], d, pages


def c_rotate(m, a, w):
    path, d, pages = last_output(m, w)
    if not path:
        return 0, "no new PDF"
    rot = [p.get("rotation", 0) for p in pages]
    if len(rot) == 4 and rot[1] in (90, 270) and rot[0] == rot[2] == rot[3] == 0:
        return (1 if original_intact(m, w) else 0.5), f"rotations {rot}"
    return (0.3 if any(r in (90, 270) for r in rot) else 0), f"rotations {rot}"


def c_delete_last(m, a, w):
    path, d, pages = last_output(m, w)
    if not path:
        return 0, "no new PDF"
    if len(pages) != 3:
        return 0, f"{len(pages)} pages"
    return (1, "3 pages, Summary gone") if "Summary" not in text(m, d, 3) else (0.3, "a wrong page was deleted")


def c_extract(m, a, w):
    path, d, pages = last_output(m, w)
    if not path:
        return 0, "no new PDF"
    if len(pages) != 2:
        return 0, f"{len(pages)} pages"
    ok = "Sales" in text(m, d, 1) and "Budget" in text(m, d, 2)
    return (1, "pages 2-3") if ok else (0.3, "two other pages")


def says(answer, *words):
    return any(w in (answer or "") for w in words)


def c_count(m, a, w):
    return (1, "4") if says(a, "4", "٤", "أربع") else (0, a[:80])


def c_find(m, a, w):
    return (1, "page 3") if says(a, "3", "٣", "الثالثة") else (0, a[:80])


def c_merge(m, a, w):
    path, d, pages = last_output(m, w)
    if not path:
        return 0, "no new PDF"
    if len(pages) != 6:
        return 0, f"{len(pages)} pages"
    return (1, "6 pages, report then appendix") if "Introduction" in text(m, d, 1) and "Appendix A" in text(m, d, 5) else (0.5, "6 pages, other order")


def c_split(m, a, w):
    out = outputs(w)
    counts = sorted(len(info(m, p)[1]) for p in out)
    if counts == [2, 2]:
        return 1, "two files of 2 pages"
    return (0.3 if len(out) >= 2 else 0), f"files with pages {counts}"


def c_summary(m, a, w):
    return (1, "mentions the content") if says(a, "مبيعات", "المبيعات", "ميزانية", "الميزانية", "Sales", "Budget") else (0, a[:80])


TASKS = [
    ("الصفحة الثانية لازم تكون بالعرض، دوّرها ٩٠ درجة واحفظ", None, c_rotate),
    ("احذف الصفحة الأخيرة من الملف", None, c_delete_last),
    ("استخرج الصفحتين ٢ و٣ في ملف منفصل", None, c_extract),
    ("كم عدد صفحات الملف؟", None, c_count),
    ("في أي صفحة مذكورة كلمة Budget؟", None, c_find),
    ("ادمج الملف مع ملف appendix.pdf اللي بنفس المجلد في ملف واحد", appendix, c_merge),
    ("قسّم الملف إلى ملفين، كل ملف صفحتين", None, c_split),
    ("لخّص لي محتوى الملف بجملتين", None, c_summary),
]
