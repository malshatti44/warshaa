"""Warsha rebrand of the interface text (Warsha brand terms: a modified version must not present
itself as an Warsha product; plain-text attribution "based on … by the Warsha team" is allowed).

1. English source strings that name Warsha as the product, or promote its community, are
   rewritten in the code (string literals), in tayf's locale files (keys), in the extracted
   keys/*.json, and given Arabic in the translation memory.
2. Links to the Warsha Discord point at malshatti.com.

  python rebrand_strings.py      (idempotent; then regenerate the catalogs)
"""
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from tm import KEYS, key_of, load_tm, save_tm  # noqa: E402

UP = pathlib.Path(r"E:\warsha-src\upstream")
APPS = ["retoush", "reesha", "monteer", "tayf", "watheeq", "wamda", "nasaq",
        "satr", "minbar", "kashf", "mukhattat", "sada", "warsha"]

CONTACT = ("Contact the Developer", "تواصل مع المطوّر")
# old English -> (new English, new Arabic or None to keep the current Arabic)
MAP = {
    "Warsha": ("Warsha", "ورشة"),
    "Warsha App Page": ("Warsha App Page", "صفحة التطبيق في ورشة"),
    "Warsha App Page…": ("Warsha App Page…", "صفحة التطبيق في ورشة…"),
    "Warsha": ("Warsha", "ورشة"),
    "Warsha {version}": ("Warsha {version}", "ورشة {version}"),
    "Warsha {version} is available.": ("Warsha {version} is available.", "يتوفر الإصدار {version} من ورشة."),
    "Warsha · {n} update available|Warsha · {n} updates available":
        ("Warsha · {n} update available|Warsha · {n} updates available", None),
    "Warsha Website": ("Warsha Website", "موقع ورشة"),
    "Warsha Website…": ("Warsha Website…", "موقع ورشة…"),
    "Warsha on GitHub": ("Warsha on GitHub", "ورشة على GitHub"),
    "Warsha on {name}": ("Warsha on {name}", "ورشة على {name}"),
    "Warsha website": ("Warsha website", "موقع ورشة"),
    "Warsha — more creative apps": ("Warsha — more creative apps", "ورشة — مزيد من التطبيقات الإبداعية"),
    "Join the Warsha Discord": CONTACT,
    "Join the Warsha Discord (discord.gg/warsha)": ("Contact the Developer (malshatti.com)", "تواصل مع المطوّر (malshatti.com)"),
    "Join the Warsha Discord ({url})": ("Contact the Developer ({url})", "تواصل مع المطوّر ({url})"),
    "Join the Warsha Discord...": ("Contact the Developer...", "تواصل مع المطوّر..."),
    "Join the Warsha Discord…": ("Contact the Developer…", "تواصل مع المطوّر…"),
    "Join the Warsha community": CONTACT,
    "Join the Warsha community on Discord": CONTACT,
    "Join the Warsha community on Discord (discord.gg/warsha)": ("Contact the Developer (malshatti.com)", "تواصل مع المطوّر (malshatti.com)"),
    "Join us on Discord: discord.gg/warsha": ("Contact the developer: malshatti.com", "تواصل مع المطوّر: malshatti.com"),
    "discord.gg/warsha — help, feedback and show-and-tell": ("malshatti.com — help and feedback", "malshatti.com — المساعدة والملاحظات"),
    "Join Our Discord": CONTACT,
    "Join our Discord": CONTACT,
    "Join us on Discord": CONTACT,
    "Join the Discord": CONTACT,
    "Join our community on Discord": CONTACT,
    "Community\nDiscord": ("Contact\nDeveloper", "تواصل\nمع المطوّر"),
    "Discord community": ("Developer website", "موقع المطوّر"),
    "Get help, share feedback and follow development on Discord.": ("Get help and share feedback at malshatti.com.", "احصل على المساعدة وشارك ملاحظاتك عبر malshatti.com."),
    "Loading Warsha…": ("Loading Warsha…", "جارٍ تحميل ورشة…"),
    "More Warsha apps": ("More Warsha apps", "المزيد من تطبيقات ورشة"),
    "Open Warsha to update.": ("Open Warsha to update.", "افتح ورشة للتحديث."),
    "Part of the Warsha suite of open creative tools.": ("Part of Warsha, based on the open-source Warsha suite.", "جزء من ورشة، مبني على مجموعة Warsha مفتوحة المصدر."),
    "Questions, ideas and news from the Warsha team": ("Questions, ideas and news from the developer", "أسئلة وأفكار وأخبار من المطوّر"),
    "Quit Warsha": ("Quit Warsha", "إنهاء ورشة"),
    "Show Warsha": ("Show Warsha", "إظهار ورشة"),
    "Start Warsha when I log in": ("Start Warsha when I log in", "تشغيل ورشة عند تسجيل الدخول"),
    "One of the Warsha apps by the Warsha team and community.": ("One of the Warsha apps, based on the open-source Warsha project.", "أحد تطبيقات ورشة، مبني على مشروع Warsha مفتوح المصدر."),
}
# Second pass (the user asked for no Warsha mention in the apps at all): the attribution
# sentences of the first pass shrink to "Part of Warsha". The licences stay in LICENSE/NOTICE.
MAP.update({
    "Part of Warsha, based on the open-source Warsha suite.": ("Part of Warsha.", "جزء من منصة ورشة."),
    "One of the Warsha apps, based on the open-source Warsha project.": ("One of the Warsha apps.", "أحد تطبيقات ورشة."),
    "An open-source digital audio workstation from the Warsha team.": ("An open-source digital audio workstation.", "محطة عمل صوتية رقمية مفتوحة المصدر."),
    "MIT OR Apache-2.0. Copyright (c) 2026 Warsha Team and the Satr contributors.": ("Free and open source (MIT OR Apache-2.0).", "حر ومفتوح المصدر (MIT OR Apache-2.0)."),
    "MIT OR Apache-2.0 · © 2026 Warsha Team and the Minbar contributors": ("Free and open source (MIT OR Apache-2.0)", "حر ومفتوح المصدر (MIT OR Apache-2.0)"),
})
SUBS2 = [
    (", based on the Warsha family of creative apps.", "."),
    (", based on the Warsha project.", "."),
    (", based on Warsha.", "."),
    (", based on the open-source Warsha suite.", "."),
    (", based on the Warsha apps from the Warsha team.", "."),
]

