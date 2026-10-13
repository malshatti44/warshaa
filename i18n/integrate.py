"""Wire the Arabic catalog into each app's language registry (idempotent).

  python integrate.py vectorcraft photocraft ...   (default: every app listed in PATCHES)

Each patch is (file, old, new): `old` must occur exactly once unless `new` is already there.
"""
import pathlib
import sys

UP = pathlib.Path(r"E:\craft-ar\upstream")

PLURAL_AR = '''/// Arabic (CLDR `ar`, integer counts): zero (0), one (1), two (2), few (3–10, 103–110),
/// many (11–99, 111–199), other (100–102, 200–202). Arabic build (تعريب: محمد الشطي).
fn plural_arabic(n: u64) -> usize {
    match (n, n % 100) {
        (0, _) => 0,
        (1, _) => 1,
        (2, _) => 2,
        (_, 3..=10) => 3,
        (_, 11..=99) => 4,
        _ => 5,
    }
}

'''

RTL_HOOK = '''    // Arabic reads right to left even when a label starts with a Latin word (PDF, SVG…).
    egui::epaint::text::bidi::set_prefer_rtl(lang.code() == "ar");
'''

AR_COMMENT = "    // Arabic, the default interface of the Arabic build (تعريب وتطوير: محمد الشطي — malshatti.com).\n"

