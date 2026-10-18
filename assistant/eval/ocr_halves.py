"""Each line cut at a word gap near its middle; each half read on its own (right half first: RTL)."""
import difflib, os, sys, time
from PIL import Image
import ocr_experiment as o

page = o.scanned(Image.open(os.path.join(o.W, "long-200.png")))
bands = o.line_bands(page)
x0, x1 = o.horizontal_extent(page)
px = page.load()


def cut(y0, y1):
    """A column with no ink nearest the middle (a word gap)."""
    mid = (x0 + x1) // 2
    span = (x1 - x0) // 6
    def empty(x):
        return all(px[x, y] >= 160 for y in range(y0, y1 + 1))
    for d in range(span):
        for x in (mid + d, mid - d):
            if empty(x) and empty(x + 1) and empty(x - 1):
                return x
    return mid


t = time.time()
out = []
for y0, y1 in bands:
    c = cut(y0, y1)
    right = page.crop((c - 10, max(0, y0 - 12), min(page.width, x1 + 20), y1 + 12))
    left = page.crop((max(0, x0 - 20), max(0, y0 - 12), c + 10, y1 + 12))
    out.append(o.ask(right).replace("\n", " ") + " " + o.ask(left).replace("\n", " "))
text = "\n".join(out)
open(os.path.join(o.W, "ocr-halves.txt"), "w", encoding="utf-8").write(text)
truth = open(os.path.join(o.W, "truth.txt"), encoding="utf-8").read().split()
ops = [(op, " ".join(truth[a1:a2]), " ".join(text.split()[b1:b2])) for op, a1, a2, b1, b2 in difflib.SequenceMatcher(None, truth, text.split()).get_opcodes() if op != "equal"]
print(f"{time.time() - t:.0f}s word errors", sum(max(len(a.split()), len(b.split())) for _, a, b in ops), "of", len(truth))
for x in ops:
    print("  ", *x)
