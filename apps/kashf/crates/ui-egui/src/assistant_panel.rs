//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! active workbook and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::SheetApp;
use crate::i18n::{self, Language};

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|_id, label| Language::Ar.tr(label).to_string());
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::KASHF, translate)
}

/// One line about the app for the model: the open workbook and its active sheet.
fn state(app: &SheetApp) -> String {
    match app.session.active() {
        Some(d) => {
            let file = d.path.as_deref().map(|p| format!(", file {p}")).unwrap_or_default();
            let sheet = d.wb.active().map(|s| format!(", active sheet \"{}\"", s.name)).unwrap_or_default();
            format!("app state: the workbook \"{}\" is open ({} sheets{sheet}{file}); work in it", d.title, d.wb.sheets.len())
        }
        None => "app state: no workbook is open".into(),
    }
}

/// The panel, before the grid takes the rest of the window.
pub fn show(app: &mut SheetApp, ui: &mut egui::Ui) {
    let ar = i18n::current(ui.ctx()) == Language::Ar;
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
pub fn button(app: &mut SheetApp, ui: &mut egui::Ui) {
    let b = crate::widgets::small_button(ui, crate::icons::Icon::Script, "Assistant", "Warsha Assistant: ask, and it does it in the app", false);
    if b.clicked() {
        app.assistant.toggle();
    }
}
