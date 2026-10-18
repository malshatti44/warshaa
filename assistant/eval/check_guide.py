"""Every command id an app's guide names must exist in that app's catalog, and every tool it names must exist.

  python check_guide.py <app>
"""
import json
import re
import sys

from assistant import SPECS

app = sys.argv[1]
guide = open(rf"E:\warsha-src\shared\assistant\knowledge\{app}.md", encoding="utf-8").read()
raw = json.loads(open(f"catalogs/{app}.txt", encoding="utf-8").read())
cat = raw if isinstance(raw, list) else next(v for v in raw.values() if isinstance(v, list))
ids = {c["id"] for c in cat}
spec = SPECS.get(app, {})
tools = {t["name"] for t in json.load(open(f"tools/{app}.json", encoding="utf-8"))}
tools |= {"find_commands", "run_command", "look", "open_file", "new_document", "save_file", "document_info", "crop_to_ratio"}
tools |= {(k[1] if len(k) > 1 and k[1] else k[0]) for k in spec.get("keep", [])}
tools |= {m["name"] for m in spec.get("macros", [])}
tools |= {h["name"] for h in spec.get("helpers", [])}
# Parameter names of helpers and macros are not tools.
tools |= {k for h in spec.get("helpers", []) + spec.get("macros", []) for k in h["props"]}
# Effect ids and other values that are not registry commands (the app's own tools check them).
values = set(spec.get("values", ()))
files = re.compile(r"\.(png|jpe?g|svg|pdf|psd|tif|webp|docx|xlsx|pptx|mp4|wav|mp3|dxf)$", re.I)
used = set(re.findall(r"`([a-zA-Z][\w]*(?:\.[\w<>]+)+)`", guide))
bad = sorted(u for u in used if "<" not in u and u not in ids and u not in values and not files.search(u))
names = set(re.findall(r"`([a-z]+_[a-z_]+)`", guide))
badt = sorted(n for n in names if n not in tools)
print(f"{app}: {len(used)} ids, missing: {bad or 'none'}; tools missing: {badt or 'none'}")
