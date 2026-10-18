//! Windows only: embed the app icon and version info (VERSIONINFO) into `tayf.exe`, so
//! Explorer, the taskbar, the Start menu and Alt-Tab show the lynx.
//!
//! On every other target this does nothing. A missing resource compiler is a warning, so a
//! cross-compile from macOS or Linux still links, unless `TAYF_REQUIRE_WINRES=1` turns it
//! into an error (for release builds).

fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../../assets/app-icon/tayf.ico");
    println!("cargo:rerun-if-env-changed=TAYF_REQUIRE_WINRES");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() != Ok("windows") {
        return;
    }
    let mut res = winresource::WindowsResource::new();
    res.set_icon("../../assets/app-icon/tayf.ico")
        .set("ProductName", "Tayf")
        .set("CompanyName", "Mohammed Al-Shatti (malshatti.com)")
        .set("FileDescription", "Tayf - Warsha Arabic edition of Tayf")
        .set("LegalCopyright", "Copyright (c) the Tayf authors. MIT OR Apache-2.0. Arabic edition by Mohammed Al-Shatti.")
        .set("OriginalFilename", "tayf.exe")
        .set("InternalName", "tayf");
    if let Err(e) = res.compile() {
        if std::env::var_os("TAYF_REQUIRE_WINRES").is_some() {
            panic!("embedding Windows resources failed: {e}");
        }
        println!("cargo:warning=tayf.exe built without icon/version resources: {e}");
    }
}
