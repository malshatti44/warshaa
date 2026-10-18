//! Arabic interface of the Arabic build (ورشة — تعريب وتطوير: محمد الشطي — malshatti.com).
//!
//! The interface is written with English literals. The Arabic build's egui passes every label,
//! button, menu item, tooltip and window title through [`translate`]
//! (`egui::widget_text::set_label_translator`) just before laying it out; text being edited never
//! goes through it. `ar.tsv` holds whole labels and templates: a template (`Slide {} of {}`,
//! `{n} clips`, `{:.1} dB`) matches a finished label and is filled with the values it took. A
//! `{:.0}` in a translation drops its value (an English plural ending such as `Column{}`).

use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Mutex, OnceLock};

const SOURCE: &str = include_str!("ar.tsv");

/// Labels remembered between frames before the cache starts over.
const CACHE_MAX: usize = 8192;

static ARABIC: AtomicBool = AtomicBool::new(true);
static PREF_FILE: OnceLock<Option<PathBuf>> = OnceLock::new();
static CATALOG: OnceLock<Catalog> = OnceLock::new();
static CACHE: OnceLock<Mutex<HashMap<String, Option<String>>>> = OnceLock::new();

struct Catalog {
    plain: HashMap<String, String>,
    templates: Vec<Template>,
}

struct Template {
    /// Literal text around the placeholders: one piece more than there are placeholders.
    pieces: Vec<String>,
    /// The translation: literal text and the placeholder whose value goes there.
    out: Vec<Part>,
}

enum Part {
    Text(String),
    /// The value of the English placeholder at this index; `None` drops it (`{:.0}`).
    Value(Option<usize>),
}

/// Set up the Arabic interface: `pref_file` remembers the choice (`ar` or `en`; Arabic when absent).
pub fn install(pref_file: Option<PathBuf>) {
    let arabic = pref_file.as_ref().and_then(|p| std::fs::read_to_string(p).ok()).is_none_or(|s| s.trim() != "en");
    let _ = PREF_FILE.set(pref_file);
    apply(arabic);
    egui::widget_text::set_label_translator(Some(translate));
}

/// Is the interface shown in Arabic?
pub fn is_arabic() -> bool {
    ARABIC.load(Ordering::Relaxed)
}

/// Switch between Arabic and English, and remember the choice.
pub fn set_arabic(arabic: bool) {
    apply(arabic);
    if let Some(Some(path)) = PREF_FILE.get() {
        if let Some(dir) = path.parent() {
            let _ = std::fs::create_dir_all(dir);
        }
        let _ = std::fs::write(path, if arabic { "ar" } else { "en" });
    }
}

/// The Preferences control that switches the interface language (its caption is the caller's:
/// "Interface language").
pub fn language_picker(ui: &mut egui::Ui) {
    let mut arabic = is_arabic();
    ui.horizontal(|ui| {
        ui.radio_value(&mut arabic, true, "العربية");
        ui.radio_value(&mut arabic, false, "English");
    });
    if arabic != is_arabic() {
        set_arabic(arabic);
    }
}

fn apply(arabic: bool) {
    ARABIC.store(arabic, Ordering::Relaxed);
    egui::epaint::text::bidi::set_prefer_rtl(arabic);
    if let Ok(mut cache) = cache().lock() {
        cache.clear();
    }
}

fn cache() -> &'static Mutex<HashMap<String, Option<String>>> {
    CACHE.get_or_init(|| Mutex::new(HashMap::new()))
}

/// `text` in Arabic, or `None` to show it as it is (English interface, or no translation).
pub fn translate(text: &str) -> Option<String> {
    if !is_arabic() || text.trim().is_empty() || text.chars().any(|c| ('\u{0600}'..='\u{06FF}').contains(&c)) {
        return None;
    }
    if let Ok(cache) = cache().lock()
        && let Some(hit) = cache.get(text)
    {
        return hit.clone();
    }
    let found = lookup(CATALOG.get_or_init(load), text, 0);
    if let Ok(mut cache) = cache().lock() {
        if cache.len() >= CACHE_MAX {
            cache.clear();
        }
        cache.insert(text.to_owned(), found.clone());
    }
    found
}

