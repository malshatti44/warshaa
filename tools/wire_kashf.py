"""Wire the Warsha assistant into Kashf: control channel on demand, panel, title-bar button."""
import pathlib

UP = pathlib.Path(r"E:\warsha-src\upstream\kashf")


def edit(rel, rep):
    p = UP / rel
    s = p.read_text(encoding="utf-8")
    for a, b in rep:
        assert s.count(a) == 1, (rel, s.count(a), a[:80])
        s = s.replace(a, b)
    p.write_text(s, encoding="utf-8")


edit("apps/kashf/src/control_server.rs", [
("""pub fn start(port: u16, ctx: egui::Context) -> std::io::Result<Receiver<ControlRequest>> {
    let listener = TcpListener::bind(("127.0.0.1", port))?;
    let (tx, rx) = channel();
    std::thread::Builder::new().name("control".into()).spawn(move || {
        for stream in listener.incoming().flatten() {
            let tx = tx.clone();
            let ctx = ctx.clone();
            let _ = std::thread::Builder::new().name("control-conn".into()).spawn(move || serve(stream, tx, ctx));
        }
    })?;
    log::info!("control channel listening on 127.0.0.1:{port}");
    Ok(rx)
}""", """/// The request channel the app reads: the `--control` server and the Warsha assistant's feed it.
pub fn channel_pair() -> (Sender<ControlRequest>, Receiver<ControlRequest>) {
    channel()
}

/// Start the control server on `port`, into the app's request channel.
pub fn start_with(port: u16, tx: Sender<ControlRequest>, ctx: egui::Context) -> std::io::Result<()> {
    let listener = TcpListener::bind(("127.0.0.1", port))?;
    accept(listener, tx, ctx)?;
    log::info!("control channel listening on 127.0.0.1:{port}");
    Ok(())
}

fn accept(listener: TcpListener, tx: Sender<ControlRequest>, ctx: egui::Context) -> std::io::Result<()> {
    std::thread::Builder::new().name("control".into()).spawn(move || {
        for stream in listener.incoming().flatten() {
            let tx = tx.clone();
            let ctx = ctx.clone();
            let _ = std::thread::Builder::new().name("control-conn".into()).spawn(move || serve(stream, tx, ctx));
        }
    })?;
    Ok(())
}

/// Warsha assistant: on first use, a control channel on a free loopback port feeding `tx`, and the
/// `kashf-cli mcp --connect` command line the chat runs against it.
pub fn assistant_bridge(tx: Sender<ControlRequest>, ctx: egui::Context) -> Box<dyn FnMut() -> Option<kashf_ui_egui::warsha_assistant::Bridge>> {
    let mut started: Option<kashf_ui_egui::warsha_assistant::Bridge> = None;
    Box::new(move || {
        if let Some(b) = &started {
            return Some(b.clone());
        }
        let listener = TcpListener::bind(("127.0.0.1", 0)).ok()?;
        let port = listener.local_addr().ok()?.port();
        accept(listener, tx.clone(), ctx.clone()).ok()?;
        let cli = std::env::current_exe().ok()?.with_file_name(if cfg!(windows) { "kashf-cli.exe" } else { "kashf-cli" });
        let bridge = kashf_ui_egui::warsha_assistant::Bridge {
            program: cli,
            args: vec!["mcp".into(), "--connect".into(), port.to_string()],
            // A `--control` launch's port (the AI link) is not this channel's.
            env: vec![("KASHF_CONTROL_PORT".into(), String::new())],
        };
        started = Some(bridge.clone());
        Some(bridge)
    })
}"""),
])

