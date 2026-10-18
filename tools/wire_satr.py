"""Wire the Warsha assistant into Satr: control channel on demand (its own key), panel, title-bar button."""
import pathlib

UP = pathlib.Path(r"E:\warsha-src\upstream\satr")


def edit(rel, rep):
    p = UP / rel
    s = p.read_text(encoding="utf-8")
    for a, b in rep:
        assert s.count(a) == 1, (rel, s.count(a), a[:80])
        s = s.replace(a, b)
    p.write_text(s, encoding="utf-8")


# 1. The control server feeds one request channel; the assistant's listener has its own key.
edit("apps/satr/src/control_server.rs", [
("""pub fn start(port: u16, ctx: egui::Context, settings: Option<&Path>) -> Option<(Receiver<ControlRequest>, Option<KeyFile>)> {""",
 """/// The request channel the app reads: the `--control` server and the Warsha assistant's feed it.
pub fn channel_pair() -> (Sender<ControlRequest>, Receiver<ControlRequest>) {
    channel::<ControlRequest>()
}

/// Warsha assistant: on first use, a control channel on a free loopback port feeding `tx`, with a
/// key of its own (handed to the bridge in `SATR_CONTROL_KEY`, never written to disk), and the
/// `satr-cli mcp --connect` command line the chat runs against it.
pub fn assistant_bridge(tx: Sender<ControlRequest>, ctx: egui::Context) -> Box<dyn FnMut() -> Option<satr_ui_egui::warsha_assistant::Bridge>> {
    let mut started: Option<satr_ui_egui::warsha_assistant::Bridge> = None;
    Box::new(move || {
        if let Some(b) = &started {
            return Some(b.clone());
        }
        let listener = TcpListener::bind(("127.0.0.1", 0)).ok()?;
        let port = listener.local_addr().ok()?.port();
        let key = random_key().ok()?;
        serve_into(listener, tx.clone(), ctx.clone(), key.clone(), FIRST_REQUEST);
        let cli = std::env::current_exe().ok()?.with_file_name(if cfg!(windows) { "satr-cli.exe" } else { "satr-cli" });
        let bridge = satr_ui_egui::warsha_assistant::Bridge {
            program: cli,
            args: vec!["mcp".into(), "--connect".into(), format!("127.0.0.1:{port}")],
            env: vec![("SATR_CONTROL_KEY".into(), key)],
        };
        started = Some(bridge.clone());
        Some(bridge)
    })
}

/// [`start`] into the app's request channel `tx`.
pub fn start_with(port: u16, tx: Sender<ControlRequest>, ctx: egui::Context, settings: Option<&Path>) -> Option<Option<KeyFile>> {
    let (rx, key_file) = start(port, ctx, settings)?;
    std::thread::spawn(move || {
        for req in rx {
            if tx.send(req).is_err() {
                break;
            }
        }
    });
    Some(key_file)
}

pub fn start(port: u16, ctx: egui::Context, settings: Option<&Path>) -> Option<(Receiver<ControlRequest>, Option<KeyFile>)> {"""),
("""fn serve_on(listener: TcpListener, ctx: egui::Context, key: String, first: Duration) -> Receiver<ControlRequest> {
    let (tx, rx) = channel::<ControlRequest>();
    let key: Arc<str> = key.into();
    std::thread::spawn(move || {
        for stream in listener.incoming().flatten() {
            let (tx, ctx, key) = (tx.clone(), ctx.clone(), key.clone());
            std::thread::spawn(move || serve(stream, tx, ctx, &key, first));
        }
    });
    rx
}""", """fn serve_on(listener: TcpListener, ctx: egui::Context, key: String, first: Duration) -> Receiver<ControlRequest> {
    let (tx, rx) = channel::<ControlRequest>();
    serve_into(listener, tx, ctx, key, first);
    rx
}

fn serve_into(listener: TcpListener, tx: Sender<ControlRequest>, ctx: egui::Context, key: String, first: Duration) {
    let key: Arc<str> = key.into();
    std::thread::spawn(move || {
        for stream in listener.incoming().flatten() {
            let (tx, ctx, key) = (tx.clone(), ctx.clone(), key.clone());
            std::thread::spawn(move || serve(stream, tx, ctx, &key, first));
        }
    });
}"""),
])

