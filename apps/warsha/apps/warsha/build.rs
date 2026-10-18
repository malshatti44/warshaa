//! Windows only: embed the app icon and version info (VERSIONINFO) into `warsha.exe`.
//!
//! On every other target this does nothing. A missing resource compiler is a warning, so a
//! cross-compile from macOS or Linux still links, unless `WARSHA_LAUNCHER_REQUIRE_WINRES=1` (set
//! by the release packaging) turns it into an error.

fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../../assets/app-icon/warsha.ico");
    println!("cargo:rerun-if-env-changed=WARSHA_LAUNCHER_REQUIRE_WINRES");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() != Ok("windows") {
        return;
    }
    let mut res = winresource::WindowsResource::new();
    res.set_icon("../../assets/app-icon/warsha.ico")
        .set("ProductName", "Warsha")
        .set("FileDescription", "Warsha - Warsha Arabic edition of Warsha")
        .set("CompanyName", "Mohammed Al-Shatti (malshatti.com)")
        .set("LegalCopyright", "Copyright (c) the Warsha authors. MIT OR Apache-2.0. Arabic edition by Mohammed Al-Shatti.")
        .set("OriginalFilename", "warsha.exe")
        .set("InternalName", "warsha");
    if let Err(e) = res.compile() {
        if std::env::var_os("WARSHA_LAUNCHER_REQUIRE_WINRES").is_some() {
            println!("cargo:warning=embedding Windows resources failed: {e}");
            std::process::exit(1);
        }
        println!("cargo:warning=warsha.exe built without icon/version resources: {e}");
    }
}
