"""Drive a live Watheeq window through its UI control channel (`watheeq --control FILE`).

  python gui_watheeq.py start           make report.pdf (4 pages) and open it in Watheeq
  python gui_watheeq.py shot NAME       window screenshot to <work>/NAME.png
  python gui_watheeq.py click X Y       click at window points (or: click-label TEXT)
  python gui_watheeq.py ask "TEXT"      type into the focused field and press Enter
  python gui_watheeq.py state           the open tabs
  python gui_watheeq.py stop
"""
import base64
import json
import os
import socket
import subprocess
import sys
import time

from stdio_mcp import Stdio

R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
WORK = os.path.join(os.environ["USERPROFILE"], "Documents", "warsha-gui-test")
CTL = os.path.join(WORK, ".control.json")
PIDFILE = os.path.join(WORK, ".pid")


def rpc(method, params=None, timeout=60):
    info = json.load(open(CTL, encoding="utf-8"))
    s = socket.create_connection(("127.0.0.1", info["port"]), timeout=timeout)
    f = s.makefile("rwb")
    for i, (m, p) in enumerate([("auth", {"token": info["token"]}), (method, params or {})], 1):
        f.write((json.dumps({"jsonrpc": "2.0", "id": i, "method": m, "params": p}) + "\n").encode())
        f.flush()
        reply = json.loads(f.readline() or b"{}")
    s.close()
    return reply


def main():
    cmd = sys.argv[1]
    if cmd == "start":
        os.makedirs(WORK, exist_ok=True)
        m = Stdio([os.path.join(R, "watheeq-cli.exe"), "mcp"])
        paths = []
        for i, (t, b) in enumerate([("Introduction", "Welcome."), ("Sales", "Sales grew."), ("Budget", "The Budget is ready."), ("Summary", "Thanks.")], 1):
            p = os.path.join(WORK, f"_p{i}.txt")
            open(p, "w", encoding="utf-8").write(f"Page {i}: {t}\n\n{b}\n")
            paths.append(p)
        m.call("doc_create_multiple", {"paths": paths, "mode": "combine", "out": os.path.join(WORK, "report.pdf")})
        for p in paths:
            os.remove(p)
        for f in os.listdir(WORK):
            if f.endswith(".pdf") and f != "report.pdf":
                os.remove(os.path.join(WORK, f))
        if os.path.exists(CTL):
            os.remove(CTL)
        proc = subprocess.Popen([os.path.join(R, "watheeq.exe"), "--control", CTL, os.path.join(WORK, "report.pdf")])
        open(PIDFILE, "w").write(str(proc.pid))
        for _ in range(40):
            if os.path.exists(CTL):
                break
            time.sleep(0.5)
        time.sleep(4)
        print(rpc("ui.resize", {"width": 1500, "height": 900}).get("result"))
    elif cmd == "shot":
        r = rpc("ui.screenshot", {})
        res = r.get("result") or {}
        data = res.get("png_base64") or res.get("data")
        path = os.path.join(WORK, sys.argv[2] + ".png")
        if data:
            open(path, "wb").write(base64.b64decode(data))
            print(path)
        else:
            print(json.dumps(r)[:300])
    elif cmd == "click":
        print(rpc("ui.click", {"x": float(sys.argv[2]), "y": float(sys.argv[3])}).get("result"))
    elif cmd == "click-label":
        print(rpc("ui.click", {"label": sys.argv[2]}))
    elif cmd == "ask":
        print(rpc("ui.type", {"text": sys.argv[2]}).get("result"))
        time.sleep(0.5)
        print(rpc("ui.key", {"key": "Enter"}).get("result"))
    elif cmd == "state":
        print(json.dumps(rpc("ui.state", {}).get("result"), ensure_ascii=False)[:800])
    elif cmd == "stop":
        pid = int(open(PIDFILE).read())
        subprocess.run(["taskkill", "/PID", str(pid), "/T", "/F"], capture_output=True)
        print("stopped", pid)


if __name__ == "__main__":
    main()
