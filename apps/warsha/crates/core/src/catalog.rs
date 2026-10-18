//! The Warsha App Suite: the twelve apps the launcher knows about.
//!
//! The list is data so a later version can fetch it from an API; [`SUITE`] is the built-in copy.
//!
//! Text here is English, the source the UI translates from: each `tagline` has a catalog row
//! keyed by the app id (`tr_ctx(app.id, app.tagline)` in `ui-egui`).

use serde::{Deserialize, Serialize};

/// Which generation of the suite an app belongs to.
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum AppGroup {
    /// The seven original apps.
    Classic,
    /// The five apps added after them.
    New,
}

impl AppGroup {
    pub fn label(self) -> &'static str {
        match self {
            Self::Classic => "Classic",
            Self::New => "New",
        }
    }
}

/// One app in the suite.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct WarshaApp {
    /// Machine name: repo, binary, package and asset stem (`retoush`).
    pub id: &'static str,
    /// Display name (`Retoush`).
    pub name: &'static str,
    /// What it's for, in a few words (English; the UI translates it by app id).
    pub tagline: &'static str,
    pub group: AppGroup,
    /// Brand colour (sRGB), for surfaces: malshatti.com's `--app`.
    pub color: [u8; 3],
    /// The brand colour for text on a light background (the site's light `--app-ink`).
    pub ink_light: [u8; 3],
    /// The brand colour for text on a dark background (the site's dark `--app-ink`).
    pub ink_dark: [u8; 3],
    /// GitHub `owner/repo`.
    pub repo: &'static str,
    /// Older names its release assets may carry (Watheeq shipped as WarshaPrint until 0.2.1).
    pub former_ids: &'static [&'static str],
    /// Older display names its installers registered (Watheeq's MSI said WarshaPrint until 0.2.1).
    pub former_names: &'static [&'static str],
}

impl WarshaApp {
    /// `ai.storyteller.<id>`: macOS bundle id, Flatpak id and Linux desktop-file id.
    pub fn bundle_id(&self) -> String {
        format!("ai.storyteller.{}", self.id)
    }

    pub fn releases_url(&self) -> String {
        format!("https://github.com/{}/releases", self.repo)
    }

    pub fn repo_url(&self) -> String {
        format!("https://github.com/{}", self.repo)
    }

    /// The app's page on malshatti.com.
    pub fn website(&self) -> String {
        format!("https://github.com/malshatti44/warshaa/tree/main/apps/{}", self.id)
    }

    /// Asset stems this app's releases may use, current first.
    pub fn stems(&self) -> impl Iterator<Item = &'static str> + '_ {
        std::iter::once(self.id).chain(self.former_ids.iter().copied())
    }

    /// Display names this app's installers may have registered, current first.
    pub fn names(&self) -> impl Iterator<Item = &'static str> + '_ {
        std::iter::once(self.name).chain(self.former_names.iter().copied())
    }

    pub fn by_id(id: &str) -> Option<&'static WarshaApp> {
        SUITE.iter().find(|a| a.id == id)
    }
}

const fn app(
    id: &'static str,
    name: &'static str,
    tagline: &'static str,
    group: AppGroup,
    [color, ink_light, ink_dark]: [[u8; 3]; 3],
    repo: &'static str,
) -> WarshaApp {
    WarshaApp { id, name, tagline, group, color, ink_light, ink_dark, repo, former_ids: &[], former_names: &[] }
}

