//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::MonteerApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|_id, label| crate::i18n::Language::Ar.tr(label).to_string());
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::MONTEER, translate)
}

/// One line about the app for the model.
fn state(app: &MonteerApp) -> String {
    format!(
        "app state: the project \"{}\" is open{}; work in it",
        app.session.project.name,
        if app.session.is_dirty() { " (unsaved changes)" } else { "" }
    )
}

/// The panel, before the main area takes the rest of the window.
pub fn show(app: &mut MonteerApp, ui: &mut egui::Ui) {
    app.assistant.set_language(crate::i18n::current() == crate::i18n::Language::Ar, false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match app.assistant_bridge.as_mut().and_then(|start| start()) {
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}

/// The panel at the side of `body` (this window lays itself out by rectangles); returns the rest.
pub fn show_in(app: &mut MonteerApp, ui: &mut egui::Ui, body: egui::Rect) -> egui::Rect {
    if !app.assistant.open {
        app.assistant.show(ui, "");
        return body;
    }
    let mut child = ui.new_child(egui::UiBuilder::new().max_rect(body));
    show(app, &mut child);
    child.available_rect_before_wrap()
}
