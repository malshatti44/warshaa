# Asset attribution

Every non-code asset in this repository (icons, images, fonts, example art, colour profiles, presets) is listed here with its author, source and licence. `cargo xtask assets` (part of `cargo xtask ci`) fails if an asset file is missing from this table.

**Policy (mandatory):** Reesha contains **no Adobe iconography, images, artwork, presets, swatch/brush/symbol/pattern libraries or ICC profiles**. Every asset is either original work by Reesha contributors, or third-party material under an open licence (OSI open source, public domain / CC0, or Creative Commons that allows redistribution), and it is attributed below. Screenshots of Adobe software are never committed. The one exception is the Warsha name, wordmark and logos in `docs/brand/`: Warsha trademarks, not open source, usable only under [`docs/brand/LICENSE-brand.txt`](docs/brand/LICENSE-brand.txt).

Generated-in-code art is original and has no file to list. This covers the default swatches, brushes, symbols, patterns, graphic styles, image-trace presets and the vector tool cursors (`crates/ui-egui/src/cursors.rs`).

**Font files are never committed here.** Fonts shared by the Warsha apps live in [malshatti44/warshaa](https://github.com/malshatti44/warshaa) (rules: warsharules [`standards/fonts.md`](https://github.com/malshatti44/warshaa)). The small Latin UI/document fonts below predate that rule and stay.

**Optional build input: warsha-fonts.** Builds made with `WARSHA_FONTS_DIR=<warsha-fonts checkout>` (all official releases) embed the Japanese fonts listed in its [`ATTRIBUTION.md`](https://github.com/malshatti44/warshaa): BIZ UDPGothic Regular and Bold, Shippori Mincho Regular and BIZ UDMincho Regular (web builds: BIZ UDPGothic Regular only), all under the SIL Open Font License 1.1. They are not files in this repository; release packages carry each one's `OFL-<family>.txt`. Builds without `WARSHA_FONTS_DIR` embed none of them.

| Asset | Author | Source | Licence | Notes |
|---|---|---|---|---|
| `docs/brand/warsha-logo-white.png` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `docs/brand/warsha-logo-white.svg` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `docs/brand/warsha-logo.png` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `docs/brand/warsha-logo.svg` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `docs/brand/warsha-mark-black.png` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `docs/brand/warsha-mark-black.svg` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `docs/brand/warsha-mark.png` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `docs/brand/warsha-mark.svg` | Warsha team (project owner) | https://malshatti.com/apps/ | Warsha trademark, see docs/brand/LICENSE-brand.txt (not open source) | Used in README only; not shipped in the app |
| `assets/app-icon/LICENSE.txt` | (licence/readme text) | Reesha | MIT OR Apache-2.0 |  |
| `assets/app-icon/README.md` | (licence/readme text) | Reesha | MIT OR Apache-2.0 |  |
| `assets/app-icon/hicolor/128x128/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/16x16/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/24x24/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/256x256/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/32x32/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/48x48/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/512x512/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/64x64/apps/com.malshatti.reesha.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/hicolor/scalable/apps/com.malshatti.reesha.svg` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/reesha-1024.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/reesha-macos-512.png` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/reesha-small.svg` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/reesha.icns` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/reesha.ico` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `assets/app-icon/reesha.svg` | Project owner (Warsha team) | Original artwork drawn in Warsha for Reesha, vectorised and rendered by `packaging/icons.sh` | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) | App icon (engraved dragon) |
| `packaging/macos/dmg/background.svg` | Xus Badia (contributed in #493) | Original artwork for Reesha's DMG window; links the app icon `assets/app-icon/reesha-small.svg` | MIT OR Apache-2.0 (licensed by the contributor under the project licence) | DMG background source. Text in Inter and JetBrains Mono (OFL-1.1, `assets/fonts`), not embedded; paper grain generated by an SVG `feTurbulence` filter |
| `packaging/macos/dmg/background.tiff` | Xus Badia (contributed in #493) | Rendered from `packaging/macos/dmg/background.svg` by `packaging/macos/dmg/generate.py` | MIT OR Apache-2.0 | 1x + 2x DMG background; includes the app icon (see its rows), text rendered from OFL-1.1 fonts and LittleCMS's built-in sRGB profile ("No copyright, use freely") |
| `packaging/macos/dmg/DS_Store` | Xus Badia (layout, #493) | Written by `packaging/macos/dmg/generate.py` | MIT OR Apache-2.0 | Finder view settings for the DMG (window, icon size and positions, background alias); no machine data |
| `assets/fonts/Inter-Medium.ttf` | Rasmus Andersson / The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/Inter-Regular.ttf` | Rasmus Andersson / The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/Inter-SemiBold.ttf` | Rasmus Andersson / The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/JetBrainsMono-Regular.ttf` | The JetBrains Mono Project Authors | https://github.com/JetBrains/JetBrainsMono | OFL-1.1 (`assets/fonts/OFL-JetBrainsMono.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/SourceSans3-Bold.ttf` | Paul D. Hunt / Adobe (released as open source) | https://github.com/adobe-fonts/source-sans | OFL-1.1 (`assets/fonts/OFL-SourceSans3.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/SourceSans3-It.ttf` | Paul D. Hunt / Adobe (released as open source) | https://github.com/adobe-fonts/source-sans | OFL-1.1 (`assets/fonts/OFL-SourceSans3.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/SourceSans3-Regular.ttf` | Paul D. Hunt / Adobe (released as open source) | https://github.com/adobe-fonts/source-sans | OFL-1.1 (`assets/fonts/OFL-SourceSans3.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/SourceSans3-Semibold.ttf` | Paul D. Hunt / Adobe (released as open source) | https://github.com/adobe-fonts/source-sans | OFL-1.1 (`assets/fonts/OFL-SourceSans3.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/SourceSerif4-Regular.ttf` | Frank Grießhammer / Adobe (released as open source) | https://github.com/adobe-fonts/source-serif | OFL-1.1 (`assets/fonts/OFL-SourceSerif4.txt`) | Open-source typeface, not product iconography or artwork |
| `assets/fonts/OFL-Inter.txt` | (licence text) | upstream project | — |  |
| `assets/fonts/OFL-JetBrainsMono.txt` | (licence text) | upstream project | — |  |
| `assets/fonts/OFL-SourceSans3.txt` | (licence text) | upstream project | — |  |
| `assets/fonts/OFL-SourceSerif4.txt` | (licence text) | upstream project | — |  |
| `assets/icons/LICENSE-lucide.txt` | (licence text) | upstream project | — |  |
| `assets/icons/align-center-horizontal.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-center-vertical.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-end-horizontal.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-end-vertical.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-horizontal-justify-center.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-horizontal-justify-end.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-horizontal-justify-start.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-start-horizontal.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-start-vertical.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-vertical-justify-center.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-vertical-justify-end.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/align-vertical-justify-start.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/arrow-left-right.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/arrow-up-down.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/blend.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/brush.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/chart-column.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/chevron-down.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/chevron-left.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/chevron-right.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/chevrons-left.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/chevrons-right.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/circle.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/clipboard-paste.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/cloud.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/combine.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/copy.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/dc-actions.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-al-bottom.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-al-center.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-al-hcenter.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-al-left.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-al-right.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-al-top.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-al-vcenter.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-align.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-alignto-artboard.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-alignto-key.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-alignto-selection.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-anchor.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-anchor-smooth.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-appearance.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-arc.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-arrow-down.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-arrow-extend.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-arrow-fill.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 | The Selection and Direct Selection arrows' fill, painted black or white under their outline |
| `assets/icons/dc-arrow-tip.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-arrow-up.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-artboard-options.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-artboards.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-blend.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-bloat.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-cap-butt.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-cap-round.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-cap-square.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-center-hide.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-center-show.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-clear.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-color-guide.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-crystallize.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-cube.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dash-align.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dash-exact.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dir-off.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dir-on.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-direct.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-bottom.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-hcenter.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-hspace.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-left.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-right.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-top.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-vcenter.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-dist-vspace.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-draw-behind.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-draw-inside.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-draw-normal.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-ellipse.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-fill-none.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-flare.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-folder.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-free-transform.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-fx.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-gamut.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-grad-freeform.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-grad-linear.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-grad-radial.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-grad-stroke-across.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-grad-stroke-along.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-grad-stroke-within.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-gradient.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-graphic-styles.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-grid-view.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-group-select.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-join-bevel.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-join-miter.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-join-round.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-join.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-knife.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-line-cut.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-line.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-list-view.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-live-bucket.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-live-select.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-mask-none.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-measure.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-mesh.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-mirror-cut.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-new-fill.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-new-item.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-new-stroke.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-options.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-center.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-justify-all.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-justify-center.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-justify-left.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-justify-right.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-left.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-ltr.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-right.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-para-rtl.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-path-eraser.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pathfinder.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-perspective.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-crop.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-divide.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-exclude.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-intersect.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-merge.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-minus-back.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-minus-front.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-outline.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-trim.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pf-unite.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-place-symbol.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-polar-grid.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-polygon.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-pucker.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-puppet.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-rearrange.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-rect-cut.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-rect-grid.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-reference-point.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-remove-brush.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-reshape.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-reverse.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-rotate-view.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-rounded-rect.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-rule-evenodd.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-rule-nonzero.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-scallop.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-screen-mode.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-selection.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-shape-builder.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-shear.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-smooth.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-stroke-center.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-stroke-inside.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-stroke-outside.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-stroke.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-swap.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-swatch-kinds.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-symbol-sprayer.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-touch-type.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-transform-panel.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-transparency.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-twirl.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-type-area.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-type-path.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-type-vertical.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-width-profile.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-width.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-wrinkle.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-zoom-large.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/dc-zoom-small.svg` | Reesha contributors | Original work, drawn for Reesha | MIT OR Apache-2.0 |  |
| `assets/icons/ellipsis.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/eraser.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/eye-off.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/eye.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/file-plus.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/flip-horizontal-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/flip-vertical-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/folder-open.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/frame.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/grid-3x3.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/group.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/hand.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/hexagon.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/history.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/house.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/image.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/info.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/lasso.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/layers.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/layout-grid.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/library.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/link-2-off.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/link.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/external-link.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) | Help → app page link |
| `assets/icons/git-branch.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) | Help → GitHub link |
| `assets/icons/globe.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) | Help → website link |
| `assets/icons/message-circle.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) | Discord button and Help → Discord link |
| `assets/icons/lock-open.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/lock.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/map.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/maximize-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/menu.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/minus.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/monitor.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/move-diagonal-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/move.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/paint-bucket.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/paintbrush.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/palette.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/pen-tool.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/pen-tool-add.svg` | Lucide Icons and Contributors; badge by Reesha contributors | https://lucide.dev (lucide-static v1.49.0 `pen-tool`; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) | Lucide's pen-tool with a plus badge |
| `assets/icons/pen-tool-delete.svg` | Lucide Icons and Contributors; badge by Reesha contributors | https://lucide.dev (lucide-static v1.49.0 `pen-tool`; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) | Lucide's pen-tool with a minus badge |
| `assets/icons/pencil.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/pilcrow.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/pin.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/pipette.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/plus.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/printer.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/redo-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/rotate-3d.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/rotate-ccw.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/rotate-cw.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/ruler.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/save.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/scaling.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/scissors.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/search.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/settings.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/shapes.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/share-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/slice.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/sparkles.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/spline-pointer.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/spline.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/spray-can.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/square-dashed.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/square.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/squares-exclude.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/squares-intersect.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/squares-subtract.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/squares-unite.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/squircle.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/star.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/sun.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/swatch-book.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/text-cursor-input.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/tornado.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/trash-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/triangle.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/type.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/undo-2.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/ungroup.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/wand-sparkles.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/waves.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/x.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `assets/icons/zoom-in.svg` | Lucide Icons and Contributors | https://lucide.dev (lucide-static v1.49.0; header kept in file) | ISC; derived from Feather, also MIT (`assets/icons/LICENSE-lucide.txt`) |  |
| `docs/images/dusk-poster.png` | Reesha contributors | Rendered by Reesha from `examples/dusk-poster.reesha` | MIT OR Apache-2.0 |  |
| `examples/dusk-poster.reesha` | Reesha contributors | Original artwork built through the Reesha command API | MIT OR Apache-2.0 |  |
| `examples/dusk-poster.svg` | Reesha contributors | SVG export of the above | MIT OR Apache-2.0 |  |
| `docs/images/shot-1-neon.png` | Reesha contributors | Screenshot of Reesha itself (Reesha/Lucide UI icons only), editing `examples/neon-drive.reesha` | MIT OR Apache-2.0 |  |
| `docs/images/shot-2-ribbons.png` | Reesha contributors | Screenshot of Reesha itself, editing `examples/ribbons.reesha` | MIT OR Apache-2.0 |  |
| `docs/images/shot-3-sheet.png` | Reesha contributors | Screenshot of Reesha itself, editing `examples/feature-sheet.reesha` | MIT OR Apache-2.0 |  |
| `docs/images/shot-4-bezier.png` | Reesha contributors | Screenshot of Reesha itself, editing `examples/feature-sheet.reesha` | MIT OR Apache-2.0 |  |
| `docs/images/shot-5-perspective.png` | Reesha contributors | Screenshot of Reesha itself, editing `examples/perspective-city.reesha` | MIT OR Apache-2.0 |  |
| `docs/images/art-neon-drive.png` | Reesha contributors | Rendered by Reesha from `examples/neon-drive.reesha` | MIT OR Apache-2.0 |  |
| `docs/images/art-ribbons.png` | Reesha contributors | Rendered by Reesha from `examples/ribbons.reesha` | MIT OR Apache-2.0 |  |
| `docs/images/art-pathfinder.png` | Reesha contributors | Rendered by Reesha from `examples/feature-sheet.reesha` (artboard 1) | MIT OR Apache-2.0 |  |
| `docs/images/art-mesh.png` | Reesha contributors | Rendered by Reesha from `examples/feature-sheet.reesha` (artboard 2) | MIT OR Apache-2.0 |  |
| `docs/images/art-repeat.png` | Reesha contributors | Rendered by Reesha from `examples/feature-sheet.reesha` (artboard 3) | MIT OR Apache-2.0 |  |
| `docs/images/art-envelope.png` | Reesha contributors | Rendered by Reesha from `examples/feature-sheet.reesha` (artboard 4) | MIT OR Apache-2.0 |  |
| `examples/neon-drive.reesha` | Reesha contributors | Original artwork built through the Reesha command API | MIT OR Apache-2.0 |  |
| `examples/ribbons.reesha` | Reesha contributors | Original artwork built through the Reesha command API | MIT OR Apache-2.0 |  |
| `examples/feature-sheet.reesha` | Reesha contributors | Original artwork built through the Reesha command API | MIT OR Apache-2.0 |  |
| `examples/perspective-city.reesha` | Reesha contributors | Original artwork built through the Reesha command API | MIT OR Apache-2.0 |  |
