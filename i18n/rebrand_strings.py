"""Warsha rebrand of the interface text (ArtCraft brand terms: a modified version must not present
itself as an ArtCraft product; plain-text attribution "based on … by the ArtCraft team" is allowed).

1. English source strings that name ArtCraft as the product, or promote its community, are
   rewritten in the code (string literals), in lightcraft's locale files (keys), in the extracted
   keys/*.json, and given Arabic in the translation memory.
2. Links to the ArtCraft Discord point at malshatti.com.

  python rebrand_strings.py      (idempotent; then regenerate the catalogs)
"""
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from tm import KEYS, key_of, load_tm, save_tm  # noqa: E402

UP = pathlib.Path(r"E:\craft-ar\upstream")
APPS = ["photocraft", "vectorcraft", "filmcraft", "lightcraft", "pdfcraft", "effectcraft", "designcraft",
        "wordcraft", "deckcraft", "gridcraft", "cadcraft", "soundcraft", "craft-launcher"]

CONTACT = ("Contact the Developer", "تواصل مع المطوّر")
# old English -> (new English, new Arabic or None to keep the current Arabic)
MAP = {
    "ArtCraft": ("Warsha", "ورشة"),
    "ArtCraft App Page": ("Warsha App Page", "صفحة التطبيق في ورشة"),
    "ArtCraft App Page…": ("Warsha App Page…", "صفحة التطبيق في ورشة…"),
    "ArtCraft Launcher": ("Warsha", "ورشة"),
    "ArtCraft Launcher {version}": ("Warsha {version}", "ورشة {version}"),
    "ArtCraft Launcher {version} is available.": ("Warsha {version} is available.", "يتوفر الإصدار {version} من ورشة."),
    "ArtCraft Launcher · {n} update available|ArtCraft Launcher · {n} updates available":
        ("Warsha · {n} update available|Warsha · {n} updates available", None),
    "ArtCraft Website": ("Warsha Website", "موقع ورشة"),
    "ArtCraft Website…": ("Warsha Website…", "موقع ورشة…"),
    "ArtCraft on GitHub": ("Warsha on GitHub", "ورشة على GitHub"),
    "ArtCraft on {name}": ("Warsha on {name}", "ورشة على {name}"),
    "ArtCraft website": ("Warsha website", "موقع ورشة"),
    "ArtCraft — more creative apps": ("Warsha — more creative apps", "ورشة — مزيد من التطبيقات الإبداعية"),
    "Join the ArtCraft Discord": CONTACT,
    "Join the ArtCraft Discord (discord.gg/artcraft)": ("Contact the Developer (malshatti.com)", "تواصل مع المطوّر (malshatti.com)"),
    "Join the ArtCraft Discord ({url})": ("Contact the Developer ({url})", "تواصل مع المطوّر ({url})"),
    "Join the ArtCraft Discord...": ("Contact the Developer...", "تواصل مع المطوّر..."),
    "Join the ArtCraft Discord…": ("Contact the Developer…", "تواصل مع المطوّر…"),
    "Join the ArtCraft community": CONTACT,
    "Join the ArtCraft community on Discord": CONTACT,
    "Join the ArtCraft community on Discord (discord.gg/artcraft)": ("Contact the Developer (malshatti.com)", "تواصل مع المطوّر (malshatti.com)"),
    "Join us on Discord: discord.gg/artcraft": ("Contact the developer: malshatti.com", "تواصل مع المطوّر: malshatti.com"),
    "discord.gg/artcraft — help, feedback and show-and-tell": ("malshatti.com — help and feedback", "malshatti.com — المساعدة والملاحظات"),
    "Join Our Discord": CONTACT,
    "Join our Discord": CONTACT,
    "Join us on Discord": CONTACT,
    "Join the Discord": CONTACT,
    "Join our community on Discord": CONTACT,
    "Community\nDiscord": ("Contact\nDeveloper", "تواصل\nمع المطوّر"),
    "Discord community": ("Developer website", "موقع المطوّر"),
    "Get help, share feedback and follow development on Discord.": ("Get help and share feedback at malshatti.com.", "احصل على المساعدة وشارك ملاحظاتك عبر malshatti.com."),
    "Loading ArtCraft Launcher…": ("Loading Warsha…", "جارٍ تحميل ورشة…"),
    "More ArtCraft apps": ("More Warsha apps", "المزيد من تطبيقات ورشة"),
    "Open ArtCraft Launcher to update.": ("Open Warsha to update.", "افتح ورشة للتحديث."),
    "Part of the ArtCraft suite of open creative tools.": ("Part of Warsha, based on the open-source ArtCraft suite.", "جزء من ورشة، مبني على مجموعة ArtCraft مفتوحة المصدر."),
    "Questions, ideas and news from the ArtCraft team": ("Questions, ideas and news from the developer", "أسئلة وأفكار وأخبار من المطوّر"),
    "Quit ArtCraft Launcher": ("Quit Warsha", "إنهاء ورشة"),
    "Show ArtCraft Launcher": ("Show Warsha", "إظهار ورشة"),
    "Start ArtCraft Launcher when I log in": ("Start Warsha when I log in", "تشغيل ورشة عند تسجيل الدخول"),
    "One of the Crafting Apps by the ArtCraft team and community.": ("One of the Warsha apps, based on the open-source ArtCraft project.", "أحد تطبيقات ورشة، مبني على مشروع ArtCraft مفتوح المصدر."),
}
# Attribution sentences: product wording replaced inside longer strings, Arabic kept.
SUBS = [
    ("Part of the ArtCraft family of creative apps.", "Part of Warsha, based on the ArtCraft family of creative apps."),
    ("Part of the ArtCraft family.", "Part of Warsha, based on the ArtCraft project."),
    ("Part of the Crafting Apps from the ArtCraft", "Part of Warsha, based on the Crafting Apps from the ArtCraft"),
    ("Part of ArtCraft.", "Part of Warsha, based on ArtCraft."),
]
URLS = {"https://discord.gg/artcraft": "https://malshatti.com", "https://discord.gg/artcraft/": "https://malshatti.com"}


