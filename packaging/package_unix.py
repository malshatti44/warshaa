"""Package Warsha (ورشة) for Linux and macOS — the counterpart of package.py (Windows).

Linux x86_64, for every app (under dist/):
  <id>-<ver>-linux-x86_64.AppImage   one file that runs on any distribution (glibc 2.35 or newer)
  <id>-<ver>-linux-x86_64.deb        Debian, Ubuntu, Mint, Pop!_OS, ...
  <id>-<ver>-linux-x86_64.tar.gz     bin/<id> and share/ (what the Warsha launcher unpacks)
  plus Warsha-Suite-<ver>-linux-x86_64.tar.gz: every AppImage and an install.sh.
macOS universal (Apple silicon and Intel), for every app:
  <id>-<ver>-macos-universal.dmg     the bundle «<Arabic name>.app», drag it to Applications
  plus Warsha-Suite-<ver>-macos-universal.dmg: every app in one disk image.
The names are what the Warsha launcher looks for (<id>-<version>-<platform>.<ext>), and the
macOS bundles carry the identifier and version keys it reads from Info.plist.

  python package_unix.py --os linux --bin-dir <dir with the release binaries> [--version 2.0.0]
  python package_unix.py --os macos --bin-dir <dir with the universal binaries>

Needs Pillow (icons); dpkg-deb for the .deb; appimagetool (APPIMAGETOOL=...) for the AppImage;
on macOS iconutil, codesign and hdiutil (the bundles are signed ad hoc, not notarized).
"""
import argparse
import hashlib
import os
import plistlib
import re
import shutil
import subprocess
import sys
import tarfile
import unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import package as win  # noqa: E402  the app list, README text and paths shared with the Windows build

ROOT = win.ROOT
UP = win.UP
ICONS = win.ICONS
DIST = ROOT / "dist"
WORK = DIST / "unix-stage"
MAINTAINER = "Mohammed Al-Shatti <info@malshatti.com>"
HOMEPAGE = "https://malshatti.com/apps/"
ALL = win.APPS + [win.LAUNCHER]
ICON_SIZES = (16, 24, 32, 48, 64, 128, 256, 512)

try:
    from PIL import Image
except ImportError:  # icons then come only in the sizes already drawn (512 and 256)
    Image = None


def default_version():
    m = re.search(r'^VERSION\s*=\s*"([^"]+)"', (ROOT / "site" / "apps_data.py").read_text(encoding="utf-8"), re.M)
    return m.group(1) if m else "2.0.0"


def run(cmd, **kw):
    print("+", " ".join(str(c) for c in cmd), flush=True)
    subprocess.run([str(c) for c in cmd], check=True, **kw)


def readme(app):
    repo, binary, ar, latin, what, based = app
    return win.README.format(ar=ar, what=what, latin=latin, based=based, repo=win.REPO)


def desk_id(app):
    """The app id the binaries give their windows (Wayland app_id / X11 WM class) and the
    launcher's bundle id: ai.storyteller.<id>, kept from upstream so dock icons and the
    launcher's detection keep working."""
    return f"ai.storyteller.{app[1]}"


def icon_png(app):
    return ICONS / ("warsha.png" if app[0] == "craft-launcher" else f"{app[0]}.png")


def icon_at(app, size):
    if size == 256 and (ICONS / f"{icon_png(app).stem}-256.png").exists():
        src = ICONS / f"{icon_png(app).stem}-256.png"
        if Image is None:
            return src.read_bytes()
    else:
        src = icon_png(app)
    if Image is None:
        return src.read_bytes() if size == 512 else None
    from io import BytesIO
    im = Image.open(src).convert("RGBA")
    if im.size != (size, size):
        im = im.resize((size, size), Image.LANCZOS)
    buf = BytesIO()
    im.save(buf, "PNG")
    return buf.getvalue()


def copy_docs(app, dest):
    dest.mkdir(parents=True, exist_ok=True)
    for f in ("LICENSE-MIT", "LICENSE-APACHE", "NOTICE"):
        if (UP / app[0] / f).exists():
            shutil.copy2(UP / app[0] / f, dest / f)
    (dest / "README-Warsha.txt").write_text(readme(app), encoding="utf-8")


