"""Collect the interface strings of the apps without a catalog (deckcraft, soundcraft).

Every string literal in the UI crate (tests left out) that reads like interface text: words, not
ids, paths, keys or format specs. Format strings (`{}` / `{name}` / `{:.1}`) are kept with ctx
"@template": the runtime translator matches them against the finished text.

  python extract_ui.py deckcraft soundcraft   -> keys/<app>.json
"""
import json
import pathlib
import re
import sys

UP = pathlib.Path(r"E:\craft-ar\upstream")
KEYS = pathlib.Path(__file__).parent / "keys"
LIT = re.compile(r'(?<![A-Za-z0-9_#])"((?:[^"\\\n]|\\.)*)"')
PH = re.compile(r"\{[^{}]*\}")


def unrust(s):
    out, i = [], 0
    while i < len(s):
        c = s[i]
        if c == "\\" and i + 1 < len(s):
            n = s[i + 1]
            if n == "n":
                out.append("\n")
            elif n == "t":
                out.append("\t")
            elif n == "u" and s[i + 2:i + 3] == "{":
                j = s.index("}", i)
                out.append(chr(int(s[i + 3:j], 16)))
                i = j + 1
                continue
            else:
                out.append(n)
            i += 2
            continue
        out.append(c)
        i += 1
    return "".join(out)


def strip_tests(src):
    # drop `#[cfg(test)] mod ... { ... }` blocks (brace matched) and line comments
    out, i = [], 0
    while True:
        j = src.find("#[cfg(test)]", i)
        if j < 0:
            out.append(src[i:])
            break
        out.append(src[i:j])
        k = src.find("{", j)
        if k < 0:
            break
        depth, m = 0, k
        while m < len(src):
            if src[m] == "{":
                depth += 1
            elif src[m] == "}":
                depth -= 1
                if depth == 0:
                    break
            m += 1
        i = m + 1
    text = "".join(out)
    return "\n".join(line for line in text.splitlines() if not line.lstrip().startswith("//"))


def looks_like_ui(s):
    t = s.strip()
    if len(t) < 2 or not re.search(r"[A-Za-z]{2,}", t):
        return False
    bare = PH.sub("", t)
    if not re.search(r"[A-Za-z]{2,}", bare):
        return False
    if re.fullmatch(r"[a-z0-9_]+", t):  # snake_case ids, single lowercase keys
        return False
    if re.fullmatch(r"[a-z][a-zA-Z0-9]*(\.[a-zA-Z0-9_]+)+", t):  # command.ids
        return False
    if re.fullmatch(r"[a-z]+[A-Z][A-Za-z0-9]*", t):  # camelCase keys
        return False
    if re.search(r"^[./\\]|[/\\][a-z]|\.(rs|json|png|svg|ttf|otf|wav|mp4|toml|txt|html)\b", t):
        return False
    if re.fullmatch(r"#?[0-9a-fA-F]{6,8}", t) or t.startswith(("http://", "https://", "mailto:")):
        return False
    if re.fullmatch(r"[A-Z0-9_]+", t) and "_" in t:  # CONSTANT_NAMES, env vars
        return False
    if re.fullmatch(r"[a-z-]+", t) and "-" in t:  # kebab ids
        return False
    if t.startswith(("--", "application/", "image/", "audio/", "video/")):
        return False
    return True


def collect(app):
    root = UP / app / "crates" / "ui-egui" / "src"
    seen, rows = set(), []
    for f in sorted(root.rglob("*.rs")):
        if f.name.endswith("_tests.rs") or f.name == "tests.rs":
            continue
        for m in LIT.finditer(strip_tests(f.read_text(encoding="utf-8"))):
            s = unrust(m.group(1))
            if not looks_like_ui(s) or s in seen:
                continue
            seen.add(s)
            ctx = "@template" if PH.search(s) else ""
            rows.append({"ctx": ctx, "src": s, "ar": None, "hint": f.name})
    # Menu items come from the engine's command table: cmd!(id, "Label", ["Menu", "Sub"], …)
    cmd = re.compile(r'cmd!\(\s*(?:query|noundo|view)?\s*"[^"]*"\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*\[([^\]]*)\]')
    for f in sorted((UP / app / "crates").rglob("*.rs")):
        if "target" in f.parts or "ui-egui" in f.parts:
            continue
        for m in cmd.finditer(f.read_text(encoding="utf-8")):
            for s in [unrust(m.group(1))] + [unrust(x) for x in re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(2))]:
                if s in seen or not re.search(r"[A-Za-z]{2,}", s):
                    continue
                seen.add(s)
                rows.append({"ctx": "@template" if PH.search(s) else "", "src": s, "ar": None, "hint": "menu"})
    (KEYS / f"{app}.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{app}: {len(rows)} strings ({sum(r['ctx'] == '@template' for r in rows)} templates)")


if __name__ == "__main__":
    for a in sys.argv[1:] or ["deckcraft", "soundcraft"]:
        collect(a)
