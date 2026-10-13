"""Cut the 12 app icons out of the user's sheet (source_0.png) and write PNG + ICO per app,
plus the Warsha hub icon (a 2x2 mosaic of four apps).

  python make_icons.py
"""
import pathlib

from PIL import Image, ImageDraw, ImageFilter

HERE = pathlib.Path(__file__).parent
SHEET = Image.open(HERE / "source_0.png").convert("RGB")

# Row-major, as on the sheet: (repo, Latin name)
APPS = [
    ("photocraft", "Retoush"), ("vectorcraft", "Reesha"), ("filmcraft", "Monteer"), ("lightcraft", "Tayf"),
    ("pdfcraft", "Watheeq"), ("effectcraft", "Wamda"), ("designcraft", "Nasaq"), ("wordcraft", "Satr"),
    ("deckcraft", "Minbar"), ("gridcraft", "Kashf"), ("cadcraft", "Mukhattat"), ("soundcraft", "Sada"),
]
ICO_SIZES = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]


def saturated(px):
    r, g, b = px
    return max(r, g, b) - min(r, g, b) > 60


def tile_box(col, row):
    """The bounding box of the coloured tile in grid cell (col, row): a flood fill over coloured
    pixels from a seed inside the tile (white gaps separate it from its neighbours)."""
    w, h = SHEET.size
    cx, cy = (2 * col + 1) * w // 8, (2 * row + 1) * h // 6
    # seeds near the tile's corners and edges; the largest coloured region is the tile itself
    best = None
    for dx, dy in ((-120, -120), (120, -120), (-120, 120), (120, 120), (-135, 0), (135, 0), (0, -135)):
        seed = (cx + dx, cy + dy)
        if not saturated(SHEET.getpixel(seed)):
            continue
        box = fill(seed)
        if best is None or (box[2] - box[0]) * (box[3] - box[1]) > (best[2] - best[0]) * (best[3] - best[1]):
            best = box
    assert best, (col, row)
    return best


def fill(seed):
    w, h = SHEET.size
    px = SHEET.load()
    seen = {seed}
    stack = [seed]
    x0, y0, x1, y1 = seed[0], seed[1], seed[0], seed[1]
    while stack:
        x, y = stack.pop()
        x0, y0, x1, y1 = min(x0, x), min(y0, y), max(x1, x), max(y1, y)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and saturated(px[nx, ny]):
                seen.add((nx, ny))
                stack.append((nx, ny))
    return x0, y0, x1 + 1, y1 + 1


def rounded(img, radius_ratio=0.2):
    size = img.size[0]
    scale = 4
    mask = Image.new("L", (size * scale, size * scale), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size * scale - 1, size * scale - 1), radius=int(size * scale * radius_ratio), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def main():
    out_dir = HERE / "apps"
    out_dir.mkdir(exist_ok=True)
    tiles = {}
    for i, (repo, latin) in enumerate(APPS):
        col, row = i % 4, i // 4
        x0, y0, x1, y1 = tile_box(col, row)
        side = max(x1 - x0, y1 - y0)
        cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
        # inset 3 px so the antialiased edge and drop shadow stay out
        half = side // 2 - 3
        crop = SHEET.crop((cx - half, cy - half, cx + half, cy + half)).resize((512, 512), Image.LANCZOS)
        icon = rounded(crop)
        tiles[repo] = icon
        icon.save(out_dir / f"{repo}.png")
        icon.resize((256, 256), Image.LANCZOS).save(out_dir / f"{repo}-256.png")
        icon.save(out_dir / f"{repo}.ico", sizes=ICO_SIZES)
        print(f"{repo:12s} {latin:10s} tile {x1 - x0}x{y1 - y0}")

    # Warsha hub: four apps on a dark rounded plate
    size = 512
    plate = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    base = Image.new("RGB", (size, size), (24, 26, 34))
    plate = rounded(base)
    pad, gap = 40, 24
    cell = (size - 2 * pad - gap) // 2
    for k, repo in enumerate(["photocraft", "filmcraft", "pdfcraft", "soundcraft"]):
        t = tiles[repo].resize((cell, cell), Image.LANCZOS)
        x = pad + (k % 2) * (cell + gap)
        y = pad + (k // 2) * (cell + gap)
        shadow = Image.new("RGBA", (cell, cell), (0, 0, 0, 0))
        shadow.putalpha(t.getchannel("A").point(lambda a: a * 0.45))
        shadow = shadow.filter(ImageFilter.GaussianBlur(6))
        plate.alpha_composite(shadow, (x + 3, y + 5))
        plate.alpha_composite(t, (x, y))
    plate.save(out_dir / "warsha.png")
    plate.resize((256, 256), Image.LANCZOS).save(out_dir / "warsha-256.png")
    plate.save(out_dir / "warsha.ico", sizes=ICO_SIZES)
    print("warsha hub icon written")


if __name__ == "__main__":
    main()
