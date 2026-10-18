//! The Arabic path of the proofing library as the app uses it (dictionary found on disk):
//! `SATR_DICTIONARIES=<dir> cargo run --example ar_lib`.
fn main() {
    let t = std::time::Instant::now();
    println!("has dictionary: {} ({:.1}s)", satr_proof::ar::has_dictionary(), t.elapsed().as_secs_f64());
    for text in ["في مكتبة المدرصة يوم الأحد", "وسيشارك الطلااب في ورش قراءة", "على الحظور"] {
        for i in satr_proof::check_spelling(text) {
            let w = &text[i.start..i.end];
            println!("{w} → {:?}", satr_proof::ar::suggest(w, 6));
        }
    }
}
