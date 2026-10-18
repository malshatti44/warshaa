"""The UI half of the Warsha assistant wiring: the chat panel, its title-bar button and the
Arabic strings, for Nasaq, Mukhattat, Tayf, Sada, Monteer and Wamda.

  python wire_ui.py nasaq mukhattat tayf sada monteer wamda
"""
import pathlib
import sys

UP = pathlib.Path(r"E:\warsha-src\upstream")
TIP_EN = "Warsha Assistant: ask, and it does it in the app"
TIP_AR = "مساعد ورشة: اطلب ما تريد، وهو ينفّذه في التطبيق"
DEP = "\n\n[target.'cfg(not(target_arch = \"wasm32\"))'.dependencies]\n# Warsha (ورشة): the in-app AI assistant panel.\nwarsha-assistant = { path = \"../../../../shared/assistant\" }\n"
FIELDS = """    /// Warsha assistant: the in-app AI chat panel, and how to open its control channel.
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant: warsha_assistant::Assistant,
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant_bridge: Option<Box<dyn FnMut() -> Option<warsha_assistant::Bridge>>>,
"""
INIT = """            #[cfg(not(target_arch = "wasm32"))]
            assistant: crate::assistant_panel::new(),
            #[cfg(not(target_arch = "wasm32"))]
            assistant_bridge: None,
"""

# The panel module's shared parts: connecting on first use.
SHOW = '''
/// The panel, before the main area takes the rest of the window.
pub fn show(app: &mut {App}, ui: &mut egui::Ui) {{
    app.assistant.set_language({arabic}, false);
    let line = state(app);
    if app.assistant.show(ui, &line) {{
        match app.assistant_bridge.as_mut().and_then(|start| start()) {{
            Some(bridge) => app.assistant.connect(bridge, ui.ctx()),
            None => log::warn!("assistant: no control channel in this build"),
        }}
    }}
}}
'''
# For the apps that lay out their window by rectangles: the panel inside `body`, and the rest.
SHOW_IN = '''
/// The panel at the side of `body` (this window lays itself out by rectangles); returns the rest.
pub fn show_in(app: &mut {App}, ui: &mut egui::Ui, body: egui::Rect) -> egui::Rect {{
    if !app.assistant.open {{
        app.assistant.show(ui, "");
        return body;
    }}
    let mut child = ui.new_child(egui::UiBuilder::new().max_rect(body));
    show(app, &mut child);
    child.available_rect_before_wrap()
}}
'''

