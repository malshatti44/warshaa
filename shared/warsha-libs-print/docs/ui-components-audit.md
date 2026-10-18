# Shared UI component audit

The best first extraction is the embedded SVG icon catalog used by Retoush, Reesha and Watheeq. It has a small boundary, real consumers and little dependence on application behavior. The pilot puts that machinery in `warsha-ui::icons` and adopts it in all three apps. A second component, `warsha-ui::buttons::IconButton`, is adopted by Retoush and Watheeq. The pane extension adds tab fitting and interaction in Retoush/Reesha, split geometry in Nasaq/Retoush, and split geometry plus resize handles in Monteer/Wamda.

The broader opportunity is a collection of reusable UI components. All twelve Rust Warsha apps use egui 0.36, but their themes, document models, numeric fields and docking behavior have evolved differently. Shared components should accept small style values and return interactions; each app should continue to choose its layout, command, localization and document semantics.

This covers item 3 of [warsha-libs issue 2](https://github.com/malshatti44/warshaa). The [earlier four-app comparison](https://github.com/malshatti44/warshaa) is useful background, but the findings below come from the pinned source revisions listed at the end. This is a source audit, not a claim that every application has passed interactive or cross-platform acceptance.

## Scope and current libraries

The inventory covers the twelve Rust editor apps. The current docking migration covers nine creative editors: Retoush, Reesha, Nasaq, Tayf, Monteer, Wamda, Sada, Mukhattat and Watheeq. The Satr, Kashf and Minbar pilots remain supporting evidence for earlier component reuse and are outside that migration. Service repositories, fonts, test corpora, archived predecessors and unrelated organization repositories are outside the UI scope.

| App | Current UI and useful source | Behavior a shared component must preserve |
| --- | --- | --- |
| Retoush | egui/eframe 0.36; [tokens][pc-theme], [widgets][pc-widgets], [SVG icons][pc-icons], [dock][pc-dock], [rulers][pc-rulers] | Five themes, raster units and resolution, foreground/background colors, grouped panels, tool cursors and command coalescing. |
| Reesha | egui/eframe 0.36; [tokens][vc-theme], [widgets][vc-widgets], [SVG icons][vc-icons], [dock][vc-dock], [canvas rulers][vc-canvas] | Four brightness levels, point-based units, icon rails and flyouts, named/spot/gradient swatches, tool-name aliases. |
| Nasaq | egui/eframe 0.36; [tokens][dc-theme], [widgets][dc-widgets], [painter icons][dc-icons], [dock][dc-dock], [canvas][dc-canvas] | Four brightness levels plus high contrast, page/spread coordinates, mixed measurements, numeric spinners, floating panels and RTL text. |
| Watheeq | egui/eframe 0.36; [tokens][pdf-theme], [widgets][pdf-widgets], [SVG icons][pdf-icons], [dialogs][pdf-dialogs] | System/light/dark preferences, tool catalog, accessible button labels, PDF page coordinates and progress cancellation. |
| Tayf | egui/eframe 0.36; [tokens][lc-theme], [widgets][lc-widgets], [menus][lc-menu] | Develop control specifications, reset/fine-adjust gestures, catalog selection and label colors, preview-only explanations. |
| Monteer | egui/eframe 0.36; [tokens][fc-theme], [widgets][fc-widgets], [dock][fc-dock] | Three themes, configurable highlights/contrast, split/tab workspaces, compact tool/meter panels, timecode and media focus. |
| Wamda | egui/eframe 0.36; [tokens][ec-theme], [widgets][ec-widgets], [dock][ec-dock] | Three themes plus brightness adjustment, stacked panels and floating layouts, panel-local Tab navigation, composition/viewer identity. |
| Satr | egui/eframe 0.36; [tokens][wc-theme], [ribbon widgets][wc-widgets], [canvas rulers][wc-canvas] | Light/dark appearance, contextual command availability and shortcuts, document theme colors, paragraph indents and tabs. |
| Kashf | egui/eframe 0.36; [tokens][gc-theme], [ribbon widgets][gc-widgets], [dialogs][gc-dialogs] | Light/dark appearance, spreadsheet cell styles and theme tints, formula/selection focus, command-backed dialogs. |
| Minbar | egui/eframe 0.36; [tokens][deck-theme], [ribbon widgets][deck-widgets], [canvas rulers][deck-canvas] | Light/dark appearance, split buttons and galleries, slide theme references, contextual ribbon tabs and shape editing. |
| Mukhattat | egui/eframe 0.36; [tokens][cad-theme], [chrome][cad-chrome], [palettes][cad-palettes], [dialogs][cad-dialogs] | Drafting toggles, command-line state, model/layout tabs, CAD property types and multicolor painter icons. |
| Sada | egui/eframe 0.36; [tokens][sc-theme], [widgets][sc-widgets], [toolbar][sc-toolbar], [edit window][sc-edit] | Edit/mix controls, nonlinear dB meters, pan/fader interaction, record state and selectable audio rulers. |

The Rust applications keep egui at the frontend layer. The pilot follows that rule: only their UI crates depend on `warsha-ui`; engine, document and rendering crates do not. Their layer checkers reject a direct dependency on the shared crate below the UI layer: L6 in Retoush/Reesha/Nasaq/Satr/Kashf/Minbar/Sada, L5 in Monteer/Wamda/Tayf/Mukhattat and L7 in Watheeq. The crate depends on egui without enabling its default features. Apps retain their existing `egui_extras` SVG loader and renderer setup.

## Extraction priorities

These are proposed boundaries and adoption pairs, not a commitment to build a framework or migrate every app at once.

| Order | Component | Type of sharing | Initial consumers | Reference and reason |
| --- | --- | --- | --- | --- |
| 1 | Embedded SVG catalog | Extract with two small style policies | Retoush, Reesha, Watheeq | Retoush's owned `Arc` bytes avoid leaked allocations; the existing loaders already have almost the same responsibilities. Implemented in the pilot. |
| 2 | Small controls and component styles | Share components | Watheeq and Retoush for buttons; Kashf and Minbar for ribbon pieces | Watheeq exposes accessibility metadata on its painted controls. Keep the caller's label, geometry, colors, enabled state and command handling. Icon buttons and ribbon-tab interaction are implemented; split buttons and galleries remain proposed. |
| 3 | Numeric editing state | Consolidate selected behavior | Monteer and Wamda, then Tayf | Wamda adds finite-value checks and panel-local Tab behavior; Tayf has explicit cancel/reset and step semantics. These are useful references, not interchangeable implementations. |
| 4 | Swatch grid and color-field painting | Share components | Satr/Kashf/Minbar for grids; Retoush/Reesha for fields | The visual primitives overlap, while the values returned and color-management requirements differ. |
| 5 | Menu viewport and navigation helpers | Consolidate selected behavior | Retoush, Tayf, Reesha | Scrolling, overflow and focus are reusable. Menu catalogs, native menus, shortcut resolution and dispatch remain app-owned. |
| 6 | Ruler tick layout and painting | Standardize a primitive API | Reesha and Nasaq, then Retoush/Satr/Minbar | Share bounded tick placement and painting with caller-supplied labels and coordinates. Keep units, guide commands and paragraph markers outside. |
| 7 | Pane controls | Share geometry and interactions; keep application policy in apps | Retoush, Reesha, Nasaq, Monteer, Wamda | Tabs, bounded splits and resize handles are implemented. The subsequent optional [docking model and renderer](ui-docking.md) have separate consumer migration and acceptance requirements. |

The [theme comparison](theme-infrastructure.md) verifies all eight principal theme modules and extracts their first common mechanism: `theme::WidgetPalette`, used by Reesha, Nasaq and Tayf to style egui widget states while retaining their full palettes.

Theme roles belong beside the components that consume them. `IconButtonStyle` contains fills, borders, icon and focus colors for the implemented button. That does not require all apps to replace their `Tokens` structs or serialize the same theme enum. Panels, inspectors and dialogs can then reuse those controls while retaining their application-specific contents.

## Icons and the first extraction

Retoush embeds 118 SVGs, Reesha 259, and Watheeq 184 through their `icon_data.rs` catalogs. Retoush and Watheeq have identical `white_icons` preparation functions at these revisions. Reesha uses the same replacement approach but leaks each prepared buffer to obtain a static slice. The pilot takes the owned-byte approach from Retoush.

| Policy | Retoush | Reesha | Watheeq |
| --- | --- | --- | --- |
| `currentColor` replacement | `#ffffff` | `white` | `#ffffff` |
| Exact two-unit stroke replacement | `1.75` | `1.6` | `1.75` |
| Fallback icon | `square` | `square-dashed` | `square` |
| Existing URI prefix | `bytes://icons/` | `bytes://icon/` | `bytes://icons/` |
| Name used in fallback URI | Requested name | Requested name | Resolved fallback name |
| Existing prepared storage | Shared `Arc` | Leaked static slice | Shared `Arc` |

`SvgIconSet` owns prepared bytes and returns egui image sources. Each app supplies its embedded catalog, literal SVG substitutions, URI prefix and fallback. Tool aliases, tint, size, labels and tool cursors remain in the app; the button component accepts the app's hover/selected/pressed style policy. SVG parsing and rasterization stay with `egui_extras`.

The pilot retains all three consumers' cache keys and exact SVG bytes. Its characterization tests cover all 561 catalog entries, tool aliases and missing-name fallbacks. Shared-crate tests cover both style policies, repeated shared-byte lookups, an absent fallback, duplicate names, lossy UTF-8 compatibility and actual SVG rasterization at 16, 24 and 48 pixels. See the [crate guide](../crates/ui/README.md) for the API and limits.

The SVG substitution is deliberately narrow: it preserves the existing literal replacements rather than becoming a general SVG/CSS processor. The catalog is trusted compiled-in data. A new set in the same egui context must use a distinct URI prefix, because egui caches by URI. The existing app prefixes remain appropriate when each app owns its context.

Watheeq resolves the fallback name before requesting a source, preserving its existing URI policy. This replaces its indexed fallback lookup with the shared non-panicking lookup; the shared absent-fallback test covers a catalog without that entry. No icon assets move.

Most other Rust apps draw icons with egui's painter. Converting them all to SVG would be a separate visual change with different cost and fidelity questions. Common icon assets are a future candidate after checking file hashes, ownership and each app's asset manifest; Warsha trademarks remain outside such a library.

## Themes and common controls

The `Tokens` name does not imply a common schema. Retoush combines palette, layout radii, layer-label colors and histogram styling. Nasaq includes high contrast and page-layout chrome. Monteer and Wamda include timeline/panel colors; Kashf's theme also covers grid headers and selection. Mukhattat and Sada use domain-specific colors for drafting or transport states. The [theme sources above](#scope-and-current-libraries) show why replacing them with a union of every field would increase coupling.

The implemented icon button uses an explicit style struct and a supplied icon painter. It returns `egui::Response` so the app owns dispatch. A future split button should return distinct main/arrow responses. Prefer stable IDs supplied by the caller to IDs derived from translated labels. Keep dimensions configurable where they already differ. Use Watheeq's [button and split-pill accessibility metadata][pdf-widgets] and Tayf's [control descriptions and tests][lc-widgets] as references; appearance alone is insufficient.

An icon button or ribbon split button should be accepted only after mouse, keyboard activation, disabled behavior, focus indication, accessible label and main-versus-arrow hit regions are covered. The icon button deliberately adds a visible keyboard-focus outline in Retoush and Watheeq, and an accessible label/selection state in Retoush. Existing hover, selected and pressed treatments remain app-specific. Tests cover click cancellation, keyboard activation, disabled state, label translation without losing identity, duplicate labels and Tab order, focus painting, and invalid geometry. Ribbon split buttons remain proposed.

Inspectors remain app-owned. A layer inspector, a CAD property palette, a spreadsheet format panel and an audio mixer describe different document data and editing transactions. They can share labels, rows, numeric fields, sections and color chips without sharing a panel enum or pulling an engine into a UI utility crate. Similarly, common dialog framing can be separated from save confirmation, color sampling, export settings and progress/cancellation semantics.

## Numeric controls

[Reesha's fields][vc-widgets] parse document units and expressions, scrub labels, select text on focus and handle wheel/key steps with modifier policies. [Nasaq's `NumField`][dc-widgets] carries measure/number kinds, optional mixed values and spinner controls. Both need their own unit conversion and commit rules.

[Monteer's `hot_number`][fc-widgets] and [Wamda's `hot_number_at`][ec-widgets] are a more focused comparison. Wamda supports panel-local Tab order, decimal commas, cancellation and finite-value validation, and returns drag-completion information. Monteer's simpler helper does not expose the same completion contract. [Tayf's slider][lc-widgets] uses `ControlSpec`, stepped/clamped parsing, Shift for fine adjustment and double-click reset. Shift multiplies the film/effect scrub step instead. Sharing those gestures without a policy would change behavior.

