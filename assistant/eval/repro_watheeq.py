"""Replay the Watheeq GUI request in the prototype against the app's own model server."""
import json
import os
import shutil

from assistant import Assistant, make
from stdio_mcp import Stdio

R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"
info = json.load(open(os.path.join(os.environ["LOCALAPPDATA"], "Warsha", "assistant", "server.json"), encoding="utf-8"))
work = os.path.join(os.environ["USERPROFILE"], "Documents", "warsha-gui-test")
src = os.path.join(work, "report.pdf")
m = Stdio([os.path.join(R, "watheeq-cli.exe"), "mcp", "--root", os.environ["USERPROFILE"]])
ad = make("watheeq", m)
state = (f'app state: the PDF "report.pdf" is open in the window (4 pages), file {src}. You work on files: doc_open that file, '
         "then save the result to a new file next to it; the window opens the PDFs you save")
a = Assistant(ad, url=f"http://127.0.0.1:{info['port']}/v1/chat/completions", api_key=info["key"])
for ev in a.ask("احذف الصفحة الأخيرة", state=state):
    if ev[0] == "tool":
        print("TOOL", ev[1], json.dumps(ev[2], ensure_ascii=False)[:200], "ok" if ev[3] else "ERR " + ev[4][:150])
    else:
        print("ANSWER", ev[1][:300])
print("first user message:", a.messages[1]["content"][:400])
