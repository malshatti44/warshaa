//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::WordApp;
use crate::i18n::{self, Lang};

fn arabic() -> Option<Lang> {
    Lang::from_code("ar")
}

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate =
        Arc::new(|_id, label| arabic().map_or_else(|| label.to_string(), |ar| i18n::tr(ar, label).to_string()));
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::SATR, translate)
}

/// One line about the app for the model: the open document.
fn state(app: &WordApp) -> String {
    let file = app.session.path.as_ref().map(|p| format!(", file {}", p.display())).unwrap_or_default();
    format!(
        "app state: the document \"{}\" is open ({} words{}{file}); work in it",
        app.title_stem(),
        app.session.word_count(),
        if app.session.dirty { ", unsaved changes" } else { "" }
    )
}

/// The panel, before the page area takes the rest of the window.
pub fn show(app: &mut WordApp, ui: &mut egui::Ui) {
    let ar = Some(i18n::current()) == arabic();
    app.assistant.set_language(ar, false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match app.assistant_bridge.as_mut().and_then(|start| start()) {
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}

/// The title-bar button that opens and closes the panel.
pub fn button(app: &mut WordApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::get(ui.ctx());
    let ar = Some(i18n::current()) == arabic();
    let (label, tip) = if ar {
        ("المساعد", "مساعد ورشة: اطلب ما تريد، وهو ينفّذه في التطبيق")
    } else {
        ("Assistant", "Warsha Assistant: ask, and it does it in the app")
    };
    let b = egui::Button::new(egui::RichText::new(label).color(t.text).font(crate::theme::medium(11.5))).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text(tip).clicked() {
        app.assistant.toggle();
    }
}
