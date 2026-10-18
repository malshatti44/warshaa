"""Drive a live window of an app whose control channel has no key (Mukhattat, Tayf, Sada, Nasaq…).

  python gui_plain.py APP start [CMD JSON]   launch APP with a control port (then run one engine command)
  python gui_plain.py APP shot NAME          window screenshot to <work>/NAME.png
  python gui_plain.py APP click X Y          click at window points
  python gui_plain.py APP ask "TEXT"         type into the focused field and press Enter
  python gui_plain.py APP cmd ID JSON        run an engine command
  python gui_plain.py APP stop
"""
import json
import os
import socket
import subprocess
import sys
import time

R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
WORK = os.path.join(os.environ["USERPROFILE"], "Documents", "warsha-gui-test")
PORT = 47933


def call(method, params=None, timeout=60):
    s = socket.create_connection(("127.0.0.1", PORT), timeout=timeout)
    f = s.makefile("rwb")
    f.write((json.dumps({"id": 1, "method": method, "params": params or {}}) + "\n").encode())
    f.flush()
    line = f.readline()
    s.close()
    return json.loads(line or b"{}")


def main():
    app, cmd = sys.argv[1], sys.argv[2]
    pidfile = os.path.join(WORK, f".{app}.pid")
    if cmd == "start":
        os.makedirs(WORK, exist_ok=True)
        env = dict(os.environ, RUST_LOG="info,warsha_assistant=info", **{f"{app.upper()}_CONTROL_PORT": str(PORT)})
        p = subprocess.Popen([os.path.join(R, f"{app}.exe")], env=env)
        open(pidfile, "w").write(str(p.pid))
        time.sleep(8)
        print(call("ui.resize", {"width": 1500, "height": 900}).get("ok"))
        if len(sys.argv) > 4:
            print(json.dumps(call("command", {"command": sys.argv[3], "params": json.loads(sys.argv[4])}))[:200])
    elif cmd == "shot":
        path = os.path.join(WORK, sys.argv[3] + ".png")
        r = call("ui.screenshot", {"path": path})
        print(path if r.get("ok") else json.dumps(r)[:200])
    elif cmd == "click":
        print(call("ui.click", {"x": float(sys.argv[3]), "y": float(sys.argv[4])}).get("ok"))
    elif cmd == "ask":
        print(call("ui.text", {"text": sys.argv[3]}).get("ok"))
        time.sleep(0.5)
        print(call("ui.key", {"key": "Enter"}).get("ok"))
    elif cmd == "cmd":
        print(json.dumps(call("command", {"command": sys.argv[3], "params": json.loads(sys.argv[4])}), ensure_ascii=False)[:600])
    elif cmd == "stop":
        pid = int(open(pidfile).read())
        subprocess.run(["taskkill", "/PID", str(pid), "/T", "/F"], capture_output=True)
        print("stopped", pid)


if __name__ == "__main__":
    main()
