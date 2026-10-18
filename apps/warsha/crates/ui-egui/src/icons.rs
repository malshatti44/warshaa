//! Bundled images: each Warsha App's icon and the launcher's own.

use egui::ImageSource;

/// The 128 px icon of a Warsha App.
pub fn app(id: &str) -> Option<ImageSource<'static>> {
    Some(match id {
        "retoush" => egui::include_image!("../../../assets/app-icons/retoush.png"),
        "reesha" => egui::include_image!("../../../assets/app-icons/reesha.png"),
        "monteer" => egui::include_image!("../../../assets/app-icons/monteer.png"),
        "tayf" => egui::include_image!("../../../assets/app-icons/tayf.png"),
        "watheeq" => egui::include_image!("../../../assets/app-icons/watheeq.png"),
        "wamda" => egui::include_image!("../../../assets/app-icons/wamda.png"),
        "nasaq" => egui::include_image!("../../../assets/app-icons/nasaq.png"),
        "satr" => egui::include_image!("../../../assets/app-icons/satr.png"),
        "minbar" => egui::include_image!("../../../assets/app-icons/minbar.png"),
        "kashf" => egui::include_image!("../../../assets/app-icons/kashf.png"),
        "mukhattat" => egui::include_image!("../../../assets/app-icons/mukhattat.png"),
        "sada" => egui::include_image!("../../../assets/app-icons/sada.png"),
        _ => return None,
    })
}

/// The Warsha wordmark, as supplied: dark ink for light backgrounds, white for dark ones.
/// From `assets/brand/`.
pub fn warsha_logo(dark_background: bool) -> ImageSource<'static> {
    if dark_background {
        egui::include_image!("../../../assets/brand/warsha-logo-white.svg")
    } else {
        egui::include_image!("../../../assets/brand/warsha-logo.svg")
    }
}

/// The Warsha wordmark's width / height (its SVG view box: 1038.05 × 108).
pub const WARSHA_LOGO_ASPECT: f32 = 1038.05 / 108.0;

/// A social service's logo (Simple Icons, white, for tinting), by its name in `catalog::SOCIAL`.
pub fn social(service: &str) -> Option<ImageSource<'static>> {
    Some(match service {
        "X" => egui::include_image!("../../../assets/social/x.svg"),
        "YouTube" => egui::include_image!("../../../assets/social/youtube.svg"),
        "TikTok" => egui::include_image!("../../../assets/social/tiktok.svg"),
        "Instagram" => egui::include_image!("../../../assets/social/instagram.svg"),
        "LinkedIn" => egui::include_image!("../../../assets/social/linkedin.svg"),
        _ => return None,
    })
}

/// The Warsha (ورشة) mark: a gear of the 12 apps' colours (icons/make_brand.py).
pub fn warsha_mark() -> ImageSource<'static> {
    egui::include_image!("../../../assets/brand/warsha-mark.svg")
}
