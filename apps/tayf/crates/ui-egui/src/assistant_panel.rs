//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::TayfApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|_id, label| crate::i18n::Locale::Ar.tr(label).to_string());
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::TAYF, translate)
}

/// One line about the app for the model.
fn state(app: &TayfApp) -> String {
    match app.session.active() {
        Some(id) => format!("app state: the photo library is open; the active photo is {id:?}; work on it"),
        None => "app state: the photo library is open; no photo is active".into(),
    }
}

/// The panel, before the main area takes the rest of the window.
pub fn show(app: &mut TayfApp, ui: &mut egui::Ui) {
    app.assistant.set_language(crate::i18n::language() == crate::i18n::Locale::Ar, false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match app.assistant_bridge.as_mut().and_then(|start| start()) {
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}
