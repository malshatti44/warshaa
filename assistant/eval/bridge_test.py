"""The same tasks against a live Retoush window (bridge mode), as the in-app chat will run."""
import json, os, secrets, shutil, subprocess, sys, time
from stdio_mcp import Stdio
from assistant import Assistant, Retoush
R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
W = r"E:\warsha-src\assistant\eval\work"
shutil.rmtree(W, ignore_errors=True); os.makedirs(W)
shutil.copy(r"E:\warsha-src\showcase\assets\kuwait\kuwait-towers-panoramic-view-3.jpg", W + r"\towers.jpg")
tok = secrets.token_hex(32); tf = os.path.join(W, ".tok"); open(tf, "w").write(tok)
env = dict(os.environ, RETOUSH_CONTROL_PORT="47901", RETOUSH_CONTROL_TOKEN_FILE=tf,
           RETOUSH_AUTOMATION_READ_ROOT=W, RETOUSH_AUTOMATION_WRITE_ROOT=W)
gui = subprocess.Popen([os.path.join(R, "retoush.exe")], env=env)
time.sleep(8)
m = Stdio([os.path.join(R, "retoush-cli.exe"), "mcp", "--bridge", "127.0.0.1:47901", "--control-token-file", tf,
           "--automation-read-root", W, "--automation-write-root", W])
print("tools", len(m.tools))
ad = Retoush(m)
print("open", ad.call("open_file", {"path": W + r"\towers.jpg"})[:2])
a = Assistant(ad)
for q in ["زد التباين شوي", "أضف ضبابية للخلفية وخل الموضوع واضح", "قصها مربع للانستقرام واحفظها باسم towers-insta.jpg"]:
    t = time.time(); print(">>", q)
    for ev in a.ask(q, state=f"open document: {W}\towers.jpg"):
        print("  ", ev if ev[0] != "tool" else f"[tool] {ev[1]} {json.dumps(ev[2], ensure_ascii=False)[:150]} ok={ev[3]} -> {ev[4][:150]}")
    print(f"   ({time.time()-t:.0f}s)")
ok, img, res = ad.call("look", {})
import base64
if img:
    open(W + r"\look.png", "wb").write(base64.b64decode(img["data"])); print("look saved")
print(ad.state_line())