# 2. main.rs: always one channel; the assistant's bridge.
edit("apps/satr/src/main.rs", [
("""            let mut key_file = None;
            if let Some(port) = control_port
                && let Some((rx, file)) = control_server::start(port, cc.egui_ctx.clone(), satr_control_key::settings_dir().as_deref())
            {
                app = app.with_control(rx);
                key_file = file;
            }""", """            // One request channel for the `--control` server and the Warsha assistant's.
            let (control_tx, control_rx) = control_server::channel_pair();
            app = app.with_control(control_rx);
            app.assistant_bridge = Some(control_server::assistant_bridge(control_tx.clone(), cc.egui_ctx.clone()));
            let mut key_file = None;
            if let Some(port) = control_port
                && let Some(file) = control_server::start_with(port, control_tx, cc.egui_ctx.clone(), satr_control_key::settings_dir().as_deref())
            {
                key_file = file;
            }"""),
])

# 3. The UI crate.
p = UP / "crates/ui-egui/Cargo.toml"
s = p.read_text(encoding="utf-8")
if "warsha-assistant" not in s:
    s = s.rstrip() + "\n\n[target.'cfg(not(target_arch = \"wasm32\"))'.dependencies]\n# Warsha (ورشة): the in-app AI assistant panel.\nwarsha-assistant = { path = \"../../../../shared/assistant\" }\n"
    p.write_text(s, encoding="utf-8")

edit("crates/ui-egui/src/lib.rs", [
("pub use control::ControlRequest;\n", "pub use control::ControlRequest;\n#[cfg(not(target_arch = \"wasm32\"))]\npub use warsha_assistant;\n#[cfg(not(target_arch = \"wasm32\"))]\nmod assistant_panel;\n"),
("    control_rx: Option<std::sync::mpsc::Receiver<ControlRequest>>,\n    shot_token: u64,\n", """    control_rx: Option<std::sync::mpsc::Receiver<ControlRequest>>,
    /// Warsha assistant: the in-app AI chat panel, and how to open its control channel.
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant: warsha_assistant::Assistant,
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant_bridge: Option<Box<dyn FnMut() -> Option<warsha_assistant::Bridge>>>,
    shot_token: u64,
"""),
("            control_rx: None,\n            shot_token: 0,\n", """            control_rx: None,
            #[cfg(not(target_arch = "wasm32"))]
            assistant: crate::assistant_panel::new(),
            #[cfg(not(target_arch = "wasm32"))]
            assistant_bridge: None,
            shot_token: 0,
"""),
("""            panes::show(self, ui);
            egui::CentralPanel::default().frame(egui::Frame::NONE.fill(t.canvas)).show(ui, |ui| {
                canvas::show(self, ui);
            });""", """            panes::show(self, ui);
            #[cfg(not(target_arch = "wasm32"))]
            crate::assistant_panel::show(self, ui);
            egui::CentralPanel::default().frame(egui::Frame::NONE.fill(t.canvas)).show(ui, |ui| {
                canvas::show(self, ui);
            });"""),
])

(UP / "crates/ui-egui/src/assistant_panel.rs").write_text('''//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
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
        "app state: the document \\"{}\\" is open ({} words{}{file}); work in it",
        app.title_stem(),
        app.session.word_count(),
        if app.session.dirty { ", unsaved changes" } else { "" }
    )
}

/// The panel, before the page area takes the rest of the window.
pub fn show(app: &mut WordApp, ui: &mut egui::Ui) {
    let ar = Some(i18n::current()) == arabic();
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
''', encoding="utf-8")

edit("crates/ui-egui/src/chrome.rs", [
("""                    // Search ("Tell me").
                    let (r, resp) = ui.allocate_exact_size(vec2(260.0, control_h), Sense::click());""",
 """                    #[cfg(not(target_arch = "wasm32"))]
                    {
                        crate::assistant_panel::button(app, ui);
                        ui.add_space(8.0);
                    }
                    // Search ("Tell me").
                    let (r, resp) = ui.allocate_exact_size(vec2(260.0, control_h), Sense::click());"""),
])
print("satr wired")
