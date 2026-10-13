"""Warsha (ورشة) brand marks, written over each repo's docs/brand/artcraft-* files.

The ArtCraft brand terms require a modified version to remove the ArtCraft marks or replace them
with its own: every file keeps its name (the code includes them by path) and gets Warsha artwork.

  mark      four rounded tiles in the colours of ريتوش، مونتير، وثيق، صدى
  wordmark  mark + «ورشة» (IBM Plex Sans Arabic SemiBold) + "WARSHA" (Inter Bold), as outlines

  python make_brand.py
"""
import pathlib

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageChops, ImageDraw

HERE = pathlib.Path(__file__).parent
UP = pathlib.Path(r"E:\craft-ar\upstream")
ARABIC_FONT = pathlib.Path(r"E:\craft-ar\shared\epaint\fonts\IBMPlexSansArabic-SemiBold.ttf")
LATIN_FONT = UP / "effectcraft/assets/fonts/Inter-Bold.ttf"
TILES = ["#1E6BF0", "#6A1FD1", "#D9262C", "#8B2BE2"]
INK_DARK, INK_WHITE = "#1B1D24", "#FFFFFF"
REPOS = ["photocraft", "vectorcraft", "filmcraft", "lightcraft", "pdfcraft", "effectcraft", "designcraft",
         "wordcraft", "deckcraft", "gridcraft", "cadcraft", "soundcraft", "craft-launcher"]


# ---- geometry -----------------------------------------------------------------------------------

