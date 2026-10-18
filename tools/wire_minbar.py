"""Wire the Warsha assistant into Minbar: control channel on demand, panel, title-bar button."""
import pathlib

UP = pathlib.Path(r"E:\warsha-src\upstream\minbar")


def edit(rel, rep):
    p = UP / rel
    s = p.read_text(encoding="utf-8")
    for a, b in rep:
        assert s.count(a) == 1, (rel, s.count(a), a[:80])
        s = s.replace(a, b)
    p.write_text(s, encoding="utf-8")


# 1. The control server: one request channel, and a second listener for the assistant.
edit("apps/minbar/src/control_server.rs", [
("""pub fn start(port: u16, ctx: egui::Context) -> Receiver<ControlRequest> {
    let (tx, rx) = channel::<ControlRequest>();
    let listener = match TcpListener::bind(("127.0.0.1", port)) {
        Ok(l) => l,
        Err(e) => {
            log::error!("control server failed to bind 127.0.0.1:{port}: {e}");
            return rx;
        }
    };
    log::info!("control server listening on 127.0.0.1:{port}");
    std::thread::spawn(move || {
        for stream in listener.incoming().flatten() {
            let tx = tx.clone();
            let ctx = ctx.clone();
            std::thread::spawn(move || serve(stream, tx, ctx));
        }
    });
    rx
}""", """/// The request channel the app reads: the `--control` server and the Warsha assistant's feed it.
pub fn channel_pair() -> (Sender<ControlRequest>, Receiver<ControlRequest>) {
    channel::<ControlRequest>()
}

/// Start the control server on `port`, into the app's request channel.
pub fn start_with(port: u16, tx: Sender<ControlRequest>, ctx: egui::Context) {
    let listener = match TcpListener::bind(("127.0.0.1", port)) {
        Ok(l) => l,
        Err(e) => {
            log::error!("control server failed to bind 127.0.0.1:{port}: {e}");
            return;
        }
    };
    log::info!("control server listening on 127.0.0.1:{port}");
    accept(listener, tx, ctx);
}

fn accept(listener: TcpListener, tx: Sender<ControlRequest>, ctx: egui::Context) {
    std::thread::spawn(move || {
        for stream in listener.incoming().flatten() {
            let tx = tx.clone();
            let ctx = ctx.clone();
            std::thread::spawn(move || serve(stream, tx, ctx));
        }
    });
}

/// Warsha assistant: on first use, a control channel on a free loopback port feeding `tx`, and the
/// `minbar-cli mcp --connect` command line the chat runs against it.
pub fn assistant_bridge(tx: Sender<ControlRequest>, ctx: egui::Context) -> Box<dyn FnMut() -> Option<minbar_ui_egui::warsha_assistant::Bridge>> {
    let mut started: Option<minbar_ui_egui::warsha_assistant::Bridge> = None;
    Box::new(move || {
        if let Some(b) = &started {
            return Some(b.clone());
        }
        let listener = TcpListener::bind(("127.0.0.1", 0)).ok()?;
        let port = listener.local_addr().ok()?.port();
        accept(listener, tx.clone(), ctx.clone());
        let cli = std::env::current_exe().ok()?.with_file_name(if cfg!(windows) { "minbar-cli.exe" } else { "minbar-cli" });
        let bridge = minbar_ui_egui::warsha_assistant::Bridge {
            program: cli,
            args: vec!["mcp".into(), "--connect".into(), port.to_string()],
            // A `--control` launch's port (the AI link) is not this channel's.
            env: vec![("MINBAR_CONTROL_PORT".into(), String::new())],
        };
        started = Some(bridge.clone());
        Some(bridge)
    })
}"""),
])

# 2. main.rs: always one channel; the assistant's bridge.
edit("apps/minbar/src/main.rs", [
("""            if let Some(port) = control_port {
                let rx = control_server::start(port, cc.egui_ctx.clone());
                app = app.with_control(rx);
            }""", """            // One request channel for the `--control` server and the Warsha assistant's.
            let (control_tx, control_rx) = control_server::channel_pair();
            app = app.with_control(control_rx);
            app.assistant_bridge = Some(control_server::assistant_bridge(control_tx.clone(), cc.egui_ctx.clone()));
            if let Some(port) = control_port {
                control_server::start_with(port, control_tx, cc.egui_ctx.clone());
            }"""),
])

