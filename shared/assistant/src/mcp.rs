//! A small MCP client over stdio: the app's own `<app>-cli mcp`, bridged to the open window.

use std::io::{BufRead, BufReader, Write};
use std::process::{Child, ChildStdin, Command, Stdio};
use std::sync::mpsc::{Receiver, RecvTimeoutError, channel};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};

use serde_json::{Value, json};

pub struct Mcp {
    child: Child,
    stdin: ChildStdin,
    lines: Receiver<String>,
    next_id: u64,
    pub tools: Vec<Value>,
    /// The end of what the server wrote to stderr (why it stopped, when it did).
    stderr: Arc<Mutex<String>>,
}

/// The text and the first image of a tool result.
#[derive(Default)]
pub struct ToolResult {
    pub ok: bool,
    pub text: String,
    /// (mime type, base64 data)
    pub image: Option<(String, String)>,
    /// The call would replace this file the user opened: ask them first.
    pub confirm: Option<String>,
    /// The file the call wrote (a save or an export), for apps that open the result.
    pub saved: Option<String>,
}

impl Mcp {
    /// Start `program` with `args`; `env` entries with an empty value are removed from the
    /// environment the server inherits (a setting of the app's own launch that would conflict).
    pub fn start(program: &std::path::Path, args: &[String], env: &[(String, String)]) -> Result<Self, String> {
        let mut cmd = Command::new(program);
        cmd.args(args).stdin(Stdio::piped()).stdout(Stdio::piped()).stderr(Stdio::piped());
        for (k, v) in env {
            if v.is_empty() {
                cmd.env_remove(k);
            } else {
                cmd.env(k, v);
            }
        }
        #[cfg(windows)]
        {
            use std::os::windows::process::CommandExt;
            const CREATE_NO_WINDOW: u32 = 0x0800_0000;
            cmd.creation_flags(CREATE_NO_WINDOW);
        }
        let mut child = cmd.spawn().map_err(|e| format!("cannot start {}: {e}", program.display()))?;
        let stdin = child.stdin.take().ok_or("no stdin")?;
        let stdout = child.stdout.take().ok_or("no stdout")?;
        let stderr = Arc::new(Mutex::new(String::new()));
        if let Some(err) = child.stderr.take() {
            let keep = Arc::clone(&stderr);
            std::thread::spawn(move || {
                for line in BufReader::new(err).lines() {
                    let Ok(line) = line else { break };
                    if let Ok(mut s) = keep.lock() {
                        s.push_str(&line);
                        s.push('\n');
                        if s.len() > 4000 {
                            let cut = s.len() - 2000;
                            let cut = (cut..s.len()).find(|i| s.is_char_boundary(*i)).unwrap_or(0);
                            s.drain(..cut);
                        }
                    }
                }
            });
        }
        let (tx, lines) = channel();
        std::thread::spawn(move || {
            for line in BufReader::new(stdout).lines() {
                let Ok(line) = line else { break };
                if tx.send(line).is_err() {
                    break;
                }
            }
        });
        let mut m = Self { child, stdin, lines, next_id: 0, tools: Vec::new(), stderr };
        m.request(
            "initialize",
            json!({"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "warsha-assistant", "version": env!("CARGO_PKG_VERSION")}}),
            Duration::from_secs(60),
        )?;
        m.send(&json!({"jsonrpc": "2.0", "method": "notifications/initialized"}))?;
        let list = m.request("tools/list", json!({}), Duration::from_secs(60))?;
        m.tools = list.get("tools").and_then(Value::as_array).cloned().unwrap_or_default();
        Ok(m)
    }

    fn send(&mut self, msg: &Value) -> Result<(), String> {
        let mut line = serde_json::to_string(msg).map_err(|e| e.to_string())?;
        line.push('\n');
        self.stdin.write_all(line.as_bytes()).and_then(|()| self.stdin.flush()).map_err(|e| format!("{}: {e}", self.stopped()))
    }

    /// "The app's server stopped", with the last thing it said.
    fn stopped(&self) -> String {
        let said = self.stderr.lock().map(|s| s.trim().lines().rev().take(3).collect::<Vec<_>>().join(" | ")).unwrap_or_default();
        if said.is_empty() { "the app's MCP server stopped".into() } else { format!("the app's MCP server stopped ({said})") }
    }

    fn request(&mut self, method: &str, params: Value, timeout: Duration) -> Result<Value, String> {
        self.next_id += 1;
        let id = self.next_id;
        self.send(&json!({"jsonrpc": "2.0", "id": id, "method": method, "params": params}))?;
        let end = Instant::now() + timeout;
        loop {
            let left = end.saturating_duration_since(Instant::now());
            match self.lines.recv_timeout(left) {
                Ok(line) => {
                    let Ok(v) = serde_json::from_str::<Value>(&line) else { continue };
                    if v.get("id").and_then(Value::as_u64) != Some(id) {
                        continue;
                    }
                    if let Some(e) = v.get("error") {
                        return Err(e.get("message").and_then(Value::as_str).unwrap_or("MCP error").to_string());
                    }
                    return Ok(v.get("result").cloned().unwrap_or(Value::Null));
                }
                Err(RecvTimeoutError::Timeout) => return Err(format!("{method}: no reply in {}s", timeout.as_secs())),
                Err(RecvTimeoutError::Disconnected) => {
                    // Let the stderr reader catch up with the server's last words.
                    std::thread::sleep(Duration::from_millis(200));
                    return Err(self.stopped());
                }
            }
        }
    }

    pub fn call(&mut self, name: &str, args: Value) -> ToolResult {
        match self.request("tools/call", json!({"name": name, "arguments": args}), Duration::from_secs(600)) {
            Ok(res) => {
                let mut text = String::new();
                let mut image = None;
                for c in res.get("content").and_then(Value::as_array).into_iter().flatten() {
                    match c.get("type").and_then(Value::as_str) {
                        Some("text") => {
                            if !text.is_empty() {
                                text.push('\n');
                            }
                            text.push_str(c.get("text").and_then(Value::as_str).unwrap_or(""));
                        }
                        Some("image") if image.is_none() => {
                            let mime = c.get("mimeType").and_then(Value::as_str).unwrap_or("image/png").to_string();
                            if let Some(data) = c.get("data").and_then(Value::as_str) {
                                image = Some((mime, data.to_string()));
                            }
                        }
                        _ => {}
                    }
                }
                ToolResult { ok: !res.get("isError").and_then(Value::as_bool).unwrap_or(false), text, image, ..Default::default() }
            }
            Err(e) => ToolResult { ok: false, text: e, ..Default::default() },
        }
    }

    /// Call a tool whose text is JSON.
    pub fn call_json(&mut self, name: &str, args: Value) -> Result<Value, String> {
        let r = self.call(name, args);
        if !r.ok {
            return Err(r.text);
        }
        serde_json::from_str(&r.text).map_err(|e| format!("{name}: {e}"))
    }

    pub fn alive(&mut self) -> bool {
        matches!(self.child.try_wait(), Ok(None))
    }
}

impl Drop for Mcp {
    fn drop(&mut self) {
        let _ = self.child.kill();
        let _ = self.child.wait();
    }
}
