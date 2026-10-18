//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::CadApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|_id, label| crate::i18n::tr("ar", label).to_string());
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::MUKHATTAT, translate)
}

/// One line about the app for the model.
fn state(app: &CadApp) -> String {
    match app.session.state() {
        Ok(st) if !app.ui.start_tab => {
            let file = st.path.as_deref().map(|p| format!(", file {p}")).unwrap_or_default();
            format!("app state: the drawing \"{}\" is open ({} selected{file}); work in it", st.title, st.selection.len())
        }
        _ => "app state: no drawing is open (the Start tab is showing)".into(),
    }
}

/// The panel, before the main area takes the rest of the window.
pub fn show(app: &mut CadApp, ui: &mut egui::Ui) {
    app.assistant.set_language(app.language() == "ar", false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match app.assistant_bridge.as_mut().and_then(|start| start()) {
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}

/// The title-bar button that opens and closes the panel.
pub fn button(app: &mut CadApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::get();
    let b = egui::Button::new(egui::RichText::new(crate::i18n::t("Assistant")).size(12.5).color(t.text)).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text(crate::i18n::t("Warsha Assistant: ask, and it does it in the app")).clicked() {
        app.assistant.toggle();
    }
}
