"""Remove the «craft» names from the Warsha source: contents, file and folder names.

  python unbrand.py <root> [<root> ...] [--apply] [--report out.json]

Without --apply it only reports what would change. Kept as they are (legal or third-party text):
LICENSE*, NOTICE*, ATTRIBUTION*, *.attribution, and third-party license texts. Binary files are not touched.
"""
import json
import os
import re
import sys

APPS = [  # (old id, new id, new display name)
    ("photocraft", "retoush", "Retoush"),
    ("vectorcraft", "reesha", "Reesha"),
    ("filmcraft", "monteer", "Monteer"),
    ("lightcraft", "tayf", "Tayf"),
    ("pdfcraft", "watheeq", "Watheeq"),
    ("effectcraft", "wamda", "Wamda"),
    ("designcraft", "nasaq", "Nasaq"),
    ("wordcraft", "satr", "Satr"),
    ("deckcraft", "minbar", "Minbar"),
    ("gridcraft", "kashf", "Kashf"),
    ("cadcraft", "mukhattat", "Mukhattat"),
    ("soundcraft", "sada", "Sada"),
]
SLUG = {o: n for o, n, _ in APPS}

KEEP_FILES = re.compile(r"^(?:(?:LICENSE|NOTICE|COPYING)(?:[.-][\w.-]+)?|ATTRIBUTION\.md|OFL[\w.-]*\.txt|[\w.-]+\.attribution|LICENSE-[\w.-]+)$")
SKIP_DIRS = {".git", "target", "node_modules"}
DELETE = re.compile(r"(^|/)(AGENTS\.md|CLAUDE\.md|\.github|docs/brand)$")


def pairs():
    """(old, new) string pairs, case-sensitive; applied longest first."""
    p = {}

    def forms(old_camel, new_display, new_id):
        low = old_camel.lower()
        p[low] = new_id
        p[low.upper()] = new_id.upper()
        p[old_camel] = new_display
        p[low[0].upper() + low[1:]] = new_display
        p[low[0] + old_camel[1:]] = new_id  # photoCraft

    camel = {"photocraft": "PhotoCraft", "vectorcraft": "VectorCraft", "filmcraft": "FilmCraft", "lightcraft": "LightCraft",
             "pdfcraft": "PdfCraft", "effectcraft": "EffectCraft", "designcraft": "DesignCraft", "wordcraft": "WordCraft",
             "deckcraft": "DeckCraft", "gridcraft": "GridCraft", "cadcraft": "CadCraft", "soundcraft": "SoundCraft"}
    for o, n, d in APPS:
        forms(camel[o], d, n)
    p["PDFCraft"] = "Watheeq"
    p["CADCraft"] = "Mukhattat"
    # The suite and the launcher.
    p["artcraft-launcher"] = "warsha"
    p["craft-launcher"] = "warsha"
    p["craft_launcher"] = "warsha"
    p["ArtCraft Launcher"] = "Warsha"
    forms("ArtCraft", "Warsha", "warsha")
    # Earlier names of apps.
    forms("DrawCraft", "Reesha", "reesha")
    forms("SlideCraft", "Minbar", "minbar")
    forms("DocuCraft", "Satr", "satr")
    forms("PrintCraft", "WarshaPrint", "warshaprint")
    # Shared libraries, fonts, standards.
    for a, b in [("craft-libs", "warsha-libs"), ("craft-ui", "warsha-ui"), ("craft-print", "warsha-print"), ("craft-fonts", "warsha-fonts"),
                 ("craftrules", "warsharules"), ("Crafting Apps", "Warsha apps"), ("Crafting apps", "Warsha apps"), ("crafting apps", "Warsha apps"),
                 ("Craft apps", "Warsha apps"), ("craft apps", "Warsha apps"), ("Craft Apps", "Warsha apps")]:
        p[a] = b
    # Short ids and file extensions.
    p["pcraft"], p["Pcraft"], p["PCRAFT"] = "retoush", "Retoush", "RETOUSH"
    p["scraftz"], p["scraft"], p["Scraft"], p["SCRAFT"] = "sadaz", "sada", "Sada", "SADA"
    p["wcraft"], p["WCraft"] = "wsatr", "WSatr"
    # English words.
    p["craftsmen"] = "artisans"
    p["Crafted"], p["crafted"] = "Made", "made"
    p["Crafting"], p["crafting"] = "Warsha", "warsha"
    # Everything else.
    p["CRAFT"], p["Craft"], p["craft"] = "WARSHA", "Warsha", "warsha"
    return p


