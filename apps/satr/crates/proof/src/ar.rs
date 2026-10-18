//! Arabic proofing (تدقيق إملائي عربي).
//!
//! - **Spelling** against the Ayaspell Hunspell dictionary (Mohamed Kebdani, Taha Zerrouki;
//!   GPL-2.0 / LGPL-2.1 / MPL-1.1), converted to one-character flags for this engine
//!   (`tools/convert_ar_dict.py` in Warsha) and found by [`crate::hunspell`] as `ar.aff`/`ar.dic`:
//!   Warsha ships it in a `dictionaries` folder next to Satr. Words are compared without harakat
//!   and tatweel, with alef wasla and the lam-alef ligatures written out — the dictionary's own
//!   `IGNORE` and `ICONV` rules, which the engine doesn't read. Without the dictionary Arabic text
//!   gets no spelling marks.
//! - **Suggestions**: one edit away, the usual confusions first (ة/ه, ى/ي, the hamza forms of alef).
//! - **Grammar**: none yet.

use std::sync::{Arc, RwLock};

use crate::affix::AffixDict;

/// The Arabic dictionary: `None` until first use, then the installed one (or an empty one).
static DICT: RwLock<Option<Arc<AffixDict>>> = RwLock::new(None);

/// File names of the Arabic Hunspell dictionary.
/// Named apart from LibreOffice's `ar` (long flags, which this engine doesn't read).
const NAMES: &[&str] = &["ar_warsha"];

/// Arabic letters the suggestions try (no harakat).
const LETTERS: &str = "ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىي";

/// The Arabic dictionary: the installed one (read on first use), or an empty one when none is
/// available (Arabic spelling is off then; see [`has_dictionary`]).
pub fn dictionary() -> Arc<AffixDict> {
    if let Some(d) = DICT.read().unwrap_or_else(|e| e.into_inner()).as_ref() {
        return d.clone();
    }
    let loaded = Arc::new(load_installed());
    let mut slot = DICT.write().unwrap_or_else(|e| e.into_inner());
    slot.get_or_insert(loaded).clone()
}

fn load_installed() -> AffixDict {
    let Some((aff, dic)) = crate::hunspell::find(NAMES) else {
        log::info!("Arabic spelling: no Arabic dictionary installed");
        return AffixDict::default();
    };
    crate::hunspell::load(&aff, &dic).unwrap_or_else(|e| {
        log::warn!("Arabic spelling: {e}");
        AffixDict::default()
    })
}

/// Use this Arabic dictionary from now on (converted `.aff` and `.dic` text). On error the
/// current dictionary stays.
pub fn install_dictionary(aff: &str, dic: &str) -> Result<(), String> {
    let d = AffixDict::from_hunspell(aff, dic, &[])?;
    *DICT.write().unwrap_or_else(|e| e.into_inner()) = Some(Arc::new(d));
    Ok(())
}

/// Forget the loaded dictionary, so the next check looks for an installed one again.
pub fn reload_dictionary() {
    *DICT.write().unwrap_or_else(|e| e.into_inner()) = None;
}

/// Is an Arabic dictionary available (spelling is checked)?
pub fn has_dictionary() -> bool {
    !dictionary().is_empty()
}

/// A letter of the Arabic script (harakat and tatweel excluded).
pub fn is_arabic_letter(c: char) -> bool {
    matches!(c, '\u{0621}'..='\u{063A}' | '\u{0641}'..='\u{064A}' | '\u{0671}'..='\u{06D3}' | '\u{FB50}'..='\u{FDFF}' | '\u{FE70}'..='\u{FEFC}')
}

/// The word as the dictionary spells it: no harakat or tatweel (`IGNORE`), alef wasla as alef and
/// the lam-alef ligatures as two letters (`ICONV`).
pub fn normalize(word: &str) -> String {
    let mut out = String::with_capacity(word.len());
    for c in word.chars() {
        match c {
            '\u{064B}'..='\u{0652}' | '\u{0640}' | '\u{0670}' => {}
            '\u{0671}' => out.push('ا'),
            '\u{FEF5}' | '\u{FEF6}' => out.push_str("لآ"),
            '\u{FEF7}' | '\u{FEF8}' => out.push_str("لأ"),
            '\u{FEF9}' | '\u{FEFA}' => out.push_str("لإ"),
            '\u{FEFB}' | '\u{FEFC}' => out.push_str("لا"),
            c => out.push(c),
        }
    }
    out
}

/// Is `word` spelled correctly in Arabic? Single letters, words with digits or other scripts, and
/// every word when no dictionary is installed, are accepted.
pub fn is_correct(word: &str) -> bool {
    let w = normalize(word);
    if w.chars().count() < 2 || !w.chars().all(is_arabic_letter) {
        return true;
    }
    let d = dictionary();
    d.is_empty() || d.check(&w) || with_pronoun(&d, &w)
}

/// Attached object and possessive pronouns, longest first.
const PRONOUNS: &[&str] = &["كما", "هما", "هم", "هن", "ها", "كم", "كن", "نا", "ني", "ه", "ك"];

