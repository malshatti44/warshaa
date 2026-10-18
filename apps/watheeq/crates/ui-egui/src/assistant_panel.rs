//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`). Watheeq's MCP
//! server works on files, not on the window: the chat opens the document's file, writes its result
//! to a new file, and the window opens the PDFs it writes.

use std::sync::Arc;

use crate::WatheeqApp;
use crate::i18n::{self, Lang};

fn arabic() -> Option<Lang> {
    Lang::from_code("ar")
}

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate =
        Arc::new(|_id, label| arabic().map_or_else(|| label.to_string(), |ar| i18n::tr(ar, label).to_string()));
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::WATHEEQ, translate)
}

/// The open document's file, when it has one.
fn active_path(app: &WatheeqApp) -> Option<String> {
    let (_, id) = app.active_ids()?;
    app.session.get(id)?.path.clone()
}

/// One line about the app for the model: the open document, and how to work on it.
fn state(app: &WatheeqApp) -> String {
    let Some((_, id)) = app.active_ids() else { return "app state: no document is open in the window".into() };
    let Some(d) = app.session.get(id) else { return "app state: no document is open in the window".into() };
    match &d.path {
        Some(p) => format!(
            "app state: the PDF \"{}\" is open in the window ({} pages), file {p}. You work on files: doc_open that file, then save the result to a new file next to it; the window opens the PDFs you save",
            d.name,
            d.info.pages.len()
        ),
        None => format!("app state: the PDF \"{}\" is open in the window but not saved to a file yet; ask the user to save it first", d.name),
    }
}

/// `watheeq-cli mcp`, confined to the user's home folder (or, for a file outside it, its folder).
fn bridge(app: &WatheeqApp) -> Option<warsha_assistant::Bridge> {
    let cli = std::env::current_exe().ok()?.with_file_name(if cfg!(windows) { "watheeq-cli.exe" } else { "watheeq-cli" });
    let home = std::env::var_os(if cfg!(windows) { "USERPROFILE" } else { "HOME" }).map(std::path::PathBuf::from);
    let doc = active_path(app).map(std::path::PathBuf::from);
    let root = match (home, doc) {
        (Some(h), Some(d)) if !d.starts_with(&h) => d.parent().map(std::path::Path::to_path_buf),
        (Some(h), _) => Some(h),
        (None, Some(d)) => d.parent().map(std::path::Path::to_path_buf),
        (None, None) => None,
    }?;
    Some(warsha_assistant::Bridge { program: cli, args: vec!["mcp".into(), "--root".into(), root.to_string_lossy().into_owned()], env: Vec::new() })
}

/// Open a PDF the assistant wrote, unless a tab has it already (the file watcher reloads that one).
fn open_result(app: &mut WatheeqApp, path: &str) {
    if !path.to_ascii_lowercase().ends_with(".pdf") || !std::path::Path::new(path).is_file() {
        return;
    }
    let open = app.views.iter().any(|v| app.session.get(v.id).and_then(|d| d.path.as_deref()).is_some_and(|p| same_file(p, path)));
    if !open {
        app.open_path(path);
    }
}

fn same_file(a: &str, b: &str) -> bool {
    match (std::fs::canonicalize(a), std::fs::canonicalize(b)) {
        (Ok(x), Ok(y)) => x == y,
        _ => a.eq_ignore_ascii_case(b),
    }
}

/// The panel, before the document area takes the rest of the window.
pub fn show(app: &mut WatheeqApp, ui: &mut egui::Ui) {
    let ar = Some(i18n::current()) == arabic();
    app.assistant.set_language(ar, false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match bridge(app) {
            Some(b) => app.assistant.connect(b, ui.ctx()),
            None => log::warn!("assistant: watheeq-cli not found next to the app"),
        }
    }
    while let Some(path) = app.assistant.take_saved() {
        open_result(app, &path);
    }
}

/// The title-bar button that opens and closes the panel.
pub fn button(app: &mut WatheeqApp, ui: &mut egui::Ui, size: f32) {
    if crate::icons::button(ui, "wand-sparkles", size, app.assistant.open, tl!("Warsha Assistant: ask, and it does it in the app")).clicked() {
        app.assistant.toggle();
    }
}