PATCHES = {
    "vectorcraft": [
        ("crates/ui-egui/src/i18n/mod.rs", "/// The registry. English first", PLURAL_AR + "/// The registry. English first"),
        ("crates/ui-egui/src/i18n/mod.rs", "pub static LANGUAGES: [LangInfo; 14] = [", "pub static LANGUAGES: [LangInfo; 15] = ["),
        ("crates/ui-egui/src/i18n/mod.rs",
         'LangInfo { code: "en", name: "English", source: "", plural: plural_one_other, complete_menus: false, catalog: OnceLock::new() },\n',
         'LangInfo { code: "en", name: "English", source: "", plural: plural_one_other, complete_menus: false, catalog: OnceLock::new() },\n'
         + AR_COMMENT
         + '    LangInfo { code: "ar", name: "العربية", source: include_str!("ar.tsv"), plural: plural_arabic, complete_menus: true, catalog: OnceLock::new() },\n'),
        ("crates/ui-egui/src/i18n/mod.rs",
         "    CURRENT.store(i, Ordering::Relaxed);\n}",
         "    CURRENT.store(i, Ordering::Relaxed);\n" + RTL_HOOK + "}"),
        ("crates/engine/src/lib.rs", 'interface_language: s("auto"),', 'interface_language: s("ar"),'),
    ],
    "photocraft": [
        ("crates/ui-egui/src/i18n/mod.rs", "/// A catalog file as deflated by build.rs", PLURAL_AR + "/// A catalog file as deflated by build.rs"),
        ("crates/ui-egui/src/i18n/mod.rs", "pub static LANGUAGES: [LangInfo; 20] = [", "pub static LANGUAGES: [LangInfo; 21] = ["),
        ("crates/ui-egui/src/i18n/mod.rs",
         'LangInfo { code: "en", name: "English", source: b"", plural: plural_one_other, complete_menus: false, catalog: OnceLock::new() },\n',
         'LangInfo { code: "en", name: "English", source: b"", plural: plural_one_other, complete_menus: false, catalog: OnceLock::new() },\n'
         + AR_COMMENT
         + '    LangInfo { code: "ar", name: "العربية", source: catalog!("ar"), plural: plural_arabic, complete_menus: true, catalog: OnceLock::new() },\n'),
        ("crates/ui-egui/src/i18n/mod.rs",
         "pub fn set_current(lang: Lang) {\n    CURRENT.set(lang);\n}",
         "pub fn set_current(lang: Lang) {\n    CURRENT.set(lang);\n" + RTL_HOOK + "}"),
        ("crates/engine/src/prefs.rs", 'language: "auto".into(),', 'language: "ar".into(),'),
    ],
    "pdfcraft": [
        # pdfcraft already registers Arabic; its own visual reordering steps aside for epaint's.
        ("crates/ui-egui/src/i18n/mod.rs",
         "pub fn set_current(lang: Lang) {\n    CURRENT.set(lang);\n}",
         "pub fn set_current(lang: Lang) {\n    CURRENT.set(lang);\n" + RTL_HOOK + "}"),
        ("crates/ui-egui/src/i18n/mod.rs", "            if self.rtl {\n                catalog.map_translations",
         "            // epaint (Arabic build) reorders every laid-out row itself.\n"
         "            if self.rtl && !egui::epaint::text::bidi::reorder() {\n                catalog.map_translations"),
        ("crates/ui-egui/src/bidi.rs",
         "fn push_line(out: &mut String, text: &str, info: &BidiInfo<'_>, para: &ParagraphInfo, line: Range<usize>) {\n",
         "fn push_line(out: &mut String, text: &str, info: &BidiInfo<'_>, para: &ParagraphInfo, line: Range<usize>) {\n"
         "    // The Arabic build's epaint puts laid-out rows into visual order itself: keep the logical\n"
         "    // text (without bidi controls) so it isn't reversed twice.\n"
         "    if egui::epaint::text::bidi::reorder() {\n"
         "        out.extend(text.get(line).unwrap_or_default().chars().filter(|c| !is_bidi_control(*c)));\n"
         "        return;\n"
         "    }\n"),
        ("crates/ui-egui/src/bidi.rs",
         "pub fn display_rtl(text: &str) -> String {\n",
         "pub fn display_rtl(text: &str) -> String {\n"
         "    if egui::epaint::text::bidi::reorder() {\n        return text.to_owned();\n    }\n"),
        ("crates/ui-egui/src/widgets.rs", "            if line.rtl {\n                line.text.insert_str(0, ELLIPSIS);",
         "            if line.rtl && !egui::epaint::text::bidi::reorder() {\n                line.text.insert_str(0, ELLIPSIS);"),
        ("crates/ui-egui/src/lib.rs", "            language: i18n::AUTO.to_string(),", '            language: "ar".to_string(),'),
    ],
    "designcraft": [
        ("crates/ui-egui/src/rtl.rs",
         "fn layout(ctx: &egui::Context, job: LayoutJob) -> Arc<Galley> {\n    if !may_have_rtl(&job.text) {",
         "fn layout(ctx: &egui::Context, job: LayoutJob) -> Arc<Galley> {\n"
         "    // The Arabic build's epaint reorders every laid-out row itself.\n"
         "    if !may_have_rtl(&job.text) || egui::epaint::text::bidi::reorder() {"),
        ("crates/ui-egui/src/lib.rs", "            language: String::new(),", '            language: "ar".into(),'),
    ],
    "cadcraft": [
        ("crates/ui-egui/src/i18n/mod.rs",
         "pub enum Preference {\n    #[default]\n    #[serde(rename = \"auto\")]\n    Auto,\n",
         "pub enum Preference {\n    #[serde(rename = \"auto\")]\n    Auto,\n"
         "    /// The default of the Arabic build (تعريب وتطوير: محمد الشطي — malshatti.com).\n"
         "    #[default]\n    #[serde(rename = \"ar\")]\n    Arabic,\n"),
        ("crates/ui-egui/src/i18n/mod.rs", "    pub const ALL: [Self; 10] = [\n        Self::Auto,\n",
         "    pub const ALL: [Self; 11] = [\n        Self::Auto,\n        Self::Arabic,\n"),
        ("crates/ui-egui/src/i18n/mod.rs", '            Self::Auto => "auto",\n', '            Self::Auto => "auto",\n            Self::Arabic => "ar",\n'),
        ("crates/ui-egui/src/i18n/mod.rs", '            Self::Auto => t("Auto (system language)"),\n',
         '            Self::Auto => t("Auto (system language)"),\n            Self::Arabic => "العربية",\n'),
        ("crates/ui-egui/src/i18n/mod.rs", '            Self::English => "en",\n            Self::Ukrainian => "uk",\n            Self::BrazilianPortuguese => "pt-BR",\n            Self::German => "de",\n            Self::Spanish => "es",\n            Self::Czech => "cs",\n            Self::Russian => "ru",\n            Self::French => "fr",\n            Self::Chinese => "zh",\n            Self::Auto =>',
         '            Self::Arabic => "ar",\n            Self::English => "en",\n            Self::Ukrainian => "uk",\n            Self::BrazilianPortuguese => "pt-BR",\n            Self::German => "de",\n            Self::Spanish => "es",\n            Self::Czech => "cs",\n            Self::Russian => "ru",\n            Self::French => "fr",\n            Self::Chinese => "zh",\n            Self::Auto =>'),
        ("crates/ui-egui/src/i18n/mod.rs", "pub static LANGUAGES: [Language; 9] = [", "pub static LANGUAGES: [Language; 10] = ["),
        ("crates/ui-egui/src/i18n/mod.rs",
         '    Language { code: "en", name: "English", source: "", plural: plural_en, plural_forms: 2, catalog: OnceLock::new() },\n',
         '    Language { code: "en", name: "English", source: "", plural: plural_en, plural_forms: 2, catalog: OnceLock::new() },\n'
         + AR_COMMENT
         + '    Language { code: "ar", name: "العربية", source: include_str!("ar.tsv"), plural: plural_arabic, plural_forms: 6, catalog: OnceLock::new() },\n'),
        ("crates/ui-egui/src/i18n/mod.rs", "fn plural_en(n: u64) -> usize {", PLURAL_AR + "fn plural_en(n: u64) -> usize {"),
        ("crates/ui-egui/src/i18n/mod.rs",
         "    let _restore = Restore(CURRENT.replace(language));\n",
         "    let _restore = Restore(CURRENT.replace(language));\n"
         "    // Arabic reads right to left even when a label starts with a Latin word.\n"
         "    egui::epaint::text::bidi::set_prefer_rtl(language == \"ar\");\n"),
    ],
    "craft-launcher": [
        ("crates/ui-egui/src/i18n/lang.rs", "pub static LANGUAGES: [LangInfo; 11] = [", "pub static LANGUAGES: [LangInfo; 12] = ["),
        ("crates/ui-egui/src/i18n/lang.rs",
         '        complete_menus: false,\n        catalog: OnceLock::new(),\n    },\n',
         '        complete_menus: false,\n        catalog: OnceLock::new(),\n    },\n'
         + AR_COMMENT
         + '    LangInfo {\n        code: "ar",\n        name: "العربية",\n        english_name: "Arabic",\n        script: None,\n'
           '        source: include_str!("ar.tsv"),\n        plural: plural_arabic,\n        plural_forms: 6,\n'
           '        complete_menus: true,\n        catalog: OnceLock::new(),\n    },\n'),
        ("crates/ui-egui/src/i18n/lang.rs", "/// The registry. English first", PLURAL_AR + "/// The registry. English first"),
        ("crates/ui-egui/src/i18n/translate.rs",
         "    CURRENT.store(lang.index(), Ordering::Relaxed);\n}",
         "    CURRENT.store(lang.index(), Ordering::Relaxed);\n" + RTL_HOOK + "}"),
        ("crates/ui-egui/src/settings.rs", '            language: "auto".to_string(),', '            language: "ar".to_string(),'),
    ],
}