fn lookup(catalog: &Catalog, text: &str, depth: u8) -> Option<String> {
    if let Some(found) = catalog.plain.get(text) {
        return Some(found.clone());
    }
    // Labels padded with spaces ("  Present  ") keep their padding around the translation.
    let trimmed = text.trim();
    if !trimmed.is_empty()
        && trimmed.len() != text.len()
        && let Some(found) = catalog.plain.get(trimmed)
    {
        let lead = text.get(..text.len() - text.trim_start().len()).unwrap_or_default();
        let tail = text.get(text.trim_end().len()..).unwrap_or_default();
        return Some(format!("{lead}{found}{tail}"));
    }
    // Status lines and titles joined from labels ("saved · audio on", "Untitled — Edit"): each part.
    if depth == 0 {
        for sep in [" · ", " — ", " | "] {
            if !text.contains(sep) {
                continue;
            }
            let parts: Vec<&str> = text.split(sep).collect();
            let shown: Vec<Option<String>> = parts.iter().map(|p| lookup(catalog, p, 1)).collect();
            if shown.iter().any(Option::is_some) {
                let joined: Vec<String> = parts.iter().zip(shown).map(|(p, s)| s.unwrap_or_else(|| (*p).to_owned())).collect();
                return Some(joined.join(sep));
            }
        }
    }
    for template in &catalog.templates {
        let Some(values) = template.capture(text) else { continue };
        let mut out = String::with_capacity(text.len() * 2);
        for part in &template.out {
            match part {
                Part::Text(t) => out.push_str(t),
                Part::Value(Some(i)) => {
                    let value = values.get(*i).copied().unwrap_or_default();
                    // A value that is itself a label ("the clip “Kick”") reads in Arabic too.
                    match (depth == 0).then(|| lookup(catalog, value, 1)).flatten() {
                        Some(translated) => out.push_str(&translated),
                        None => out.push_str(value),
                    }
                }
                Part::Value(None) => {}
            }
        }
        return Some(out);
    }
    None
}

impl Template {
    /// The placeholder values of `text` when it is this template filled in.
    fn capture<'a>(&self, text: &'a str) -> Option<Vec<&'a str>> {
        let (first, rest) = self.pieces.split_first()?;
        let (last, middle) = rest.split_last()?;
        let body = text.strip_prefix(first.as_str())?.strip_suffix(last.as_str())?;
        let mut values = Vec::with_capacity(rest.len());
        let mut remaining = body;
        for piece in middle {
            if piece.is_empty() {
                values.push("");
                continue;
            }
            let at = remaining.find(piece.as_str())?;
            values.push(remaining.get(..at)?);
            remaining = remaining.get(at + piece.len()..)?;
        }
        values.push(remaining);
        Some(values)
    }
}

fn load() -> Catalog {
    let mut plain = HashMap::new();
    let mut templates = Vec::new();
    for line in SOURCE.lines() {
        if line.starts_with('#') || line.trim().is_empty() {
            continue;
        }
        let Some((src, ar)) = line.split_once('\t') else { continue };
        let (src, ar) = (unescape(src), unescape(ar));
        let (pieces, slots) = split(&src);
        if slots.is_empty() {
            plain.insert(src, ar);
            continue;
        }
        let names: Vec<&str> = slots.iter().map(|s| s.split(':').next().unwrap_or_default()).collect();
        let positional: Vec<usize> = names.iter().enumerate().filter(|(_, n)| is_positional(n)).map(|(i, _)| i).collect();
        let (ar_pieces, ar_slots) = split(&ar);
        let mut out = Vec::new();
        let mut next = 0;
        for (i, piece) in ar_pieces.into_iter().enumerate() {
            if !piece.is_empty() {
                out.push(Part::Text(piece));
            }
            let Some(slot) = ar_slots.get(i) else { continue };
            let name = slot.split(':').next().unwrap_or_default();
            if is_positional(name) {
                let index = positional.get(next).copied();
                next += 1;
                out.push(Part::Value(if slot == ":.0" { None } else { index }));
            } else {
                out.push(Part::Value(names.iter().position(|n| *n == name)));
            }
        }
        templates.push(Template { pieces, out });
    }
    // The most specific templates first: more literal text, fewer chances of a loose match.
    templates.sort_by_key(|t| std::cmp::Reverse(t.pieces.iter().map(String::len).sum::<usize>()));
    Catalog { plain, templates }
}

fn is_positional(name: &str) -> bool {
    name.chars().all(|c| c.is_ascii_digit())
}

/// `s` split at its `{…}` placeholders: the literal pieces (one more than the placeholders) and
/// the placeholders' inner text.
fn split(s: &str) -> (Vec<String>, Vec<String>) {
    let mut pieces = vec![String::new()];
    let mut slots = Vec::new();
    let mut i = 0;
    while let Some(c) = s.get(i..).and_then(|r| r.chars().next()) {
        if c == '{'
            && let Some(len) = s.get(i + 1..).and_then(|r| r.find(['{', '}']))
            && s.as_bytes().get(i + 1 + len) == Some(&b'}')
        {
            slots.push(s.get(i + 1..i + 1 + len).unwrap_or_default().to_owned());
            pieces.push(String::new());
            i += len + 2;
            continue;
        }
        if let Some(piece) = pieces.last_mut() {
            piece.push(c);
        }
        i += c.len_utf8();
    }
    (pieces, slots)
}

fn unescape(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    let mut chars = s.chars();
    while let Some(c) = chars.next() {
        if c != '\\' {
            out.push(c);
            continue;
        }
        match chars.next() {
            Some('n') => out.push('\n'),
            Some('t') => out.push('\t'),
            Some(other) => out.push(other),
            None => out.push('\\'),
        }
    }
    out
}
