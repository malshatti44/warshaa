//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::DesignApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|_id, label| crate::i18n::tr("ar", label).to_string());
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::NASAQ, translate)
}

/// One line about the app for the model.
fn state(app: &DesignApp) -> String {
    match app.session.active() {
        Some(d) => {
            let file = d.path.as_deref().map(|p| format!(", file {p}")).unwrap_or_default();
            format!("app state: the document \"{}\" is open ({} pages{file}); work in it", d.title(), d.doc.page_count())
        }
        None => "app state: no document is open".into(),
    }
}

/// The panel, before the main area takes the rest of the window.
pub fn show(app: &mut DesignApp, ui: &mut egui::Ui) {
    app.assistant.set_language(app.ui.language == "ar", false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match app.assistant_bridge.as_mut().and_then(|start| start()) {
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}

/// The title-bar button that opens and closes the panel.
pub fn button(app: &mut DesignApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::get(ui.ctx());
    let label = crate::i18n::tr(&app.ui.language, "Assistant").to_string();
    let tip = crate::i18n::tr(&app.ui.language, "Warsha Assistant: ask, and it does it in the app").to_string();
    let b = egui::Button::new(egui::RichText::new(label).font(crate::theme::semibold(11.5)).color(t.text)).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text(tip).clicked() {
        app.assistant.toggle();
    }
}
