"""The macOS disk-image windows of the Warsha apps (each app's DMG and the suite's).

  python macos_dmg.py backgrounds          (Windows, here) every app's packaging/macos/dmg/background.tiff,
                                           and packaging/macos/suite/background.tiff, drawn with Edge
  python3 macos_dmg.py layout APP_DIR      (macOS CI) APP_DIR/packaging/macos/dmg/dmg-layout.DS_Store
                                           for the app's own volume and bundle names (its generate.py)
  python3 macos_dmg.py suite-layout DIR    (macOS CI) DIR/.DS_Store for the suite's DMG

Finder shows the background at 660 × 400 pt with the app at (326, 205) and Applications at
(574, 205); the suite's window is 860 × 620 pt with every app on a grid (SUITE_ICONS). Finder draws
icon labels in black on a background, so the ground under the icons stays light.
"""
import os
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
UP = ROOT / "upstream"

# id, Arabic, Latin, colour (as the site), what it is
APPS = [
    ("retoush", "ريتوش", "Retoush", "#1E6BF0", "تحرير الصور الاحترافي"),
    ("reesha", "ريشة", "Reesha", "#F2620F", "الرسم المتجهي وتصميم الشعارات"),
    ("monteer", "مونتير", "Monteer", "#6A1FD1", "مونتاج الفيديو والألوان والصوت"),
    ("tayf", "طيف", "Tayf", "#0E9E8C", "مكتبة الصور وتحميض RAW"),
    ("watheeq", "وثيق", "Watheeq", "#D9262C", "قراءة ملفات PDF وتعديلها وتحويلها"),
    ("wamda", "ومضة", "Wamda", "#E0187A", "الموشن جرافيك والمؤثرات البصرية"),
    ("nasaq", "نسق", "Nasaq", "#E8303A", "تنسيق الصفحات والنشر"),
    ("satr", "سطر", "Satr", "#1F57D6", "معالجة النصوص وتصميم المستندات"),
    ("minbar", "منبر", "Minbar", "#F08C0C", "العروض التقديمية"),
    ("kashf", "كشف", "Kashf", "#17A34A", "الجداول الحسابية والبيانات"),
    ("mukhattat", "مخطط", "Mukhattat", "#0B7FE0", "الرسم الهندسي ثنائي الأبعاد CAD"),
    ("sada", "صدى", "Sada", "#8B2BE2", "تسجيل الصوت وتحريره ومزجه"),
    ("warsha", "ورشة", "Warsha", "#1B1D24", "منصة تثبيت التطبيقات وتحديثها"),
]

W, H = 660, 400
SUITE_W, SUITE_H = 860, 620
# The suite's grid: 13 apps in rows of five under the header, Applications on the right.
SUITE_ICON = 96
SUITE_COLS = [90, 210, 330, 450, 570]
SUITE_ROWS = [215, 345, 475]
SUITE_APPS_AT = (765, 345)