def sha256(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


# ---- Linux -------------------------------------------------------------------------------------

def upstream_desktop(app):
    p = UP / app[0] / "packaging" / "linux" / f"{desk_id(app)}.desktop"
    keys, section = {}, None
    if p.exists():
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line.startswith("["):
                section = line
            elif section == "[Desktop Entry]" and "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                keys[k.strip()] = v.strip()
    return keys


def desktop_entry(app, tryexec=True):
    """The .desktop file: Arabic first (the default name), English for other locales."""
    repo, binary, ar, latin, what, based = app
    up = upstream_desktop(app)
    args = up.get("Exec", binary).split()[1:]  # keep the field codes (%F, %U) upstream asks for
    keywords = [k for k in up.get("Keywords", "").split(";") if k] + [latin, ar, "Warsha", "ورشة"]
    lines = [
        "[Desktop Entry]",
        "Type=Application",
        f"Name={ar}",
        f"Name[ar]={ar}",
        f"Name[en]={latin}",
        f"GenericName={what}",
        f"GenericName[ar]={what}",
    ]
    if up.get("GenericName"):
        lines.append(f"GenericName[en]={up['GenericName']}")
    lines += [
        f"Comment={what} — من منصة ورشة، تعريب وتطوير محمد الشطي",
        f"Comment[ar]={what} — من منصة ورشة، تعريب وتطوير محمد الشطي",
        f"Comment[en]={up.get('Comment', latin)} — Warsha, Arabic edition by Mohammed Al-Shatti",
        "Exec=" + " ".join([binary] + args),
    ]
    if tryexec:
        lines.append(f"TryExec={binary}")
    lines += [
        f"Icon={desk_id(app)}",
        "Terminal=false",
        "StartupNotify=true",
        f"StartupWMClass={up.get('StartupWMClass', desk_id(app))}",
        f"Categories={up.get('Categories', 'Utility;')}",
    ]
    if up.get("MimeType"):
        lines.append(f"MimeType={up['MimeType']}")
    lines.append("Keywords=" + ";".join(dict.fromkeys(keywords)) + ";")
    return "\n".join(lines) + "\n"


def stage_linux(app, bin_dir):
    """An FHS tree (usr/bin, usr/share) shared by the .tar.gz, the .deb and the AppImage."""
    binary = app[1]
    exe = bin_dir / binary
    if not exe.is_file():
        return None
    usr = WORK / "linux" / binary / "usr"
    shutil.rmtree(usr.parent, ignore_errors=True)
    (usr / "bin").mkdir(parents=True)
    shutil.copy2(exe, usr / "bin" / binary)
    (usr / "bin" / binary).chmod(0o755)
    apps_dir = usr / "share" / "applications"
    apps_dir.mkdir(parents=True)
    (apps_dir / f"{desk_id(app)}.desktop").write_text(desktop_entry(app), encoding="utf-8")
    for s in ICON_SIZES:
        data = icon_at(app, s)
        if data:
            d = usr / "share" / "icons" / "hicolor" / f"{s}x{s}" / "apps"
            d.mkdir(parents=True, exist_ok=True)
            (d / f"{desk_id(app)}.png").write_bytes(data)
    mime = UP / app[0] / "packaging" / "linux" / f"{desk_id(app)}.mime.xml"
    if mime.exists():
        (usr / "share" / "mime" / "packages").mkdir(parents=True)
        shutil.copy2(mime, usr / "share" / "mime" / "packages" / f"{desk_id(app)}.xml")
    copy_docs(app, usr / "share" / "doc" / binary)
    return usr


def linux_tar(app, version, usr):
    stem = f"{app[1]}-{version}-linux-x86_64"
    out = DIST / f"{stem}.tar.gz"
    with tarfile.open(out, "w:gz", compresslevel=9) as tf:
        tf.add(usr, arcname=stem)
    return out


def shlib_packages(exe):
    """Debian packages of the shared libraries the binary links directly (beyond glibc)."""
    try:
        dump = subprocess.run(["objdump", "-p", str(exe)], capture_output=True, text=True, check=True).stdout
        cache = subprocess.run(["ldconfig", "-p"], capture_output=True, text=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError):
        return []
    pkgs = set()
    for so in re.findall(r"NEEDED\s+(\S+)", dump):
        m = re.search(rf"^\s*{re.escape(so)} \([^)]*x86-64[^)]*\) => (\S+)$", cache, re.M)
        if not m:
            continue
        found = m.group(1)
        candidates = [found, os.path.realpath(found)]
        candidates += [c.replace("/usr/lib/", "/lib/", 1) if c.startswith("/usr/lib/") else c.replace("/lib/", "/usr/lib/", 1) for c in candidates]
        for c in candidates:
            r = subprocess.run(["dpkg", "-S", c], capture_output=True, text=True)
            if r.returncode == 0:
                pkgs.add(r.stdout.split(":", 1)[0].strip())
                break
    return sorted(pkgs - {"libc6", "libgcc-s1"})


POSTINST = """#!/bin/sh
set -e
command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database -q /usr/share/applications || true
command -v update-mime-database >/dev/null 2>&1 && update-mime-database /usr/share/mime || true
command -v gtk-update-icon-cache >/dev/null 2>&1 && gtk-update-icon-cache -q -t -f /usr/share/icons/hicolor || true
exit 0
"""


def linux_deb(app, version, usr):
    repo, binary, ar, latin, what, based = app
    root = WORK / "deb" / binary
    shutil.rmtree(root, ignore_errors=True)
    shutil.copytree(usr, root / "usr", symlinks=True)
    (root / "DEBIAN").mkdir(parents=True)
    size_kb = sum(f.stat().st_size for f in (root / "usr").rglob("*") if f.is_file()) // 1024 + 1
    depends = ["libc6 (>= 2.35)", "libgcc-s1", "libxkbcommon0", "libvulkan1 | libegl1"] + shlib_packages(usr / "bin" / binary)
    up_comment = upstream_desktop(app).get("Comment", "")
    control = "\n".join([
        f"Package: {binary}",
        f"Version: {version}",
        "Architecture: amd64",
        f"Maintainer: {MAINTAINER}",
        f"Installed-Size: {size_kb}",
        "Depends: " + ", ".join(dict.fromkeys(depends)),
        "Recommends: libwayland-client0, libx11-6, libx11-xcb1, libxcursor1, libxi6, libxrandr2, mesa-vulkan-drivers, xdg-desktop-portal",
        "Section: misc",
        "Priority: optional",
        f"Homepage: {HOMEPAGE}",
        f"Description: {latin} ({ar}) - {what}, from the Warsha suite",
        f" {up_comment}".rstrip() if up_comment else " Part of Warsha (ورشة), the Arabic suite of creative and office apps.",
        f" Arabic edition and development: Mohammed Al-Shatti (malshatti.com), based on {based}",
        " by the ArtCraft team (MIT OR Apache-2.0). Not an ArtCraft product.",
    ]) + "\n"
    (root / "DEBIAN" / "control").write_text(control, encoding="utf-8")
    for script in ("postinst", "postrm"):
        p = root / "DEBIAN" / script
        p.write_text(POSTINST, encoding="utf-8")
        p.chmod(0o755)
    out = DIST / f"{binary}-{version}-linux-x86_64.deb"
    run(["dpkg-deb", "--root-owner-group", "-Zxz", "--build", root, out])
    return out


APPRUN = """#!/bin/sh
# Warsha AppImage entry point: run the app shipped in usr/bin.
APPDIR="$(dirname "$(readlink -f "$0")")"
exec "$APPDIR/usr/bin/{binary}" "$@"
"""


def linux_appimage(app, version, usr, tool):
    binary = app[1]
    appdir = WORK / "appimage" / f"{binary}.AppDir"
    shutil.rmtree(appdir, ignore_errors=True)
    appdir.mkdir(parents=True)
    shutil.copytree(usr, appdir / "usr", symlinks=True)
    launcher_apprun = UP / "craft-launcher" / "packaging" / "linux" / "AppRun"
    if app[0] == "craft-launcher" and launcher_apprun.exists():
        shutil.copy2(launcher_apprun, appdir / "AppRun")  # installs its menu entry on first run
    else:
        (appdir / "AppRun").write_text(APPRUN.format(binary=binary), encoding="utf-8")
    (appdir / "AppRun").chmod(0o755)
    (appdir / f"{desk_id(app)}.desktop").write_text(desktop_entry(app, tryexec=False), encoding="utf-8")
    (appdir / f"{desk_id(app)}.png").write_bytes(icon_at(app, 256) or icon_png(app).read_bytes())
    os.symlink(f"{desk_id(app)}.png", appdir / ".DirIcon")
    out = DIST / f"{binary}-{version}-linux-x86_64.AppImage"
    env = dict(os.environ, ARCH="x86_64", APPIMAGE_EXTRACT_AND_RUN="1")
    run([tool, "--no-appstream", appdir, out], env=env)
    return out


INSTALL_SH = r"""#!/bin/sh
# Warsha (ورشة) for Linux: copies every AppImage in this folder to ~/Applications and adds
# each app to the applications menu. Run it as your own user: ./install.sh
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
DEST="${HOME}/Applications"
DATA="${XDG_DATA_HOME:-$HOME/.local/share}"
mkdir -p "$DEST" "$DATA/applications" "$DATA/icons/hicolor/256x256/apps"
for img in "$HERE"/*.AppImage; do
  [ -f "$img" ] || continue
  name="$(basename "$img")"
  id="${name%%-[0-9]*}"
  install -m 755 "$img" "$DEST/$name"
  desk="$HERE/share/$id.desktop"
  if [ -f "$desk" ]; then
    sed -e "s|^Exec=[^ ]*|Exec=\"$DEST/$name\"|" -e '/^TryExec=/d' "$desk" > "$DATA/applications/ai.storyteller.$id.desktop"
    cp "$HERE/share/$id.png" "$DATA/icons/hicolor/256x256/apps/ai.storyteller.$id.png"
  fi
  echo "installed $name"
done
command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database -q "$DATA/applications" || true
echo "تم التثبيت — Done. ورشة WARSHA — malshatti.com"
"""


def linux_suite(version, appimages):
    stem = f"Warsha-Suite-{version}-linux-x86_64"
    d = WORK / "suite-linux" / stem
    shutil.rmtree(d.parent, ignore_errors=True)
    (d / "share").mkdir(parents=True)
    for app, img in appimages:
        shutil.copy2(img, d / img.name)
        (d / "share" / f"{app[1]}.desktop").write_text(desktop_entry(app), encoding="utf-8")
        (d / "share" / f"{app[1]}.png").write_bytes(icon_at(app, 256) or icon_png(app).read_bytes())
    (d / "install.sh").write_text(INSTALL_SH, encoding="utf-8")
    (d / "install.sh").chmod(0o755)
    (d / "README-Warsha.txt").write_text(readme(win.LAUNCHER), encoding="utf-8")
    out = DIST / f"{stem}.tar.gz"
    with tarfile.open(out, "w:gz", compresslevel=6) as tf:
        tf.add(d, arcname=stem)
    return out


def package_linux(apps, version, bin_dir, skip_missing):
    tool = os.environ.get("APPIMAGETOOL") or shutil.which("appimagetool")
    if not tool:
        print("warning: appimagetool not found (set APPIMAGETOOL); no AppImages", file=sys.stderr)
    outs, appimages = [], []
    for app in apps:
        usr = stage_linux(app, bin_dir)
        if usr is None:
            if skip_missing:
                print(f"warning: no {app[1]} in {bin_dir}, skipped", file=sys.stderr)
                continue
            raise SystemExit(f"missing {bin_dir / app[1]}")
        outs += [linux_tar(app, version, usr), linux_deb(app, version, usr)]
        if tool:
            img = linux_appimage(app, version, usr, tool)
            outs.append(img)
            appimages.append((app, img))
    if appimages:
        outs.append(linux_suite(version, appimages))
    return outs


# ---- macOS -------------------------------------------------------------------------------------

STANDARD_VERSION_KEYS = {"CFBundleShortVersionString", "CFBundleVersion", "CFBundleInfoDictionaryVersion", "LSMinimumSystemVersion"}

# The permission prompts macOS shows, in Arabic (the bundles' development region); English
# stays in en.lproj with the upstream product name replaced by the Warsha one.
USAGE_AR = {
    ("filmcraft", "NSMicrophoneUsageDescription"): "يستخدم مونتير الميكروفون لتسجيل التعليق الصوتي على الخط الزمني.",
    ("lightcraft", "NSAppleEventsUsageDescription"): "يطلب طيف من تطبيق «الصور» استيراد الصور التي تصدّرها عند اختيار «إضافة إلى صور Apple» في نافذة التصدير.",
    ("soundcraft", "NSMicrophoneUsageDescription"): "يسجّل صدى الصوت من مصدر الإدخال الذي تختاره.",
}


def rebrand(value, old, new):
    """Replaces the upstream product name in every user-facing string of a plist."""
    if isinstance(value, str):
        return value.replace(old, new)
    if isinstance(value, list):
        return [rebrand(v, old, new) for v in value]
    if isinstance(value, dict):
        return {k: (v if k in ("CFBundleIdentifier", "UTTypeIdentifier") else rebrand(v, old, new)) for k, v in value.items()}
    return value


def usage_strings(app, info):
    """(Arabic, English) values of the NS…UsageDescription keys."""
    keys = [k for k in info if k.startswith("NS") and k.endswith("UsageDescription")]
    return {k: USAGE_AR.get((app[0], k), info[k]) for k in keys}, {k: info[k] for k in keys}


def info_plist(app, version, sha):
    repo, binary, ar, latin, what, based = app
    tpl = UP / repo / "packaging" / "macos" / "Info.plist.in"
    short = re.match(r"\d+(\.\d+){0,2}", version).group(0)
    if tpl.exists():
        text = tpl.read_text(encoding="utf-8").replace("@VERSION@", version).replace("@SHORT_VERSION@", short).replace("@BUILD_SHA@", sha)
        info = plistlib.loads(text.encode("utf-8"))
    else:
        info = {"CFBundleInfoDictionaryVersion": "6.0", "CFBundlePackageType": "APPL", "CFBundleSignature": "????",
                "LSMinimumSystemVersion": "11.0", "NSHighResolutionCapable": True}
    # Drop upstream's own <Name>Version / <Name>BuildCommit keys; the launcher reads <Arabic name>Version.
    for k in [k for k in info if (k.endswith("Version") and k not in STANDARD_VERSION_KEYS) or k.endswith("BuildCommit")]:
        del info[k]
    info = rebrand(info, based, latin)
    info.update(usage_strings(app, info)[0])
    info.update({
        "CFBundleDevelopmentRegion": "ar",
        "CFBundleLocalizations": ["ar", "en"],
        "LSHasLocalizedDisplayName": True,
        "CFBundleName": ar,
        "CFBundleDisplayName": ar,
        "CFBundleExecutable": binary,
        "CFBundleIdentifier": desk_id(app),
        "CFBundleIconFile": "AppIcon",
        "CFBundleShortVersionString": short,
        "CFBundleVersion": short,
        f"{ar}Version": version,
        "WarshaBuildCommit": sha,
        "NSHumanReadableCopyright": f"© 2026 محمد الشطي Mohammed Al-Shatti (Arabic edition, malshatti.com) — based on {based} by the ArtCraft team, MIT OR Apache-2.0",
    })
    info.setdefault("LSMinimumSystemVersion", "11.0")
    return info


def icns(app, out):
    with_iconutil = shutil.which("iconutil")
    if with_iconutil and Image is not None:
        iconset = out.with_suffix(".iconset")
        shutil.rmtree(iconset, ignore_errors=True)
        iconset.mkdir()
        src = Image.open(icon_png(app)).convert("RGBA")
        for base in (16, 32, 128, 256, 512):
            for scale in (1, 2):
                px = base * scale
                name = f"icon_{base}x{base}{'@2x' if scale == 2 else ''}.png"
                src.resize((px, px), Image.LANCZOS).save(iconset / name)
        run(["iconutil", "-c", "icns", iconset, "-o", out])
        shutil.rmtree(iconset)
    elif Image is not None:
        Image.open(icon_png(app)).convert("RGBA").resize((1024, 1024), Image.LANCZOS).save(out, format="ICNS")
    else:
        raise SystemExit("Pillow is needed for the macOS icons (pip install pillow)")


def strings_file(path, values):
    def q(s):
        return s.replace("\\", "\\\\").replace('"', '\\"')
    body = "".join(f'"{q(k)}" = "{q(v)}";\n' for k, v in values.items())
    path.write_bytes(body.encode("utf-16"))  # UTF-16 with BOM, as Apple's tools expect


def mac_bundle(app, version, bin_dir, dest, sha):
    repo, binary, ar, latin, what, based = app
    exe = bin_dir / binary
    if not exe.is_file():
        return None
    bundle = dest / f"{unicodedata.normalize('NFC', ar)}.app"
    shutil.rmtree(bundle, ignore_errors=True)
    macos = bundle / "Contents" / "MacOS"
    res = bundle / "Contents" / "Resources"
    macos.mkdir(parents=True)
    res.mkdir(parents=True)
    shutil.copy2(exe, macos / binary)
    (macos / binary).chmod(0o755)
    info = info_plist(app, version, sha)
    with open(bundle / "Contents" / "Info.plist", "wb") as f:
        plistlib.dump(info, f)
    (bundle / "Contents" / "PkgInfo").write_bytes(b"APPL????")
    icns(app, res / "AppIcon.icns")
    tpl = UP / repo / "packaging" / "macos" / "Info.plist.in"
    upstream = rebrand(plistlib.loads(re.sub(r"@[A-Z_]+@", "0", tpl.read_text(encoding="utf-8")).encode("utf-8")), based, latin) if tpl.exists() else {}
    usage_ar, usage_en = usage_strings(app, info)[0], usage_strings(app, upstream)[1]
    for lang, name, usage in (("ar", ar, usage_ar), ("en", latin, usage_en)):
        (res / f"{lang}.lproj").mkdir()
        strings_file(res / f"{lang}.lproj" / "InfoPlist.strings", {"CFBundleName": name, "CFBundleDisplayName": name, **usage})
    copy_docs(app, res)
    if shutil.which("codesign"):
        run(["codesign", "--force", "--deep", "--sign", "-", bundle])  # ad hoc: runs on Apple silicon
    else:
        print("warning: codesign not found; the bundle is unsigned", file=sys.stderr)
    return bundle


def dmg(stage, volname, out):
    if not shutil.which("hdiutil"):
        print(f"warning: hdiutil not found; {out.name} not made", file=sys.stderr)
        return None
    link = stage / "Applications"
    if not link.exists():
        os.symlink("/Applications", link)
    if out.exists():
        out.unlink()
    run(["hdiutil", "create", "-volname", volname, "-srcfolder", stage, "-ov", "-fs", "HFS+",
         "-format", "UDZO", "-imagekey", "zlib-level=9", out])
    return out


def package_macos(apps, version, bin_dir, skip_missing):
    sha = subprocess.run(["git", "-C", str(ROOT), "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
    outs, bundles = [], []
    for app in apps:
        stage = WORK / "macos" / app[1]
        shutil.rmtree(stage, ignore_errors=True)
        stage.mkdir(parents=True)
        bundle = mac_bundle(app, version, bin_dir, stage, sha)
        if bundle is None:
            if skip_missing:
                print(f"warning: no {app[1]} in {bin_dir}, skipped", file=sys.stderr)
                continue
            raise SystemExit(f"missing {bin_dir / app[1]}")
        bundles.append(bundle)
        out = dmg(stage, app[2], DIST / f"{app[1]}-{version}-macos-universal.dmg")
        if out:
            outs.append(out)
    if bundles:
        suite = WORK / "suite-macos"
        shutil.rmtree(suite, ignore_errors=True)
        suite.mkdir(parents=True)
        for b in bundles:
            shutil.copytree(b, suite / b.name, symlinks=True)
        (suite / "README-Warsha.txt").write_text(readme(win.LAUNCHER), encoding="utf-8")
        out = dmg(suite, "ورشة WARSHA", DIST / f"Warsha-Suite-{version}-macos-universal.dmg")
        if out:
            outs.append(out)
    return outs


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--os", choices=["linux", "macos"], required=True)
    ap.add_argument("--version", default=default_version())
    ap.add_argument("--bin-dir", type=Path, required=True, help="folder holding the release binaries (named by app id)")
    ap.add_argument("--apps", nargs="*", help="only these apps (repo names, e.g. gridcraft craft-launcher)")
    ap.add_argument("--skip-missing", action="store_true", help="package the apps that were built, skip the rest")
    a = ap.parse_args()
    apps = [x for x in ALL if not a.apps or x[0] in a.apps]
    DIST.mkdir(exist_ok=True)
    outs = (package_linux if a.os == "linux" else package_macos)(apps, a.version, a.bin_dir.resolve(), a.skip_missing)
    if not outs:
        raise SystemExit("nothing was packaged")
    sums = DIST / f"SHA256SUMS-{a.os}.txt"
    sums.write_text("".join(f"{sha256(f)}  {f.name}\n" for f in sorted(outs)), encoding="utf-8")
    for f in sorted(outs):
        print(f"{f.stat().st_size / 1e6:8.1f} MB  {f.name}")


if __name__ == "__main__":
    main()
