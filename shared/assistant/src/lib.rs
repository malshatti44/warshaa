//! Warsha (ورشة) in-app AI assistant — Mohammad Al Shatti, malshatti.com.
//!
//! A chat panel that operates the app it lives in: the user types a request («زد التباين شوي»), a
//! model plans it, and the app's own MCP server (`<app>-cli mcp`, bridged to the open window) runs
//! the steps. The model is the free one running on this computer (llama.cpp, downloaded on first
//! use and shared by every Warsha app) or Claude / ChatGPT / Gemini with the user's key.
//!
//! In an app:
//! ```ignore
//! // once
//! let mut assistant = warsha_assistant::Assistant::new(warsha_assistant::AppSpec::RETOUSH, translate);
//! // every frame, before the central panel
//! if assistant.show(ui, &state_line) {
//!     assistant.connect(bridge_for_this_window());   // the panel needs the app's control channel
//! }
//! ```

mod adapters;
mod agent;
pub mod config;
pub mod llm;
pub mod local;
mod mcp;
mod search;
mod ui;
pub mod vision;

use std::sync::Arc;

pub use agent::Bridge;
pub use ui::Assistant;

/// Which app the assistant is in.
#[derive(Clone, Copy, Debug)]
pub struct AppSpec {
    pub id: &'static str,
    pub name_ar: &'static str,
    pub name_en: &'static str,
}

impl AppSpec {
    pub const RETOUSH: Self = Self { id: "retoush", name_ar: "ريتوش", name_en: "Retoush" };
    pub const REESHA: Self = Self { id: "reesha", name_ar: "ريشة", name_en: "Reesha" };
    pub const MONTEER: Self = Self { id: "monteer", name_ar: "مونتير", name_en: "Monteer" };
    pub const TAYF: Self = Self { id: "tayf", name_ar: "طيف", name_en: "Tayf" };
    pub const WATHEEQ: Self = Self { id: "watheeq", name_ar: "وثيق", name_en: "Watheeq" };
    pub const WAMDA: Self = Self { id: "wamda", name_ar: "ومضة", name_en: "Wamda" };
    pub const NASAQ: Self = Self { id: "nasaq", name_ar: "نسق", name_en: "Nasaq" };
    pub const SATR: Self = Self { id: "satr", name_ar: "سطر", name_en: "Satr" };
    pub const MINBAR: Self = Self { id: "minbar", name_ar: "منبر", name_en: "Minbar" };
    pub const KASHF: Self = Self { id: "kashf", name_ar: "كشف", name_en: "Kashf" };
    pub const MUKHATTAT: Self = Self { id: "mukhattat", name_ar: "مخطط", name_en: "Mukhattat" };
    pub const SADA: Self = Self { id: "sada", name_ar: "صدى", name_en: "Sada" };
}

/// `(command id, English label) → the label the interface shows` (the app's translations).
pub type Translate = Arc<dyn Fn(&str, &str) -> String + Send + Sync>;

/// A translator that uses the egui label hook of the Arabic build (apps without their own catalog).
pub fn egui_translate() -> Translate {
    Arc::new(|_id, label| egui::widget_text::translate_label(label.to_string()))
}
