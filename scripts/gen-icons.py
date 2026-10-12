#!/usr/bin/env python3
"""يولّد أيقونات البناء (PNG/ICO) لكل تطبيق ولمكتبة ورشة من brand/icons.

الاستخدام: python3 scripts/gen-icons.py
المخرجات:
  build/icons/<id>/icon.png  (512×512 — يستخدمه electron-builder لويندوز/لينكس/ماك)
  build/icons/<id>/icon.ico  (ويندوز، عدة مقاسات)
  src/shared/icons/<id>.png  (256×256 — للعرض داخل الواجهات)
"""
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'brand', 'icons')
APPS = ['retoush', 'reesha', 'monteer', 'tayf', 'watheeq', 'wamda',
        'nasaq', 'satr', 'minbar', 'kashf', 'mukhattat', 'sada']
ICO_SIZES = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]


def rounded_mask(size, radius_ratio=0.215, ss=4):
    big = Image.new('L', (size * ss, size * ss), 0)
    ImageDraw.Draw(big).rounded_rectangle(
        (0, 0, size * ss - 1, size * ss - 1), radius=int(size * ss * radius_ratio), fill=255)
    return big.resize((size, size), Image.LANCZOS)


def make_hub_icon(path):
    """أيقونة المكتبة: شبكة 3×3 من مربعات بألوان التطبيقات على خلفية داكنة."""
    S = 1024
    ss = 2
    W = S * ss
    bg = Image.new('RGBA', (W, W))
    top, bottom = (30, 27, 75), (12, 10, 32)
    px = bg.load()
    for y in range(W):
        t = y / (W - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)) + (255,)
        for x in range(W):
            px[x, y] = c
    d = ImageDraw.Draw(bg)
    colors = ['#0070f6', '#fd6101', '#6203c9',
              '#01a89a', '#ffffff', '#ee0b75',
              '#fd9801', '#0eae4e', '#790ce2']
    tile, gap = 200 * ss, 44 * ss
    grid = tile * 3 + gap * 2
    off = (W - grid) // 2
    for i, col in enumerate(colors):
        r, c = divmod(i, 3)
        x0 = off + c * (tile + gap)
        y0 = off + r * (tile + gap)
        d.rounded_rectangle((x0, y0, x0 + tile, y0 + tile), radius=int(tile * 0.28), fill=col)
    img = bg.resize((S, S), Image.LANCZOS)
    img.putalpha(rounded_mask(S))
    img.save(path)


def emit(app_id, src_png):
    img = Image.open(src_png).convert('RGBA')
    out_dir = os.path.join(ROOT, 'build', 'icons', app_id)
    os.makedirs(out_dir, exist_ok=True)
    img.resize((512, 512), Image.LANCZOS).save(os.path.join(out_dir, 'icon.png'))
    img.resize((256, 256), Image.LANCZOS).save(os.path.join(out_dir, 'icon.ico'), sizes=ICO_SIZES)
    ui_dir = os.path.join(ROOT, 'src', 'shared', 'icons')
    os.makedirs(ui_dir, exist_ok=True)
    img.resize((256, 256), Image.LANCZOS).save(os.path.join(ui_dir, app_id + '.png'), optimize=True)


def main():
    hub_src = os.path.join(SRC, 'warsha.png')
    if not os.path.exists(hub_src):
        make_hub_icon(hub_src)
    emit('hub', hub_src)
    for app_id in APPS:
        emit(app_id, os.path.join(SRC, app_id + '.png'))
    print('icons generated for hub +', len(APPS), 'apps')


if __name__ == '__main__':
    main()
