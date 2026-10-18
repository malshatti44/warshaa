"""Retoush tasks with automatic checks on the real result (document state and saved files).

  python eval_retoush.py [--think] [--only N,M] [--url URL --model NAME --key KEY]
Each task runs in a fresh headless session with towers.jpg (3840×2784) open. Results → results/<stamp>.json
"""
import hashlib
import json
import os
import shutil
import sys
import time

from assistant import Assistant, Retoush
from stdio_mcp import Stdio

CLI = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release\retoush-cli.exe"
SRC = r"E:\warsha-src\showcase\assets\kuwait\kuwait-towers-panoramic-view-3.jpg"
W = r"E:\warsha-src\assistant\eval\work"
IMG = os.path.join(W, "towers.jpg")


def adj(d, *kinds):
    return [l for l in d["layers"] if l.get("kind") == "Adjustment" and next(iter(l.get("adjustment") or {"": 0})) in kinds]


def hist(d, *words):
    return any(any(w.lower() in h.lower() for w in words) for h in d["history"])


def size_of(path):
    from PIL import Image
    with Image.open(path) as im:
        return im.size


def md5(p):
    return hashlib.md5(open(p, "rb").read()).hexdigest()


# (prompt, pre-steps [(id, params)], check(doc, answer, files) -> (score 0..1, note))
TASKS = [
    ("زد التباين شوي", [],
     lambda d, a, f: (1, "adjustment layer") if adj(d, "BrightnessContrast", "Curves", "Levels")
     else (0.5, "applied directly") if hist(d, "contrast", "curves", "levels") else (0, "no contrast change")),
    ("الصورة غامقة، فتّحها", [],
     lambda d, a, f: (1, "adjustment layer") if adj(d, "BrightnessContrast", "Curves", "Levels", "Exposure")
     else (0.5, "applied directly") if hist(d, "bright", "curves", "levels", "exposure", "shadows") else (0, "not brighter")),
    ("حولها أبيض وأسود", [],
     lambda d, a, f: (1, "B&W layer") if adj(d, "BlackWhite") or adj(d, "HueSaturation")
     else (0.5, "applied directly") if hist(d, "black", "desaturate", "grayscale", "gray") else (0, "still colour")),
    ("قصها مربع للانستقرام واحفظها باسم towers-insta.jpg", [],
     lambda d, a, f: ((1, "square 1080") if size_of(f) == (1080, 1080) else (0.5, f"square {size_of(f)}") if size_of(f)[0] == size_of(f)[1]
                      else (0.2, f"not square {size_of(f)}")) if (f := os.path.join(W, "towers-insta.jpg")) and os.path.exists(f) else (0, "no file")),
    ("صغر الصورة لعرض 1200 بكسل", [],
     lambda d, a, f: (1, "1200×870") if d["width"] == 1200 and abs(d["height"] - 870) <= 2
     else (0.3, f"{d['width']}×{d['height']} (squashed)") if d["width"] == 1200 else (0, f"{d['width']}×{d['height']}")),
    ("دوّرها 90 درجة مع عقارب الساعة", [],
     lambda d, a, f: (1, "rotated") if (d["width"], d["height"]) == (2784, 3840) else (0, f"{d['width']}×{d['height']}")),
    ("اكتب كلمة الكويت في أعلى الصورة بخط كبير أبيض", [],
     lambda d, a, f: (1, "text layer") if any(l.get("kind") in ("Type", "Text") or "الكويت" in (l.get("name") or "") for l in d["layers"])
     else (0, "no text layer")),
    ("شيل الخلفية", [],
     lambda d, a, f: (1, "masked") if hist(d, "background") and any(l.get("hasMask") for l in d["layers"]) else (0, "background kept")),
    ("اعطها لمسة دافئة", [],
     lambda d, a, f: (1, "warm layer") if adj(d, "PhotoFilter", "ColorBalance") else (0.5, "applied directly") if hist(d, "photo filter", "color balance", "warm")
     else (0, "no warmth")),
    ("زد الحدة", [],
     lambda d, a, f: (1, "sharpened") if hist(d, "sharp", "unsharp") else (0, "not sharpened")),
    ("تراجع عن آخر خطوة", [("image.imageRotation.90cw", {})],
     lambda d, a, f: (1, "undone") if (d["width"], d["height"]) == (3840, 2784) else (0, "still rotated")),
    ("احفظها", [("layer.newAdjustmentLayer.brightnessContrast", {"contrast": 20})],
     lambda d, a, f: (0, "ORIGINAL OVERWRITTEN") if md5(IMG) != ORIG_MD5 else
     (1, "saved new file") if [x for x in os.listdir(W) if x not in ("towers.jpg",) and not x.endswith(".json")] else (0.7, "asked / not saved")),
    ("كم مقاس الصورة؟", [],
     lambda d, a, f: (1, "answered") if "3840" in a and "2784" in a and len(d["history"]) == 1 else (0.5, "partial") if "3840" in a else (0, a[:60])),
    ("أضف ضبابية للخلفية وخل الموضوع واضح", [],
     lambda d, a, f: (1, "subject kept sharp") if hist(d, "blur") and any(h in ("Select Subject", "Inverse", "Sky", "Focus Area") for h in d["history"])
     else (0.3, "blurred everything") if hist(d, "blur") else (0, "no blur")),
    ("خلها احترافية للانستقرام", [],
     lambda d, a, f: (round(0.4 * ((d["width"], d["height"]) in ((1080, 1080), (1080, 1350)))
                            + 0.2 * (not hist(d, "rotat"))
                            + 0.4 * bool(adj(d, "BrightnessContrast", "Curves", "Levels", "Vibrance", "HueSaturation") or hist(d, "auto", "sharp")), 2),
                      f"{d['width']}×{d['height']}, history {d['history'][1:]}")),
]