def suite_icons():
    out = {}
    for k, (_, _, latin, _, _) in enumerate(APPS):
        out[f"{latin}.app"] = (SUITE_COLS[k % 5], SUITE_ROWS[k // 5])
    out["Applications"] = SUITE_APPS_AT
    return out


# ---- backgrounds (here, with Edge) ----------------------------------------------------------------

FONTS = r"""
@font-face { font-family: PlexAr; src: url('file:///C:/Users/elsha/AppData/Local/Microsoft/Windows/Fonts/IBMPlexSansArabic-Bold.ttf'); font-weight: 700; }
@font-face { font-family: PlexAr; src: url('file:///E:/warsha-src/shared/epaint/fonts/IBMPlexSansArabic-SemiBold.ttf'); font-weight: 600; }
@font-face { font-family: PlexAr; src: url('file:///C:/Users/elsha/AppData/Local/Microsoft/Windows/Fonts/IBMPlexSansArabic-Medium.ttf'); font-weight: 500; }
@font-face { font-family: Inter; src: url('file:///E:/warsha-src/upstream/wamda/assets/fonts/Inter-SemiBold.ttf'); font-weight: 600; }
"""


def app_html(app, ar, latin, color, what, scale):
    icon = (UP / app / "assets" / "app-icon" / f"{app}-1024.png").as_uri()
    s = scale
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}
html,body{{margin:0;width:{W * s}px;height:{H * s}px;overflow:hidden;background:#F7F5F0}}
.panel{{position:absolute;left:0;top:0;width:{232 * s}px;height:{H * s}px;background:linear-gradient(160deg,{color} 0%,{color}cc 100%)}}
.panel img{{position:absolute;left:{36 * s}px;top:{78 * s}px;width:{160 * s}px;height:{160 * s}px;filter:drop-shadow(0 {6 * s}px {14 * s}px rgba(0,0,0,.25))}}
.panel .ar{{position:absolute;left:0;right:0;top:{252 * s}px;text-align:center;font:700 {40 * s}px/1.2 PlexAr;color:#fff}}
.panel .la{{position:absolute;left:0;right:0;top:{306 * s}px;text-align:center;font:600 {11 * s}px/1 Inter;letter-spacing:.3em;color:rgba(255,255,255,.85)}}
.title{{position:absolute;right:{30 * s}px;top:{30 * s}px;font:700 {26 * s}px/1.3 PlexAr;color:#1B1D24;direction:rtl}}
.sub{{position:absolute;right:{30 * s}px;top:{70 * s}px;font:500 {13 * s}px/1.3 PlexAr;color:#5b5e6b;direction:rtl}}
.rule{{position:absolute;left:{266 * s}px;right:{30 * s}px;top:{100 * s}px;height:{1 * s}px;background:#d8d4ca}}
.arrow{{position:absolute;left:{408 * s}px;top:{193 * s}px;width:{86 * s}px;height:{24 * s}px}}
.foot-ar{{position:absolute;left:{266 * s}px;right:{30 * s}px;top:{322 * s}px;text-align:center;font:600 {14 * s}px/1.3 PlexAr;color:#1B1D24;direction:rtl}}
.foot-la{{position:absolute;left:{266 * s}px;right:{30 * s}px;top:{350 * s}px;text-align:center;font:600 {9 * s}px/1 Inter;letter-spacing:.18em;color:#7a7d88}}
</style></head><body>
<div class="panel"><img src="{icon}"><div class="ar">{ar}</div><div class="la">{latin.upper()}</div></div>
<div class="title">{ar} · <span style="font-family:Inter;font-weight:600">{latin}</span></div>
<div class="sub">{what} — من ورشة</div>
<div class="rule"></div>
<svg class="arrow" viewBox="0 0 86 24"><path d="M2 12 H74" stroke="{color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 7"/><path d="M70 4 L82 12 L70 20" fill="none" stroke="{color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
<div class="foot-ar">اسحب «{ar}» إلى مجلد التطبيقات لتثبيته</div>
<div class="foot-la">DRAG {latin.upper()} ONTO APPLICATIONS TO INSTALL</div>
</body></html>"""


def suite_html(scale):
    s = scale
    gear = (UP / "warsha" / "assets" / "brand" / "warsha-mark.svg").as_uri()
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}
html,body{{margin:0;width:{SUITE_W * s}px;height:{SUITE_H * s}px;overflow:hidden;background:#F7F5F0}}
.head{{position:absolute;left:0;top:0;right:0;height:{128 * s}px;background:linear-gradient(135deg,#232838,#0B0D14)}}
.head img{{position:absolute;right:{34 * s}px;top:{26 * s}px;width:{76 * s}px;height:{76 * s}px}}
.t{{position:absolute;right:{126 * s}px;top:{24 * s}px;font:700 {32 * s}px/1.25 PlexAr;color:#fff;direction:rtl}}
.st{{position:absolute;right:{126 * s}px;top:{74 * s}px;font:500 {14 * s}px/1.3 PlexAr;color:rgba(255,255,255,.8);direction:rtl}}
.la{{position:absolute;left:{34 * s}px;top:{54 * s}px;font:600 {12 * s}px/1 Inter;letter-spacing:.35em;color:rgba(255,255,255,.7)}}
.div{{position:absolute;left:{660 * s}px;top:{170 * s}px;width:{1 * s}px;height:{360 * s}px;background:#d8d4ca}}
.arrow{{position:absolute;left:{672 * s}px;top:{333 * s}px;width:{40 * s}px;height:{24 * s}px}}
.foot-la{{position:absolute;left:0;right:0;top:{592 * s}px;text-align:center;font:600 {9 * s}px/1 Inter;letter-spacing:.18em;color:#7a7d88}}
.foot{{position:absolute;left:0;right:0;top:{560 * s}px;text-align:center;font:600 {13 * s}px/1.3 PlexAr;color:#1B1D24;direction:rtl}}
</style></head><body>
<div class="head"><img src="{gear}"><div class="t">ورشة — المكتبة الكاملة</div><div class="st">١٢ تطبيقاً عربياً للإبداع والعمل، ومنصة ورشة للتحديث</div><div class="la">WARSHA · MAC</div></div>
<div class="div"></div>
<svg class="arrow" viewBox="0 0 40 24"><path d="M2 12 H30" stroke="#8615F0" stroke-width="3" stroke-linecap="round"/><path d="M26 4 L38 12 L26 20" fill="none" stroke="#8615F0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
<div class="foot">اسحب التطبيقات التي تريدها إلى مجلد التطبيقات لتثبيتها</div><div class="foot-la">DRAG THE APPS YOU WANT ONTO APPLICATIONS</div>
</body></html>"""


def screenshot(html, w, h):
    import subprocess
    import tempfile
    import time
    from PIL import Image
    edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as tmp:
        tmp = pathlib.Path(tmp)
        page, png = tmp / "p.html", tmp / "p.png"
        page.write_text(html, encoding="utf-8")
        subprocess.run([edge, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files",
                        f"--user-data-dir={tmp / 'prof'}", f"--window-size={w},{h}", "--virtual-time-budget=3000",
                        f"--screenshot={png}", page.as_uri()], capture_output=True, timeout=120)
        for _ in range(240):
            if png.exists() and png.stat().st_size > 0:
                time.sleep(0.5)
                break
            time.sleep(0.25)
        im = Image.open(png).convert("RGB")
        im.load()
        time.sleep(1.0)
    if im.size != (w, h):
        raise SystemExit(f"Edge rendered {im.size}, expected {(w, h)}")
    return im


def save_hidpi(one, two, out):
    """1x (72 dpi) and 2x (144 dpi) in one TIFF, as `tiffutil -cathidpicheck` writes them."""
    one.save(out, "TIFF", save_all=True, append_images=[two], compression="tiff_adobe_deflate", dpi=(72, 72))
    # Pillow writes every page at the first page's dpi unless told: rewrite page 2's resolution.
    from PIL import Image
    with Image.open(out) as im:
        pages = []
        for k in range(getattr(im, "n_frames", 1)):
            im.seek(k)
            pages.append(im.copy())
    pages[1].encoderinfo = {"dpi": (144, 144)}
    pages[0].save(out, "TIFF", save_all=True, append_images=[pages[1]], compression="tiff_adobe_deflate", dpi=(72, 72))


def backgrounds():
    for app, ar, latin, color, what in APPS:
        one = screenshot(app_html(app, ar, latin, color, what, 1), W, H)
        two = screenshot(app_html(app, ar, latin, color, what, 2), W * 2, H * 2)
        out = UP / app / "packaging" / "macos" / "dmg" / "background.tiff"
        save_hidpi(one, two, out)
        two.save(ROOT / "packaging" / "macos-preview" / f"{app}.png") if (ROOT / "packaging" / "macos-preview").is_dir() else None
        print(app, out.stat().st_size // 1024, "KB")
    suite = ROOT / "packaging" / "macos" / "suite"
    suite.mkdir(parents=True, exist_ok=True)
    one = screenshot(suite_html(1), SUITE_W, SUITE_H)
    two = screenshot(suite_html(2), SUITE_W * 2, SUITE_H * 2)
    save_hidpi(one, two, suite / "background.tiff")
    print("suite", (suite / "background.tiff").stat().st_size // 1024, "KB")


# ---- layouts (macOS CI: pip install ds_store==1.3.3 mac_alias==2.2.3) ----------------------------

def layout(app_dir):
    """The app's dmg-layout.DS_Store, from its own generate.py (volume and bundle names there)."""
    d = pathlib.Path(app_dir) / "packaging" / "macos" / "dmg"
    sys.path.insert(0, str(d))
    import generate  # noqa: E402  (the app's own: VOLUME, ICONS, write_ds_store)
    generate.write_ds_store(str(d / "dmg-layout.DS_Store"))
    print("layout", generate.VOLUME, list(generate.ICONS))


def suite_layout(out_dir, volume="Warsha"):
    import datetime
    from ds_store import DSStore
    from mac_alias import Alias, TargetInfo, VolumeInfo
    fixed = datetime.datetime(2026, 10, 18, tzinfo=datetime.timezone.utc)
    vol = VolumeInfo(volume, fixed, b"H+", 5, 0x0D02, b"\0\0")
    vol.posix_path = f"/Volumes/{volume}"
    target = TargetInfo(0, "background.tiff", 25, 26, fixed, b"\0\0\0\0", b"\0\0\0\0")
    target.folder_name = ".background"
    target.cnid_path = [25]
    target.carbon_path = f"{volume}:.background:\0background.tiff"
    target.posix_path = "/.background/background.tiff"
    alias = Alias(volume=vol, target=target).to_bytes()
    out = pathlib.Path(out_dir) / ".DS_Store"
    if out.exists():
        out.unlink()
    with DSStore.open(str(out), "w+") as d:
        d["."]["bwsp"] = {"ShowStatusBar": False, "ShowToolbar": False, "ShowTabView": False, "ContainerShowSidebar": False,
                          "ShowSidebar": False, "WindowBounds": f"{{{{160, 360}}, {{{SUITE_W}, {SUITE_H + 32}}}}}"}
        d["."]["icvp"] = {"viewOptionsVersion": 1, "backgroundType": 2, "backgroundImageAlias": alias, "backgroundColorRed": 1.0,
                          "backgroundColorGreen": 1.0, "backgroundColorBlue": 1.0, "gridOffsetX": 0.0, "gridOffsetY": 0.0,
                          "gridSpacing": 100.0, "arrangeBy": "none", "showIconPreview": True, "showItemInfo": False,
                          "labelOnBottom": True, "textSize": 13.0, "iconSize": float(SUITE_ICON)}
        d["."]["vSrn"] = ("long", 1)
        for name, pos in suite_icons().items():
            d[name]["Iloc"] = pos
    print("suite layout", out)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "backgrounds":
        backgrounds()
    elif cmd == "layout":
        layout(sys.argv[2])
    elif cmd == "suite-layout":
        suite_layout(sys.argv[2])
    else:
        sys.exit(__doc__)
