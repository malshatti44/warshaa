"""Tanween al-fath on the last letter (the user's spelling): «شكراً» → «شكراً», «هدىً» → «هدىً».

Applies to the translation memory and to every Arabic file Warsha writes or generates: the app
catalogs, the Arabic strings added to the code, the website and the packaging.

  python tanween.py          (idempotent)
"""
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from tm import load_tm, save_tm  # noqa: E402

FIX = re.compile("\u064b([\u0627\u0649])")  # fathatan before alif / alif maqsura


def fix(s):
    return FIX.sub("\\1\u064b", s)


ROOT = pathlib.Path(r"E:\craft-ar")
UP = ROOT / "upstream"
APPS = ["photocraft", "vectorcraft", "filmcraft", "lightcraft", "pdfcraft", "effectcraft", "designcraft",
        "wordcraft", "deckcraft", "gridcraft", "cadcraft", "soundcraft", "craft-launcher"]


def files():
    for app in APPS:
        ui = UP / app / "crates" / "ui-egui"
        yield from (ui / "src" / "i18n").glob("ar.*")
        yield from (ui / "src").glob("ar.tsv")
        yield from (ui / "locales").glob("ar*.json")
        # Arabic strings added in code (credits, language pickers, Warsha marks…)
        for f in list((UP / app / "crates").rglob("*.rs")) + list((UP / app / "apps").rglob("*.rs")):
            if "target" not in f.parts and "i18n" not in f.parts:
                yield f
    yield ROOT / "shared" / "i18n_hook.rs"
    yield ROOT / "shared" / "egui" / "src" / "widget_text.rs"
    yield ROOT / "shared" / "epaint" / "src" / "text" / "bidi.rs"
    yield from (ROOT / "i18n").glob("*.py")
    yield from (ROOT / "site").glob("*.py")
    yield from (ROOT / "packaging").glob("*.py")
    yield from (ROOT / "icons").glob("*.py")
    yield ROOT / "warshaa" / "README.md"
    yield ROOT / "warshaa" / "NOTICE"
    yield ROOT / "dist" / "RELEASE_NOTES_v2.0.0.md"


def main():
    tm = load_tm()
    n = 0
    for k, v in list(tm.items()):
        w = fix(v)
        if w != v:
            tm[k] = w
            n += 1
    save_tm(tm)
    print(f"translation memory: {n} entries")
    changed = 0
    for f in files():
        if not f.is_file():
            continue
        try:
            s = f.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        if "\u064b" not in s:
            continue
        t = fix(s)
        if t != s:
            f.write_text(t, encoding="utf-8", newline="")
            changed += 1
            print("  ", f)
    print(f"files changed: {changed}")


if __name__ == "__main__":
    main()
