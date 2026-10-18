//! Read the text of a page picture with the assistant's model: `cargo run --example read_page -- page.png`.
fn main() {
    let path = std::env::args().nth(1).expect("a PNG path");
    let bytes = std::fs::read(&path).expect("read the picture");
    let t = std::time::Instant::now();
    match warsha_assistant::vision::read_png(&bytes, &mut |done, total| {
        eprintln!("strip {done}/{total}");
        true
    }) {
        Ok(paras) => {
            for p in paras {
                println!("{p}\n");
            }
            eprintln!("{:.0}s", t.elapsed().as_secs_f64());
        }
        Err(e) => eprintln!("error: {e}"),
    }
}