# 3. The UI crate.
p = UP / "crates/ui-egui/Cargo.toml"
s = p.read_text(encoding="utf-8")
if "warsha-assistant" not in s:
    if "[target.'cfg(not(target_arch = \"wasm32\"))'.dependencies]" in s:
        s = s.replace("[target.'cfg(not(target_arch = \"wasm32\"))'.dependencies]",
                      "[target.'cfg(not(target_arch = \"wasm32\"))'.dependencies]\n# Warsha (ورشة): the in-app AI assistant panel.\nwarsha-assistant = { path = \"../../../../shared/assistant\" }", 1)
    else:
        s = s.rstrip() + "\n\n[target.'cfg(not(target_arch = \"wasm32\"))'.dependencies]\n# Warsha (ورشة): the in-app AI assistant panel.\nwarsha-assistant = { path = \"../../../../shared/assistant\" }\n"
    p.write_text(s, encoding="utf-8")

edit("crates/ui-egui/src/lib.rs", [
("pub use control::{ControlRequest, ControlResponse};", "pub use control::{ControlRequest, ControlResponse};\n#[cfg(not(target_arch = \"wasm32\"))]\npub use warsha_assistant;"),
("pub mod credits;\n", "pub mod credits;\n#[cfg(not(target_arch = \"wasm32\"))]\nmod assistant_panel;\n"),
("    pub control_rx: Option<Receiver<ControlRequest>>,\n", """    pub control_rx: Option<Receiver<ControlRequest>>,
    /// Warsha assistant: the in-app AI chat panel, and how to open its control channel.
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant: warsha_assistant::Assistant,
    #[cfg(not(target_arch = "wasm32"))]
    pub assistant_bridge: Option<Box<dyn FnMut() -> Option<warsha_assistant::Bridge>>>,
"""),
("            control_rx: None,\n", """            control_rx: None,
            #[cfg(not(target_arch = "wasm32"))]
            assistant: crate::assistant_panel::new(),
            #[cfg(not(target_arch = "wasm32"))]
            assistant_bridge: None,
"""),
("""        if self.session.active().is_some() && !self.home_open() {
            ribbon::show(self, ui);
            status::status_bar(self, ui);
        }
        egui::CentralPanel::default()""", """        if self.session.active().is_some() && !self.home_open() {
            ribbon::show(self, ui);
            status::status_bar(self, ui);
            #[cfg(not(target_arch = "wasm32"))]
            crate::assistant_panel::show(self, ui);
        }
        egui::CentralPanel::default()"""),
])

(UP / "crates/ui-egui/src/assistant_panel.rs").write_text('''//! Warsha assistant (مساعد ورشة): the in-app AI chat panel (`warsha_assistant`), fed with the
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
                "app state: the presentation \\"{}\\" is open ({} slides, current slide {}{file}); work in it",
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
''', encoding="utf-8")

edit("crates/ui-egui/src/ribbon.rs", [
("""        if icon_toggle(&mut right, Icon::Search, "Search commands (⇧⌘P)", true, false).clicked() {
            app.palette = Some((String::new(), 0));
        }""", """        if icon_toggle(&mut right, Icon::Search, "Search commands (⇧⌘P)", true, false).clicked() {
            app.palette = Some((String::new(), 0));
        }
        #[cfg(not(target_arch = "wasm32"))]
        if has_doc {
            crate::assistant_panel::button(app, &mut right);
        }"""),
])

p = UP / "crates/ui-egui/src/ar.tsv"
s = p.read_text(encoding="utf-8")
if "\nAssistant\t" not in s:
    s = s.rstrip("\n") + "\nAssistant\tالمساعد\nWarsha Assistant: ask, and it does it in the app\tمساعد ورشة: اطلب ما تريد، وهو ينفّذه في التطبيق\n"
    p.write_text(s, encoding="utf-8")
print("minbar wired")
