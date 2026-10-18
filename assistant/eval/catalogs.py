import json, os
from stdio_mcp import Stdio
R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
apps = {"retoush": ([], "command_list"), "reesha": ([], "command_list"), "monteer": ([], "command_list"),
        "tayf": (["--compact"], "command_list"), "watheeq": (["--compact", "--root", r"E:\warsha-src\assistant\eval"], "command_list"),
        "wamda": ([], "command_list"), "nasaq": ([], "list_commands"), "satr": ([], "list_commands"),
        "minbar": ([], "list_commands"), "kashf": ([], "list_commands"), "mukhattat": ([], "list_commands"), "sada": ([], "list_commands")}
for a, (extra, tool) in apps.items():
    m = Stdio([os.path.join(R, f"{a}-cli.exe"), "mcp"] + extra)
    ok, text, res = m.call(tool, {})
    open(f"catalogs/{a}.txt", "w", encoding="utf-8").write(text)
    try:
        d = json.loads(text)
    except ValueError:
        d = None
    if isinstance(d, dict):
        keys = list(d.keys())
        items = next((v for v in d.values() if isinstance(v, list)), [])
    else:
        keys, items = None, d or []
    first = json.dumps(items[0], ensure_ascii=False)[:300] if items else text[:300]
    print(f"== {a} ok={ok} chars={len(text)} top={keys} n={len(items)}\n   {first}")
    m.p.kill()
