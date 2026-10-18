//! Optional warsha-fonts build input (see malshatti44/warshaa `docs/integration.md` and
//! warsharules `standards/fonts.md`).
//!
//! With `WARSHA_FONTS_DIR=<absolute path of a warsha-fonts checkout>` (a relative path resolves from
//! `crates/text`) this embeds every font listed in its
//! `fonts/manifest.txt` as [`WARSHA_FONTS`](crate::fonts::WARSHA_FONTS); unset, `WARSHA_FONTS` is
//! empty and nothing else changes. A `WARSHA_FONTS_DIR` that is not a checkout is a warning, or an
//! error with `WARSHA_FONTS_REQUIRED=1` (release builds).
//!
//! Native builds embed every font. The web (wasm32) build embeds only the UI font (BIZ UDPGothic
//! Regular, ~4.5 MB) to stay under the web size budget (Cloudflare serves files up to 25 MiB).
//! Only the local directory is read: no network.

use std::fmt::Write as _;
use std::path::PathBuf;

fn main() {
    println!("cargo::rerun-if-changed=build.rs");
    println!("cargo::rerun-if-env-changed=WARSHA_FONTS_DIR");
    println!("cargo::rerun-if-env-changed=WARSHA_FONTS_REQUIRED");
    let mut src = String::from("pub static WARSHA_FONTS: &[WarshaFont] = &[\n");
    if let Some(dir) = std::env::var_os("WARSHA_FONTS_DIR").map(PathBuf::from) {
        match warsha_fonts(&dir) {
            Ok(entries) => src.push_str(&entries),
            Err(e) if std::env::var_os("WARSHA_FONTS_REQUIRED").is_some() => {
                println!("cargo::error=WARSHA_FONTS_DIR={}: {e}", dir.display());
            }
            Err(e) => println!("cargo::warning=building without warsha-fonts: WARSHA_FONTS_DIR={}: {e}", dir.display()),
        }
    }
    src.push_str("];\n");
    let out = PathBuf::from(std::env::var_os("OUT_DIR").unwrap_or_default()).join("warsha_fonts.rs");
    if let Err(e) = std::fs::write(&out, src) {
        println!("cargo::error=writing {}: {e}", out.display());
    }
}

/// One `WarshaFont { .. }` initialiser per manifest line.
fn warsha_fonts(dir: &std::path::Path) -> Result<String, String> {
    let manifest = dir.join("fonts/manifest.txt");
    println!("cargo::rerun-if-changed={}", manifest.display());
    let text = std::fs::read_to_string(&manifest).map_err(|e| format!("{}: {e}", manifest.display()))?;
    let wasm = std::env::var("CARGO_CFG_TARGET_ARCH").as_deref() == Ok("wasm32");
    let mut out = String::new();
    for line in text.lines().map(str::trim).filter(|l| !l.is_empty() && !l.starts_with('#')) {
        let f: Vec<&str> = line.split(" | ").map(str::trim).collect();
        let [family, style, file, scripts, ..] = f.as_slice() else {
            return Err(format!("malformed manifest line: {line}"));
        };
        if wasm && !(*family == "BIZ UDPGothic" && *style == "Regular") {
            continue;
        }
        let path = dir.join(file).canonicalize().map_err(|e| format!("{file}: {e}"))?;
        println!("cargo::rerun-if-changed={}", path.display());
        let scripts: Vec<String> = scripts.split(',').map(|s| format!("{:?}", s.trim())).collect();
        let _ = writeln!(
            out,
            "    WarshaFont {{ family: {family:?}, style: {style:?}, scripts: &[{}], bytes: include_bytes!({:?}) }},",
            scripts.join(", "),
            path.display().to_string(),
        );
    }
    Ok(out)
}
