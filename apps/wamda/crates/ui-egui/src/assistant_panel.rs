//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.

use std::sync::Arc;

use crate::WamdaApp;

pub fn new() -> warsha_assistant::Assistant {
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = Arc::new(|id, label| crate::i18n::arabic(id, label));
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::WAMDA, translate)
}

/// One line about the app for the model.
fn state(app: &WamdaApp) -> String {
    let s = &app.session;
    match (s.state.active_comp, s.active_comp()) {
        (Some(id), Some(c)) => {
            let name = s.project.item(id).map(|i| i.name.as_str()).unwrap_or("");
            format!("app state: the composition \"{name}\" is open ({} × {}, {} layers); work in it", c.width, c.height, c.layers.len())
        }
        _ => "app state: no composition is open".into(),
    }
}

/// The panel, before the main area takes the rest of the window.
pub fn show(app: &mut WamdaApp, ui: &mut egui::Ui) {
    app.assistant.set_language(crate::i18n::current() == "ar", false);
    let line = state(app);
    if app.assistant.show(ui, &line) {
        match app.assistant_bridge.as_mut().and_then(|start| start()) {
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }
    }
}

/// The panel at the side of `body` (this window lays itself out by rectangles); returns the rest.
pub fn show_in(app: &mut WamdaApp, ui: &mut egui::Ui, body: egui::Rect) -> egui::Rect {
    if !app.assistant.open {
        app.assistant.show(ui, "");
        return body;
    }
    let mut child = ui.new_child(egui::UiBuilder::new().max_rect(body));
    show(app, &mut child);
    child.available_rect_before_wrap()
}

/// The title-bar button that opens and closes the panel.
pub fn header_button(app: &mut WamdaApp, ui: &mut egui::Ui, rx: f32, cy: f32) -> f32 {
    let t = app.tokens;
    let r = egui::Rect::from_min_max(egui::pos2(rx - 26.0, cy - 13.0), egui::pos2(rx, cy + 13.0));
    let tip = crate::i18n::tr("Warsha Assistant: ask, and it does it in the app");
    if crate::widgets::icon_button(ui, r, crate::icons::Icon::Sparkle, app.assistant.open, &t, egui::Id::new("hdr-assistant")).on_hover_text(tip).clicked() {
        app.assistant.toggle();
    }
    app.auto.add("header.assistant", r, tip);
    r.min.x - 6.0
}
