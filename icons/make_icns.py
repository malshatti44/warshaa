"""macOS icons (.icns) for the 12 apps and the Warsha suite, from icons/apps/<id>.png, written over each
repo's assets/app-icon/<id>.icns (the file packaging/macos/package.sh puts in the .app).

macOS draws app icons on Apple's grid: the artwork is 824 px of a 1024 px canvas, centred, so the
icons sit at the same size as other apps in the Dock. Run after make_icons.py and make_brand.py.

  python make_icns.py
"""
import pathlib

from PIL import Image

HERE = pathlib.Path(__file__).parent
UP = pathlib.Path(r"E:\warsha-src\upstream")
APPS = ["retoush", "reesha", "monteer", "tayf", "watheeq", "wamda", "nasaq", "satr", "minbar", "kashf", "mukhattat", "sada"]
SIZES = [16, 32, 64, 128, 256, 512, 1024]


def on_grid(src: Image.Image) -> Image.Image:
    """The artwork at 824 px, centred on a transparent 1024 px canvas."""
    art = src.convert("RGBA").resize((824, 824), Image.LANCZOS)
    canvas = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    canvas.alpha_composite(art, (100, 100))
    return canvas


def main():
    sources = {a: HERE / "apps" / f"{a}.png" for a in APPS}
    # The suite: the full-size render of make_brand.py (its icon is drawn at 1024 px).
    sources["warsha"] = HERE / "brand" / "warsha-icon.png"
    for app, src in sources.items():
        icon = on_grid(Image.open(src))
        out = UP / app / "assets" / "app-icon" / f"{app}.icns"
        icon.save(out, sizes=[(s, s) for s in SIZES])
        # The 1024 px render beside it (Linux packages and the docs use it).
        icon.save(out.with_name(f"{app}-1024.png"))
        # The Dock icon some apps set at run time on macOS (include_bytes! of <app>-macos-512.png).
        mac = out.with_name(f"{app}-macos-512.png")
        if mac.exists():
            icon.resize((512, 512), Image.LANCZOS).save(mac)
        print(f"{app:10} {out}")


if __name__ == "__main__":
    main()
