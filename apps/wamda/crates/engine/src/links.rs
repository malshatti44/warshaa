//! Community and project links (shown in Help ▸, the About dialog, the start screen and the
//! header's Discord button).

pub const APP_NAME: &str = "Wamda";
pub const APP_SLUG: &str = "wamda";
pub const DISCORD: &str = "https://malshatti.com";
pub const WEBSITE: &str = "https://malshatti.com";
pub const APP_PAGE: &str = "https://malshatti.com/apps/wamda.html";
pub const GITHUB: &str = "https://malshatti.com/apps/wamda.html";
pub const ISSUES: &str = "https://github.com/malshatti44/warshaa";

/// Sibling apps of the Warsha family: (name, what it is, GitHub repo, app page).
pub const SIBLINGS: &[(&str, &str)] = &[
    ("Retoush", "retoush"),
    ("Reesha", "reesha"),
    ("Monteer", "monteer"),
    ("Tayf", "tayf"),
    ("Watheeq", "watheeq"),
    ("Nasaq", "nasaq"),
];

pub fn github_of(slug: &str) -> String {
    format!("https://github.com/malshatti44/warshaa/tree/main/apps/{slug}")
}
pub fn page_of(slug: &str) -> String {
    format!("https://malshatti.com/apps/")
}