A useful shared layer would manage the edit buffer, focus transitions and commit/cancel/drag lifecycle, with caller-supplied parse/format functions and step/modifier policy. It should return a value plus an edit phase; the caller groups undo history. Keep timecode, percentages, picas and color channels in adapters. Tests need non-finite values, invalid or inverted ranges, empty/mixed values, overflow, Escape, focus loss, Tab, repeated keys, wheel ownership and exactly one undo transaction per drag. Do not extract the current helpers wholesale before those differences are characterized.

## Colors and swatches

Satr's [color grid][wc-widgets] returns a hex string from RGB colors. Kashf's [palette][gc-widgets] applies the spreadsheet model's tint function and also returns hex strings. Minbar's [grid][deck-widgets] returns `ColorRef`, preserving theme-slot references; it distinguishes no selection from an explicit no-color result. A shared grid should receive already-resolved display colors plus opaque IDs and return an ID. It must not flatten Minbar's theme reference into RGB or impose one tint formula on the three apps.

Retoush's [picker][pc-picker] has component fields, Lab/CMYK/hex inputs, gamut/web warnings and canvas sampling, with foreground/background and command-backed commit behavior. Reesha's [picker][vc-picker] has a related field/slider model and feeds its own paint and swatch types. These are good sources for a shared 2D color-field painter and hit testing. Color conversions, profile choice, original/new color, sampling and dialog acceptance should remain injected or app-owned. An sRGB preview chip is not a document color model.

