# Sada app icon (placeholder)

**A nightingale singing**, as an engraving-style head-and-shoulders portrait in the Warsha apps'
owl-template framing (warsharules `standards/icon-design.md`): a full-bleed colour field, the bird
in three-quarter view with its bill open and its eye on the viewer, its breast and wing running off
the bottom and right edges, three song arcs leaving the bill.

This is a **placeholder** until the owner draws Sada's icon in Warsha like the other apps'
icons. Replace `icon.svg` and run `packaging/icons.sh`; nothing else needs to change.

## Palette

Exactly three colours:

| Colour | Hex | Used for |
|---|---|---|
| Ink | `#0b0b0c` | Line work and contour |
| Paper | `#efe9dc` | The bird and the song arcs |
| Sada teal (app colour) | `#14a9c4` | The full-bleed background field |

## Geometry

A 512 × 512 viewBox, clipped to a rounded square with `rx=112`. Windows and Linux use the full
tile. The macOS icons (`sada.icns`, `sada-macos-512.png`) sit on Apple's grid: an
824/1024 body with a transparent margin.

## Provenance and licence

Drawn from scratch as hand-placed SVG paths by the Sada contributors; no source image was
traced or copied. MIT OR Apache-2.0, like the code (see `ATTRIBUTION.md`).

## Files

| File | What it is |
|---|---|
| `icon.svg` | The canonical vector |
| `sada-1024.png` | 1024 px render |
| `sada-macos-512.png` | Runtime window/Dock icon on macOS (Apple grid margin) |
| `sada.icns` | macOS bundle icon |
| `sada.ico` | Windows icon (16–256 px), embedded in `sada.exe` and used by the MSI |
| `hicolor/<size>x<size>/apps/com.malshatti.sada.png` | Linux/FreeBSD icon theme, 16–512 px, plus `scalable/` |

Regenerate everything with `packaging/icons.sh` (needs `resvg`, and `iconutil` on macOS for the
`.icns`).
