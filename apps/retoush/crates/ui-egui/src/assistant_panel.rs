//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! active document and connected to this window through the automation channel on first use.

use std::sync::Arc;

use crate::RetoushApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too (the worker thread has no interface language), so Arabic
    // requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|id, label| match crate::i18n::Lang::from_code("ar") {
        Some(ar) => crate::i18n::tr_id(ar, id, label).to_string(),
        None => label.to_string(),
    });
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::RETOUSH, translate)
}

/// One line about the app for the model: the open document.
fn state(app: &RetoushApp) -> String {
    match app.session.active() {
        Some(d) => {
            let path = d.path.as_deref().map(|p| format!(", file {p}")).unwrap_or_default();
            format!("open document: \"{}\" {}×{} px{path}", d.doc.name, d.doc.size.width, d.doc.size.height)
        }
        None => "no document open".into(),
    }
}

/// The panel, before the canvas takes the rest of the window.
pub fn show(app: &mut RetoushApp, ui: &mut egui::Ui) {
    let arabic = crate::i18n::current().code() == "ar";
    app.assistant.set_language(arabic, crate::direction::is_rtl());
    let line = state(app);
    if app.assistant.show(ui, &line) {
        let bridge = app.services.assistant_bridge.as_mut().and_then(|start| start());
        match bridge {
            Some(b) => app.assistant.connect(b, ui.ctx()),
            None => log::warn!("assistant: no automation channel in this build"),
        }
    }
}

/// The title bar button that opens and closes the panel.
pub fn button(app: &mut RetoushApp, ui: &mut egui::Ui, tint: egui::Color32) {
    let label = egui::RichText::new(tl!("Assistant")).color(tint).size(12.0);
    let b = egui::Button::image_and_text(crate::icons::image("wand-sparkles", 14.0, tint), label).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text(tl!("Warsha Assistant: ask, and it does it in the app")).clicked() {
        app.assistant.toggle();
    }
}