def new_english(s):
    if s in MAP:
        return MAP[s][0]
    t = s
    for a, b in SUBS:
        if a in t and b not in t:
            t = t.replace(a, b)
    return t


def rust_lit(s):
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def code():
    pairs = {}
    for old in list(MAP) + []:
        pairs[rust_lit(old)] = rust_lit(MAP[old][0])
    lit = re.compile(r'"((?:[^"\\\n]|\\.)*)"')
    total = 0
    for app in APPS:
        n = 0
        for f in list((UP / app / "crates").rglob("*.rs")) + list((UP / app / "apps").rglob("*.rs")):
            if "target" in f.parts:
                continue
            s = f.read_text(encoding="utf-8")

            def sub(m):
                body = m.group(1)
                if body in pairs:
                    return '"' + pairs[body] + '"'
                if body in URLS:
                    return '"' + URLS[body] + '"'
                for a, b in SUBS:
                    ra, rb = rust_lit(a), rust_lit(b)
                    if ra in body and rb not in body:
                        body = body.replace(ra, rb)
                return '"' + body + '"'

            t = lit.sub(sub, s)
            if t != s:
                n += 1
                f.write_text(t, encoding="utf-8", newline="")
        print(f"code {app}: {n} files")
        total += n
    # lightcraft's catalogs are keyed by the English text in every language (build.rs needs the same
    # format keys in each): rename the keys, keep each language's value.
    for f in (UP / "lightcraft/crates/ui-egui/locales").glob("*.json"):
        d = json.loads(f.read_text(encoding="utf-8"))
        nd = {new_english(k): v for k, v in d.items()}
        if nd != d:
            f.write_text(json.dumps(nd, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
            print("locale", f.name)


def catalogs():
    tm = load_tm()
    changed = 0
    for f in KEYS.glob("*.json"):
        rows = json.loads(f.read_text(encoding="utf-8"))
        for r in rows:
            old = r["src"]
            new = new_english(old)
            if new == old:
                continue
            old_ar = tm.get(key_of(r["ctx"], old))
            ar = MAP[old][1] if old in MAP and MAP[old][1] else old_ar
            if ar is None:
                continue
            r["src"] = new
            tm[key_of(r["ctx"], new)] = ar
            changed += 1
        f.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
    # an id-keyed label (help.discord) shows the contact entry too
    for k in list(tm):
        if k == "@id\x1fhelp.discord":
            tm[k] = CONTACT[1]
    save_tm(tm)
    print("catalog rows renamed:", changed)


if __name__ == "__main__":
    code()
    catalogs()