APPS = {
    "nasaq": dict(
        App="DesignApp", spec="NASAQ",
        pub_use=("pub use control::{ControlRequest, ControlResponse};\n", "pub use control::{ControlRequest, ControlResponse};\n"),
        field="    control_rx: Option<Receiver<ControlRequest>>,\n",
        init="            control_rx: None,\n",
        place=("""            if self.ui.hidden_panels == 0 {
                dock::show(self, ui);
            }
        }
        egui::CentralPanel::default().frame(egui::Frame::NONE.fill(t.pasteboard))""", """            if self.ui.hidden_panels == 0 {
                dock::show(self, ui);
            }
            #[cfg(not(target_arch = "wasm32"))]
            crate::assistant_panel::show(self, ui);
        }
        egui::CentralPanel::default().frame(egui::Frame::NONE.fill(t.pasteboard))"""),
        translate='Arc::new(|_id, label| crate::i18n::tr("ar", label).to_string())',
        arabic='app.ui.language == "ar"',
        state='''fn state(app: &DesignApp) -> String {
    match app.session.active() {
        Some(d) => {
            let file = d.path.as_deref().map(|p| format!(", file {p}")).unwrap_or_default();
            format!("app state: the document \\"{}\\" is open ({} pages{file}); work in it", d.title(), d.doc.page_count())
        }
        None => "app state: no document is open".into(),
    }
}''',
        button='''pub fn button(app: &mut DesignApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::get(ui.ctx());
    let label = crate::i18n::tr(&app.ui.language, "Assistant").to_string();
    let tip = crate::i18n::tr(&app.ui.language, "%s").to_string();
    let b = egui::Button::new(egui::RichText::new(label).font(crate::theme::semibold(11.5)).color(t.text)).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text(tip).clicked() {
        app.assistant.toggle();
    }
}''' % TIP_EN,
        title=("crates/ui-egui/src/chrome.rs", """                            t.text_dim,
                        );
                        ui.add_space(8.0);
                        let current = app.ui.workspace.clone();""", """                            t.text_dim,
                        );
                        ui.add_space(8.0);
                        #[cfg(not(target_arch = "wasm32"))]
                        {
                            crate::assistant_panel::button(app, ui);
                            ui.add_space(8.0);
                        }
                        let current = app.ui.workspace.clone();"""),
        catalog=("crates/ui-egui/src/i18n/ar.rs", '    ("Search", "بحث"),\n',
                 '    ("Search", "بحث"),\n    ("Assistant", "المساعد"),\n    ("%s", "%s"),\n' % (TIP_EN, TIP_AR)),
    ),
    "mukhattat": dict(
        App="CadApp", spec="MUKHATTAT",
        pub_use=("pub use control::{ControlRequest, ControlResponse, PendingReply};\n", "pub use control::{ControlRequest, ControlResponse, PendingReply};\n"),
        field="    control_rx: Option<Receiver<ControlRequest>>,\n",
        init="            control_rx: None,\n",
        place=("""        let has_doc = !self.session.docs.is_empty() && !self.ui.start_tab;
        egui::CentralPanel::default()""", """        let has_doc = !self.session.docs.is_empty() && !self.ui.start_tab;
        #[cfg(not(target_arch = "wasm32"))]
        crate::assistant_panel::show(self, ui);
        egui::CentralPanel::default()"""),
        translate='Arc::new(|_id, label| crate::i18n::tr("ar", label).to_string())',
        arabic='app.language() == "ar"',
        state='''fn state(app: &CadApp) -> String {
    match app.session.state() {
        Ok(st) if !app.ui.start_tab => {
            let file = st.path.as_deref().map(|p| format!(", file {p}")).unwrap_or_default();
            format!("app state: the drawing \\"{}\\" is open ({} selected{file}); work in it", st.title, st.selection.len())
        }
        _ => "app state: no drawing is open (the Start tab is showing)".into(),
    }
}''',
        button='''pub fn button(app: &mut CadApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::get();
    let b = egui::Button::new(egui::RichText::new(crate::i18n::t("Assistant")).size(12.5).color(t.text)).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text(crate::i18n::t("%s")).clicked() {
        app.assistant.toggle();
    }
}''' % TIP_EN,
        title=("crates/ui-egui/src/chrome.rs", """            let available = (row.right() - 12.0 - x).max(0.0);""", """            // Warsha assistant: its button at the row's end, the tools before it.
            #[cfg(not(target_arch = "wasm32"))]
            let assistant_w = 80.0;
            #[cfg(target_arch = "wasm32")]
            let assistant_w = 0.0;
            #[cfg(not(target_arch = "wasm32"))]
            {
                let br = Rect::from_min_max(pos2(row.right() - 12.0 - assistant_w, row.top()), pos2(row.right() - 12.0, row.bottom()));
                ui.scope_builder(egui::UiBuilder::new().max_rect(br).layout(egui::Layout::right_to_left(egui::Align::Center)), |ui| {
                    crate::assistant_panel::button(app, ui);
                });
            }
            let available = (row.right() - 12.0 - assistant_w - x).max(0.0);"""),
        catalog=("crates/ui-egui/src/i18n/ar.tsv", None, "\tAssistant\tالمساعد\n\t%s\t%s\n" % (TIP_EN, TIP_AR)),
    ),
    "tayf": dict(
        App="TayfApp", spec="TAYF",
        pub_use=("pub use control::{ControlRequest, ControlResponse};\n", "pub use control::{ControlRequest, ControlResponse};\n"),
        field="    control_rx: Option<Receiver<ControlRequest>>,\n",
        init="            control_rx: None,\n",
        place=("""        panels::strip::show(self, ui);
        egui::CentralPanel::default().frame(egui::Frame::NONE).show(ui, |ui| docking::show(self, ui));""", """        panels::strip::show(self, ui);
        #[cfg(not(target_arch = "wasm32"))]
        crate::assistant_panel::show(self, ui);
        egui::CentralPanel::default().frame(egui::Frame::NONE).show(ui, |ui| docking::show(self, ui));"""),
        translate='Arc::new(|_id, label| crate::i18n::Locale::Ar.tr(label).to_string())',
        arabic='crate::i18n::language() == crate::i18n::Locale::Ar',
        state='''fn state(app: &TayfApp) -> String {
    match app.session.active() {
        Some(id) => format!("app state: the photo library is open; the active photo is {id:?}; work on it"),
        None => "app state: the photo library is open; no photo is active".into(),
    }
}''',
        button=None,
        title=("crates/ui-egui/src/panels/topbar.rs", """            let cloud_tip = unsaved.as_deref().unwrap_or("Local library — no cloud account needed");
            for (id, icon, tip, cmd) in [""", """            let cloud_tip = unsaved.as_deref().unwrap_or("Local library — no cloud account needed");
            // Warsha assistant: the chat panel's button, rightmost.
            #[cfg(not(target_arch = "wasm32"))]
            {
                let r = Rect::from_center_size(pos2(x, full.center().y), vec2(28.0, 28.0));
                let resp = ui.interact(r, egui::Id::new(("top", "assistant")), Sense::click()).on_hover_text(crate::i18n::tr("%s"));
                register(ui.ctx(), "icon:assistant", r);
                paint(ui.painter(), r.shrink(5.0), Icon::Chat, if resp.hovered() || app.assistant.open { t.text } else { t.icon });
                if resp.clicked() {
                    app.assistant.toggle();
                }
                x -= 40.0;
            }
            for (id, icon, tip, cmd) in [""" % TIP_EN),
        catalog=("crates/ui-egui/locales/ar.json", "{\n", '{\n  "%s": "%s",\n' % (TIP_EN, TIP_AR)),
    ),
    "sada": dict(
        App="SoundApp", spec="SADA",
        pub_use=("pub use control::ControlRequest;\n", "pub use control::ControlRequest;\n"),
        field="    control_rx: Option<Receiver<ControlRequest>>,\n",
        init="            control_rx: None,\n",
        place=("""        match self.ui.window {
            MainWindow::Edit => edit_window::show(self, ui),""", """        #[cfg(not(target_arch = "wasm32"))]
        crate::assistant_panel::show(self, ui);
        match self.ui.window {
            MainWindow::Edit => edit_window::show(self, ui),"""),
        translate="warsha_assistant::egui_translate()",
        arabic="crate::i18n::is_arabic()",
        state='''fn state(app: &SoundApp) -> String {
    let s = app.engine.session();
    format!(
        "app state: the session \\"{}\\" is open ({} tracks{}); work in it",
        s.name,
        s.tracks.len(),
        if app.engine.is_dirty() { ", unsaved changes" } else { "" }
    )
}''',
        button='''pub fn button(app: &mut SoundApp, ui: &mut egui::Ui) {
    let t = crate::theme::Tokens::current();
    let b = egui::Button::new(egui::RichText::new("Assistant").color(t.text)).frame(false).selected(app.assistant.open);
    if ui.add(b).on_hover_text("%s").clicked() {
        app.assistant.toggle();
    }
}''' % TIP_EN,
        title=("crates/ui-egui/src/menus.rs", """                ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                    ui.label(egui::RichText::new(title).color(t.text_dim));
                });""", """                ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                    #[cfg(not(target_arch = "wasm32"))]
                    {
                        crate::assistant_panel::button(app, ui);
                        ui.add_space(12.0);
                    }
                    ui.label(egui::RichText::new(title).color(t.text_dim));
                });"""),
        catalog=("crates/ui-egui/src/ar.tsv", None, "Assistant\tالمساعد\n%s\t%s\n" % (TIP_EN, TIP_AR)),
    ),
    "monteer": dict(
        App="MonteerApp", spec="MONTEER", rect=True,
        pub_use=("pub use control::ControlRequest;\n", "pub use control::ControlRequest;\n"),
        field="    control_rx: Option<Receiver<ControlRequest>>,\n",
        init="            control_rx: None,\n",
        place=("""        match self.ui.mode {
            state::Mode::Edit => self.dock_area(ui, body),""", """        #[cfg(not(target_arch = "wasm32"))]
        let body = crate::assistant_panel::show_in(self, ui, body);
        match self.ui.mode {
            state::Mode::Edit => self.dock_area(ui, body),"""),
        translate="Arc::new(|_id, label| crate::i18n::Language::Ar.tr(label).to_string())",
        arabic="crate::i18n::current() == crate::i18n::Language::Ar",
        state='''fn state(app: &MonteerApp) -> String {
    format!(
        "app state: the project \\"{}\\" is open{}; work in it",
        app.session.project.name,
        if app.session.is_dirty() { " (unsaved changes)" } else { "" }
    )
}''',
        button=None,
        title=("crates/ui-egui/src/header.rs", """    if btn(ui, Icon::Search, "search", tl!("Search"), app).clicked() {
        app.show_panel(crate::dock::PanelKind::Effects);
    }""", """    if btn(ui, Icon::Search, "search", tl!("Search"), app).clicked() {
        app.show_panel(crate::dock::PanelKind::Effects);
    }
    #[cfg(not(target_arch = "wasm32"))]
    if btn(ui, Icon::Sparkle, "assistant", tl!("%s"), app).clicked() {
        app.assistant.toggle();
    }""" % TIP_EN),
        catalog=("crates/ui-egui/src/i18n/ar.tsv", None, "\t%s\t%s\n" % (TIP_EN, TIP_AR)),
    ),
    "wamda": dict(
        App="WamdaApp", spec="WAMDA", rect=True,
        pub_use=("pub use control::ControlRequest;\n", "pub use control::ControlRequest;\n"),
        field="    pub(crate) control_rx: Option<Receiver<ControlRequest>>,\n",
        init="            control_rx: None,\n",
        place=("""        let body = egui::Rect::from_min_max(egui::pos2(full.min.x + 4.0, header.max.y + 2.0), egui::pos2(full.max.x - 4.0, full.max.y - 4.0));
        self.dock_area(ui, body);""", """        let body = egui::Rect::from_min_max(egui::pos2(full.min.x + 4.0, header.max.y + 2.0), egui::pos2(full.max.x - 4.0, full.max.y - 4.0));
        #[cfg(not(target_arch = "wasm32"))]
        let body = crate::assistant_panel::show_in(self, ui, body);
        self.dock_area(ui, body);"""),
        translate="Arc::new(|id, label| crate::i18n::arabic(id, label))",
        arabic='crate::i18n::current() == "ar"',
        state='''fn state(app: &WamdaApp) -> String {
    match app.session.active_comp() {
        Some(c) => format!("app state: the composition \\"{}\\" is open ({} layers); work in it", c.name, c.layers.len()),
        None => "app state: no composition is open".into(),
    }
}''',
        button='''pub fn header_button(app: &mut WamdaApp, ui: &mut egui::Ui, rx: f32, cy: f32) -> f32 {
    let t = app.tokens;
    let r = egui::Rect::from_min_max(egui::pos2(rx - 26.0, cy - 13.0), egui::pos2(rx, cy + 13.0));
    let tip = crate::i18n::tr("%s");
    if crate::widgets::icon_button(ui, r, crate::icons::Icon::Sparkle, app.assistant.open, &t, egui::Id::new("hdr-assistant")).on_hover_text(tip).clicked() {
        app.assistant.toggle();
    }
    app.auto.add("header.assistant", r, tip);
    r.min.x - 6.0
}''' % TIP_EN,
        title=("crates/ui-egui/src/header.rs", """    rx = discord.min.x - 6.0;
""", """    rx = discord.min.x - 6.0;
    #[cfg(not(target_arch = "wasm32"))]
    {
        rx = crate::assistant_panel::header_button(app, ui, rx, cy);
    }
"""),
        catalog=("crates/ui-egui/src/i18n/ar.rs", '    ("Discord", "Discord"),\n', '    ("Discord", "Discord"),\n    ("%s", "%s"),\n' % (TIP_EN, TIP_AR)),
    ),
}


