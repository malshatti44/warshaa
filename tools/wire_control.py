"""The control-channel half of the Warsha assistant wiring, for the apps whose control server is
`pub fn start(port, ctx) -> Receiver<ControlRequest>` without a key: one request channel the app
always reads, the `--control` server feeding it when asked for, and `assistant_bridge`, which opens
a second loopback listener into the same channel on the chat's first use.

  python wire_control.py nasaq monteer wamda sada tayf mukhattat
"""
import pathlib
import re
import sys

UP = pathlib.Path(r"E:\warsha-src\upstream")

# The `<app>-cli mcp` arguments for a port (as the AI-link broker runs them), and the main.rs
# line that hands the receiver to the app.
APPS = {
    "nasaq": (["mcp", "--connect", "{P}"], "app = app.with_control(rx);"),
    "monteer": (["mcp", "--bridge", "127.0.0.1:{P}"], "app = if control_input_only { app.with_control_input_only(rx) } else { app.with_control(rx) };"),
    "wamda": (["mcp", "--bridge", "{P}"], "app = app.with_control(rx);"),
    "sada": (["mcp", "--connect", "{P}"], "app = app.with_control(rx);"),
    "tayf": (["mcp", "--connect", "127.0.0.1:{P}"], "app = app.with_control(rx);"),
    "mukhattat": (["mcp", "--connect", "127.0.0.1:{P}"], "app = app.with_control(rx);"),
}


def rust_args(args):
    out = []
    for a in args:
        if "{P}" in a:
            out.append('format!("%s")' % a.replace("{P}", "{port}"))
        else:
            out.append('"%s".into()' % a)
    return "vec![" + ", ".join(out) + "]"


def wire(app):
    args, take = APPS[app]
    ui_crate = f"{app}_ui_egui"
    env = app.upper() + "_CONTROL_PORT"
    p = UP / app / "apps" / app / "src" / "control_server.rs"
    s = p.read_text(encoding="utf-8")
    if "assistant_bridge" in s:
        print(app, "control server: already wired")
    else:
        head = "pub fn start(port: u16, ctx: egui::Context) -> Receiver<ControlRequest> {\n    let (tx, rx) = channel::<ControlRequest>();\n"
        assert s.count(head) == 1, app
        i = s.index(head)
        j = s.index("\n}\n", i) + 3
        body = s[i + len(head):j]
        # The old body, now into a given channel: no receiver to return.
        body = body.replace("            return rx;\n", "            return;\n")
        assert body.endswith("    rx\n}\n"), (app, body[-40:])
        body = body[: -len("    rx\n}\n")] + "}\n"
        # The accept loop, for the assistant's listener too.
        if "accept_loop(listener, tx, ctx)" in body:
            accept = "let (tx, ctx) = (tx.clone(), ctx.clone());\n        std::thread::spawn(move || accept_loop(listener, tx, ctx));"
        else:
            # Sada: the loop is inline; lift it out.
            loop_start = body.index("    let spawned = ")
            loop_end = body.index("    if let Err(e) = spawned {")
            inline = body[loop_start:loop_end]
            body = body[:loop_start] + "    let spawned = accept(listener, tx, ctx);\n" + body[loop_end:]
            inner = inline[len("    let spawned = "):].rstrip().rstrip(";")
            s = s[:j] + f"""
fn accept(listener: TcpListener, tx: Sender<ControlRequest>, ctx: egui::Context) -> std::io::Result<std::thread::JoinHandle<()>> {{
    {inner.strip()}
}}
""" + s[j:]
            accept = "accept(listener, tx.clone(), ctx.clone()).ok()?;"
        new = f"""/// The request channel the app reads: the `--control` server and the Warsha assistant's feed it.
pub fn channel_pair() -> (Sender<ControlRequest>, Receiver<ControlRequest>) {{
    channel::<ControlRequest>()
}}

/// Start the control server on `port`, into the app's request channel.
pub fn start_with(port: u16, tx: Sender<ControlRequest>, ctx: egui::Context) {{
{body}
/// Warsha assistant: on first use, a control channel on a free loopback port feeding `tx`, and the
/// `{app}-cli mcp` command line the chat runs against it.
pub fn assistant_bridge(tx: Sender<ControlRequest>, ctx: egui::Context) -> Box<dyn FnMut() -> Option<{ui_crate}::warsha_assistant::Bridge>> {{
    let mut started: Option<{ui_crate}::warsha_assistant::Bridge> = None;
    Box::new(move || {{
        if let Some(b) = &started {{
            return Some(b.clone());
        }}
        let listener = TcpListener::bind(("127.0.0.1", 0)).ok()?;
        let port = listener.local_addr().ok()?.port();
        {accept}
        let cli = std::env::current_exe().ok()?.with_file_name(if cfg!(windows) {{ "{app}-cli.exe" }} else {{ "{app}-cli" }});
        let bridge = {ui_crate}::warsha_assistant::Bridge {{
            program: cli,
            args: {rust_args(args)},
            // A `--control` launch's port (the AI link) is not this channel's.
            env: vec![("{env}".into(), String::new())],
        }};
        started = Some(bridge.clone());
        Some(bridge)
    }})
}}
"""
        s = s[:i] + new + s[j:]
        p.write_text(s, encoding="utf-8")
        print(app, "control server: wired")

    p = UP / app / "apps" / app / "src" / "main.rs"
    s = p.read_text(encoding="utf-8")
    if "assistant_bridge" in s:
        print(app, "main: already wired")
        return
    m = re.search(r"( *)if let Some\(port\) = control_port \{\n([^{}]*?) *let rx = control_server::start\(port, cc\.egui_ctx\.clone\(\)\);\n *" + re.escape(take) + r"\n *\}\n", s)
    assert m, app
    ind = m.group(1)
    # Lines before the server starts (Wamda's App Nap switch), already indented and ended.
    extra = m.group(2)
    receive = take.replace("(rx)", "(control_rx)")
    if app == "monteer":
        # Input isolation belongs to an automation-owned `--control` launch only.
        receive = "app = if control_input_only && control_port.is_some() { app.with_control_input_only(control_rx) } else { app.with_control(control_rx) };"
    if app == "tayf":
        # `with_control` also keeps CPU copies of photo textures for headless screenshots; the
        # assistant does not need them, so only a `--control` launch keeps them.
        receive = "app = app.with_control(control_rx);\n" + ind + "app.renderer.keep_pixels = control_port.is_some();"
    new = f"""{ind}// One request channel for the `--control` server and the Warsha assistant's.
{ind}let (control_tx, control_rx) = control_server::channel_pair();
{ind}{receive}
{ind}app.assistant_bridge = Some(control_server::assistant_bridge(control_tx.clone(), cc.egui_ctx.clone()));
{ind}if let Some(port) = control_port {{
{extra}{ind}    control_server::start_with(port, control_tx, cc.egui_ctx.clone());
{ind}}}
"""
    s = s[: m.start()] + new + s[m.end():]
    p.write_text(s, encoding="utf-8")
    print(app, "main: wired")


for a in sys.argv[1:]:
    wire(a)