edit("apps/kashf/src/main.rs", [
("""                if let Some(port) = control_port {
                    match control_server::start(port, cc.egui_ctx.clone()) {
                        Ok(rx) => app.control_rx = Some(rx),
                        Err(e) => log::error!("control channel on port {port}: {e}"),
                    }
                }""", """                // One request channel for the `--control` server and the Warsha assistant's.
                let (control_tx, control_rx) = control_server::channel_pair();
                app.control_rx = Some(control_rx);
                app.assistant_bridge = Some(control_server::assistant_bridge(control_tx.clone(), cc.egui_ctx.clone()));
                if let Some(port) = control_port
                    && let Err(e) = control_server::start_with(port, control_tx, cc.egui_ctx.clone())
                {
                    log::error!("control channel on port {port}: {e}");
                }"""),
])

p = UP / "crates/ui-egui/Cargo.toml"
s = p.read_text(encoding="utf-8")
if "warsha-assistant" not in s:
    s = s.rstrip() + "\n\n[target.'cfg(not(target_arch = \"wasm32\"))'.dependencies]\n# Warsha (ورشة): the in-app AI assistant panel.\nwarsha-assistant = { path = \"../../../../shared/assistant\" }\n"
    p.write_text(s, encoding="utf-8")

edit("crates/ui-egui/src/lib.rs", [
("pub use control::{ControlRequest, ControlResponse};\n", "pub use control::{ControlRequest, ControlResponse};\n#[cfg(not(target_arch = \"wasm32\"))]\npub use warsha_assistant;\n#[cfg(not(target_arch = \"wasm32\"))]\nmod assistant_panel;\n"),
("    pub control_rx: Option<std::sync::mpsc::Receiver<ControlRequest>>,\n    pub grid: grid::GridState,\n", """    pub control_rx: Option<std::sync::mpsc::Receiver<ControlRequest>>,
    /// Warsha assistant: the in-app AI chat panel, and how to open its control channel.
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant: warsha_assistant::Assistant,
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant_bridge: Option<Box<dyn FnMut() -> Option<warsha_assistant::Bridge>>>,
    pub grid: grid::GridState,
"""),
("            control_rx: None,\n", """            control_rx: None,
            #[cfg(not(target_arch = "wasm32"))]
            assistant: crate::assistant_panel::new(),
            #[cfg(not(target_arch = "wasm32"))]
            assistant_bridge: None,
"""),
("""            panes::show(self, ui);
            egui::CentralPanel::default().frame(egui::Frame::NONE.fill(t.grid_bg)).show(ui, |ui| {""", """            panes::show(self, ui);
            #[cfg(not(target_arch = "wasm32"))]
            crate::assistant_panel::show(self, ui);
            egui::CentralPanel::default().frame(egui::Frame::NONE.fill(t.grid_bg)).show(ui, |ui| {"""),
])

(UP / "crates/ui-egui/src/assistant_panel.rs").write_text('''//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
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
            let sheet = d.wb.active().map(|s| format!(", active sheet \\"{}\\"", s.name)).unwrap_or_default();
            format!("app state: the workbook \\"{}\\" is open ({} sheets{sheet}{file}); work in it", d.title, d.wb.sheets.len())
        }
        None => "app state: no workbook is open".into(),
    }
}

/// The panel, before the grid takes the rest of the window.
pub fn show(app: &mut SheetApp, ui: &mut egui::Ui) {
    let ar = i18n::current(ui.ctx()) == Language::Ar;
    app.assistant.set_language(ar, ar);
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
''', encoding="utf-8")

edit("crates/ui-egui/src/ribbon.rs", [
("""                let share = small_button(ui, Icon::Share, "Share", "Share: export or save a copy", true);""",
 """                #[cfg(not(target_arch = "wasm32"))]
                crate::assistant_panel::button(app, ui);
                let share = small_button(ui, Icon::Share, "Share", "Share: export or save a copy", true);"""),
])

edit("crates/ui-egui/src/i18n/ar.rs", [
("""        "Share" => "مشاركة",\n""", """        "Share" => "مشاركة",
        "Assistant" => "المساعد",
        "Warsha Assistant: ask, and it does it in the app" => "مساعد ورشة: اطلب ما تريد، وهو ينفّذه في التطبيق",
"""),
])
print("kashf wired")