def tiles(x, y, size, colors):
    """The mark: 2x2 rounded tiles in a `size` square at (x, y), as (rect, radius, colour)."""
    gap = size * 0.09
    cell = (size - gap) / 2
    out = []
    for k, c in enumerate(colors):
        cx = x + (k % 2) * (cell + gap)
        cy = y + (k // 2) * (cell + gap)
        out.append(((cx, cy, cx + cell, cy + cell), cell * 0.24, c))
    return out


def shape(font_path, text, size, direction):
    """Glyph outlines of `text` at font size `size`: (svg path data, recording) and its advance."""
    blob = hb.Blob.from_file_path(str(font_path))
    face = hb.Face(blob)
    font = hb.Font(face)
    upem = face.upem
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    buf.direction = direction
    hb.shape(font, buf, {})
    tt = TTFont(str(font_path))
    gs = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    scale = size / upem
    svg_pen = SVGPathPen(gs)
    rec = DecomposingRecordingPen(gs)
    x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        # font units are y-up: flip into y-down drawing space, baseline at y = 0
        t = (scale, 0, 0, -scale, (x + pos.x_offset) * scale, -pos.y_offset * scale)
        gs[name].draw(TransformPen(svg_pen, t))
        gs[name].draw(TransformPen(rec, t))
        x += pos.x_advance
    return svg_pen.getCommands(), rec, x * scale


def flatten(rec, dx, dy, k):
    """Contours of a RecordingPen as point lists (curves sampled), offset by (dx, dy), scaled by k."""
    contours, cur, last = [], [], (0, 0)

    def P(p):
        return ((p[0] + dx) * k, (p[1] + dy) * k)

    for op, args in rec.value:
        if op == "moveTo":
            cur = [P(args[0])]
            last = args[0]
        elif op == "lineTo":
            cur.append(P(args[0]))
            last = args[0]
        elif op == "qCurveTo":
            pts = [last] + list(args)
            # implied on-curve points between consecutive off-curve points
            for i in range(1, len(pts) - 1):
                p0 = pts[i - 1] if i == 1 else ((pts[i - 1][0] + pts[i][0]) / 2, (pts[i - 1][1] + pts[i][1]) / 2)
                p1 = pts[i]
                p2 = pts[i + 1] if i == len(pts) - 2 else ((pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2)
                for s in range(1, 9):
                    t = s / 8
                    cur.append(P(((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
                                  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1])))
            last = pts[-1]
        elif op == "curveTo":
            p0, (p1, p2, p3) = last, args
            for s in range(1, 13):
                t = s / 12
                a, b, c, d = (1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t * t, t ** 3
                cur.append(P((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1])))
            last = p3
        elif op in ("closePath", "endPath"):
            if len(cur) > 2:
                contours.append(cur)
            cur = []
    return contours


def fill_contours(img, contours, color):
    """Nonzero fill of `contours` onto `img`: outlines wound one way are filled (overlapping ones
    merge), the counters wound the other way are cut out."""
    def area(c):
        return sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(c, c[1:] + c[:1])) / 2

    if not contours:
        return
    outer_sign = 1 if area(max(contours, key=lambda c: abs(area(c)))) > 0 else -1
    fill = Image.new("1", img.size, 0)
    holes = Image.new("1", img.size, 0)
    for c in contours:
        target = fill if area(c) * outer_sign > 0 else holes
        ImageDraw.Draw(target).polygon(c, fill=1)
    mask = ImageChops.logical_and(fill, ImageChops.invert(holes))
    solid = Image.new("RGBA", img.size, color)
    img.paste(solid, (0, 0), mask.convert("L"))


# ---- artwork ------------------------------------------------------------------------------------

def mark_svg(colors):
    rects = "".join(f'<rect x="{r[0]:.2f}" y="{r[1]:.2f}" width="{r[2] - r[0]:.2f}" height="{r[3] - r[1]:.2f}" rx="{rad:.2f}" fill="{c}"/>'
                    for r, rad, c in tiles(0, 0, 100, colors))
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Warsha"><title>Warsha</title>{rects}</svg>\n'


def mark_png(size, colors):
    k = 4
    img = Image.new("RGBA", (size * k, size * k), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for r, rad, c in tiles(0, 0, size * k, colors):
        d.rounded_rectangle(r, radius=rad, fill=c)
    return img.resize((size, size), Image.LANCZOS)


def wordmark(ink):
    """(svg, png) of mark + «ورشة» + WARSHA. Height 108 units like the original wordmark."""
    H = 108
    ar_path, ar_rec, ar_w = shape(ARABIC_FONT, "ورشة", 104, "rtl")
    la_path, la_rec, la_w = shape(LATIN_FONT, "WARSHA", 62, "ltr")
    mark = H * 0.86
    x_mark, gap1, gap2 = 0, H * 0.28, H * 0.30
    x_ar = x_mark + mark + gap1
    x_la = x_ar + ar_w + gap2
    width = x_la + la_w + 2
    base_ar, base_la = H * 0.80, H * 0.75
    y_mark = (H - mark) / 2
    rects = "".join(f'<rect x="{r[0]:.2f}" y="{r[1]:.2f}" width="{r[2] - r[0]:.2f}" height="{r[3] - r[1]:.2f}" rx="{rad:.2f}" fill="{c}"/>'
                    for r, rad, c in tiles(x_mark, y_mark, mark, TILES))
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.2f} {H}" role="img" aria-label="Warsha"><title>Warsha ورشة</title>'
           f'{rects}<path fill="{ink}" fill-rule="nonzero" transform="translate({x_ar:.2f} {base_ar:.2f})" d="{ar_path}"/>'
           f'<path fill="{ink}" fill-rule="nonzero" transform="translate({x_la:.2f} {base_la:.2f})" d="{la_path}"/></svg>\n')
    # PNG at the original's 3200 px width-ish scale
    k = 3200 / width
    img = Image.new("RGBA", (int(width * k), int(H * k)), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for r, rad, c in tiles(x_mark * k, y_mark * k, mark * k, TILES):
        d.rounded_rectangle(r, radius=rad, fill=c)
    fill_contours(img, flatten(ar_rec, x_ar, base_ar, k), ink)
    fill_contours(img, flatten(la_rec, x_la, base_la, k), ink)
    return svg, img, width / H


NOTICE = """Warsha (ورشة) brand marks

The original ArtCraft name, wordmark and mark files that this directory held are trademarks of the
ArtCraft Team and are not open source. As their terms require for a modified version, they were
removed from this Arabic edition and replaced with Warsha's own marks, keeping the file names so the
code that loads them is unchanged. This edition is based on the open-source Craft apps by the
ArtCraft team (MIT OR Apache-2.0); it is not an ArtCraft product and is not endorsed by the ArtCraft
Team.

The Warsha marks: © 2026 Mohammed Al-Shatti (محمد الشطي) — https://malshatti.com — info@malshatti.com
"""


def main():
    out = HERE / "brand"
    out.mkdir(exist_ok=True)
    black = ["#000000"] * 4
    files = {
        "artcraft-mark.svg": mark_svg(TILES),
        "artcraft-mark-black.svg": mark_svg(black),
    }
    logo_svg, logo_png, aspect = wordmark(INK_DARK)
    white_svg, white_png, _ = wordmark(INK_WHITE)
    files["artcraft-logo.svg"] = logo_svg
    files["artcraft-logo-white.svg"] = white_svg
    pngs = {
        "artcraft-mark.png": mark_png(1024, TILES),
        "artcraft-mark-black.png": mark_png(1024, black),
        "artcraft-mark-64.png": mark_png(64, TILES),
        "artcraft-mark-black-44.png": mark_png(44, black),
        "artcraft-logo.png": logo_png,
        "artcraft-logo-white.png": white_png,
    }
    for name, svg in files.items():
        (out / name).write_text(svg, encoding="utf-8")
    for name, img in pngs.items():
        img.save(out / name)
    print(f"wordmark aspect {aspect:.3f}")
    for repo in REPOS:
        d = UP / repo / "docs" / "brand"
        if not d.is_dir():
            continue
        n = 0
        for f in d.iterdir():
            if f.name in files:
                f.write_text(files[f.name], encoding="utf-8")
                n += 1
            elif f.name in pngs:
                pngs[f.name].save(f)
                n += 1
            elif f.name.endswith(".attribution"):
                f.write_text("Warsha (ورشة) mark — © 2026 Mohammed Al-Shatti (malshatti.com); replaces the ArtCraft mark.\n", encoding="utf-8")
            elif f.name == "LICENSE-brand.txt":
                f.write_text(NOTICE, encoding="utf-8")
        print(repo, n)


if __name__ == "__main__":
    main()
