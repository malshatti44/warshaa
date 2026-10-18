import json, sys, time
from stdio_mcp import Stdio
from assistant import Assistant
W = r"E:\warsha-src\assistant\eval\work"
m = Stdio([r"E:\warsha-src\target\x86_64-pc-windows-msvc\release\retoush-cli.exe", "mcp", "--automation-read-root", W, "--automation-write-root", W])
a = Assistant("retoush", m, think="--think" in sys.argv)
print("system prompt chars", len(a.messages[0]["content"]), "tools", len(a.tools), "tool chars", len(json.dumps(a.tools)))
for q in [rf"افتح الصورة {W}\towers.jpg", "الصورة باهتة شوي، خلها أوضح وألوانها أحلى", "صغرها للانستقرام واحفظها نسخة جديدة"]:
    t = time.time()
    print("\n>>", q)
    for ev in a.ask(q):
        print("  ", ev if ev[0] != "tool" else f"[tool] {ev[1]} {json.dumps(ev[2], ensure_ascii=False)[:200]} ok={ev[3]} -> {ev[4][:160]}")
    print(f"   ({time.time()-t:.0f}s)")
print(a.log)
