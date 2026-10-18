"""How should a page be cut for the local vision model to read Arabic accurately? Lines per request
vs accuracy (character error rate against the known text) and time."""
import base64
import difflib
import io
import json
import os
import random
import sys
import time
import urllib.request

from PIL import Image, ImageFilter

W = r"C:\Users\elsha\Documents\warsha-gui-test\ar"
URL = "http://127.0.0.1:8790/v1/chat/completions"
EXACT = os.environ.get("EXACT") == "1"
PROMPT = ("Transcribe ALL the Arabic text in this image exactly as written, line by line, from the first word of each line to its last; do not skip or summarise any word. Output only the text, "
          "no translation, no comments, no numbering.")


def scanned(im):
    """Grey, a hair blurred, a little noise: like a decent scan."""
    im = im.convert("L").filter(ImageFilter.GaussianBlur(0.6))
    px = im.load()
    rnd = random.Random(1)
    for _ in range(im.width * im.height // 60):
        x, y = rnd.randrange(im.width), rnd.randrange(im.height)
        px[x, y] = max(0, min(255, px[x, y] + rnd.randint(-60, 60)))
    return im


def line_bands(im, dark=160, min_gap=6):
    """Rows of ink, merged across small gaps: one band per text line."""
    w, h = im.size
    px = im.load()
    ink = [sum(1 for x in range(0, w, 2) if px[x, y] < dark) for y in range(h)]
    thr = max(2, w // 400)
    bands, start, gap = [], None, 0
    for y, n in enumerate(ink):
        if n > thr:
            if start is None:
                start = y
            gap = 0
        elif start is not None:
            gap += 1
            if gap > min_gap:
                bands.append((start, y - gap))
                start, gap = None, 0
    if start is not None:
        bands.append((start, h - 1))
    return [b for b in bands if b[1] - b[0] >= 8]


def horizontal_extent(im, dark=160):
    w, h = im.size
    px = im.load()
    cols = [x for x in range(w) if any(px[x, y] < dark for y in range(0, h, 3))]
    return (cols[0], cols[-1]) if cols else (0, w - 1)


def ask(img, n=None):
    buf = io.BytesIO()
    img.save(buf, "PNG")
    body = {"model": "local", "temperature": 0.0, "max_tokens": 1500, "chat_template_kwargs": {"enable_thinking": False},
            "messages": [{"role": "user", "content": [{"type": "text", "text": (f"This image has exactly {n} line(s) of text; output exactly {n} line(s). " if n and EXACT else "") + PROMPT},
                                                      {"type": "image_url", "image_url": {"url": "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()}}]}]}
    r = urllib.request.urlopen(urllib.request.Request(URL, json.dumps(body).encode(), {"Content-Type": "application/json"}), timeout=600)
    return json.load(r)["choices"][0]["message"]["content"].strip()


def cer(a, b):
    a, b = " ".join(a.split()), " ".join(b.split())
    return 1 - difflib.SequenceMatcher(None, a, b).ratio()


def main():
    truth = open(os.path.join(W, "truth.txt"), encoding="utf-8").read()
    page = scanned(Image.open(os.path.join(W, "long-" + os.environ.get("DPI","200") + ".png")))
    bands = line_bands(page)
    x0, x1 = horizontal_extent(page)
    print(f"{len(bands)} lines found")
    for per in [int(a) for a in sys.argv[1:]] or [1, 3, 6]:
        t = time.time()
        out = []
        for i in range(0, len(bands), per):
            group = bands[i:i + per]
            y0, y1 = group[0][0], group[-1][1]
            crop = page.crop((max(0, x0 - 20), max(0, y0 - 12), min(page.width, x1 + 20), min(page.height, y1 + 12)))
            out.append(ask(crop, len(group)))
        text = "\n".join(out)
        print(f"--- {per} line(s)/request: {time.time() - t:.0f}s, CER {cer(text, truth) * 100:.1f}%")
        open(os.path.join(W, f"ocr-{per}.txt"), "w", encoding="utf-8").write(text)


if __name__ == "__main__":
    main()
