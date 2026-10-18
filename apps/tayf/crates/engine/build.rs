//! Optional build input: with `WARSHA_FONTS_DIR=<malshatti44/warshaa checkout>`, embed every font
//! in its `fonts/manifest.txt` as `WARSHA_FONTS` (see src/fonts.rs). Unset, `WARSHA_FONTS` is empty.
//! Recipe from warsha-fonts' docs/integration.md; warsha-fonts is never a Cargo dependency, and this
//! script only reads a local directory (no network).
//!
//! wasm32 (the web build) embeds only the UI font, BIZ UDPGothic Regular (~4.5 MB), to keep the
//! `.wasm` within the web size budget (Cloudflare serves at most 25 MiB per file); the export
//! watermark falls back to it there. Native builds embed every font.
use std::fmt::Write as _;
use std::path::{Path, PathBuf};

fn main() {
    println!("cargo::rerun-if-changed=build.rs");
    println!("cargo::rerun-if-env-changed=WARSHA_FONTS_DIR");
    println!("cargo::rerun-if-env-changed=WARSHA_FONTS_REQUIRED");
    let required = std::env::var_os("WARSHA_FONTS_REQUIRED").is_some();
    let mut src = String::from("pub static WARSHA_FONTS: &[WarshaFont] = &[\n");
    let mut embedded = 0;
    if let Some(dir) = std::env::var_os("WARSHA_FONTS_DIR").map(PathBuf::from).map(resolve) {
        match warsha_fonts(&dir, required) {
            Ok(entries) => {
                embedded = entries.lines().count();
                src.push_str(&entries);
            }
            Err(e) if required => {
                println!("cargo::error=WARSHA_FONTS_DIR={}: {e}", dir.display());
            }
            Err(e) => println!("cargo::warning=building without warsha-fonts: WARSHA_FONTS_DIR={}: {e}", dir.display()),
        }
    } else if required {
        println!("cargo::error=WARSHA_FONTS_REQUIRED is set but WARSHA_FONTS_DIR is missing");
    }
    src.push_str("];\n");
    // Without them the app still runs and every language still selectable, so Chinese and Japanese
    // just paint boxes — the one failure a user cannot diagnose from what they see.
    if embedded == 0 {
        println!(
            "cargo::warning=no warsha-fonts embedded: Chinese and Japanese text will render as empty boxes. \
             Clone https://github.com/malshatti44/warshaa next to this repo and rebuild with \
             WARSHA_FONTS_DIR=../warsha-fonts"
        );
    }
    let out = PathBuf::from(std::env::var_os("OUT_DIR").unwrap_or_default()).join("warsha_fonts.rs");
    if let Err(e) = std::fs::write(&out, src) {
        println!("cargo::error=writing {}: {e}", out.display());
    }
}

/// Resolve a relative `WARSHA_FONTS_DIR` against both roots a caller might mean: a build script's
/// cwd is the *package* root (`crates/engine`), while the `../warsha-fonts` the README and
/// warsha-fonts' docs use is written relative to the *workspace* root and would otherwise resolve
/// to `crates/warsha-fonts`.
fn resolve(dir: PathBuf) -> PathBuf {
    if dir.is_absolute() {
        return dir;
    }
    let package = PathBuf::from(std::env::var_os("CARGO_MANIFEST_DIR").unwrap_or_default());
    let workspace = package.parent().and_then(Path::parent).unwrap_or(package.as_path());
    let candidates = [workspace.join(&dir), package.join(&dir)];
    candidates.iter().find(|candidate| candidate.is_dir()).cloned().unwrap_or_else(|| candidates[0].clone())
}

/// One `WarshaFont { .. }` initialiser per manifest line.
fn warsha_fonts(dir: &Path, required: bool) -> Result<String, String> {
    let manifest = dir.join("fonts/manifest.txt");
    println!("cargo::rerun-if-changed={}", manifest.display());
    let text = std::fs::read_to_string(&manifest).map_err(|e| format!("{}: {e}", manifest.display()))?;
    let wasm = std::env::var("CARGO_CFG_TARGET_ARCH").is_ok_and(|a| a == "wasm32");
    let mut out = String::new();
    let mut has_japanese_ui = false;
    let mut has_chinese_ui = false;
    for line in text.lines().map(str::trim).filter(|l| !l.is_empty() && !l.starts_with('#')) {
        let f: Vec<&str> = line.split(" | ").map(str::trim).collect();
        let [family, style, file, scripts, ..] = f.as_slice() else {
            return Err(format!("malformed manifest line: {line}"));
        };
        has_japanese_ui |= (*family, *style) == ("BIZ UDPGothic", "Regular");
        has_chinese_ui |= (*family, *style) == ("Noto Sans CJK SC", "Regular") && scripts.split(',').any(|script| script.trim() == "Hans");
        if wasm && (*family, *style) != ("BIZ UDPGothic", "Regular") {
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
    if required && !has_japanese_ui {
        return Err("required Japanese UI face BIZ UDPGothic Regular is missing from fonts/manifest.txt".into());
    }
    if required && !wasm && !has_chinese_ui {
        return Err("required Simplified Chinese UI face Noto Sans CJK SC Regular (Hans) is missing from fonts/manifest.txt".into());
    }
    Ok(out)
}
