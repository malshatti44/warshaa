//! Windows only: embed the app icon and version info (VERSIONINFO) into `satr.exe`, so it
//! shows in Explorer, the taskbar, the Start menu and Alt-Tab.
//!
//! On every other target this does nothing. A missing resource compiler is a warning, so a
//! cross-compile from macOS or Linux still links, unless `SATR_REQUIRE_WINRES=1` turns it
//! into an error (for release builds).

fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../../assets/app-icon/satr.ico");
    println!("cargo:rerun-if-env-changed=SATR_REQUIRE_WINRES");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() != Ok("windows") {
        return;
    }
    let mut res = winresource::WindowsResource::new();
    res.set_icon("../../assets/app-icon/satr.ico")
        .set("ProductName", "Satr")
        .set("FileDescription", "Satr - Warsha Arabic edition of Satr")
        .set("CompanyName", "Mohammed Al-Shatti (malshatti.com)")
        .set("LegalCopyright", "Copyright (c) the Satr authors. MIT OR Apache-2.0. Arabic edition by Mohammed Al-Shatti.")
        .set("OriginalFilename", "satr.exe")
        .set("InternalName", "satr");
    if let Err(e) = res.compile() {
        if std::env::var_os("SATR_REQUIRE_WINRES").is_some() {
            eprintln!("embedding Windows resources failed: {e}");
            std::process::exit(1);
        }
        println!("cargo:warning=satr.exe built without icon/version resources: {e}");
    }
}
