# Wamda app icon

**Creature:** a unicorn, as an engraved head-and-shoulders bust looking out of the tile.

**Style:** an ink engraving portrait in the Warsha apps' owl-template framing (the Monteer owl):
full-bleed colour field, tight head-and-shoulders crop, the body running off the bottom and right edges.

**Tile:** 512 × 512 viewBox, rounded square `rx=112`, clipped; no border or roundel.

**Palette** (exactly three colours):

| Colour | Hex | Used for |
|---|---|---|
| App colour (Wamda pink) | `#e0368f` | the full-bleed field |
| Paper | `#efe9dc` | the figure |
| Ink | `#0b0b0c` | line work and contour |

**Provenance:** the project owner drew it in Warsha (a 2880 px engraving-style image, kept in
warsharules at `assets/app-icons/wamda/source.png`). It was vectorised with warsharules
`assets/logo-options/_tools/vectorize_tile.py`, which keys out the field and traces the ink with potrace.
Licence: see [LICENSE.txt](LICENSE.txt) (MIT OR Apache-2.0, like the repo).

## Files

| File | What |
|---|---|
| `wamda.svg` | master vector, traced at 2048 px (canonical) |
| `wamda-small.svg` | lighter vector (~350 KB), traced at 1024 px; also the web favicon |
| `wamda-1024.png` | 1024 px render |
| `wamda-macos-512.png` | runtime Dock icon on macOS, on Apple's 824/1024 grid |
| `wamda.icns` | macOS icon (Apple grid) |
| `wamda.ico` | Windows icon, 16–256 px; embedded in `wamda.exe` by `apps/wamda/build.rs` |
| `hicolor/<n>x<n>/apps/com.malshatti.wamda.png` | Linux icon theme, 16–512 px; the 256 px one is the runtime icon on Windows and Linux |
| `hicolor/scalable/apps/com.malshatti.wamda.svg` | Linux scalable icon |

App ID: `com.malshatti.wamda` (Wayland app ID, `packaging/linux/com.malshatti.wamda.desktop`).

## Regenerate

Copy a new `icon-master.svg` / `icon.svg` from warsharules `assets/app-icons/wamda/` over
`wamda.svg` / `wamda-small.svg`, then run `packaging/icons.sh` (needs `resvg`; `iconutil`
on macOS for the `.icns`). Copy `wamda-small.svg` to `apps/wamda-web/web/favicon.svg` too.
