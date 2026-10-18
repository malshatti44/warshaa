"""Drive a live app window like a person: open the chat panel, type a request, wait, check the document.

  python gui_test.py start            launch Retoush with a control channel for this driver, open the test image
  python gui_test.py shot NAME        save a window screenshot to <work>/NAME.png
  python gui_test.py click X Y        click at window points
  python gui_test.py ask "TEXT"       type into the focused field and press Enter
  python gui_test.py doc              the document's layers and history
  python gui_test.py stop             close the window
"""
import base64
import json
import os
import secrets
import shutil
import subprocess
import sys
import time

from stdio_mcp import Stdio

R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
WORK = os.path.join(os.environ["TEMP"], "claude", "C--Users-elsha", "064225e8-f89c-4264-aa22-d05a67d5553c", "scratchpad", "gui-test")
PORT = "47931"
TOKEN = os.path.join(WORK, ".token")
PIDFILE = os.path.join(WORK, ".pid")


def bridge():
    return Stdio([os.path.join(R, "retoush-cli.exe"), "mcp", "--bridge", f"127.0.0.1:{PORT}", "--control-token-file", TOKEN,
                  "--automation-read-root", WORK, "--automation-write-root", WORK])


def control(m, method, params=None):
    ok, text, res = m.call("control_call", {"method": method, "params": params or {}})
    return ok, text, res


def main():
    cmd = sys.argv[1]
    if cmd == "start":
        shutil.rmtree(WORK, ignore_errors=True)
        os.makedirs(WORK)
        shutil.copy(r"E:\warsha-src\showcase\assets\kuwait\kuwait-towers-panoramic-view-3.jpg", os.path.join(WORK, "towers.jpg"))
        open(TOKEN, "w").write(secrets.token_hex(32))
        env = dict(os.environ, RETOUSH_CONTROL_PORT=PORT, RETOUSH_CONTROL_TOKEN_FILE=TOKEN,
                   RETOUSH_AUTOMATION_READ_ROOT=WORK, RETOUSH_AUTOMATION_WRITE_ROOT=WORK)
        p = subprocess.Popen([os.path.join(R, "retoush.exe")], env=env)
        open(PIDFILE, "w").write(str(p.pid))
        time.sleep(10)
        m = bridge()
        print(m.call("doc_open", {"path": os.path.join(WORK, "towers.jpg")})[1][:200])
        control(m, "ui.resize", {"width": 1500, "height": 900})
        time.sleep(1)
    elif cmd == "shot":
        m = bridge()
        ok, text, res = m.call("ui_screenshot", {})
        img = next((c for c in (res or {}).get("content", []) if c.get("type") == "image"), None)
        path = os.path.join(WORK, sys.argv[2] + ".png")
        if img:
            open(path, "wb").write(base64.b64decode(img["data"]))
            print(path)
        else:
            print("no image", text[:200])
    elif cmd == "click":
        m = bridge()
        print(control(m, "ui.click", {"x": float(sys.argv[2]), "y": float(sys.argv[3])})[:2])
    elif cmd == "ask":
        m = bridge()
        print(control(m, "ui.type", {"text": sys.argv[2]})[:2])
        time.sleep(0.5)
        print(control(m, "ui.key", {"key": "Enter"})[:2])
    elif cmd == "doc":
        m = bridge()
        d = json.loads(m.call("doc_inspect", {})[1])
        print(json.dumps({"size": [d["width"], d["height"]], "history": d["history"],
                          "layers": [(l["name"], l["kind"]) for l in d["layers"]]}, ensure_ascii=False))
    elif cmd == "stop":
        pid = int(open(PIDFILE).read())
        subprocess.run(["taskkill", "/PID", str(pid), "/T", "/F"], capture_output=True)
        print("stopped", pid)


if __name__ == "__main__":
    main()
