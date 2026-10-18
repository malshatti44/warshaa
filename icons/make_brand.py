"""Warsha (ورشة) brand: the mark, the wordmark and the suite's app icon, written over every repo's
brand files and the launcher's app-icon set.

  mark      a gear of 12 coloured segments, one per app, in hue order: the workshop of the 12 apps
  wordmark  mark + «ورشة» (IBM Plex Sans Arabic SemiBold) + "WARSHA" (Inter Bold), as outlines
  app icon  the gear, «ورشة» and WARSHA on a dark tile; at 48 px and below the gear alone

Everything is drawn as SVG (text as glyph outlines, so no font is needed to show it) and rasterised
with headless Microsoft Edge. Files keep their names: the apps include them by path.

  python make_brand.py
"""
import io
import math
import pathlib
import shutil
import subprocess
import tempfile
import time

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

HERE = pathlib.Path(__file__).parent
UP = pathlib.Path(r"E:\warsha-src\upstream")
ARABIC_FONT = pathlib.Path(r"E:\warsha-src\shared\epaint\fonts\IBMPlexSansArabic-SemiBold.ttf")
LATIN_FONT = UP / "wamda/assets/fonts/Inter-Bold.ttf"
EDGE = pathlib.Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")
INK_DARK, INK_WHITE = "#1B1D24", "#FFFFFF"
REPOS = ["retoush", "reesha", "monteer", "tayf", "watheeq", "wamda", "nasaq",
         "satr", "minbar", "kashf", "mukhattat", "sada", "warsha"]

# The apps' own colours, in hue order round the gear (red at the top, clockwise):
# وثيق، ريشة، منبر، كشف، طيف، مخطط، ريتوش، سطر، مونتير، صدى، (ومضة → magenta)، ومضة.
HUES = ["#EF1A24", "#FC6200", "#FC9701", "#12B352", "#01AA9A", "#0A8CFA",
        "#1E6BF0", "#3B4FE4", "#6403CC", "#8615F0", "#C21BD8", "#F30B79"]
TILE_TOP, TILE_BOTTOM = "#232838", "#0B0D14"
ICO_SIZES = [16, 24, 32, 48, 64, 128, 256]


# ---- geometry -----------------------------------------------------------------------------------

