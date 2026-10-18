//! Localhost JSON-lines control server. Each connection may send many requests; each line
//! `{"id":…, "method":…, "params":…}` gets one reply line `{"id":…, "ok":…, …}`.

use std::io::{BufRead, BufReader, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::mpsc::{Receiver, Sender, channel};
use std::time::Duration;

use kashf_ui_egui::ControlRequest;
use serde_json::{Value as Json, json};

const MAX_LINE: usize = 64 * 1024 * 1024;

/// The request channel the app reads: the `--control` server and the Warsha assistant's feed it.
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
}

fn serve(stream: TcpStream, tx: Sender<ControlRequest>, ctx: egui::Context) {
    let Ok(read) = stream.try_clone() else { return };
    let mut out = stream;
    let reader = BufReader::new(read);
    for line in reader.lines() {
        let Ok(line) = line else { break };
        if line.trim().is_empty() {
            continue;
        }
        if line.len() > MAX_LINE {
            let _ = writeln!(out, "{}", json!({"ok": false, "error": "request too large"}));
            continue;
        }
        // Only JSON requests with a string `method`: anything else (a browser's cross-origin HTTP
        // request line, junk) gets one error and the connection is closed before the rest runs.
        let msg: Json = match serde_json::from_str::<Json>(&line) {
            Ok(v) if v.get("method").is_some_and(Json::is_string) => v,
            _ => {
                let _ = writeln!(out, "{}", json!({"ok": false, "error": "not a control request; closing the connection"}));
                break;
            }
        };
        let id = msg.get("id").cloned().unwrap_or(Json::Null);
        let method = msg.get("method").and_then(Json::as_str).unwrap_or("").to_string();
        let params = msg.get("params").cloned().unwrap_or(json!({}));
        let (req, rx) = ControlRequest::new(method, params);
        if tx.send(req).is_err() {
            break;
        }
        // Wake the UI thread: egui only runs frames when something happens.
        ctx.request_repaint();
        let mut reply = rx
            .recv_timeout(Duration::from_secs(60))
            .unwrap_or_else(|_| json!({"ok": false, "error": "timed out waiting for the UI (is the window minimised?)"}));
        if let Some(o) = reply.as_object_mut() {
            o.insert("id".into(), id);
        }
        if writeln!(out, "{reply}").is_err() {
            break;
        }
    }
}
