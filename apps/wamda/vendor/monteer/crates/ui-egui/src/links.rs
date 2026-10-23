//! Community and project links (Help menu, About dialog, header Discord button, Home screen).
//!
//! Monteer is part of the Warsha family: the community lives on the Warsha Discord, every
//! app has a page on the Warsha website and a public GitHub repository.

/// The app's short name, used in the website and repository URLs.
pub const APP: &str = "monteer";

/// The Warsha community Discord.
pub const DISCORD: &str = "https://discord.gg/warsha";
/// The Warsha website.
pub const WEBSITE: &str = "https://malshatti.com/apps/";
/// Monteer's page on the Warsha website.
pub const APP_PAGE: &str = "https://malshatti.com/apps/monteer.html";
/// Monteer's source repository.
pub const GITHUB: &str = "https://github.com/malshatti44/warshaa";
/// New issue on Monteer's repository.
pub const ISSUES: &str = "https://github.com/malshatti44/warshaa";

/// (command id, label, url) for every link, in menu order.
pub const ALL: [(&str, &str, &str); 5] = [
    ("help.discord", "Join the Warsha Discord…", DISCORD),
    ("help.website", "Warsha Website", WEBSITE),
    ("help.appPage", "Monteer on malshatti.com", APP_PAGE),
    ("help.github", "Monteer on GitHub", GITHUB),
    ("help.reportIssue", "Report an Issue…", ISSUES),
];

/// The URL a `help.*` link command opens.
pub fn url_for(command: &str) -> Option<&'static str> {
    ALL.iter().find(|(id, _, _)| *id == command).map(|(_, _, u)| *u)
}

/// Open `url` in the system browser (a new tab on the web).
pub fn open(ctx: &egui::Context, url: &str) {
    ctx.open_url(egui::OpenUrl::new_tab(url));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn urls_follow_the_warsha_scheme() {
        assert_eq!(APP_PAGE, format!("{WEBSITE}/apps/{APP}"));
        assert_eq!(GITHUB, "https://github.com/malshatti44/warshaa");
        assert!(ALL.iter().all(|(id, _, u)| id.starts_with("help.") && u.starts_with("https://")));
        assert_eq!(url_for("help.discord"), Some(DISCORD));
        assert_eq!(url_for("help.nope"), None);
    }
}
