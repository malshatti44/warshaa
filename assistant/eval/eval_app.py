"""Run an app's assistant tasks with automatic checks on the real result.

  python eval_app.py <app> [--think] [--only 1,2] [--url URL --model NAME --key KEY] [--quiet]
Tasks live in tasks/<app>.py: CLI_ARGS, setup(mcp, ad, work) -> state line,
TASKS = [(prompt, pre(mcp, work) | None, check(mcp, answer, work) -> (score, note))].
"""
import importlib
import json
import os
import shutil
import sys
import time

from assistant import Assistant, make
from stdio_mcp import Stdio

R = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release"


def arg(name, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def main():
    app = sys.argv[1]
    T = importlib.import_module(f"tasks.{app}")
    think = "--think" in sys.argv
    only = {int(x) for x in arg("--only").split(",")} if arg("--only") else None
    url = arg("--url", "http://127.0.0.1:8790/v1/chat/completions")
    model, key = arg("--model", "local"), arg("--key")
    work = rf"E:\warsha-src\assistant\eval\work-{app}"
    os.makedirs("results", exist_ok=True)
    rows, total = [], 0.0
    for i, (prompt, pre, check) in enumerate(T.TASKS, 1):
        if only and i not in only:
            continue
        shutil.rmtree(work, ignore_errors=True)
        os.makedirs(work)
        m = Stdio([os.path.join(R, f"{app}-cli.exe"), "mcp"] + [a.replace("{work}", work) for a in getattr(T, "CLI_ARGS", [])])
        ad = make(app, m)
        state = T.setup(m, ad, work)
        if pre:
            pre(m, work)
        a = Assistant(ad, url=url, think=think, model=model, api_key=key)
        t = time.time()
        trace, answer = [], ""
        try:
            for ev in a.ask(prompt.replace("{work}", work), state=state):
                if ev[0] == "tool":
                    trace.append(f"{ev[1]} {json.dumps(ev[2], ensure_ascii=False)[:180]} {'ok' if ev[3] else 'ERR ' + ev[4][:140]}")
                else:
                    answer = ev[1]
            score, note = check(m, answer, work)
        except Exception as e:  # noqa: BLE001
            score, note = 0, f"crash: {type(e).__name__}: {e}"
        dt = time.time() - t
        total += score
        rows.append({"n": i, "prompt": prompt, "score": score, "note": note, "secs": round(dt, 1), "steps": len(trace), "trace": trace, "answer": answer})
        print(f"{i:2d} {score:.1f} {dt:5.1f}s {len(trace):2d} steps  {prompt}  → {note}", flush=True)
        if "--quiet" not in sys.argv and score < 1:
            for t_ in trace:
                print("      ", t_)
            print("       >>", answer[:300].replace("\n", " "))
        m.p.kill()
    n = len(rows)
    print(f"\n{app}: {total:.1f}/{n} = {100 * total / max(1, n):.0f}%  think={think} model={model}")
    json.dump({"app": app, "think": think, "model": model, "score": total, "n": n, "rows": rows},
              open(f"results/{app}-{time.strftime('%m%d-%H%M')}{'-think' if think else ''}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
