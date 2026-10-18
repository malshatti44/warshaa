//! Warsha community and project links (Help menu, About, start screen, CLI, MCP).

use serde_json::{Value, json};

/// The app's slug on malshatti.com and GitHub.
pub const APP: &str = "nasaq";
/// The Warsha community Discord.
pub const DISCORD: &str = "https://malshatti.com";
/// The Warsha website.
pub const WEBSITE: &str = "https://malshatti.com";
/// Nasaq's page on the Warsha website.
pub const APP_PAGE: &str = "https://malshatti.com/apps/nasaq.html";
/// Nasaq's source repository.
pub const GITHUB: &str = "https://malshatti.com/apps/nasaq.html";
/// Where to report bugs and request features.
pub const ISSUES: &str = "https://github.com/malshatti44/warshaa";

/// All links as JSON (the `app.links` command).
pub fn all() -> Value {
    json!({
        "discord": DISCORD,
        "website": WEBSITE,
        "appPage": APP_PAGE,
        "github": GITHUB,
        "issues": ISSUES,
    })
}

/// A link by key (`discord`, `website`, `appPage`, `github`, `issues`).
pub fn get(key: &str) -> Option<&'static str> {
    Some(match key {
        "discord" => DISCORD,
        "website" => WEBSITE,
        "appPage" => APP_PAGE,
        "github" => GITHUB,
        "issues" => ISSUES,
        _ => return None,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn links_follow_the_app_slug() {
        assert!(APP_PAGE.ends_with(&format!("/apps/{APP}")));
        assert!(GITHUB.ends_with(&format!("/storytold/{APP}")));
        assert!(ISSUES.starts_with(GITHUB));
        for k in ["discord", "website", "appPage", "github", "issues"] {
            assert!(get(k).is_some_and(|u| u.starts_with("https://")), "{k}");
            assert_eq!(all()[k], get(k).unwrap());
        }
    }
}
