# Shared theme infrastructure

The first shared mechanism is `warsha-ui::theme::WidgetPalette`: it applies colors to egui's five
widget states, with a supplied foreground stroke and corner radius. Reesha, Nasaq and
Tayf use the same operation. Their complete palettes, theme choices, fonts and preferences
remain in their frontends.

This follows the reusable-UI workstream of [warsha-libs issue 2](https://github.com/malshatti44/warshaa).
The [cross-app architecture discussion](https://github.com/malshatti44/warshaa) and
[base-crate request](https://github.com/malshatti44/warshaa) provide context; this change
keeps the existing repository, document and release boundaries.

## Source comparison

Reviewed 2026-10-09 at the revisions below. All links point to
`crates/ui-egui/src/theme.rs`. The 3,454-line total includes font setup, specialized helpers and
tests; it is not a count of duplicate theme code. Token-field counts include non-color fields.

| App | Source revision | Lines | Token fields | Theme model |
| --- | --- | ---: | ---: | --- |
| Retoush | [`e7a83ca342cd`](https://github.com/malshatti44/warshaa) | 832 | 37 | Five presets; per-preset metrics and Classic bevels |
| Reesha | [`825d4fdb8b52`](https://github.com/malshatti44/warshaa) | 345 | 38 | Four brightness presets |
| Nasaq | [`66c7ce7e96ec`](https://github.com/malshatti44/warshaa) | 426 | 33 | Four brightness presets plus High Contrast |
| Satr | [`d7d9702bda1f`](https://github.com/malshatti44/warshaa) | 231 | 32 | Light/dark, ribbon and page colors |
| Watheeq | [`f626db25cca2`](https://github.com/malshatti44/warshaa) | 314 | 22 | System/light/dark preference |
| Tayf | [`88ea1a804b35`](https://github.com/malshatti44/warshaa) | 345 | 35 | Dark photo workflow palette |
| Monteer | [`7b6c13447228`](https://github.com/malshatti44/warshaa) | 447 | 43 | Three presets, custom accent and accessible contrast |
| Wamda | [`2a460986ee7a`](https://github.com/malshatti44/warshaa) | 514 | 44 | Three presets, brightness and label colors |

The matching widget-state operation is visible in [Reesha lines 299–312][vector-loop],
[Nasaq lines 336–348][design-loop] and [Tayf lines 235–247][light-loop]. It assigns
`bg_fill`, `weak_bg_fill`, `corner_radius` and `fg_stroke` across noninteractive, inactive, hovered,
active and open states. The state colors differ, but the assignments and their meaning agree.

The surrounding `Visuals` operations differ materially:

| App | Differences that remain local |
| --- | --- |
| Reesha | Selection uses accent at 0.55 gamma with an accent stroke. Popup/window radius is 6; shadows vary with light/dark. Inactive border is absent, hover uses input border and active uses accent. Body/button text is 13 pt. |
| Nasaq | Selection uses strong accent and strong-text stroke. Radius is 4; window shadow stays egui's default. Interactive borders use field border. Inactive buttons get transparent weak fill and input background after the shared operation. Body/button text is 11 pt. High Contrast keeps black/white/yellow colors. |
| Tayf | The matching loop uses `text_label`, intentionally dimmer than the app's main text, and a fixed dark palette. Catalog label helpers depend on its own model. |
| Monteer | Custom highlight and contrast preferences feed its palette. Widget states use ordinary text for inactive/noninteractive and brighter text for hovered/active; open foreground remains inherited. |
| Wamda | Its widget assignment block matches Monteer's, but brightness adjustment, label/gradient helpers, popup radius, shadows, spacing and solid scrollbars differ. |
| Retoush | Noninteractive text is dimmer; interactive states have separate border and expansion policies. Classic styling includes bevels, and font size is preference-driven. |
| Watheeq | System theme resolution and named context storage are local. Its foreground loop preserves each inherited stroke width; a blanket full-stroke assignment would change that contract. Light text and font subpixel settings differ. |
| Satr | Tokens derive from egui's current dark mode. Only three interactive states get explicit radii; other states inherit egui defaults. Ribbon/document colors have separate meaning. |

Monteer and Wamda's separate matching block is a useful second extraction candidate, but
it has a different foreground-state contract. Extending the first helper to cover it immediately
would obscure the small invariant being shared. There is no single cleanest complete theme:
the first pair offers the clearest common operation, and the other apps preserve different
requirements rather than providing interchangeable replacements.

## Boundary and API

```rust
pub struct WidgetPalette {
    pub noninteractive: egui::Color32,
    pub inactive: egui::Color32,
    pub hovered: egui::Color32,
    pub active: egui::Color32,
    pub open: egui::Color32,
}

impl WidgetPalette {
    pub fn apply_to(
        self,
        widgets: &mut egui::style::Widgets,
        radius: egui::CornerRadius,
        foreground: egui::Stroke,
    );
}
```

The implementation lives in [`crates/ui/src/theme`](../crates/ui/src/theme/mod.rs). It changes only
those four properties. Borders, expansion, selection, shadows and the rest of egui's visuals
stay untouched. Apps apply their state-specific exceptions afterward. `noninteractive` names
egui's state, not a new disabled-control policy.

A separate `warsha-theme` crate adds no useful boundary: this mechanism already depends on egui
and belongs beside the controls it styles. A universal token structure, theme enum, application
identifier or global context key is unnecessary. Constructing another large visual-options
object would mostly rename `egui::Visuals` fields without simplifying their use. Context lookup
and storage are already small and retain different fallback themes.

The identical packed-RGB helper in Reesha and Nasaq is only a few casts; it remains
local in this extraction. A contrast API also needs a second runtime consumer before extraction.

## Fonts and styling outside theme modules

Font setup occupies hundreds of the audited lines. It depends on app-specific font catalogs,
locale handling and fallback order: Retoush uses its text and preference crates; Reesha
uses `reesha_text`; Nasaq and Satr use their font crates; Watheeq adds script
and system fallback; Tayf uses its engine catalog; Monteer and Wamda use their text
crates and local font discovery. Nasaq also configures named Arabic shaping families.
These dependencies and font assets stay outside `warsha-ui`.

Theme references occur throughout panels, menus and tools, with local visual/spacing overrides
in every app. A source search alone cannot turn this into a percentage of correctly themed UI:
many literal colors are document content, swatches, previews or intentional contrast choices.
A search of UI source files outside `theme.rs` found the following. The columns count files,
including tests, containing token/theme references, local visual/spacing mutation, or literal
`Color32` construction. They are navigation aids, not counts of defective controls.

| App | Theme references | Local overrides | Literal colors |
| --- | ---: | ---: | ---: |
| Retoush | 115 | 37 | 59 |
| Reesha | 149 | 40 | 41 |
| Nasaq | 26 | 8 | 19 |
| Satr | 10 | 4 | 9 |
| Watheeq | 40 | 11 | 30 |
| Tayf | 40 | 20 | 27 |
| Monteer | 53 | 4 | 46 |
| Wamda | 61 | 1 | 55 |

Examples worth preserving or reviewing separately:

- Retoush's `widgets.rs` draws fixed light/dark Classic bevels and removes field chrome;
  `menus.rs` supplies its own menu styling.
- Reesha's `widgets.rs` uses white primary-button labels and contrasting fill/stroke wells.
- Nasaq's `widgets.rs:147` sets focused numeric-field colors independently of High Contrast;
  fixed dialog warning/error colors also merit a later accessibility review.
- Satr's ribbon Share control uses white; Watheeq's notification surfaces and dialog
  widgets have local light/dark styling.
- Tayf's dialog download errors use a fixed hue, while its color helpers also draw actual
  photo-workflow values.
- Monteer's header customizes menu chrome; Wamda's effect widgets and ScriptUI controls
  customize backgrounds and slider widths.

This extraction preserves those choices. It does not certify whole-app accessibility or theme
consistency, and it does not move font installation into the shared crate.

## Migration and validation

1. Capture Reesha's four themes and Nasaq's five, including High Contrast, before
   replacing either loop. Use synthetic documents, panels/inspectors, menus and preferences at
   1× and 2× scales. Save the complete egui Style and app Tokens for comparison.
2. Add the shared helper with a test that preserves custom borders and expansion while replacing
   all state fills, including reapplying a theme after a local override.
3. Replace only each app's five-state loop. Keep its existing colors, strokes, post-loop
   exceptions, fonts, spacing, context state, commands and saved preference schema.
4. Repeat the renders and compare complete styles/tokens and images. Exercise theme commands,
   menu check states and an in-memory saved-preference round trip. A process restart or native
   display acceptance remains a separate check.
5. Run shared fmt, strict Clippy, tests and wasm, then each app's own gates. Each app pins the
   shared revision independently and can revert its adapter/pin without migrating preferences.

The main risks are accidentally resetting inherited egui fields, losing Nasaq's inactive
outline exception or High Contrast colors, and confusing font/locale behavior with theme
application. Exact style comparison plus visual checks covers the first two; keeping font code
unchanged limits the third. Shared code depends only on egui, and layer checks keep it above
engines and document models.

The suite trial also adopts Tayf's identical loop. Monteer/Wamda's widget-state matrix
and consistent focused numeric fields remain candidates for separate work. Theme adapters for the
shared tabs and buttons now also serve Watheeq, Satr, Kashf, Minbar, Mukhattat and
Sada; their full palettes stay local. Further extractions need two real consumers and their
own visual and interaction checks.

[vector-loop]: https://github.com/malshatti44/warshaa

[design-loop]: https://github.com/malshatti44/warshaa

[light-loop]: https://github.com/malshatti44/warshaa
