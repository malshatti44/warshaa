//! Windows only: embed the app icon and version info into `mukhattat.exe`. Elsewhere a no-op.

fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../../assets/app-icon/mukhattat.ico");
    println!("cargo:rerun-if-env-changed=MUKHATTAT_REQUIRE_WINRES");
    println!("cargo:rerun-if-env-changed=MUKHATTAT_BUILD_SHA");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() != Ok("windows") {
        return;
    }
    let mut res = winresource::WindowsResource::new();
    if std::path::Path::new("../../assets/app-icon/mukhattat.ico").exists() {
        res.set_icon("../../assets/app-icon/mukhattat.ico");
    }
    res.set("ProductName", "Mukhattat")
        .set("FileDescription", "Mukhattat - Warsha Arabic edition of Mukhattat")
        .set("CompanyName", "Mohammed Al-Shatti (malshatti.com)")
        .set("LegalCopyright", "Copyright (c) 2026 Warsha Team and the Mukhattat contributors. MIT OR Apache-2.0. Arabic edition by Mohammed Al-Shatti.")
        .set("OriginalFilename", "mukhattat.exe")
        .set("InternalName", "mukhattat");
    if let Err(e) = res.compile() {
        if std::env::var_os("MUKHATTAT_REQUIRE_WINRES").is_some() {
            eprintln!("embedding Windows resources failed: {e}");
            std::process::exit(1);
        }
        println!("cargo:warning=mukhattat.exe built without icon/version resources: {e}");
    }
}
