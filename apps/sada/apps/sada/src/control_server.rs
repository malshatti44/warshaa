//! Loopback JSON-lines control server: one request per line, one reply per line.
//! This is the transport the MCP server (`sada-cli mcp --connect PORT`) wraps.

use serde_json::{Value, json};
use sada_ui_egui::ControlRequest;
use std::io::{BufRead, BufReader, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::mpsc::{Receiver, Sender, channel};
use std::time::Duration;

/// The request channel the app reads: the `--control` server and the Warsha assistant's feed it.
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
    let actual = listener.local_addr().map(|a| a.port()).unwrap_or(port);
    log::info!("control server listening on 127.0.0.1:{actual}");
    println!("SADA_CONTROL_PORT={actual}");
    let spawned = accept(listener, tx, ctx);
    if let Err(e) = spawned {
        log::error!("control thread failed: {e}");
    }
}

/// Warsha assistant: on first use, a control channel on a free loopback port feeding `tx`, and the
/// `sada-cli mcp` command line the chat runs against it.
pub fn assistant_bridge(tx: Sender<ControlRequest>, ctx: egui::Context) -> Box<dyn FnMut() -> Option<sada_ui_egui::warsha_assistant::Bridge>> {
    let mut started: Option<sada_ui_egui::warsha_assistant::Bridge> = None;
    Box::new(move || {
        if let Some(b) = &started {
            return Some(b.clone());
        }
        let listener = TcpListener::bind(("127.0.0.1", 0)).ok()?;
        let port = listener.local_addr().ok()?.port();
        accept(listener, tx.clone(), ctx.clone()).ok()?;
        let cli = std::env::current_exe().ok()?.with_file_name(if cfg!(windows) { "sada-cli.exe" } else { "sada-cli" });
        let bridge = sada_ui_egui::warsha_assistant::Bridge {
            program: cli,
            args: vec!["mcp".into(), "--connect".into(), format!("{port}")],
            // A `--control` launch's port (the AI link) is not this channel's.
            env: vec![("SADA_CONTROL_PORT".into(), String::new())],
        };
        started = Some(bridge.clone());
        Some(bridge)
    })
}

fn accept(listener: TcpListener, tx: Sender<ControlRequest>, ctx: egui::Context) -> std::io::Result<std::thread::JoinHandle<()>> {
    std::thread::Builder::new().name("sada-control".into()).spawn(move || {
        for stream in listener.incoming().flatten() {
            let tx = tx.clone();
            let ctx = ctx.clone();
            let _ = std::thread::Builder::new().name("sada-control-conn".into()).spawn(move || serve(stream, tx, ctx));
        }
    })
}

fn serve(stream: TcpStream, tx: Sender<ControlRequest>, ctx: egui::Context) {
    let Ok(read) = stream.try_clone() else { return };
    let mut out = stream;
    for line in BufReader::new(read).lines() {
        let Ok(line) = line else { break };
        if line.trim().is_empty() {
            continue;
        }
        // Only JSON requests with a string `method`: anything else (a browser's cross-origin HTTP
        // request line, junk) gets one error and the connection is closed before the rest runs.
        let reply = match serde_json::from_str::<Value>(&line) {
            Ok(msg) if msg.get("method").is_some_and(Value::is_string) => {
                let id = msg.get("id").cloned().unwrap_or(Value::Null);
                let method = msg.get("method").and_then(Value::as_str).unwrap_or("").to_string();
                let params = msg.get("params").cloned().unwrap_or(json!({}));
                let (req, rrx) = ControlRequest::new(method, params);
                if tx.send(req).is_err() {
                    break;
                }
                ctx.request_repaint();
                let mut r = rrx.recv_timeout(Duration::from_secs(90)).unwrap_or_else(|_| json!({"ok": false, "error": "timeout"}));
                if let Some(o) = r.as_object_mut() {
                    o.insert("id".into(), id);
                }
                r
            }
            _ => {
                let _ = writeln!(out, "{}", json!({"ok": false, "error": "not a control request; closing the connection"}));
                break;
            }
        };
        if writeln!(out, "{reply}").is_err() {
            break;
        }
    }
}
