"""Dry-run an app's tasks without the model: setup, pre, then the check on the untouched state.
Every check should run without an exception and score (about) zero.

  python dry_tasks.py <app>…
"""
import importlib
import os
import shutil
import sys
import traceback

from stdio_mcp import Stdio

R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"

for app in sys.argv[1:]:
    T = importlib.import_module(f"tasks.{app}")
    work = rf"E:\warsha-src\assistant\eval\work-dry-{app}"
    print(f"== {app}")
    for i, (prompt, pre, check) in enumerate(T.TASKS, 1):
        shutil.rmtree(work, ignore_errors=True)
        os.makedirs(work)
        m = Stdio([os.path.join(R, f"{app}-cli.exe"), "mcp"] + [a.replace("{work}", work) for a in getattr(T, "CLI_ARGS", [])])
        try:
            T.setup(m, None, work)
            if pre:
                pre(m, work)
            score, note = check(m, "", work)
            print(f"  {i}. {score} {note[:90]}")
        except Exception:
            print(f"  {i}. EXCEPTION")
            traceback.print_exc()
        finally:
            m.close() if hasattr(m, "close") else None
    shutil.rmtree(work, ignore_errors=True)
