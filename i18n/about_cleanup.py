"""About windows (Warsha): only the About page — the Contributors and Models tabs go, and so do
the ArtCraft attribution lines, copyright lines naming the ArtCraft team, and links to ArtCraft.
The licences stay in LICENSE-MIT / LICENSE-APACHE / NOTICE beside every build.

  python about_cleanup.py      (idempotent)
"""
import pathlib
import re
import sys

UP = pathlib.Path(r"E:\craft-ar\upstream")
SITE = "https://malshatti.com/apps/"
LATIN = {"photocraft": "retoush", "vectorcraft": "reesha", "filmcraft": "monteer", "lightcraft": "tayf",
         "pdfcraft": "watheeq", "effectcraft": "wamda", "designcraft": "nasaq", "wordcraft": "satr",
         "deckcraft": "minbar", "gridcraft": "kashf", "cadcraft": "mukhattat", "soundcraft": "sada",
         "craft-launcher": ""}

# (app, file, old, new): `old` must be there once unless `new` already is.
PATCHES = [
    ("photocraft", "crates/ui-egui/src/dialogs.rs",
     'for (key, label) in [("about", tl!("About")), ("contributors", tl!("Contributors")), ("models", tl!("Models"))] {',
     'for (key, label) in [("about", tl!("About"))] {'),
    ("photocraft", "crates/ui-egui/src/dialogs.rs", '            ui.weak("egui · wgpu · photocraft-engine");\n', ''),
    ("vectorcraft", "crates/ui-egui/src/dialogs/about.rs",
     'for (i, label) in [tl!("About"), tl!("Contributors"), tl!("Models")].into_iter().enumerate() {',
     'for (i, label) in [tl!("About")].into_iter().enumerate() {'),
    ("vectorcraft", "crates/ui-egui/src/dialogs/about.rs",
     '''    ui.add_space(12.0);
    ui.label(
        egui::RichText::new(tl!(
            "Part of Warsha, based on ArtCraft. MIT OR Apache-2.0. Fonts: Source Sans 3, Inter, JetBrains Mono (OFL). Icons: Lucide (ISC) + VectorCraft."
        ))
        .size(11.0),
    );
''', ''),
    ("lightcraft", "crates/ui-egui/src/panels/dialogs.rs",
     'pub const ABOUT_TABS: &[(&str, &str)] = &[("about", "About"), ("contributors", "Contributors"), ("models", "Models")];',
     'pub const ABOUT_TABS: &[(&str, &str)] = &[("about", "About")];'),
    ("designcraft", "crates/ui-egui/src/about.rs",
     "    let resp = egui::Modal::new(egui::Id::new(\"about\")).show(ctx, |ui| {\n",
     "    // Warsha: the About page only (the Contributors and Models tabs were removed).\n    app.ui.about_tab = 0;\n"
     "    let resp = egui::Modal::new(egui::Id::new(\"about\")).show(ctx, |ui| {\n"),
    ("designcraft", "crates/ui-egui/src/about.rs",
     "            for (i, l) in ABOUT_TABS.iter().enumerate() {",
     "            for (i, l) in ABOUT_TABS.iter().take(1).enumerate() {"),
    ("gridcraft", "crates/ui-egui/src/dialogs.rs",
     '        for tab in ["About", "Contributors", "Models"] {', '        for tab in ["About"] {'),
    ("gridcraft", "crates/ui-egui/src/dialogs.rs",
     '            ui.hyperlink_to("https://github.com/malshatti44/warshaa", "https://github.com/malshatti44/warshaa");\n',
     '            ui.hyperlink_to("malshatti.com/apps/kashf", "https://malshatti.com/apps/kashf.html");\n'),
    ("cadcraft", "crates/ui-egui/src/dialogs.rs",
     'for (i, l) in ["About", "Contributors", "Models"].iter().enumerate() {', 'for (i, l) in ["About"].iter().enumerate() {'),
    ("soundcraft", "crates/ui-egui/src/panels.rs",
     'for (i, l) in (0u8..).zip(["About", "Contributors", "Models"]) {', 'for (i, l) in (0u8..).zip(["About"]) {'),
    ("deckcraft", "crates/ui-egui/src/dialogs.rs",
     'for (k, l) in [("about", "About"), ("contributors", "Contributors"), ("models", "Models")] {',
     'for (k, l) in [("about", "About")] {'),
    ("deckcraft", "crates/ui-egui/src/dialogs.rs",
     '        ui.label(egui::RichText::new("MIT OR Apache-2.0 · © 2026 ArtCraft Team and the DeckCraft contributors").size(11.0).color(t.text_faint));\n',
     ''),
    ("effectcraft", "crates/ui-egui/src/panels/dialogs.rs",
     'const ABOUT_TABS: [(&str, &str); 3] = [("About", "about"), ("Contributors", "contributors"), ("Models", "models")];',
     'const ABOUT_TABS: [(&str, &str); 1] = [("About", "about")];'),
    ("filmcraft", "crates/ui-egui/src/panels/dialogs.rs",
     'for (i, (id, label)) in [("about", tl!("About")), ("contributors", tl!("Contributors")), ("models", tl!("Models"))].into_iter().enumerate() {',
     'for (i, (id, label)) in [("about", tl!("About"))].into_iter().enumerate() {'),
    ("pdfcraft", "crates/ui-egui/src/dialogs.rs",
     'for (i, label) in ["About", "Contributors", "Models"].into_iter().enumerate() {', 'for (i, label) in ["About"].into_iter().enumerate() {'),
    ("wordcraft", "crates/ui-egui/src/dialogs.rs",
     'for (i, l) in ["About", "Contributors", "Models"].into_iter().enumerate() {', 'for (i, l) in ["About"].into_iter().enumerate() {'),
]


def patch():
    ok = True
    for app, rel, old, new in PATCHES:
        p = UP / app / rel
        s = p.read_text(encoding="utf-8")
        if (new and new in s) or (not new and old not in s):
            continue
        if s.count(old) != 1:
            print(f"!! {app}/{rel}: {s.count(old)} matches for {old[:60]!r}")
            ok = False
            continue
        p.write_text(s.replace(old, new), encoding="utf-8", newline="")
        print(f"patched {app}/{rel}")
    return ok


def app_pages():
    """Links to an app's page go to its page on malshatti.com."""
    for app, latin in LATIN.items():
        if not latin:
            continue
        page = f"{SITE}{latin}.html"
        n = 0
        for f in list((UP / app / "crates").rglob("*.rs")) + list((UP / app / "apps").rglob("*.rs")):
            if "target" in f.parts:
                continue
            s = f.read_text(encoding="utf-8")
            t = s.replace('"https://github.com/malshatti44/warshaa"', f'"{page}"')
            if t != s:
                f.write_text(t, encoding="utf-8", newline="")
                n += 1
        print(f"{app}: app page links -> {page} ({n} files)")


if __name__ == "__main__":
    good = patch()
    app_pages()
    sys.exit(0 if good else 1)