PAIRS = pairs()
TOKEN = re.compile("|".join(re.escape(k) for k in sorted(PAIRS, key=len, reverse=True)))

URLS = [
    (re.compile(r"https?://(?:www\.)?getartcraft\.com/apps/(\w+)/?"), lambda m: f"https://malshatti.com/apps/{SLUG.get(m.group(1), '')}{'.html' if m.group(1) in SLUG else ''}"),
    (re.compile(r"https?://(?:www\.)?getartcraft\.com[^\s\"'<>)\]]*"), lambda m: "https://malshatti.com/apps/"),
    (re.compile(r"getartcraft\.com"), lambda m: "malshatti.com"),
    (re.compile(r"https?://github\.com/storytold/[\w.-]+(?:/[^\s\"'<>)\]]*)?"), lambda m: "https://github.com/malshatti44/warshaa"),
    (re.compile(r"\bstorytold/[\w.-]*craft[\w.-]*"), lambda m: "malshatti44/warshaa"),
    (re.compile(r"\bai\.storyteller\.(\w*craft\w*)"), lambda m: "com.malshatti." + m.group(1)),
]


def convert(text):
    for rx, fn in URLS:
        text = rx.sub(fn, text)
    return TOKEN.sub(lambda m: PAIRS[m.group(0)], text)


def is_binary(path):
    try:
        with open(path, "rb") as f:
            return b"\0" in f.read(8192)
    except OSError:
        return True


def main():
    roots = [a for a in sys.argv[1:] if not a.startswith("--")]
    apply = "--apply" in sys.argv
    report = sys.argv[sys.argv.index("--report") + 1] if "--report" in sys.argv else None
    changed, kept, deleted, renamed, errors = [], [], [], [], []
    hits = 0
    for root in roots:
        # Delete what goes.
        for dirpath, dirnames, filenames in os.walk(root, topdown=True):
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            rel = os.path.relpath(dirpath, root).replace("\\", "/")
            for name in list(dirnames) + filenames:
                r = (name if rel == "." else f"{rel}/{name}")
                if DELETE.search(r):
                    deleted.append(os.path.join(dirpath, name))
                    if name in dirnames:
                        dirnames.remove(name)
        if apply:
            import shutil
            for d in deleted:
                if os.path.isdir(d):
                    shutil.rmtree(d)
                elif os.path.exists(d):
                    os.remove(d)
        # Contents.
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            for name in filenames:
                path = os.path.join(dirpath, name)
                if KEEP_FILES.search(name):
                    kept.append(path)
                    continue
                if os.path.getsize(path) > 50_000_000 or is_binary(path):
                    continue
                try:
                    raw = open(path, "rb").read()
                    text = raw.decode("utf-8")
                except (UnicodeDecodeError, OSError):
                    continue
                if not re.search("craft", text, re.I) and "storyteller" not in text:
                    continue
                new = convert(text)
                if new != text:
                    hits += len(re.findall("craft", text, re.I)) - len(re.findall("craft", new, re.I))
                    changed.append(path)
                    if apply:
                        with open(path, "w", encoding="utf-8", newline="") as f:
                            f.write(new)
        # Names, deepest first.
        for dirpath, dirnames, filenames in os.walk(root, topdown=False):
            if any(s in dirpath.replace("\\", "/").split("/") for s in SKIP_DIRS):
                continue
            for name in filenames + dirnames:
                if "craft" in name.lower() and not KEEP_FILES.search(name):
                    new = convert(name)
                    if new != name:
                        src, dst = os.path.join(dirpath, name), os.path.join(dirpath, new)
                        renamed.append((src, dst))
                        if apply:
                            if os.path.exists(dst):
                                errors.append(f"exists: {dst}")
                            else:
                                os.rename(src, dst)
    print(f"{'APPLIED' if apply else 'DRY RUN'}: {len(changed)} files changed ({hits} occurrences), {len(renamed)} names, "
          f"{len(deleted)} deleted, {len(kept)} legal files kept, {len(errors)} errors")
    for e in errors[:20]:
        print("  ", e)
    if report:
        json.dump({"changed": changed, "renamed": renamed, "deleted": deleted, "kept": kept, "errors": errors},
                  open(report, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
