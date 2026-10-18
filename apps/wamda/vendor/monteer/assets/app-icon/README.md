# Monteer app icon

**Creature:** an owl with ear tufts, in a frontal head-and-shoulders portrait. It is the template the
other Warsha App icons follow.

## Palette

Exactly three colours:

| Colour | Hex | Used for |
|---|---|---|
| Ink | `#0b0b0c` | line work and the figure's contour |
| Paper | `#efe9dc` | the figure (the owl) |
| Monteer violet (app colour) | `#8b5cf6` | the full-bleed field behind the figure |

## Geometry and style

- A 512-unit viewBox tile, rounded square `rx=112`, with the app colour full bleed (no frame or border).
- An engraving-style portrait in the owl-template framing: the top of the head near y 80–100, the
  eyes at about 40 % of the height, and the shoulders running off the bottom edge.
- macOS renders (`monteer.icns`, `monteer-macos-512.png`) put the tile in Apple's grid (824 of
  1024 px, transparent margin). Windows, Linux and the web use the full-bleed tile.

## Provenance

The owner drew it in Warsha as a 2880 px engraving-style image. The original is kept in warsharules
at `warsharules/assets/app-icons/monteer/source.png` (not in this repo). It was vectorised with
warsharules `assets/logo-options/_tools/vectorize_tile.py`, which keys the drawing to the three-colour
palette and traces the ink with potrace. Licence: [LICENSE.txt](LICENSE.txt) (MIT OR Apache-2.0).

## Files

| File | What |
|---|---|
| `monteer.svg` | canonical artwork, traced at 2048 px (about 1 MB) |
| `monteer-small.svg` | lighter trace at 1024 px (about 450 KB), for when size matters |
| `monteer-1024.png` | 1024 px render |
| `monteer-macos-512.png` | runtime Dock icon on macOS (embedded by `apps/monteer/src/main.rs`) |
| `monteer.icns` | macOS bundle icon (`CFBundleIconFile`) |
| `monteer.ico` | Windows icon, 16–256 px (embedded in `monteer.exe` by `apps/monteer/build.rs`) |
| `hicolor/<size>/apps/com.malshatti.monteer.png`, `hicolor/scalable/…svg` | Linux icon theme, used by `packaging/linux/com.malshatti.monteer.desktop` |

The web app's `apps/monteer-web/web/favicon.png` (128 px) comes from the same artwork.

## How the icon reaches each OS

- **macOS:** the window icon set at startup (`ViewportBuilder::with_icon`) is the Dock and app-switcher
  icon when the app runs unbundled. A future `.app` bundle points `CFBundleIconFile` at `monteer.icns`.
- **Windows:** `build.rs` embeds `monteer.ico` as the exe's resource icon (Explorer, Start menu,
  pinned taskbar), and the runtime icon covers the window, taskbar and Alt-Tab.
- **Linux:** the runtime icon plus `with_app_id("com.malshatti.monteer")`, which Wayland matches to
  the `.desktop` file. Install the `hicolor/` tree under `/usr/share/icons/hicolor/` and the desktop
  file under `/usr/share/applications/`.

## Regenerate

`packaging/icons.sh` (needs `resvg`; `iconutil` on macOS for the `.icns`; the `.ico` is packed by
`cargo xtask ico`). To change the artwork, replace `monteer.svg` and `monteer-small.svg` with new
exports from warsharules, then run the script. Every derived file needs its `.attribution` sidecar
and a row in `ATTRIBUTION.md`.
