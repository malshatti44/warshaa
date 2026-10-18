"""Drive a live Satr window like a person, through its keyed control channel.

  python gui_satr.py start           launch Satr with a control port and a short document
  python gui_satr.py shot NAME       window screenshot to <work>/NAME.png
  python gui_satr.py click X Y       click at window points
  python gui_satr.py ask "TEXT"      type into the focused field and press Enter
  python gui_satr.py doc             the document's paragraphs (style, alignment, text)
  python gui_satr.py stop            close the window
"""
import json
import os
import socket
import subprocess
import sys
import time

R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
WORK = os.path.join(os.environ["TEMP"], "claude", "C--Users-elsha", "064225e8-f89c-4264-aa22-d05a67d5553c", "scratchpad", "gui-satr")
PORT = 47932
PIDFILE = os.path.join(WORK, ".pid")


def key():
    return open(os.path.join(os.environ["APPDATA"], "Satr", f"control-key.local-{PORT}"), encoding="utf-8").read().strip()


def call(method, params=None, timeout=60):
    s = socket.create_connection(("127.0.0.1", PORT), timeout=timeout)
    f = s.makefile("rwb")
    f.write((json.dumps({"id": 1, "key": key(), "method": method, "params": params or {}}) + "\n").encode())
    f.flush()
    line = f.readline()
    s.close()
    return json.loads(line or b"{}")


def main():
    cmd = sys.argv[1]
    if cmd == "start":
        os.makedirs(WORK, exist_ok=True)
        env = dict(os.environ, SATR_CONTROL_PORT=str(PORT))
        p = subprocess.Popen([os.path.join(R, "satr.exe")], env=env)
        open(PIDFILE, "w").write(str(p.pid))
        time.sleep(8)
        print(call("ui.resize", {"width": 1500, "height": 900}).get("ok"))
        call("command", {"id": "file.new", "params": {}})
        for line in ["تقرير الرحلة", "ذهبنا إلى المتحف الوطني يوم الخميس.", "تعلمنا الكثير عن تاريخ الكويت."]:
            call("command", {"id": "text.insert", "params": {"text": line}})
            call("command", {"id": "text.newParagraph", "params": {}})
        time.sleep(1)
    elif cmd == "shot":
        path = os.path.join(WORK, sys.argv[2] + ".png")
        r = call("ui.screenshot", {"path": path})
        print(path if r.get("ok") else r)
    elif cmd == "click":
        print(call("ui.click", {"x": float(sys.argv[2]), "y": float(sys.argv[3])}).get("ok"))
    elif cmd == "ask":
        print(call("ui.text", {"text": sys.argv[2]}).get("ok"))
        time.sleep(0.5)
        print(call("ui.key", {"key": "Enter"}).get("ok"))
    elif cmd == "doc":
        r = call("document.inspect", {})
        blocks = ((r.get("result") or {}).get("blocks")) or []
        print(json.dumps([(b.get("style"), b.get("align") or (b.get("props") or {}).get("align"), (b.get("text") or "")[:30]) for b in blocks], ensure_ascii=False))
    elif cmd == "stop":
        pid = int(open(PIDFILE).read())
        subprocess.run(["taskkill", "/PID", str(pid), "/T", "/F"], capture_output=True)
        print("stopped", pid)


if __name__ == "__main__":
    main()
