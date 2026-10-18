import json, sys, os
from stdio_mcp import Stdio
R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
apps = {"retoush": [], "reesha": [], "monteer": [], "tayf": ["--compact"], "watheeq": ["--compact", "--root", r"E:\warsha-src\assistant\eval"],
        "wamda": [], "nasaq": [], "satr": [], "minbar": [], "kashf": [], "mukhattat": [], "sada": []}
for a, extra in apps.items():
    try:
        m = Stdio([os.path.join(R, f"{a}-cli.exe"), "mcp"] + extra)
        json.dump(m.tools, open(f"tools/{a}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        names = [t["name"] for t in m.tools]
        cmdish = [n for n in names if "command" in n or "action" in n or n.endswith("_list")]
        print(f"{a:12s} {len(m.tools):2d} tools {len(json.dumps(m.tools))//1000:3d}k chars  {cmdish}")
        m.p.kill()
    except Exception as e:
        print(a, "ERR", e)
