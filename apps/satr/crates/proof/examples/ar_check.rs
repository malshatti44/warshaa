//! Load a converted Arabic dictionary and check words:
//! `cargo run --release --example ar_check -- <dict dir> [text file]`.
fn main() {
    let dir = std::path::PathBuf::from(std::env::args().nth(1).expect("dictionary folder"));
    let t = std::time::Instant::now();
    let aff = std::fs::read_to_string(dir.join("ar.aff")).unwrap();
    let dic = std::fs::read_to_string(dir.join("ar.dic")).unwrap();
    let d = satr_proof::affix::AffixDict::from_hunspell(&aff, &dic, &[]).unwrap_or_else(|e| panic!("{e}"));
    eprintln!("loaded {} stems, {} rules in {:.1}s", d.len(), d.rule_count(), t.elapsed().as_secs_f64());
    // Words of a text, harakat, tatweel and punctuation stripped.
    if let Some(file) = std::env::args().nth(2) {
        let text = std::fs::read_to_string(file).unwrap();
        let words: Vec<String> = text
            .split_whitespace()
            .map(|w| w.chars().filter(|c| c.is_alphabetic() && !matches!(c, '\u{064B}'..='\u{0652}' | '\u{0640}')).collect::<String>())
            .filter(|w| w.chars().count() > 1)
            .collect();
        let bad: Vec<&String> = words.iter().filter(|w| !d.check(w)).collect();
        println!("{} of {} words flagged: {:?}", bad.len(), words.len(), bad);
        return;
    }
    let words = ["المدرسة", "والمدرسة", "بالمدرسة", "مدارسنا", "يكتبون", "سيكتبونها", "الطلاب", "طلابنا", "الكويت", "المتحف", "الوطني", "تعلمنا", "استقبلنا", "رحلة",
                 "المدرصة", "يكتبوون", "الطلااب", "مدرستن", "الكويتت"];
    for w in words {
        println!("{w}\t{}", d.check(w));
    }
}