egui's built-in color widgets are worth using for simple sRGB controls. They do not replace these complete document-aware dialogs. Before sharing a custom field, test hue retention at zero saturation, field/slider round trips, out-of-range input, alpha previews and the app's existing color-profile behavior.

## Menus and dialogs

[Retoush's menu navigation][pc-menu-nav] has scrolling and keyboard behavior with a [dedicated test module][pc-menu-tests]; `widgets::menu_scroll` also serves context menus. Tayf separates a [menu level][lc-menu-level] from its menu definitions. Reesha's [menus][vc-menus] add dynamic labels, command availability, swatches, fonts and native-menu integration. Those are different layers.

Share viewport-constrained popup geometry, scrolling, hover delays and focus/navigation state before sharing a menu tree. Inputs should be display labels, stable IDs, checked/enabled state and callbacks or returned selections. The app resolves shortcuts, localizes labels and runs commands. Native menu services belong to issue 2's platform workstream, so this audit does not propose a second OS integration abstraction.

Dialog shells need explicit modality, Escape/default-button policy, focus restoration and child-popup handling. Mukhattat uses ordinary [egui windows][cad-dialogs] for some tools; Retoush has a [dialog stack][pc-dialogs] and canvas interactions during color sampling. One unconditional modal wrapper would lose these differences. Preserve existing save/cancel behavior and test nested popups, narrow windows and focus recovery before adopting a shell.

## Rulers and docking

[Retoush's rulers][pc-rulers] use pixels and document resolution, have unit-menu/guide-drag tests and normalize flipped ranges. [Reesha][vc-canvas] and [Nasaq][dc-canvas] use document units and their own tick/label painting; Nasaq also has page/spread origins and stacked vertical labels. [Satr][wc-canvas] adds paragraph indent and tab-stop interaction. [Minbar][deck-canvas] paints slide rulers. Sada's [ruler area][sc-edit] is based on audio time formats. A generic list of ticks can serve these consumers; a shared unit enum or guide controller cannot yet.

Start with an axis range, screen transform, tick budget and caller-produced labels. Tick generation must terminate for tiny zoom, non-finite values and enormous ranges. Guides, indent markers, unit menus and time conversion stay in adapters. Reuse the existing ruler tests as characterization and add bounded-work tests before extracting loops.

Monteer's [dock tree][fc-dock] has splits, fixed/relative sizes and tab groups. Wamda's [dock tree][ec-dock] adds stacks, floating layouts and additional panel/viewer identities. Retoush's [dock][pc-dock] allocates vertical groups with preferred/minimum/fill heights and has [interaction/persistence tests][pc-dock-tests]. Reesha and Nasaq also have icon rails and flyouts. These are related capabilities, not a single interchangeable serialized model.

The pane extraction compared [egui_dock 0.21.1](https://docs.rs/egui_dock/0.21.1/egui_dock/) and [egui_tiles 0.17.1](https://docs.rs/egui_tiles/0.17.1/egui_tiles/) at their egui 0.36 APIs. `egui_dock` offers binary fraction splits and floating egui windows within one OS window. `egui_tiles` offers tab, linear and grid containers with relative shares. Neither directly represents Wamda's accordion stack plus Monteer/Wamda's fixed-first/fixed-second sizing. Migrating either would require adapters for saved layouts, panel IDs and commands, as well as bounds on untrusted layout traversal. This source comparison does not establish runtime acceptance of either library.

The initial extraction kept a small boundary: `warsha-ui::tabs` fits labels and registers accessible tab interactions; `warsha-ui::layout` computes one bounded split and reports resize movement. At that stage, apps retained dock trees, panel contents, stacks, floating state and serialization. Retoush and Reesha retained their existing overflow/drag policies in adapters; Reesha gained fitted tabs and an overflow menu. Monteer and Wamda retained fixed and relative sizing, with focusable resize handles. Nasaq and Retoush reused geometry for their existing split document views.

The subsequent optional `warsha-ui::docking` module adds validated layout transactions, saved locations and an optional customizable renderer. Its [contract and host boundary](ui-docking.md) supersede the primitive-only boundary for consumers that adopt it. Panel registries, document state, commands, application menus and native window ownership remain in each app. Primitive-adapter checks do not establish acceptance of a later docking migration.

The shared geometry relaxes minima in tiny areas and rejects non-finite or inverted inputs. Wamda's former inverted-clamp case receives a synthetic regression test. Interaction tests cover pointer deltas, arrow keys, focus indication and AccessKit identity/value/actions; application tests retain responsibility for docking, pane focus, document cameras and saved layouts.

## Adoption and acceptance

`warsha-ui` exposes focused components; each app adopts them independently through its UI crate and pins an immutable shared revision. The original primitive-adapter trial covered all twelve Rust apps; its evidence below is separate from the current nine-app docking integration:

| App | Shared mechanisms | Preserved application responsibilities |
| --- | --- | --- |
| Retoush | SVG catalogs, icon buttons, tabs, split geometry | Five themes, Classic bevels, dock groups, canvas state and commands |
| Reesha | SVG catalogs, tabs, widget-state theme application | Theme presets, dock/floating models and tool aliases |
| Nasaq | Split geometry, widget-state theme application | High Contrast, input exceptions, taskbars and document focus |
| Watheeq | SVG catalogs, icon buttons, document/Combine tab interaction | Horizontal scrolling, stable document IDs, dirty/RTL labels and close requests |
| Monteer | Split geometry and resize handles | Fixed/relative pane sizing, workspace state and timeline focus |
| Wamda | Split geometry and resize handles | Accordion stacks, floating layouts and composition identity |
| Tayf | Widget-state theme application | Full dark palette, label colors, fonts and catalog state |
| Satr | Ribbon-tab interaction | File/backstage state, contextual tabs, double-click collapse and commands |
| Kashf | Ribbon-tab interaction and icon/toggle buttons | Formula/cell focus, command dispatch, undo and contextual tabs |
| Minbar | Ribbon-tab interaction | Active-tab collapse, contextual selection, galleries and split buttons |
| Mukhattat | Icon buttons | Multicolor icon painting, disabled tint and drafting commands |
| Sada | Icon and record-enable buttons | Transport-specific colors, track arming and audio commands |

The trials reuse existing APIs except for an opt-in `IconButton::single_shape_frame()` method.
Sada paints fill and border with one `Painter::rect`; splitting them changes translucent
edges. The option preserves that tessellation while the default retains existing consumers'
separate fill/stroke behavior. A shared regression compares the original and adapted meshes at
three display scales, enabled and disabled.

Satr's pressed/selected button precedence and Minbar's disabled hover behavior differ
from the shared button contract, so those controls stay local. Watheeq preserves inherited
foreground-stroke widths; Monteer/Wamda use different foregrounds by widget state. Those
themes retain their own application functions.

Acceptance is recorded per application. The suite trial compares native offscreen renders at
normal and narrow widths and exercises keyboard, pointer, disabled and accessible-selection
behavior through the real adapters. Matching renders preserve each application's current layout;
they do not certify whole-app usability or physical-control behavior on every platform.

Six candidates remain held by existing application checks: Mukhattat's renderer has a tautological
test assertion rejected by Clippy; Kashf has date-conversion and frontend boolean-expression
lints; Sada's CLI argument filter and Satr's hit-testing expression trigger
`nonminimal_bool`; Tayf has two GPU neural-network numerical failures; Wamda retains
its earlier Audio Spectrum golden mismatch. The lint diagnostics occur in unchanged source with
Rust 1.96. Tayf's numerical failures also reproduce individually and together on its original
commit with GPU denoising enabled. Their focused adapter checks pass, but the full application
gates remain blocked. These candidates remain separate from the adapters whose complete local
checks pass.

Run the shared crate's fmt, strict Clippy, tests and wasm check, followed by each adopting app's own gates. Compare actual UI renders at normal and narrow sizes, verify pointer and keyboard interactions, and distinguish passing focused checks from full application acceptance. Local path overrides are development tools; dependency manifests use immutable Git pins.

A shared UI dependency stays above the engine boundary, compiles for wasm, preserves source notices and avoids panic paths. An app can roll back adoption independently by reverting its adapter and dependency pin. Dock trees, layout persistence, document identity, command catalogs and platform windows remain app-owned.
## Source revisions

Snapshot date: 2026-10-09. The source-audit links throughout this report resolve to the original revisions below. The later adapter scope is recorded above; source-audit revisions are not adapter release revisions.

| Repository | Revision |
| --- | --- |
| `malshatti44/warshaa` | [`86f3199b400c`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`4b09f35c1d6f`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`66c7ce7e96ec`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`2a460986ee7a`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`7b6c13447228`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`51b531be3e8b`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`88ea1a804b35`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`f626db25cca2`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`e7a83ca342cd`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`eac0edd896cd`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`825d4fdb8b52`](https://github.com/malshatti44/warshaa) |
| `malshatti44/warshaa` | [`d7d9702bda1f`](https://github.com/malshatti44/warshaa) |

[pc-theme]: https://github.com/malshatti44/warshaa
[pc-widgets]: https://github.com/malshatti44/warshaa
[pc-icons]: https://github.com/malshatti44/warshaa
[pc-dock]: https://github.com/malshatti44/warshaa
[pc-rulers]: https://github.com/malshatti44/warshaa
[pc-picker]: https://github.com/malshatti44/warshaa
[pc-menu-nav]: https://github.com/malshatti44/warshaa
[pc-menu-tests]: https://github.com/malshatti44/warshaa
[pc-dock-tests]: https://github.com/malshatti44/warshaa
[pc-dialogs]: https://github.com/malshatti44/warshaa
[vc-theme]: https://github.com/malshatti44/warshaa
[vc-widgets]: https://github.com/malshatti44/warshaa
[vc-icons]: https://github.com/malshatti44/warshaa
[vc-dock]: https://github.com/malshatti44/warshaa
[vc-canvas]: https://github.com/malshatti44/warshaa
[vc-picker]: https://github.com/malshatti44/warshaa
[vc-menus]: https://github.com/malshatti44/warshaa
[dc-theme]: https://github.com/malshatti44/warshaa
[dc-widgets]: https://github.com/malshatti44/warshaa
[dc-icons]: https://github.com/malshatti44/warshaa
[dc-dock]: https://github.com/malshatti44/warshaa
[dc-canvas]: https://github.com/malshatti44/warshaa
[pdf-theme]: https://github.com/malshatti44/warshaa
[pdf-widgets]: https://github.com/malshatti44/warshaa
[pdf-icons]: https://github.com/malshatti44/warshaa
[pdf-dialogs]: https://github.com/malshatti44/warshaa
[lc-theme]: https://github.com/malshatti44/warshaa
[lc-widgets]: https://github.com/malshatti44/warshaa
[lc-menu]: https://github.com/malshatti44/warshaa
[lc-menu-level]: https://github.com/malshatti44/warshaa
[fc-theme]: https://github.com/malshatti44/warshaa
[fc-widgets]: https://github.com/malshatti44/warshaa
[fc-dock]: https://github.com/malshatti44/warshaa
[ec-theme]: https://github.com/malshatti44/warshaa
[ec-widgets]: https://github.com/malshatti44/warshaa
[ec-dock]: https://github.com/malshatti44/warshaa
[wc-theme]: https://github.com/malshatti44/warshaa
[wc-widgets]: https://github.com/malshatti44/warshaa
[wc-canvas]: https://github.com/malshatti44/warshaa
[gc-theme]: https://github.com/malshatti44/warshaa
[gc-widgets]: https://github.com/malshatti44/warshaa
[gc-dialogs]: https://github.com/malshatti44/warshaa
[deck-theme]: https://github.com/malshatti44/warshaa
[deck-widgets]: https://github.com/malshatti44/warshaa
[deck-canvas]: https://github.com/malshatti44/warshaa
[cad-theme]: https://github.com/malshatti44/warshaa
[cad-chrome]: https://github.com/malshatti44/warshaa
[cad-palettes]: https://github.com/malshatti44/warshaa
[cad-dialogs]: https://github.com/malshatti44/warshaa
[sc-theme]: https://github.com/malshatti44/warshaa
[sc-widgets]: https://github.com/malshatti44/warshaa
[sc-toolbar]: https://github.com/malshatti44/warshaa
[sc-edit]: https://github.com/malshatti44/warshaa