def main():
    global ORIG_MD5
    think = "--think" in sys.argv
    only = None
    if "--only" in sys.argv:
        only = {int(x) for x in sys.argv[sys.argv.index("--only") + 1].split(",")}
    url = sys.argv[sys.argv.index("--url") + 1] if "--url" in sys.argv else "http://127.0.0.1:8790/v1/chat/completions"
    model = sys.argv[sys.argv.index("--model") + 1] if "--model" in sys.argv else "local"
    key = sys.argv[sys.argv.index("--key") + 1] if "--key" in sys.argv else None
    os.makedirs("results", exist_ok=True)
    rows, total = [], 0.0
    for i, (prompt, pre, check) in enumerate(TASKS, 1):
        if only and i not in only:
            continue
        shutil.rmtree(W, ignore_errors=True)
        os.makedirs(W)
        shutil.copy(SRC, IMG)
        ORIG_MD5 = md5(IMG)
        m = Stdio([CLI, "mcp", "--automation-read-root", W, "--automation-write-root", W])
        ad = Retoush(m)
        ad.call("open_file", {"path": IMG})
        for cid, p in pre:
            ad.run(cid, p)
        a = Assistant(ad, url=url, think=think, model=model, api_key=key)
        t = time.time()
        trace, answer = [], ""
        try:
            for ev in a.ask(prompt, state=f"open document: {IMG}, 3840×2784 px"):
                if ev[0] == "tool":
                    trace.append(f"{ev[1]} {json.dumps(ev[2], ensure_ascii=False)[:160]} {'ok' if ev[3] else 'ERR ' + ev[4][:120]}")
                else:
                    answer = ev[1]
            d = json.loads(m.call("doc_inspect", {})[1])
            score, note = check(d, answer, None)
        except Exception as e:  # noqa: BLE001
            score, note = 0, f"crash: {e}"
        dt = time.time() - t
        total += score
        rows.append({"n": i, "prompt": prompt, "score": score, "note": note, "secs": round(dt, 1), "steps": len(trace), "trace": trace, "answer": answer})
        print(f"{i:2d} {score:.1f} {dt:5.1f}s {len(trace):2d} steps  {prompt}  → {note}")
        m.p.kill()
    n = len(rows)
    print(f"\nscore {total:.1f}/{n} = {100 * total / max(1, n):.0f}%  think={think} model={model}")
    stamp = time.strftime("%m%d-%H%M")
    json.dump({"think": think, "model": model, "score": total, "n": n, "rows": rows},
              open(f"results/retoush-{stamp}{'-think' if think else ''}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
