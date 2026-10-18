//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! active presentation and connected to this window through the control channel on first use.

use crate::SlideApp;

pub fn new() -> warsha_assistant::Assistant {
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::MINBAR, warsha_assistant::egui_translate())
}

/// One line about the app for the model: the open presentation.
fn state(app: &SlideApp) -> String {
    match app.session.active() {
        Some(d) => {
            let file = d.path.as_deref().map(|p| format!(", file {p}")).unwrap_or_default();
            format!(
                "app state: the presentation \"{}\" is open ({} slides, current slide {}{file}); work in it",
                d.title(),
                d.doc.slides.len(),
                d.selection.slide
            )
        }
        None => "app state: no presentation is open".into(),
    }
}

/// The panel, before the slide area takes the rest of the window.
pub fn show(app: &mut SlideApp, ui: &mut egui::Ui) {
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
pub fn button(app: &mut SlideApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::get(ui.ctx());
    let b = egui::Button::new(egui::RichText::new("Assistant").color(t.text).size(12.5)).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text("Warsha Assistant: ask, and it does it in the app").clicked() {
        app.assistant.toggle();
    }
}
