"""peek.py <app> <regex> — commands whose id/label/menu match, with params (for writing guides)."""
import json, re, sys
app, pat = sys.argv[1], re.compile(sys.argv[2], re.I)
raw = json.loads(open(f"catalogs/{app}.txt", encoding="utf-8").read())
cat = raw if isinstance(raw, list) else next(v for v in raw.values() if isinstance(v, list))
n = 0
for c in cat:
    menu = c.get("menu") or c.get("location") or ""
    menu = " > ".join(menu) if isinstance(menu, list) else str(menu)
    hay = f"{c['id']} {c.get('label','')} {menu}"
    if pat.search(hay):
        p = c.get("params")
        p = p if isinstance(p, str) else json.dumps(p.get("properties") if isinstance(p, dict) and "properties" in p else p, ensure_ascii=False)
        print(f"{c['id']} | {c.get('label','')} | {menu} | {(p or '')[:int(sys.argv[3]) if len(sys.argv) > 3 else 160]}")
        n += 1
print(f"-- {n} of {len(cat)}")