def edit(path, a, b):
    s = path.read_text(encoding="utf-8")
    assert s.count(a) == 1, (str(path), s.count(a), a[:90])
    path.write_text(s.replace(a, b), encoding="utf-8")


def wire(app):
    c = APPS[app]
    root = UP / app
    lib = root / "crates/ui-egui/src/lib.rs"
    if "assistant_panel" in lib.read_text(encoding="utf-8"):
        print(app, "already wired")
        return
    cargo = root / "crates/ui-egui/Cargo.toml"
    s = cargo.read_text(encoding="utf-8")
    if "warsha-assistant" not in s:
        cargo.write_text(s.rstrip() + DEP, encoding="utf-8")
    a, _ = c["pub_use"]
    edit(lib, a, a + "#[cfg(not(target_arch = \"wasm32\"))]\npub use warsha_assistant;\n#[cfg(not(target_arch = \"wasm32\"))]\nmod assistant_panel;\n")
    edit(lib, c["field"], c["field"] + FIELDS)
    edit(lib, c["init"], c["init"] + INIT)
    edit(lib, *c["place"])
    App = c["App"]
    uses_arc = c["translate"].startswith("Arc::")
    mod = f'''//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
//! open document and connected to this window through the control channel on first use.
{"" if not uses_arc else chr(10) + "use std::sync::Arc;" + chr(10)}
use crate::{App};

pub fn new() -> warsha_assistant::Assistant {{
    // Command labels in Arabic too, whatever the interface language, so Arabic requests find them.
    let translate: warsha_assistant::Translate = {c["translate"]};
    warsha_assistant::Assistant::new(warsha_assistant::AppSpec::{c["spec"]}, translate)
}}

/// One line about the app for the model.
{c["state"]}
''' + SHOW.format(App=App, arabic=c["arabic"].replace("app.", "app.")) + (SHOW_IN.format(App=App) if c.get("rect") else "")
    if c["button"]:
        mod += "\n/// The title-bar button that opens and closes the panel.\n" + c["button"] + "\n"
    (root / "crates/ui-egui/src/assistant_panel.rs").write_text(mod, encoding="utf-8")
    f, a, b = c["title"]
    edit(root / f, a, b)
    f, a, b = c["catalog"]
    p = root / f
    if a is None:
        s = p.read_text(encoding="utf-8")
        p.write_text(s.rstrip("\n") + "\n" + b, encoding="utf-8")
    else:
        edit(p, a, b)
    print(app, "wired")


for name in sys.argv[1:]:
    wire(name)
