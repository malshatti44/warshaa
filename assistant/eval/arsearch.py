"""Bilingual (Arabic / English) command search: BM25 over id, label, menu path and parameter doc.

The Rust version in the assistant crate follows this one; keep the two in step.
"""
import math
import re
from collections import Counter

DIACRITICS = re.compile(r"[ؐ-ًؚ-ٰٟۖ-ۭـ]")
WORD = re.compile(r"[a-z0-9]+|[ء-ي]+")
STOP = {"the", "a", "an", "of", "to", "and", "or", "in", "on", "for", "with", "by",
        "في", "من", "على", "الى", "عن", "مع", "او", "ثم", "هذا", "هذه", "ذلك", "التي", "الذي", "ان", "كل", "لو", "شوي",
        "ابي", "ابغى", "اريد", "ودي", "خل", "خلي", "سوي", "اعمل", "اجعل", "ممكن", "لي", "الصوره", "الصورة"}
# Arabic → English terms that labels rarely share with how people ask (the labels give the rest).
SYNONYMS = {
    "تباين": "contrast", "سطوع": "brightness", "اضاءه": "brightness exposure", "اضاءة": "brightness exposure", "اشراق": "brightness",
    "تعريض": "exposure", "تشبع": "saturation", "الوان": "color hue saturation", "لون": "color hue", "دفء": "temperature warm",
    "حده": "sharpen", "حدة": "sharpen", "وضوح": "sharpen clarity", "تنعيم": "smooth blur", "ضبابيه": "blur", "ضبابية": "blur", "تمويه": "blur",
    "قص": "crop", "اقتصاص": "crop", "تدوير": "rotate", "قلب": "flip", "حجم": "size resize", "تكبير": "zoom enlarge", "تصغير": "zoom reduce",
    "طبقه": "layer", "طبقة": "layer", "طبقات": "layers", "نص": "text type", "كتابه": "text type", "كتابة": "text type",
    "خلفيه": "background", "خلفية": "background", "ازاله": "remove", "ازالة": "remove", "حذف": "delete", "تحديد": "select selection",
    "قناع": "mask", "منحنيات": "curves", "مستويات": "levels", "ابيض": "white black", "اسود": "black white", "رمادي": "grayscale",
    "ضوضاء": "noise", "تشويش": "noise", "بقع": "spot healing", "ترميم": "healing", "شوائب": "spot healing blemish", "عيون": "red eye",
    "حفظ": "save", "تصدير": "export", "فتح": "open", "جديد": "new", "تراجع": "undo", "اعاده": "redo", "اعادة": "redo",
    "دمج": "merge flatten", "نسخ": "copy duplicate", "لصق": "paste", "فلتر": "filter", "تصفيه": "filter", "تصفية": "filter",
    "ازل": "remove", "شيل": "remove", "امسح": "delete erase", "زد": "increase", "زيد": "increase", "قلل": "reduce decrease",
    "خفف": "reduce", "حول": "convert", "صغر": "reduce resize size", "كبر": "enlarge resize size", "وجه": "skin portrait healing",
    "بشره": "skin healing", "مربع": "square crop", "عنوان": "title text type", "اسود": "black", "اضف": "add new",
}


def _norm_keys(d):
    return {norm(k): v for k, v in d.items()}


def norm(s):
    s = DIACRITICS.sub("", s.lower())
    s = re.sub("[إأآٱ]", "ا", s).replace("ى", "ي").replace("ة", "ه").replace("ؤ", "و").replace("ئ", "ي")
    return s


def stem(w):
    """Light Arabic stemming: the article and one-letter prefixes, common suffixes."""
    if re.match(r"[ء-ي]", w):
        for p in ("وال", "بال", "كال", "فال", "لل", "ال"):
            if w.startswith(p) and len(w) - len(p) >= 2:
                w = w[len(p):]
                break
        else:
            if len(w) > 3 and w[0] in "وبفل":
                w = w[1:]
        for suf in ("ات", "ون", "ين", "ها", "ه"):
            if w.endswith(suf) and len(w) - len(suf) >= 3:
                w = w[: -len(suf)]
                break
    elif w.endswith("s") and len(w) > 3:
        w = w[:-1]
    return w


def tokens(s):
    out = []
    s = re.sub(r"([a-z])([A-Z])", r"\1 \2", s)  # camelCase ids
    for w in WORD.findall(norm(s)):
        if w in STOP:
            continue
        out.append(stem(w))
    return out


def query_tokens(q):
    global SYNONYMS
    if not getattr(query_tokens, "ready", False):
        SYNONYMS = _norm_keys(SYNONYMS)
        query_tokens.ready = True
    t = tokens(q)
    for w in WORD.findall(norm(q)):
        if w in SYNONYMS:
            t += tokens(SYNONYMS[w])
        elif stem(w) in SYNONYMS:
            t += tokens(SYNONYMS[stem(w)])
    return t


class Index:
    def __init__(self, docs, fields):
        """docs: list of dicts; fields: {name: weight}, each a str or list of str."""
        self.docs = docs
        self.tf = []
        for d in docs:
            c = Counter()
            for f, w in fields.items():
                v = d.get(f) or ""
                if isinstance(v, list):
                    v = " ".join(map(str, v))
                for t in tokens(str(v)):
                    c[t] += w
            self.tf.append(c)
        self.avg = sum(sum(c.values()) for c in self.tf) / max(1, len(self.tf))
        df = Counter(t for c in self.tf for t in c)
        n = len(docs)
        self.idf = {t: math.log(1 + (n - k + 0.5) / (k + 0.5)) for t, k in df.items()}

    def search(self, q, k=8, k1=1.2, b=0.6):
        qt = query_tokens(q)
        scores = []
        for i, c in enumerate(self.tf):
            ln = sum(c.values())
            s = 0.0
            for t in qt:
                f = c.get(t)
                if f:
                    s += self.idf[t] * f * (k1 + 1) / (f + k1 * (1 - b + b * ln / self.avg))
            if s:
                scores.append((s, i))
        scores.sort(reverse=True)
        return [self.docs[i] for _, i in scores[:k]]
