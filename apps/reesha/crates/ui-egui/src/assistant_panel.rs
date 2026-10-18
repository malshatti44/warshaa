//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! active document and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::ReeshaApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too (the worker thread has no interface language), so Arabic
    // requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|id, label| match crate::i18n::Lang::from_code("ar") {
        Some(ar) => crate::i18n::tr_id(ar, id, label).to_string(),
        None => label.to_string(),
    });
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::REESHA, translate)
}

/// One line about the app for the model: the open document.
fn state(app: &ReeshaApp) -> String {
    match app.session.active() {
        Some(d) => {
            let file = d.path.as_deref().map(|p| format!(" (file {p})")).unwrap_or_default();
            format!("app state: the document \"{}\" is open{file}; work in it", d.doc.title)
        }
        None => "app state: no document is open".into(),
    }
}

/// The panel, before the canvas takes the rest of the window.
pub fn show(app: &mut ReeshaApp, ui: &mut egui::Ui) {
    let arabic = crate::i18n::current().code() == "ar";
    app.assistant.set_language(arabic, false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        let started = app.assistant_bridge.as_mut().and_then(|start| start());
        match started {
            Some((bridge, roots)) => {
                if app.automation_roots.is_none() {
                    app.confine_services(roots);
                }
                app.assistant.connect(bridge, ui.ctx());
            }
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}

/// The app bar button that opens and closes the panel.
pub fn button(app: &mut ReeshaApp, ui: &mut egui::Ui, tint: egui::Color32) {
    let label = egui::RichText::new(tl!("Assistant")).color(tint).size(12.0);
    let icon = egui::Image::new(crate::icons::source("wand-sparkles")).fit_to_exact_size(egui::vec2(14.0, 14.0)).tint(tint);
    let b = egui::Button::image_and_text(icon, label).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text(tl!("Warsha Assistant: ask, and it does it in the app")).clicked() {
        app.assistant.toggle();
    }
}