PATCHES["filmcraft"] = [
    ("crates/ui-egui/src/i18n/mod.rs", "    #[default]\n    En,\n    Ja,\n",
     "    En,\n    /// Arabic, the default of the Arabic build (تعريب وتطوير: محمد الشطي — malshatti.com).\n    #[default]\n    Ar,\n    Ja,\n"),
    ("crates/ui-egui/src/i18n/mod.rs", "static JAPANESE: OnceLock<Catalog> = OnceLock::new();\n",
     "static ARABIC: OnceLock<Catalog> = OnceLock::new();\nstatic JAPANESE: OnceLock<Catalog> = OnceLock::new();\n"),
    ("crates/ui-egui/src/i18n/mod.rs", "pub const ALL: [Self; 10] = [Self::En, Self::Ja,", "pub const ALL: [Self; 11] = [Self::En, Self::Ar, Self::Ja,"),
    ("crates/ui-egui/src/i18n/mod.rs", '            Self::En => "English",\n', '            Self::En => "English",\n            Self::Ar => "العربية",\n'),
    ("crates/ui-egui/src/i18n/mod.rs", '            "en" => Some(Self::En),\n', '            "en" => Some(Self::En),\n            "ar" => Some(Self::Ar),\n'),
    ("crates/ui-egui/src/i18n/mod.rs", '        const PRIMARY: [(&str, Language); 10] = [\n            ("en", Language::En),\n',
     '        const PRIMARY: [(&str, Language); 11] = [\n            ("en", Language::En),\n            ("ar", Language::Ar),\n'),
    ("crates/ui-egui/src/i18n/mod.rs", '            Self::En => "en",\n', '            Self::En => "en",\n            Self::Ar => "ar",\n'),
    ("crates/ui-egui/src/i18n/mod.rs", "            Self::En => None,\n",
     '            Self::En => None,\n            Self::Ar => Some(ARABIC.get_or_init(|| Catalog::parse(include_str!("ar.tsv")))),\n'),
    ("crates/ui-egui/src/i18n/mod.rs", "    CURRENT.with(|c| c.set(lang));\n}",
     "    CURRENT.with(|c| c.set(lang));\n" + RTL_HOOK + "}"),
    ("crates/ui-egui/src/menus.rs", '    uic!("app.language.english", "English", ["Edit", "Language"], None),\n',
     '    uic!("app.language.english", "English", ["Edit", "Language"], None),\n    uic!("app.language.arabic", "العربية", ["Edit", "Language"], None),\n'),
    ("crates/ui-egui/src/menus.rs", '        "app.language.english"\n            | "app.language.japanese"',
     '        "app.language.english"\n            | "app.language.arabic"\n            | "app.language.japanese"'),
    ("crates/ui-egui/src/menus.rs", '            "app.language.japanese" => crate::i18n::Language::Ja,\n',
     '            "app.language.arabic" => crate::i18n::Language::Ar,\n            "app.language.japanese" => crate::i18n::Language::Ja,\n'),
    ("crates/ui-egui/src/menus.rs", '            "app.language.english" => it.checked = Some(app.ui.language == crate::i18n::Language::En),\n',
     '            "app.language.english" => it.checked = Some(app.ui.language == crate::i18n::Language::En),\n'
     '            "app.language.arabic" => it.checked = Some(app.ui.language == crate::i18n::Language::Ar),\n'),
    ("crates/engine/src/settings.rs", '                    ("en", "English"),\n                    ("ja", "日本語"),\n',
     '                    ("en", "English"),\n                    ("ar", "العربية"),\n                    ("ja", "日本語"),\n'),
    ("crates/engine/src/settings.rs", '            interface_language: "system".into(),', '            interface_language: "ar".into(),'),
    ("crates/ui-egui/src/rtl.rs",
     "        let logical = painter.layout(text.to_owned(), font.clone(), color, wrap_width);\n        if !has_rtl(text) {\n            return Self { size: logical.size(), rows: vec![logical], rtl: false };\n        }\n",
     "        let logical = painter.layout(text.to_owned(), font.clone(), color, wrap_width);\n        if !has_rtl(text) {\n            return Self { size: logical.size(), rows: vec![logical], rtl: false };\n        }\n"
     "        // The Arabic build's epaint puts every laid-out row into reading order itself.\n"
     "        if egui::epaint::text::bidi::reorder() {\n"
     "            let rtl = BidiInfo::new(text, None).paragraphs.first().is_some_and(|p| p.level.is_rtl());\n"
     "            return Self { size: logical.size(), rows: vec![logical], rtl };\n"
     "        }\n"),
]

