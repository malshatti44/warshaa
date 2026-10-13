"""Write the Arabic tables of the apps whose catalogs are Rust source (designcraft, gridcraft).

  python gen_rs.py [designcraft] [gridcraft]
"""
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from tm import KEYS, key_of, load_tm, is_untranslatable  # noqa: E402

UP = pathlib.Path(r"E:\craft-ar\upstream")
CREDIT = "تعريب وتطوير: محمد الشطي — https://malshatti.com — info@malshatti.com"
LIT = r'"((?:[^"\\]|\\.)*)"'


def rust(s: str) -> str:
    """A Rust string literal for `s`."""
    out = []
    for c in s:
        if c == "\\":
            out.append("\\\\")
        elif c == '"':
            out.append('\\"')
        elif c == "\n":
            out.append("\\n")
        elif c == "\t":
            out.append("\\t")
        elif c == "\r":
            out.append("\\r")
        else:
            out.append(c)
    return '"' + "".join(out) + '"'


def rows(app):
    tm = load_tm()
    out, seen, missing = [], set(), []
    for r in json.loads((KEYS / f"{app}.json").read_text(encoding="utf-8")):
        src = r["src"]
        if src in seen:
            continue
        seen.add(src)
        ar = tm.get(key_of(r["ctx"], src))
        if ar is None:
            if is_untranslatable(src):
                continue
            missing.append(src)
            continue
        out.append((src, ar))
    return out, missing


def designcraft():
    pairs, missing = rows("designcraft")
    body = "".join(f"    ({rust(a)}, {rust(b)}),\n" for a, b in pairs)
    text = (f"//! Arabic interface translations, stored in logical Unicode order. {CREDIT}\n"
            "pub(super) const TABLE: &[(&str, &str)] = &[\n" + body + "];\n")
    p = UP / "designcraft/crates/ui-egui/src/i18n/ar.rs"
    p.write_text(text, encoding="utf-8", newline="\n")
    print(f"designcraft: {len(pairs)} rows, {len(missing)} missing -> {p}")


def gridcraft():
    pairs, missing = rows("gridcraft")
    # The Japanese table in i18n.rs may hold labels the per-language files lack: report them.
    src = (UP / "gridcraft/crates/ui-egui/src/i18n.rs").read_text(encoding="utf-8")
    ja = re.findall(r"\(\s*" + LIT + r"\s*,\s*" + LIT + r"\s*\)", src.split("#[cfg(test)]")[0])
    have = {a for a, _ in pairs}
    def unrust(t):
        return t.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")

    extra = sorted({unrust(a) for a, _ in ja if unrust(a) not in have})
    body = "".join(f"        {rust(a)} => {rust(b)},\n" for a, b in pairs)
    text = (f"//! Arabic translations for the interface strings in i18n.rs. {CREDIT}\n"
            "//! Anything absent falls back to English.\n\n"
            "pub(super) fn translate(text: &str) -> Option<&'static str> {\n"
            "    Some(match text {\n" + body + "        _ => return None,\n    })\n}\n")
    p = UP / "gridcraft/crates/ui-egui/src/i18n/ar.rs"
    p.write_text(text, encoding="utf-8", newline="\n")
    print(f"gridcraft: {len(pairs)} rows, {len(missing)} missing, {len(extra)} only in the Japanese table -> {p}")
    for e in extra[:20]:
        print("   ja-only:", e)


def effectcraft():
    tm = load_tm()
    menu, ui, missing, seen = [], [], [], set()
    for r in json.loads((KEYS / "effectcraft.json").read_text(encoding="utf-8")):
        ctx, src = r["ctx"], r["src"]
        if (ctx, src) in seen:
            continue
        seen.add((ctx, src))
        ar = tm.get(key_of(ctx, src))
        if ar is None:
            if not is_untranslatable(src):
                missing.append(src)
            continue
        if ctx.startswith("@"):
            menu.append((ctx[1:], src, ar))
        else:
            ui.append((src, ar))
    text = (f"//! Arabic catalogs: the menu tree (by command and English label) and the panels below it\n"
            f"//! (by English source). {CREDIT}\n\n"
            "pub(super) const MENU: &[(&str, &str, &str)] = &[\n"
            + "".join(f"    ({rust(c)}, {rust(a)}, {rust(b)}),\n" for c, a, b in menu)
            + "];\n\npub(super) const UI: &[(&str, &str)] = &[\n"
            + "".join(f"    ({rust(a)}, {rust(b)}),\n" for a, b in ui)
            + "];\n")
    p = UP / "effectcraft/crates/ui-egui/src/i18n/ar.rs"
    p.write_text(text, encoding="utf-8", newline="\n")
    print(f"effectcraft: {len(menu)} menu rows, {len(ui)} panel rows, {len(missing)} missing -> {p}")


def lightcraft():
    tm = load_tm()
    plain, formats, missing = {}, {}, []
    for r in json.loads((KEYS / "lightcraft.json").read_text(encoding="utf-8")):
        ctx, src = r["ctx"], r["src"]
        ar = tm.get(key_of(ctx, src))
        if ar is None:
            if ctx == "@format":
                ar = src  # build.rs needs every format in every catalog
            elif is_untranslatable(src):
                continue
            missing.append(src)
            if ar is None:
                continue
        (formats if ctx == "@format" else plain)[src] = ar
    loc = UP / "lightcraft/crates/ui-egui/locales"
    for name, d in (("ar.json", plain), ("ar-formats.json", formats)):
        (loc / name).write_text(json.dumps(dict(sorted(d.items())), ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(f"lightcraft: {len(plain)} labels, {len(formats)} formats, {len(missing)} missing -> {loc}")


EXTRA = {"Interface language": "لغة الواجهة", "End": "النهاية", "Untitled": "بلا عنوان", "saved": "محفوظ",
         "modified": "معدّل", "{} note": "{} نوتة", "{} sec": "{} ث", "{} notes": "{} نغمة", "{} selected": "{} محدد"}


def tsv_escape(s):
    return s.replace("\\", "\\\\").replace("\n", "\\n").replace("\t", "\\t")


def hooked(app):
    """deckcraft / soundcraft: src/ar.tsv read by the egui label hook (shared/i18n_hook.rs)."""
    pairs, missing = rows(app)
    pairs = [(a, b) for a, b in pairs if a not in EXTRA] + list(EXTRA.items())
    # identical rows (ids, shortcuts) are left out: the label shows as it is anyway
    pairs = [(a, b) for a, b in pairs if a != b]
    text = (f"# Arabic interface of {app}: English label or template <TAB> Arabic. {CREDIT}\n"
            + "".join(f"{tsv_escape(a)}\t{tsv_escape(b)}\n" for a, b in pairs))
    p = UP / app / "crates/ui-egui/src/ar.tsv"
    p.write_text(text, encoding="utf-8", newline="\n")
    print(f"{app}: {len(pairs)} rows, {len(missing)} missing -> {p}")


def deckcraft():
    hooked("deckcraft")


def soundcraft():
    hooked("soundcraft")


if __name__ == "__main__":
    for app in sys.argv[1:] or ["designcraft", "gridcraft", "effectcraft", "lightcraft", "deckcraft", "soundcraft"]:
        globals()[app]()