def pol(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def gear(cx, cy, d, colors=HUES):
    """The mark: 12 segments round (cx, cy), `d` across the teeth. Each is a ring slice with a
    trapezoid tooth; a round-joined stroke of its own colour softens the corners."""
    R = d / 2
    ri, ro, rt = 0.37 * R, 0.62 * R, 0.80 * R
    gap, hb_, ht = 3.0, 6.2, 4.4
    sw = 0.024 * d

    def P(r, a):
        x, y = pol(cx, cy, r, a)
        return f"{x:.2f} {y:.2f}"

    out = []
    for i, c in enumerate(colors):
        m = -90 + i * 30
        a0, a1 = m - 15 + gap / 2, m + 15 - gap / 2
        path = (f"M{P(ri, a0)}L{P(ro, a0)}A{ro:.2f} {ro:.2f} 0 0 1 {P(ro, m - hb_)}L{P(rt, m - ht)}"
                f"A{rt:.2f} {rt:.2f} 0 0 1 {P(rt, m + ht)}L{P(ro, m + hb_)}A{ro:.2f} {ro:.2f} 0 0 1 {P(ro, a1)}"
                f"L{P(ri, a1)}A{ri:.2f} {ri:.2f} 0 0 0 {P(ri, a0)}Z")
        out.append(f'<path d="{path}" fill="{c}" stroke="{c}" stroke-width="{sw:.2f}" stroke-linejoin="round"/>')
    return "".join(out)


def shape(font_path, text, size, direction):
    """SVG path data of `text` at font size `size` (baseline at y = 0, y down) and its advance."""
    face = hb.Face(hb.Blob.from_file_path(str(font_path)))
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    buf.direction = direction
    hb.shape(font, buf, {})
    tt = TTFont(str(font_path))
    gs, order, scale = tt.getGlyphSet(), tt.getGlyphOrder(), size / face.upem
    pen = SVGPathPen(gs)
    x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        t = (scale, 0, 0, -scale, (x + pos.x_offset) * scale, -pos.y_offset * scale)
        gs[order[info.codepoint]].draw(TransformPen(pen, t))
        x += pos.x_advance
    return pen.getCommands(), x * scale


def arabic(x, base, size, ink, anchor="start"):
    d, w = shape(ARABIC_FONT, "ورشة", size, "rtl")
    x0 = x - w / 2 if anchor == "middle" else x
    return f'<path fill="{ink}" transform="translate({x0:.2f} {base:.2f})" d="{d}"/>', w


def latin(x, base, size, ink, track=0.0, anchor="start", opacity=1.0):
    """WARSHA, letter-spaced by `track` × size."""
    parts, cx = [], 0.0
    for ch in "WARSHA":
        d, w = shape(LATIN_FONT, ch, size, "ltr")
        parts.append((cx, d))
        cx += w + size * track
    total = cx - size * track
    x0 = x - total / 2 if anchor == "middle" else x
    op = f' fill-opacity="{opacity}"' if opacity < 1 else ""
    body = "".join(f'<path fill="{ink}"{op} transform="translate({x0 + dx:.2f} {base:.2f})" d="{d}"/>' for dx, d in parts)
    return body, total


def svg(w, h, body, title="Warsha ورشة"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" role="img" aria-label="Warsha">'
            f'<title>{title}</title>{body}</svg>\n')


# ---- artwork ------------------------------------------------------------------------------------

def mark_svg(colors=HUES):
    return svg(100, 100, gear(50, 50, 100, colors))


def wordmark_svg(ink):
    """mark + «ورشة» + WARSHA, 108 units tall like the earlier wordmark."""
    H = 108
    mark = H * 0.92
    ar, ar_w = arabic(mark + H * 0.26, H * 0.80, 104, ink)
    la, la_w = latin(mark + H * 0.26 + ar_w + H * 0.30, H * 0.75, 62, ink)
    width = mark + H * 0.26 + ar_w + H * 0.30 + la_w + 2
    return svg(width, H, gear(mark / 2, H / 2, mark) + ar + la), width / H


def tile_bg(S):
    r = S * 0.2
    return ('<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">'
            f'<stop offset="0" stop-color="{TILE_TOP}"/><stop offset="1" stop-color="{TILE_BOTTOM}"/></linearGradient>'
            '<radialGradient id="glow" cx="0.5" cy="0.37" r="0.5"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.09"/>'
            '<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient></defs>'
            f'<rect width="{S}" height="{S}" rx="{r}" fill="url(#bg)"/><rect width="{S}" height="{S}" rx="{r}" fill="url(#glow)"/>')


def icon_svg(S=1024):
    """The suite's app icon, laid out like the 12 apps' icons: picture, Arabic name, Latin name."""
    ar, _ = arabic(S / 2, S * 0.805, S * 0.215, INK_WHITE, anchor="middle")
    la, _ = latin(S / 2, S * 0.915, S * 0.052, INK_WHITE, track=0.24, anchor="middle", opacity=0.85)
    return svg(S, S, tile_bg(S) + gear(S / 2, S * 0.345, S * 0.50) + ar + la)


def small_icon_svg(S=1024):
    """16–48 px: the gear alone, as large as the tile allows."""
    return svg(S, S, tile_bg(S) + gear(S / 2, S / 2, S * 0.76))


# ---- rendering ----------------------------------------------------------------------------------

def rasterize(svg_text, w, h):
    """Render SVG to an RGBA image `w`×`h` with headless Edge (transparent background)."""
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as tmp:
        tmp = pathlib.Path(tmp)
        src, png = tmp / "in.html", tmp / "out.png"
        # An HTML page sizes the SVG exactly to the window.
        src.write_text('<!doctype html><html><head><style>html,body{margin:0;background:transparent}'
                       f'svg{{display:block;width:{w}px;height:{h}px}}</style></head><body>{svg_text}</body></html>',
                       encoding="utf-8")
        subprocess.run([str(EDGE), "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
                        f"--user-data-dir={tmp / 'profile'}", f"--window-size={w},{h}",
                        "--default-background-color=00000000", f"--screenshot={png}", src.as_uri()],
                       capture_output=True, timeout=120)
        # msedge.exe returns before the headless browser has written the file
        for _ in range(240):
            if png.exists() and png.stat().st_size > 0:
                time.sleep(0.5)
                break
            time.sleep(0.25)
        img = Image.open(io.BytesIO(png.read_bytes())).convert("RGBA")
        time.sleep(1.0)  # let Edge release the profile before the folder goes
    if img.size != (w, h):
        raise SystemExit(f"Edge rendered {img.size}, expected {(w, h)}")
    return img


def down(img, size):
    return img.resize((size, size) if isinstance(size, int) else size, Image.LANCZOS)


NOTICE = """Warsha (ورشة) brand marks

The original Warsha name, wordmark and mark files that this directory held are trademarks of the
Warsha Team and are not open source. As their terms require for a modified version, they were
removed from this Arabic edition and replaced with Warsha's own marks, keeping the file names so the
code that loads them is unchanged. This edition is based on the open-source Warsha apps by the
Warsha team (MIT OR Apache-2.0); it is not an Warsha product and is not endorsed by the Warsha
Team.

The Warsha marks: © 2026 Mohammed Al-Shatti (محمد الشطي) — https://malshatti.com — info@malshatti.com
"""

APP_ICON_README = """# Warsha app icon

The suite's icon: a gear of 12 coloured segments — one per app, in each app's own colour — with
«ورشة» and WARSHA on a dark tile, like the 12 apps' icons. At 48 px and below it is the gear alone.

Every file here is generated by `icons/make_brand.py` in the Warsha workspace (SVG drawn in code,
text as outlines, rasterised with headless Edge). Don't edit them by hand.

- `warsha.svg` (also `hicolor/scalable/apps/com.malshatti.warsha.svg`): the icon as SVG.
- `warsha-1024.png`: 1024 px render.
- `warsha.ico`: Windows icon, 16–256 px, embedded in `warsha.exe` by `apps/warsha/build.rs` and
  used by the installers.
- `warsha.icns`: macOS bundle icon.
- `hicolor/<size>/apps/com.malshatti.warsha.png` (16–512): Linux icon theme.
- The tray icon is the mark alone: `assets/brand/warsha-mark-64.png` and the black
  `warsha-mark-black-44.png` (macOS template).

© 2026 Mohammed Al-Shatti (محمد الشطي) — https://malshatti.com
"""


def main():
    out = HERE / "brand"
    out.mkdir(exist_ok=True)
    black = ["#000000"] * 12
    logo_svg, aspect = wordmark_svg(INK_DARK)
    white_svg, _ = wordmark_svg(INK_WHITE)
    files = {
        "warsha-mark.svg": mark_svg(),
        "warsha-mark-black.svg": mark_svg(black),
        "warsha-logo.svg": logo_svg,
        "warsha-logo-white.svg": white_svg,
    }
    print("rendering…")
    mark = rasterize(files["warsha-mark.svg"], 1024, 1024)
    mark_black = rasterize(files["warsha-mark-black.svg"], 1024, 1024)
    lw = 3200
    lh = round(lw / aspect)
    pngs = {
        "warsha-mark.png": mark,
        "warsha-mark-black.png": mark_black,
        "warsha-mark-64.png": down(mark, 64),
        "warsha-mark-black-44.png": down(mark_black, 44),
        "warsha-logo.png": rasterize(logo_svg, lw, lh),
        "warsha-logo-white.png": rasterize(white_svg, lw, lh),
    }
    big_svg, small_svg = icon_svg(), small_icon_svg()
    big = rasterize(big_svg, 1024, 1024)
    small = rasterize(small_svg, 1024, 1024)
    files["warsha-icon.svg"] = big_svg
    pngs["warsha-icon.png"] = big

    for name, text in files.items():
        (out / name).write_text(text, encoding="utf-8")
    for name, img in pngs.items():
        img.save(out / name)
    down(big, 512).save(out / "preview.png")

    # The suite's icon among the apps' icons (installers, the site).
    apps = HERE / "apps"
    down(big, 512).save(apps / "warsha.png")
    down(big, 256).save(apps / "warsha-256.png")
    frames = {s: down(small if s <= 48 else big, s) for s in ICO_SIZES}
    frames[256].save(apps / "warsha.ico", format="ICO", sizes=[(s, s) for s in ICO_SIZES],
                     append_images=[frames[s] for s in ICO_SIZES if s != 256])

    # The launcher's own icon set.
    ai = UP / "warsha" / "assets" / "app-icon"
    (ai / "warsha.svg").write_text(big_svg, encoding="utf-8")
    big.save(ai / "warsha-1024.png")
    shutil.copy2(apps / "warsha.ico", ai / "warsha.ico")
    big.save(ai / "warsha.icns")
    for s in [16, 24, 32, 48, 64, 128, 256, 512]:
        down(small if s <= 48 else big, s).save(ai / "hicolor" / f"{s}x{s}" / "apps" / "com.malshatti.warsha.png")
    (ai / "hicolor" / "scalable" / "apps" / "com.malshatti.warsha.svg").write_text(big_svg, encoding="utf-8")
    (ai / "README.md").write_text(APP_ICON_README, encoding="utf-8")
    print(f"wordmark aspect {aspect:.3f}; icons written")

    # Every repo's copies, wherever the apps include them from.
    for repo in REPOS:
        for d in [UP / repo / "assets" / "brand", UP / repo / "docs" / "brand", UP / repo / "vendor" / "monteer" / "assets" / "brand"]:
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
                    f.write_text("Warsha (ورشة) mark — © 2026 Mohammed Al-Shatti (malshatti.com).\n", encoding="utf-8")
                elif f.name == "LICENSE-brand.txt":
                    f.write_text(NOTICE, encoding="utf-8")
            print(f"  {d.relative_to(UP)}: {n}")


if __name__ == "__main__":
    main()