# Attribution sentences: product wording replaced inside longer strings, Arabic kept.
SUBS = [
    ("Part of the Warsha family of creative apps.", "Part of Warsha, based on the Warsha family of creative apps."),
    ("Part of the Warsha family.", "Part of Warsha, based on the Warsha project."),
    ("Part of the Warsha apps from the Warsha", "Part of Warsha, based on the Warsha apps from the Warsha"),
    ("Part of Warsha.", "Part of Warsha, based on Warsha."),
]
URLS = {"https://discord.gg/warsha": "https://malshatti.com", "https://discord.gg/warsha/": "https://malshatti.com"}


def new_english(s):
    if s in MAP:
        return MAP[s][0]
    t = s
    for a, b in SUBS:
        if a in t and b not in t:
            t = t.replace(a, b)
    for a, b in SUBS2:
        t = t.replace(a, b)
    if t in MAP:
        return MAP[t][0]
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
                for a, b in SUBS2:
                    body = body.replace(rust_lit(a), rust_lit(b))
                return '"' + body + '"'

            t = lit.sub(sub, s)
            if t != s:
                n += 1
                f.write_text(t, encoding="utf-8", newline="")
        print(f"code {app}: {n} files")
        total += n
    # tayf's catalogs are keyed by the English text in every language (build.rs needs the same
    # format keys in each): rename the keys, keep each language's value.
    for f in (UP / "tayf/crates/ui-egui/locales").glob("*.json"):
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
