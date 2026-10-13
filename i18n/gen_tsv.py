"""Write ar.tsv for the TSV-catalog apps from the translation memory.

  python gen_tsv.py wordcraft [photocraft ...]   (default: every TSV app)
"""
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from tm import KEYS, key_of, load_tm, esc, is_untranslatable  # noqa: E402

UP = pathlib.Path(r"E:\craft-ar\upstream")
TSV_APPS = {
    "photocraft": "crates/ui-egui/src/i18n/ar.tsv",
    "vectorcraft": "crates/ui-egui/src/i18n/ar.tsv",
    "filmcraft": "crates/ui-egui/src/i18n/ar.tsv",
    "pdfcraft": "crates/ui-egui/src/i18n/ar.tsv",
    "wordcraft": "crates/ui-egui/src/i18n/ar.tsv",
    "cadcraft": "crates/ui-egui/src/i18n/ar.tsv",
    "craft-launcher": "crates/ui-egui/src/i18n/ar.tsv",
}
NAMES = {
    "photocraft": "ريتوش", "vectorcraft": "ريشة", "filmcraft": "مونتير", "pdfcraft": "وثيق",
    "wordcraft": "سطر", "cadcraft": "مخطط", "craft-launcher": "ورشة",
}

HEADER = """# Arabic (ar) interface catalog. Columns, separated by a TAB:
#   context <TAB> English source <TAB> translation
#   (same format and escapes as the other catalogs in this folder; @plural rows carry the six
#   Arabic forms zero|one|two|few|many|other)
#
# تعريب {app}: محمد الشطي — https://malshatti.com — info@malshatti.com
# Written from the plain meaning of each English label in Modern Standard Arabic software
# vocabulary. App names follow the Arabic suite (ورشة): ريتوش، ريشة، مونتير، طيف، وثيق، ومضة،
# نسق، سطر، منبر، كشف، مخطط، صدى.

"""


def lookup(tm, ctx, src):
    k = key_of(ctx, src)
    if k in tm:
        return tm[k]
    if ctx and not ctx.startswith("@") and src in tm:
        return tm[src]
    return None


def gen(app):
    tm = load_tm()
    rows = json.loads((KEYS / f"{app}.json").read_text(encoding="utf-8"))
    out, missing = [], 0
    seen = set()
    for r in rows:
        ctx, src = r["ctx"], r["src"]
        if (ctx, src) in seen:
            continue
        seen.add((ctx, src))
        ar = lookup(tm, ctx, src)
        if ar is None:
            if not is_untranslatable(src):
                missing += 1
            continue
        out.append(f"{ctx}\t{esc(src)}\t{esc(ar)}")
    path = UP / app / TSV_APPS[app]
    path.write_text(HEADER.format(app=NAMES[app]) + "\n".join(out) + "\n", encoding="utf-8", newline="\n")
    print(f"{app}: wrote {len(out)} rows to {path} ({missing} still English)")


if __name__ == "__main__":
    for a in sys.argv[1:] or TSV_APPS:
        gen(a)
