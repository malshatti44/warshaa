# Nasaq app icon

**A calico cat wearing a polka-dot scarf**, as an engraving-style head-and-shoulders portrait in the
Warsha apps' owl-template framing: a full-bleed colour field, the cat in three-quarter view, its
shoulders running off the bottom edge.

## Palette

Exactly three colours:

| Colour | Hex | Used for |
|---|---|---|
| Ink | `#0b0b0c` | Line work and contour |
| Paper | `#efe9dc` | The figure (the cat and its scarf) |
| Nasaq green (app colour) | `#7bb51c` | The full-bleed background field |

## Geometry

A 512 × 512 viewBox, clipped to a rounded square with `rx=112`. Windows and Linux use the full tile. The
macOS icons (`.icns`, `nasaq-macos-512.png`) sit on Apple's grid: an 824/1024 body with a
transparent margin.

## Provenance

The owner drew the cat in Warsha. The 2880 px drawing, keyed to the three-colour palette, lives
outside this repo in warsharules at `assets/app-icons/nasaq/source.png`. It was vectorised with
warsharules' `assets/logo-options/_tools/vectorize_tile.py`: `nasaq.svg` is traced at 2048 px and
`nasaq-small.svg` at 1024 px. Design rules: warsharules `standards/icon-design.md`.

## Files

| File | Use |
|---|---|
| `nasaq.svg` | Canonical artwork (about 680 KB) |
| `nasaq-small.svg` | Lighter vector (about 350 KB); also `hicolor/scalable` |
| `nasaq-1024.png` | 1024 px render of the full tile |
| `nasaq-macos-512.png` | Runtime Dock icon on macOS (embedded by `apps/nasaq`) |
| `nasaq.icns` | macOS bundle icon (`CFBundleIconFile`) |
| `nasaq.ico` | Windows exe icon, 16–256 px (embedded by `apps/nasaq/build.rs`) |
| `hicolor/<size>/apps/com.malshatti.nasaq.png` | Linux icon theme, 16–512 px; the 256 px one is also the runtime window icon on Windows and Linux |
| `hicolor/scalable/apps/com.malshatti.nasaq.svg` | Linux scalable icon |
| `LICENSE.txt` | MIT OR Apache-2.0 |

The app ID is `com.malshatti.nasaq`. It's used for the hicolor icon names, the Wayland app ID and
`packaging/linux/com.malshatti.nasaq.desktop`.

## Regenerate

Edit `nasaq.svg` (or `nasaq-small.svg`), then run `packaging/icons.sh`. It needs `resvg`, and
`iconutil` for the `.icns` (macOS only). It packs the `.ico` with `cargo xtask ico`.
