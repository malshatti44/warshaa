//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.

use crate::SoundApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = warsha_assistant::egui_translate();
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::SADA, translate)
}

/// One line about the app for the model.
fn state(app: &SoundApp) -> String {
    let s = app.engine.session();
    format!(
        "app state: the session \"{}\" is open ({} tracks{}); work in it",
        s.name,
        s.tracks.len(),
        if app.engine.is_dirty() { ", unsaved changes" } else { "" }
    )
}

/// The panel, before the main area takes the rest of the window.
pub fn show(app: &mut SoundApp, ui: &mut egui::Ui) {
    app.assistant.set_language(crate::i18n::is_arabic(), false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match app.assistant_bridge.as_mut().and_then(|start| start()) {
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}

/// The title-bar button that opens and closes the panel.
pub fn button(app: &mut SoundApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::current();
    let b = egui::Button::new(egui::RichText::new("Assistant").color(t.text)).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text("Warsha Assistant: ask, and it does it in the app").clicked() {
        app.assistant.toggle();
    }
}