/// The Warsha App Suite, in display order: the seven classic apps, then the five new ones.
pub const SUITE: [WarshaApp; 12] = [
    app(
        "retoush",
        "ريتوش",
        "Image editing",
        AppGroup::Classic,
        [[0x2f, 0x7b, 0xf5], [0x1a, 0x5b, 0xc4], [0x7f, 0xb0, 0xff]],
        "malshatti44/warshaa",
    ),
    app(
        "reesha",
        "ريشة",
        "Vector illustration",
        AppGroup::Classic,
        [[0xe8, 0x57, 0x3f], [0xb8, 0x3a, 0x24], [0xff, 0x8a, 0x70]],
        "malshatti44/warshaa",
    ),
    app(
        "monteer",
        "مونتير",
        "Video editing, color and sound",
        AppGroup::Classic,
        [[0x8b, 0x5c, 0xf6], [0x6a, 0x3f, 0xd6], [0xb6, 0x9c, 0xff]],
        "malshatti44/warshaa",
    ),
    app(
        "tayf",
        "طيف",
        "Photo library and raw development",
        AppGroup::Classic,
        [[0xf2, 0xa5, 0x16], [0x8a, 0x58, 0x00], [0xff, 0xc1, 0x4d]],
        "malshatti44/warshaa",
    ),
    WarshaApp {
        former_ids: &["warshaprint"],
        former_names: &["WarshaPrint"],
        ..app(
            "watheeq",
            "وثيق",
            "Reading, organizing and protecting PDFs",
            AppGroup::Classic,
            [[0x12, 0xa5, 0x8a], [0x0a, 0x75, 0x63], [0x3f, 0xd6, 0xb8]],
            "malshatti44/warshaa",
        )
    },
    app(
        "wamda",
        "ومضة",
        "Motion graphics and visual effects",
        AppGroup::Classic,
        [[0xe0, 0x36, 0x8f], [0xb0, 0x20, 0x6c], [0xff, 0x7a, 0xb8]],
        "malshatti44/warshaa",
    ),
    app(
        "nasaq",
        "نسق",
        "Page layout and publishing",
        AppGroup::Classic,
        [[0x7b, 0xb5, 0x1c], [0x45, 0x70, 0x08], [0xa6, 0xe0, 0x4a]],
        "malshatti44/warshaa",
    ),
    app(
        "satr",
        "سطر",
        "Writing and document design",
        AppGroup::New,
        [[0x3f, 0x5f, 0xe0], [0x2a, 0x44, 0xb8], [0x8e, 0xa2, 0xff]],
        "malshatti44/warshaa",
    ),
    app(
        "minbar",
        "منبر",
        "Presentations and slide shows",
        AppGroup::New,
        [[0xf0, 0x7a, 0x1e], [0xa8, 0x4f, 0x0a], [0xff, 0xa0, 0x60]],
        "malshatti44/warshaa",
    ),
    app(
        "kashf",
        "كشف",
        "Spreadsheets and data",
        AppGroup::New,
        [[0x1f, 0x9d, 0x55], [0x12, 0x70, 0x3a], [0x4f, 0xd6, 0x8a]],
        "malshatti44/warshaa",
    ),
    app(
        "mukhattat",
        "مخطط",
        "Computer-aided design and drafting",
        AppGroup::New,
        [[0x3e, 0xa6, 0xe8], [0x1a, 0x6f, 0xa8], [0x7c, 0xc8, 0xff]],
        "malshatti44/warshaa",
    ),
    app(
        "sada",
        "صدى",
        "Recording, editing and mixing audio",
        AppGroup::New,
        [[0x1f, 0xa5, 0xc9], [0x0e, 0x72, 0x90], [0x5f, 0xd0, 0xee]],
        "malshatti44/warshaa",
    ),
];

/// Warsha's website.
pub const WEBSITE_URL: &str = "https://malshatti.com";
/// The GitHub account every Warsha App's repository lives under: the only one the launcher
/// installs from, whatever the release feed says.
pub const GITHUB_OWNER: &str = "malshatti44";
/// Warsha on GitHub: every Warsha App's source.
pub const GITHUB_URL: &str = "https://github.com/malshatti44/warshaa";
/// Social accounts shown as small icons (Warsha has none of its own yet; Warsha's were removed).
pub const SOCIAL: [(&str, &str); 0] = [];

/// The Warsha community on Discord.
pub const DISCORD_URL: &str = "https://malshatti.com";

/// Warsha itself, described like a Warsha App so it can update itself with the same
/// machinery (asset names `warsha-<ver>-…`, bundle id `com.malshatti.warsha`,
/// `Warsha.app`). Not part of [`SUITE`].
pub const LAUNCHER: WarshaApp = app(
    "warsha",
    "ورشة",
    "Installs and updates the Warsha App Suite",
    AppGroup::New,
    [[0x0b, 0x0b, 0x0c], [0x0b, 0x0b, 0x0c], [0xf2, 0xf1, 0xee]],
    "malshatti44/warshaa",
);

/// The launcher's own repo, checked so it can say when a newer launcher is out.
pub const LAUNCHER_REPO: &str = "malshatti44/warshaa";
/// The launcher's own asset stem.
pub const LAUNCHER_ID: &str = "warsha";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn suite_has_seven_classic_and_five_new_apps_with_unique_ids() {
        assert_eq!(SUITE.iter().filter(|a| a.group == AppGroup::Classic).count(), 7);
        assert_eq!(SUITE.iter().filter(|a| a.group == AppGroup::New).count(), 5);
        let mut ids: Vec<_> = SUITE.iter().map(|a| a.id).collect();
        ids.sort_unstable();
        ids.dedup();
        assert_eq!(ids.len(), SUITE.len());
        for a in &SUITE {
            assert_eq!(a.repo, format!("storytold/{}", a.id));
            assert_eq!(a.name.to_lowercase(), a.id);
        }
    }

    #[test]
    fn watheeq_also_answers_to_warshaprint() {
        let pdf = WarshaApp::by_id("watheeq").unwrap();
        assert_eq!(pdf.stems().collect::<Vec<_>>(), ["watheeq", "warshaprint"]);
        assert_eq!(pdf.names().collect::<Vec<_>>(), ["Watheeq", "WarshaPrint"]);
        assert_eq!(pdf.website(), "https://github.com/malshatti44/warshaa");
        assert_eq!(WarshaApp::by_id("satr").unwrap().website(), "https://github.com/malshatti44/warshaa");
    }
}
