"""Collect every translatable source string of each Craft app from its existing catalogs.

Writes i18n/keys/<app>.json: a list of {"ctx": str, "src": str, "ar": str|None} (ar = an existing
upstream Arabic row, if any), and i18n/keys/_summary.txt.
"""
import json
import pathlib
import re

UP = pathlib.Path(r"E:\craft-ar\upstream")
OUT = pathlib.Path(r"E:\craft-ar\i18n\keys")
OUT.mkdir(parents=True, exist_ok=True)

LIT = r'"((?:[^"\\]|\\.)*)"'


def unrust(s: str) -> str:
    out, i = [], 0
    while i < len(s):
        c = s[i]
        if c == "\\" and i + 1 < len(s):
            n = s[i + 1]
            if n == "n":
                out.append("\n"); i += 2; continue
            if n == "t":
                out.append("\t"); i += 2; continue
            if n == "r":
                out.append("\r"); i += 2; continue
            if n == "0":
                out.append("\0"); i += 2; continue
            if n in "\"\\'":
                out.append(n); i += 2; continue
            if n == "u" and s[i + 2:i + 3] == "{":
                j = s.index("}", i)
                out.append(chr(int(s[i + 3:j], 16))); i = j + 1; continue
            if n == "\n":  # line continuation
                i += 2
                while i < len(s) and s[i] in " \t\n":
                    i += 1
                continue
        out.append(c)
        i += 1
    return "".join(out)


def untsv(s: str) -> str:
    return s.replace("\\n", "\n").replace("\\t", "\t").replace("\\\\", "\\")


HINT_LANGS = ["fr", "es", "de", "it", "pt-br", "pt_br"]


def tsv_entries(d: pathlib.Path):
    entries, arabic, hints = {}, {}, {}
    for f in sorted(d.glob("*.tsv")):
        lang = f.stem
        for line in f.read_text(encoding="utf-8").splitlines():
            if not line.strip() or line.startswith("#"):
                continue
            cols = line.split("\t")
            if len(cols) < 3:
                continue
            ctx, src, tr = cols[0], untsv(cols[1]), untsv(cols[2])
            entries.setdefault((ctx, src), None)
            if lang == "ar":
                arabic[(ctx, src)] = tr
            if ctx == "@id" and lang in HINT_LANGS:
                rank = HINT_LANGS.index(lang)
                if (ctx, src) not in hints or hints[(ctx, src)][0] > rank:
                    hints[(ctx, src)] = (rank, f"{lang}: {tr}")
    HINTS.update({k: v[1] for k, v in hints.items()})
    return entries, arabic


def pairs(text: str, pattern: str):
    return [(unrust(a), unrust(b)) for a, b in re.findall(pattern, text, flags=re.S)]


def collect(app: str):
    ui = UP / app / "crates" / "ui-egui"
    entries, arabic = {}, {}
    if (ui / "src" / "i18n").is_dir() and list((ui / "src" / "i18n").glob("*.tsv")):
        entries, arabic = tsv_entries(ui / "src" / "i18n")
    elif app == "craft-launcher":
        entries, arabic = tsv_entries(ui / "src" / "i18n")
    elif app == "designcraft":
        for f in sorted((ui / "src" / "i18n").glob("*.rs")):
            for a, b in pairs(f.read_text(encoding="utf-8"), r"\(\s*" + LIT + r"\s*,\s*" + LIT + r"\s*\)"):
                entries.setdefault(("", a), None)
                if f.stem == "ar":
                    arabic[("", a)] = b
    elif app == "gridcraft":
        for f in sorted((ui / "src" / "i18n").glob("*.rs")):
            for a, b in pairs(f.read_text(encoding="utf-8"), LIT + r"\s*=>\s*" + LIT):
                entries.setdefault(("", a), None)
    elif app == "effectcraft":
        menu = (ui / "src" / "i18n.rs").read_text(encoding="utf-8")
        for cmd, label, _ in re.findall(r"\(\s*" + LIT + r"\s*,\s*" + LIT + r"\s*,\s*" + LIT + r"\s*\)", menu, flags=re.S):
            entries.setdefault(("@" + unrust(cmd), unrust(label)), None)
        panel = (ui / "src" / "i18n" / "ui.rs").read_text(encoding="utf-8")
        panel = panel.split("#[cfg(test)]")[0]
        for a, _ in pairs(panel, r"\(\s*" + LIT + r"\s*,\s*" + LIT + r"\s*\)"):
            entries.setdefault(("", a), None)
    elif app == "lightcraft":
        for f in sorted((ui / "locales").glob("*.json")):
            ctx = "@format" if f.stem.endswith("-formats") else ""
            for k in json.loads(f.read_text(encoding="utf-8")):
                entries.setdefault((ctx, k), None)
    return entries, arabic


HINTS = {}
APPS = ["photocraft", "vectorcraft", "filmcraft", "lightcraft", "pdfcraft", "effectcraft",
        "designcraft", "wordcraft", "deckcraft", "gridcraft", "cadcraft", "soundcraft", "craft-launcher"]
summary, all_src = [], {}
for app in APPS:
    HINTS.clear()
    entries, arabic = collect(app)
    rows = [{"ctx": c, "src": s, "ar": arabic.get((c, s)), "hint": HINTS.get((c, s))} for (c, s) in entries]
    (OUT / f"{app}.json").write_text(json.dumps(rows, ensure_ascii=False, indent=0), encoding="utf-8")
    for r in rows:
        all_src[r["src"]] = all_src.get(r["src"], 0) + 1
    words = sum(len(r["src"].split()) for r in rows)
    summary.append(f"{app:15s} keys={len(rows):5d} words={words:6d} upstream_ar={len(arabic)}")
summary.append(f"unique sources across apps: {len(all_src)}, words={sum(len(s.split()) for s in all_src)}")
(OUT / "_summary.txt").write_text("\n".join(summary), encoding="utf-8")
print("\n".join(summary))