/// A word the dictionary knows with an attached pronoun that it lacks (Ayaspell gives many
/// verbs no pronoun suffixes: «تحتاجه», «يكتبونه»): the word without it — the alef of «وا»
/// and the taa marbuta come back («تعلموه» → «تعلموا», «مدرستها» → «مدرسة»). Not after the
/// article: «الكتابه» is a misspelt «الكتابة», not «الكتاب» + «ه».
fn with_pronoun(d: &AffixDict, w: &str) -> bool {
    if ["ال", "وال", "فال", "بال", "كال", "لل"].iter().any(|a| w.starts_with(a)) {
        return false;
    }
    PRONOUNS.iter().filter_map(|p| w.strip_suffix(p)).filter(|stem| stem.chars().count() >= 2).any(|stem| {
        d.check(stem)
            || (stem.ends_with('و') && d.check(&format!("{stem}ا")))
            || stem.strip_suffix('ت').is_some_and(|s| d.check(&format!("{s}ة")))
            // the final hamza sits on yaa or waw before a pronoun: «عملائنا», «عملاؤهم»
            || stem.strip_suffix(['ئ', 'ؤ']).is_some_and(|s| d.check(&format!("{s}ء")))
    })
}

/// Letters people write for one another: the hamza and alef forms, taa marbuta and haa, alef
/// maqsura and yaa, and letters that sound alike (س ص ث، ض ظ ذ ز د، ت ط، ح ه خ، ك ق، ع غ ء).
const CONFUSED: &[&str] = &["اأإآ", "ءئؤأ", "ةهت", "ىيا", "سصث", "ضظذزد", "تط", "حهخ", "كق", "عغء"];

/// Spellings one edit away that the dictionary accepts, best first: a letter swapped for one it
/// is often confused with (س for ص, ض for ظ, ة for ه…), a doubled letter written once, two
/// letters swapped, then other deletions, replacements and insertions.
pub fn suggest(word: &str, max: usize) -> Vec<String> {
    let w = normalize(word);
    let d = dictionary();
    if d.is_empty() || max == 0 || w.is_empty() {
        return Vec::new();
    }
    let chars: Vec<char> = w.chars().collect();
    let mut out: Vec<String> = Vec::new();
    let try_add = |cand: String, out: &mut Vec<String>| {
        if out.len() < max && cand != w && !out.contains(&cand) && d.check(&cand) {
            out.push(cand);
        }
    };
    for (i, &c) in chars.iter().enumerate() {
        for group in CONFUSED.iter().filter(|g| g.contains(c)) {
            for r in group.chars().filter(|&r| r != c) {
                let mut v = chars.clone();
                v[i] = r;
                try_add(v.iter().collect(), &mut out);
            }
        }
    }
    for i in 1..chars.len() {
        if chars[i] == chars[i - 1] {
            let mut v = chars.clone();
            v.remove(i);
            try_add(v.iter().collect(), &mut out);
        }
    }
    for i in 0..chars.len().saturating_sub(1) {
        let mut v = chars.clone();
        v.swap(i, i + 1);
        try_add(v.iter().collect(), &mut out);
    }
    for i in 0..chars.len() {
        let mut v = chars.clone();
        v.remove(i);
        try_add(v.iter().collect(), &mut out);
    }
    for i in 0..chars.len() {
        for r in LETTERS.chars() {
            if r != chars[i] {
                let mut v = chars.clone();
                v[i] = r;
                try_add(v.iter().collect(), &mut out);
            }
        }
    }
    for i in 0..=chars.len() {
        for r in LETTERS.chars() {
            let mut v = chars.clone();
            v.insert(i, r);
            try_add(v.iter().collect(), &mut out);
        }
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn harakat_tatweel_and_ligatures_are_spelled_out() {
        assert_eq!(normalize("مَدْرَسَةٌ"), "مدرسة");
        assert_eq!(normalize("كـتـاب"), "كتاب");
        assert_eq!(normalize("ٱلكتاب"), "الكتاب");
        assert_eq!(normalize("\u{FEFB}عب"), "لاعب");
    }

    /// The likely fix comes first: ص written for س, ظ for ض, a doubled alef — not a word that
    /// merely loses a letter.
    #[test]
    fn suggestions_put_confused_letters_first() {
        install_dictionary("SET UTF-8\n", "6\nالمدرسة\nالمدرة\nالحضور\nالحور\nالحظر\nالطلاب\n").unwrap();
        assert_eq!(suggest("المدرصة", 3).first().map(String::as_str), Some("المدرسة"));
        assert_eq!(suggest("الحظور", 3).first().map(String::as_str), Some("الحضور"));
        assert_eq!(suggest("الطلااب", 3).first().map(String::as_str), Some("الطلاب"));
        reload_dictionary();
    }

    /// A known word with a pronoun the dictionary doesn't list is still correct; a misspelt
    /// definite noun ending in ه isn't.
    #[test]
    fn attached_pronouns_on_known_words() {
        let d = AffixDict::from_hunspell("SET UTF-8\n", "5\nتحتاج\nتعلموا\nمدرسة\nالكتاب\nعملاء\n", &[]).unwrap();
        assert!(with_pronoun(&d, "عملائنا"));
        assert!(with_pronoun(&d, "تحتاجه"));
        assert!(with_pronoun(&d, "تعلموه"));
        assert!(with_pronoun(&d, "مدرستها"));
        assert!(!with_pronoun(&d, "الكتابه"));
        assert!(!with_pronoun(&d, "تحتاجخ"));
    }

    #[test]
    fn latin_digits_and_single_letters_are_left_alone() {
        assert!(is_correct("Word"));
        assert!(is_correct("٢٠٢٦"));
        assert!(is_correct("و"));
    }
}
