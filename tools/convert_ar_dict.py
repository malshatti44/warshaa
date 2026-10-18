"""Convert the Ayaspell Arabic Hunspell dictionary (ar.aff/ar.dic, GPL-2/LGPL-2.1/MPL-1.1) into the
form Satr's spelling engine reads: one-character flags (each two-letter `FLAG long` flag becomes a
private-use character), `AF` aliases expanded in the `.dic` and in the affix rules' continuation
classes, comments dropped from the `.dic`. `IGNORE` (harakat, tatweel) and `ICONV` (alef wasla,
lam-alef ligatures) are left to Satr's Arabic module, which applies them before looking a word up.

  python convert_ar_dict.py <in-dir with ar.aff, ar.dic> <out-dir>
"""
import pathlib
import re
import sys

src, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
aff = (src / "ar.aff").read_text(encoding="utf-8").splitlines()
dic = (src / "ar.dic").read_text(encoding="utf-8").splitlines()

aliases = {}  # alias number → list of long flags
mapping = {}  # long flag → private-use character


def flag_char(f):
    if f not in mapping:
        mapping[f] = chr(0xE000 + len(mapping))
    return mapping[f]


def long_flags(s):
    return [s[i:i + 2] for i in range(0, len(s) - 1, 2)]


def flags(field):
    """A flag field (`299` alias or `TaTb` long flags) as one-character flags."""
    field = field.strip()
    if not field:
        return ""
    if field.isdigit():
        return "".join(flag_char(f) for f in aliases.get(int(field), []))
    return "".join(flag_char(f) for f in long_flags(field))


# Aliases first (they come before the rules in the file).
af_seen = False
for line in aff:
    m = re.match(r"^AF\s+(\S+)", line)
    if m:
        if not af_seen:
            af_seen = True  # the count line
            continue
        aliases[len(aliases) + 1] = long_flags(m.group(1))

aff_out = []
af_header = True
for line in aff:
    f = line.split()
    if not f:
        aff_out.append(line)
        continue
    d = f[0]
    if d in ("AF", "AM", "IGNORE", "ICONV"):
        continue
    if d == "FLAG":
        aff_out.append("FLAG UTF-8")
        continue
    if d in ("PFX", "SFX") and len(f) >= 4:
        if len(f) == 4 and f[2] in ("Y", "N"):  # header: PFX flag cross count
            aff_out.append(f"{d} {flag_char(f[1])} {f[2]} {f[3]}")
            continue
        strip, add = f[2], f[3]
        if "/" in add:
            base, cont = add.split("/", 1)
            add = base + "/" + flags(cont)
        cond = f[4] if len(f) > 4 else "."
        aff_out.append(f"{d} {flag_char(f[1])} {strip} {add} {cond}")
        continue
    aff_out.append(line)

entries = []
for line in dic[1:]:
    s = line.strip()
    if not s or s.startswith("#"):
        continue
    word = s.split()[0]  # morphological fields dropped
    if "/" in word:
        w, fl = word.split("/", 1)
        word = w + "/" + flags(fl)
    entries.append(word)

out.mkdir(parents=True, exist_ok=True)
(out / "ar.aff").write_text("# Ayaspell Arabic dictionary (GPL-2.0/LGPL-2.1/MPL-1.1), converted for Satr: one-character flags.\n" + "\n".join(aff_out) + "\n", encoding="utf-8")
(out / "ar.dic").write_text(f"{len(entries)}\n" + "\n".join(entries) + "\n", encoding="utf-8")
print(f"{len(aliases)} aliases, {len(mapping)} flags, {len(entries)} stems")
