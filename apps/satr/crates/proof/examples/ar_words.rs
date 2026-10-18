//! Is each word (one per line in a UTF-8 file) correct in Arabic? `ar_words <file>`.
fn main() {
    let text = std::fs::read_to_string(std::env::args().nth(1).expect("words file")).unwrap();
    for w in text.split_whitespace() {
        println!("{}\t{}", satr_proof::ar::is_correct(w), w);
    }
}
