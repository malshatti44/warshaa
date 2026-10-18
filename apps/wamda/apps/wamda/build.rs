//! Windows only: embed the app icon and version info (VERSIONINFO) into `wamda.exe`.
//!
//! On every other target this does nothing. A missing resource compiler is a warning, so a
//! cross-compile from macOS or Linux still links, unless `WAMDA_REQUIRE_WINRES=1` turns it
//! into an error (for release builds).

fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../../assets/app-icon/wamda.ico");
    println!("cargo:rerun-if-env-changed=WAMDA_REQUIRE_WINRES");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() != Ok("windows") {
        return;
    }
    let mut res = winresource::WindowsResource::new();
    res.set_icon("../../assets/app-icon/wamda.ico")
        .set("ProductName", "Wamda")
        .set("CompanyName", "Mohammed Al-Shatti (malshatti.com)")
        .set("FileDescription", "Wamda - Warsha Arabic edition of Wamda")
        .set("LegalCopyright", "Copyright (c) 2026 The Wamda contributors. MIT OR Apache-2.0. Arabic edition by Mohammed Al-Shatti.")
        .set("OriginalFilename", "wamda.exe")
        .set("InternalName", "wamda");
    if let Err(e) = res.compile() {
        if std::env::var_os("WAMDA_REQUIRE_WINRES").is_some() {
            panic!("embedding Windows resources failed: {e}");
        }
        println!("cargo:warning=wamda.exe built without icon/version resources: {e}");
    }
}