PATCHES["gridcraft"] = [
    ("crates/ui-egui/src/i18n.rs", "mod cs;\n", "mod ar;\nmod cs;\n"),
    ("crates/ui-egui/src/i18n.rs", "pub enum Language {\n    #[default]\n    En,\n",
     "pub enum Language {\n    En,\n    /// Arabic, the default of the Arabic build (تعريب وتطوير: محمد الشطي — malshatti.com).\n    #[default]\n    Ar,\n"),
    ("crates/ui-egui/src/i18n.rs", "pub const ALL: [Self; 10] = [Self::En, Self::Es,", "pub const ALL: [Self; 11] = [Self::En, Self::Ar, Self::Es,"),
    ("crates/ui-egui/src/i18n.rs", '            Self::En => "English",\n', '            Self::En => "English",\n            Self::Ar => "العربية",\n'),
    ("crates/ui-egui/src/i18n.rs", '            Self::En => "en",\n', '            Self::En => "en",\n            Self::Ar => "ar",\n'),
    ("crates/ui-egui/src/i18n.rs", '            "en" => Some(Self::En),\n', '            "en" => Some(Self::En),\n            "ar" => Some(Self::Ar),\n'),
    ("crates/ui-egui/src/i18n.rs", "            Self::En => None,\n            Self::Es => es::translate(text),\n",
     "            Self::En => None,\n            Self::Ar => ar::translate(text),\n            Self::Es => es::translate(text),\n"),
    ("crates/ui-egui/src/i18n.rs",
     "pub fn set_current(ctx: &egui::Context, language: Language) {\n    ctx.data_mut(|d| d.insert_temp(lang_key(), language));\n}",
     "pub fn set_current(ctx: &egui::Context, language: Language) {\n    ctx.data_mut(|d| d.insert_temp(lang_key(), language));\n"
     "    // Arabic reads right to left even when a label starts with a Latin word.\n"
     "    egui::epaint::text::bidi::set_prefer_rtl(language == Language::Ar);\n}"),
    ("crates/ui-egui/src/lib.rs", "            language: i18n::Language::En,\n", "            language: i18n::Language::Ar,\n"),
    ("apps/gridcraft/src/main.rs",
     "    app.ui.language = gridcraft_ui_egui::i18n::Language::system();\n",
     "    // The Arabic build opens in Arabic; View ▸ Language switches.\n    app.ui.language = gridcraft_ui_egui::i18n::Language::Ar;\n"),
]
PATCHES["effectcraft"] = [
    ("crates/ui-egui/src/i18n.rs", "mod ui;\n", "mod ui;\n/// Arabic (تعريب وتطوير: محمد الشطي — malshatti.com): the menu tree and the panels.\nmod ar;\n"),
    ("crates/ui-egui/src/i18n.rs", 'const CATALOG_CODES: [&str; 10] = ["ja",', 'const CATALOG_CODES: [&str; 11] = ["ar", "ja",'),
    ("crates/ui-egui/src/i18n.rs", '        "ja" => lookup(JAPANESE, command, source),\n',
     '        "ar" => lookup(ar::MENU, command, source),\n        "ja" => lookup(JAPANESE, command, source),\n'),
    ("crates/ui-egui/src/i18n.rs", '        "ja" => ("取り消し", "取り消しできません", "やり直し", "やり直しできません"),\n',
     '        "ar" => ("تراجع عن", "لا شيء للتراجع عنه", "إعادة", "لا شيء لإعادته"),\n'
     '        "ja" => ("取り消し", "取り消しできません", "やり直し", "やり直しできません"),\n'),
    ("crates/ui-egui/src/i18n/ui.rs", "    static JA: OnceLock<Index> = OnceLock::new();\n",
     "    static AR: OnceLock<Index> = OnceLock::new();\n    static JA: OnceLock<Index> = OnceLock::new();\n"),
    ("crates/ui-egui/src/i18n/ui.rs", '        "ja" => (&JA, JAPANESE),\n', '        "ar" => (&AR, super::ar::UI),\n        "ja" => (&JA, JAPANESE),\n'),
    ("crates/ui-egui/src/i18n/ui.rs", "pub(crate) fn set_current(language: &'static str) {\n    CURRENT.with(|c| c.set(language));\n}",
     "pub(crate) fn set_current(language: &'static str) {\n    CURRENT.with(|c| c.set(language));\n"
     "    // Arabic reads right to left even when a label starts with a Latin word.\n"
     "    egui::epaint::text::bidi::set_prefer_rtl(language == \"ar\");\n}"),
    ("crates/engine/src/prefs.rs", '    ("English", "en"),\n    ("日本語", "ja"),\n', '    ("English", "en"),\n    ("العربية", "ar"),\n    ("日本語", "ja"),\n'),
    ("crates/engine/src/prefs.rs", '    language: String = "system".into(),', '    language: String = "ar".into(),'),
]
PATCHES["lightcraft"] = [
    ("crates/ui-egui/src/i18n.rs", '    En, "en";\n',
     '    En, "en";\n    // Arabic, the default of the Arabic build (تعريب وتطوير: محمد الشطي — malshatti.com).\n'
     '    Ar, "ar", "العربية", "Arab", include_str!("../locales/ar.json");\n'),
    ("crates/ui-egui/src/i18n.rs", "    LOCALE.with(|value| value.set(language));\n}",
     "    LOCALE.with(|value| value.set(language));\n"
     "    // Arabic reads right to left even when a label starts with a Latin word.\n"
     "    egui::epaint::text::bidi::set_prefer_rtl(language == Locale::Ar);\n}"),
    ("crates/ui-egui/src/i18n.rs", ".and_then(|value| Locale::parse_tag(&value)).unwrap_or(Locale::En)",
     ".and_then(|value| Locale::parse_tag(&value)).unwrap_or(Locale::Ar)"),
    ("crates/ui-egui/src/menus.rs", '    ("app.language.english", crate::i18n::Locale::En.name(), None, "Edit>Language"),\n',
     '    ("app.language.english", crate::i18n::Locale::En.name(), None, "Edit>Language"),\n'
     '    ("app.language.arabic", crate::i18n::Locale::Ar.name(), None, "Edit>Language"),\n'),
    ("crates/ui-egui/src/menus.rs", '        "app.language.english" => Some(crate::i18n::Locale::En),\n',
     '        "app.language.english" => Some(crate::i18n::Locale::En),\n        "app.language.arabic" => Some(crate::i18n::Locale::Ar),\n'),
]
PATCHES["deckcraft"] = [
    ("Cargo.toml", 'epaint = { path = "../../shared/epaint" }\n',
     'epaint = { path = "../../shared/epaint" }\n# The label hook that shows the interface in Arabic (crates/ui-egui/src/i18n.rs).\negui = { path = "../../shared/egui" }\n'),
    ("crates/ui-egui/src/lib.rs", "pub mod icons;\n", "/// Arabic interface (تعريب وتطوير: محمد الشطي — malshatti.com).\npub mod i18n;\npub mod icons;\n"),
    ("apps/deckcraft/src/main.rs", '    eframe::run_native(\n        "DeckCraft",',
     '    // The Arabic build opens in Arabic; Preferences ▸ Interface language switches to English.\n'
     '    deckcraft_ui_egui::i18n::install(config_dir().map(|d| d.join("language")));\n'
     '    eframe::run_native(\n        "DeckCraft",'),
    ("crates/ui-egui/src/dialogs.rs",
     '                app.ui.ui_scale = scale;\n            }\n            ui.label(egui::RichText::new("Editing")',
     '                app.ui.ui_scale = scale;\n            }\n'
     '            ui.horizontal(|ui| {\n                ui.label("Interface language");\n                crate::i18n::language_picker(ui);\n            });\n'
     '            ui.label(egui::RichText::new("Editing")'),
]
PATCHES["soundcraft"] = [
    ("Cargo.toml", 'epaint = { path = "../../shared/epaint" }\n',
     'epaint = { path = "../../shared/epaint" }\n# The label hook that shows the interface in Arabic (crates/ui-egui/src/i18n.rs).\negui = { path = "../../shared/egui" }\n'),
    ("crates/ui-egui/src/lib.rs", "pub mod icons;\n", "/// Arabic interface (تعريب وتطوير: محمد الشطي — malshatti.com).\npub mod i18n;\npub mod icons;\n"),
    ("apps/soundcraft/src/main.rs", '    eframe::run_native(\n        "SoundCraft",',
     '    // The Arabic build opens in Arabic; Window ▸ UI Customization ▸ Interface language switches to English.\n'
     '    soundcraft_ui_egui::i18n::install(config::config_dir().map(|d| d.join("language")));\n'
     '    eframe::run_native(\n        "SoundCraft",'),
    ("crates/ui-egui/src/extra_windows.rs",
     '                ui.label("Reduce motion");\n                ui.checkbox(&mut app.extra.reduce_motion, "");\n                ui.end_row();\n',
     '                ui.label("Reduce motion");\n                ui.checkbox(&mut app.extra.reduce_motion, "");\n                ui.end_row();\n'
     '                ui.label("Interface language");\n                crate::i18n::language_picker(ui);\n                ui.end_row();\n'),
]

def apply(app):
    ok = True
    for rel, old, new in PATCHES[app]:
        p = UP / app / rel
        s = p.read_text(encoding="utf-8")
        crlf = "\r\n" in s
        if crlf:
            s = s.replace("\r\n", "\n")
        if new in s:
            continue
        n = s.count(old)
        if n != 1:
            print(f"  !! {app}/{rel}: expected 1 match, found {n}: {old[:70]!r}")
            ok = False
            continue
        s = s.replace(old, new)
        if crlf:
            s = s.replace("\n", "\r\n")
        p.write_text(s, encoding="utf-8", newline="")
        print(f"  patched {rel}")
    return ok


if __name__ == "__main__":
    apps = sys.argv[1:] or list(PATCHES)
    bad = [a for a in apps if not (print(f"== {a}") or apply(a))]
    sys.exit(1 if bad else 0)
