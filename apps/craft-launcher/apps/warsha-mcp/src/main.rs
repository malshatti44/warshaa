//! warsha-mcp: the bridge between an AI app (Claude Desktop, ChatGPT/Codex, Gemini CLI) and one
//! Warsha app, over MCP on stdio.
//!
//!   warsha-mcp <app> <install dir>            serve (the AI app starts this)
//!   warsha-mcp <app> <install dir> --warm     list the app's tools once into the cache, then exit
//!
//! Each app ships its own MCP server (`<app>-cli mcp`), which can drive the app's open window
//! through the window's control channel. This bridge answers `initialize` and `tools/list` itself
//! (from a cache), so starting the AI app doesn't start twelve apps; the first tool call opens the
//! app's window with its control channel on (or finds it open), starts the app's MCP server
//! attached to it, and from then on passes messages through both ways. When the window is closed,
//! the next call opens it again. Watheeq (pdfcraft) has no window channel: its server works on files.

use std::collections::{HashMap, VecDeque};
use std::io::{BufRead, BufReader, Write};
use std::net::{SocketAddr, TcpStream};
use std::path::{Path, PathBuf};
use std::process::{Child, ChildStdin, Command, Stdio};
use std::sync::mpsc::{Receiver, Sender, channel};
use std::time::{Duration, Instant, SystemTime};

use serde_json::{Value, json};

/// One app: how to open its window with the control channel on, and how to start its MCP server.
/// In the templates `{P}` is the port, `{T}` the control token file and `{H}` the home folder.
struct App {
    id: &'static str,
    latin: &'static str,
    arabic: &'static str,
    about: &'static str,
    port: Option<u16>,
    gui_env: &'static [(&'static str, &'static str)],
    gui_args: &'static [&'static str],
    /// The MCP server attached to the window; `None`: the headless server does everything.
    bridged: Option<&'static [&'static str]>,
    headless: &'static [&'static str],
}

const APPS: &[App] = &[
    App {
        id: "photocraft",
        latin: "Retoush",
        arabic: "ريتوش",
        about: "photo editing and retouching (layers, adjustments, filters, masks, text)",
        port: Some(47801),
        gui_env: &[
            ("PHOTOCRAFT_CONTROL_PORT", "{P}"),
            ("PHOTOCRAFT_CONTROL_TOKEN_FILE", "{T}"),
            ("PHOTOCRAFT_AUTOMATION_READ_ROOT", "{H}"),
            ("PHOTOCRAFT_AUTOMATION_WRITE_ROOT", "{H}"),
        ],
        gui_args: &[],
        bridged: Some(&["mcp", "--bridge", "127.0.0.1:{P}", "--control-token-file", "{T}"]),
        headless: &["mcp", "--automation-read-root", "{H}", "--automation-write-root", "{H}"],
    },
    App {
        id: "vectorcraft",
        latin: "Reesha",
        arabic: "ريشة",
        about: "vector illustration and graphic design (shapes, paths, text, artboards, SVG/PDF export)",
        port: Some(47802),
        gui_env: &[("VECTORCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &["--automation-read-root", "{H}", "--automation-write-root", "{H}"],
        bridged: Some(&["mcp", "--connect", "127.0.0.1:{P}"]),
        headless: &["mcp", "--headless", "--automation-read-root", "{H}", "--automation-write-root", "{H}"],
    },
    App {
        id: "filmcraft",
        latin: "Monteer",
        arabic: "مونتير",
        about: "video editing (timeline, clips, titles, transitions, colour, export)",
        port: Some(47803),
        gui_env: &[("FILMCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--bridge", "127.0.0.1:{P}"]),
        headless: &["mcp"],
    },
    App {
        id: "lightcraft",
        latin: "Tayf",
        arabic: "طيف",
        about: "photo library and RAW development (catalogue, ratings, develop settings, export)",
        port: Some(47804),
        gui_env: &[("LIGHTCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        // Compact: the helper tools only (500 command tools would crowd the AI's context); every
        // command stays reachable through `run_command`.
        bridged: Some(&["mcp", "--connect", "127.0.0.1:{P}", "--compact"]),
        headless: &["mcp", "--compact"],
    },
    App {
        id: "pdfcraft",
        latin: "Watheeq",
        arabic: "وثيق",
        about: "PDF documents (read, edit, annotate, fill forms, merge, split, convert)",
        port: None,
        gui_env: &[],
        gui_args: &[],
        bridged: None,
        // Compact, as for Tayf: 17 helper tools instead of 161.
        headless: &["mcp", "--root", "{H}", "--compact"],
    },
    App {
        id: "effectcraft",
        latin: "Wamda",
        arabic: "ومضة",
        about: "motion graphics and visual effects (compositions, layers, keyframes, effects, render)",
        port: Some(47806),
        gui_env: &[("EFFECTCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--bridge", "{P}"]),
        headless: &["mcp"],
    },
    App {
        id: "designcraft",
        latin: "Nasaq",
        arabic: "نسق",
        about: "page layout and publishing (pages, text frames, styles, images, print-ready PDF)",
        port: Some(47807),
        gui_env: &[("DESIGNCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--connect", "{P}"]),
        headless: &["mcp"],
    },
    App {
        id: "wordcraft",
        latin: "Satr",
        arabic: "سطر",
        about: "word processing (documents, styles, tables, lists, DOCX/PDF)",
        port: Some(47808),
        gui_env: &[("WORDCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--connect", "127.0.0.1:{P}"]),
        headless: &["mcp", "--automation-read-root", "{H}", "--automation-write-root", "{H}"],
    },
    App {
        id: "deckcraft",
        latin: "Minbar",
        arabic: "منبر",
        about: "presentations (slides, layouts, charts, animations, PPTX/PDF)",
        port: Some(47809),
        gui_env: &[("DECKCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--connect", "{P}"]),
        headless: &["mcp"],
    },
    App {
        id: "gridcraft",
        latin: "Kashf",
        arabic: "كشف",
        about: "spreadsheets (sheets, formulas, formatting, charts, XLSX/CSV)",
        port: Some(47810),
        gui_env: &[("GRIDCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--connect", "{P}"]),
        headless: &["mcp"],
    },
    App {
        id: "cadcraft",
        latin: "Mukhattat",
        arabic: "مخطط",
        about: "2D CAD drafting (lines, layers, dimensions, blocks, DXF/DWG)",
        port: Some(47811),
        gui_env: &[("CADCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--connect", "127.0.0.1:{P}"]),
        headless: &["mcp"],
    },
    App {
        id: "soundcraft",
        latin: "Sada",
        arabic: "صدى",
        about: "music production and audio editing (tracks, clips, instruments, effects, mixdown)",
        port: Some(47812),
        gui_env: &[("SOUNDCRAFT_CONTROL_PORT", "{P}")],
        gui_args: &[],
        bridged: Some(&["mcp", "--connect", "{P}"]),
        headless: &["mcp"],
    },
];

const PROTOCOLS: &[&str] = &["2024-11-05", "2025-03-26", "2025-06-18", "2025-11-25"];
const OPEN_TOOL: &str = "open_in_app";
/// The id (as JSON text) of the tool list asked of a newly attached server.
const RELIST: &str = "\"warsha-relist\"";
const LAUNCH_WAIT: Duration = Duration::from_secs(45);

// Windows process-creation flags.
const CREATE_NO_WINDOW: u32 = 0x0800_0000;
const CREATE_BREAKAWAY_FROM_JOB: u32 = 0x0100_0000;

enum Event {
    Client(String),
    ClientEnd,
    Child(u32, String),
    ChildEnd(u32),
}

struct Server {
    app: &'static App,
    dir: PathBuf,
    data: PathBuf,
    home: String,
    events: Receiver<Event>,
    tx: Sender<Event>,
    /// Client messages read while waiting on the app, handled after.
    queued: VecDeque<String>,
    child: Option<Running>,
    generation: u32,
    /// The client's `initialize` parameters, replayed to each new app server.
    init: Option<Value>,
    /// Requests passed to the app server and not answered yet: id (as JSON text) -> method.
    pending: HashMap<String, String>,
    log: Option<std::fs::File>,
    tools_listed: bool,
    /// When this bridge last opened the app's window: a window that has its port open can still be
    /// starting up, and calls in that moment are tried again.
    opened_at: Option<Instant>,
    /// Tool calls passed on and not answered yet, to send again: id (as JSON text) -> (call, tries).
    calls: HashMap<String, (Value, u32)>,
}

/// How long after opening the window a "can't reach the app" answer means "not ready yet".
const STARTUP_GRACE: Duration = Duration::from_secs(45);

struct Running {
    process: Child,
    stdin: ChildStdin,
    generation: u32,
}

fn main() {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let (Some(id), Some(dir)) = (args.first(), args.get(1)) else {
        eprintln!("usage: warsha-mcp <app> <install dir> [--warm]");
        std::process::exit(2);
    };
    let Some(app) = APPS.iter().find(|a| a.id == id || a.latin.eq_ignore_ascii_case(id)) else {
        eprintln!("warsha-mcp: unknown app `{id}`");
        std::process::exit(2);
    };
    let data = data_dir();
    let _ = std::fs::create_dir_all(data.join("logs"));
    let _ = std::fs::create_dir_all(data.join("cache"));
    let (tx, events) = channel();
    let mut s = Server {
        app,
        dir: PathBuf::from(dir),
        home: std::env::var("USERPROFILE").or_else(|_| std::env::var("HOME")).unwrap_or_else(|_| ".".into()),
        log: open_log(&data, app.id),
        data,
        events,
        tx,
        queued: VecDeque::new(),
        child: None,
        generation: 0,
        init: None,
        pending: HashMap::new(),
        tools_listed: false,
        opened_at: None,
        calls: HashMap::new(),
    };
    if args.iter().any(|a| a == "--launch") {
        // Warsha's "Open": the window with its AI connection on, unless one already has it (then
        // a plain second window, which can't take the same port).
        let with_ai = s.app.port.is_some_and(|p| !port_open(p));
        if let Err(e) = s.spawn_window(None, with_ai) {
            eprintln!("{e}");
            std::process::exit(1);
        }
        return;
    }
    if args.iter().any(|a| a == "--warm") {
        match s.list_headless() {
            Ok(n) => println!("{}: {n} tools", app.latin),
            Err(e) => {
                eprintln!("{}: {e}", app.latin);
                std::process::exit(1);
            }
        }
        return;
    }
    s.log(&format!("start {} ({})", app.latin, s.dir.display()));
    let tx = s.tx.clone();
    std::thread::spawn(move || {
        let stdin = std::io::stdin();
        for line in stdin.lock().lines() {
            let Ok(line) = line else { break };
            if tx.send(Event::Client(line)).is_err() {
                break;
            }
        }
        let _ = tx.send(Event::ClientEnd);
    });
    s.run();
}

fn data_dir() -> PathBuf {
    std::env::var_os("LOCALAPPDATA").map(PathBuf::from).unwrap_or_else(std::env::temp_dir).join("Warsha").join("ai")
}

fn open_log(data: &Path, id: &str) -> Option<std::fs::File> {
    let path = data.join("logs").join(format!("{id}.log"));
    if std::fs::metadata(&path).is_ok_and(|m| m.len() > 2 * 1024 * 1024) {
        let _ = std::fs::rename(&path, path.with_extension("old.log"));
    }
    std::fs::OpenOptions::new().create(true).append(true).open(path).ok()
}

fn send(msg: &Value) {
    let mut out = std::io::stdout().lock();
    let _ = writeln!(out, "{msg}");
    let _ = out.flush();
}

fn port_open(port: u16) -> bool {
    TcpStream::connect_timeout(&SocketAddr::from(([127, 0, 0, 1], port)), Duration::from_millis(300)).is_ok()
}

impl Server {
    fn log(&mut self, line: &str) {
        if let Some(f) = &mut self.log {
            let t = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).map(|d| d.as_secs()).unwrap_or(0);
            let _ = writeln!(f, "{t} {line}");
        }
    }

    fn fill(&self, s: &str) -> String {
        s.replace("{P}", &self.app.port.map(|p| p.to_string()).unwrap_or_default())
            .replace("{T}", &self.data.join(format!("{}.token", self.app.id)).to_string_lossy())
            .replace("{H}", &self.home)
    }

    fn gui(&self) -> PathBuf {
        self.dir.join(format!("{}.exe", self.app.id))
    }

    fn cli(&self) -> PathBuf {
        self.dir.join(format!("{}-cli.exe", self.app.id))
    }

    fn cache_path(&self) -> PathBuf {
        self.data.join("cache").join(format!("{}.json", self.app.id))
    }

    /// Size and time of the app's MCP server: a new version invalidates the cached tool list.
    fn cli_stamp(&self) -> String {
        std::fs::metadata(self.cli())
            .map(|m| {
                let t = m.modified().ok().and_then(|t| t.duration_since(SystemTime::UNIX_EPOCH).ok()).map(|d| d.as_secs()).unwrap_or(0);
                format!("{}-{t}", m.len())
            })
            .unwrap_or_default()
    }

    fn cached(&self) -> Option<Value> {
        let v: Value = serde_json::from_str(&std::fs::read_to_string(self.cache_path()).ok()?).ok()?;
        (v.get("stamp").and_then(Value::as_str) == Some(&self.cli_stamp())).then_some(v)
    }

    fn save_cache(&self, tools: &Value) {
        let v = json!({"stamp": self.cli_stamp(), "tools": tools});
        let _ = std::fs::write(self.cache_path(), v.to_string());
    }

    fn instructions(&self) -> String {
        let a = self.app;
        let mut s = format!(
            "{} ({}) is a Warsha desktop app for {}. Its tools drive the app on this computer. ",
            a.latin, a.arabic, a.about
        );
        if a.bridged.is_some() {
            s.push_str("The first tool call opens the app's window if it is closed (that can take a few seconds); the user sees every change live and can keep working in the same window. ");
        } else {
            s.push_str(&format!("Its tools work on files; `{OPEN_TOOL}` opens a file in the app's window for the user. "));
        }
        s.push_str(&format!(
            "Files are read and written inside the user's folder ({}). Arabic text is right-to-left: right-align Arabic paragraphs and text boxes (and set right-to-left direction where a tool offers it). Reply to the user in the language they write in.",
            self.home
        ));
        s
    }

    fn run(&mut self) {
        loop {
            let line = if let Some(l) = self.queued.pop_front() {
                l
            } else {
                match self.events.recv() {
                    Ok(Event::Client(l)) => l,
                    Ok(Event::ClientEnd) | Err(_) => break,
                    Ok(Event::Child(g, l)) => {
                        self.from_child(g, &l);
                        continue;
                    }
                    Ok(Event::ChildEnd(g)) => {
                        self.child_ended(g);
                        continue;
                    }
                }
            };
            self.from_client(&line);
        }
        self.stop_child();
        self.log("end");
    }

    fn from_client(&mut self, line: &str) {
        if line.trim().is_empty() {
            return;
        }
        let Ok(msg) = serde_json::from_str::<Value>(line) else {
            send(&json!({"jsonrpc": "2.0", "id": null, "error": {"code": -32700, "message": "parse error"}}));
            return;
        };
        let id = msg.get("id").cloned();
        let method = msg.get("method").and_then(Value::as_str).map(str::to_owned);
        match (method.as_deref(), id) {
            (Some("initialize"), Some(id)) => {
                let params = msg.get("params").cloned().unwrap_or(json!({}));
                let asked = params.get("protocolVersion").and_then(Value::as_str).unwrap_or("");
                let version = if PROTOCOLS.contains(&asked) { asked.to_owned() } else { PROTOCOLS[PROTOCOLS.len() - 2].to_owned() };
                self.init = Some(params);
                let instructions = self.instructions();
                send(&json!({"jsonrpc": "2.0", "id": id, "result": {
                    "protocolVersion": version,
                    "capabilities": {"tools": {"listChanged": true}},
                    "serverInfo": {"name": self.app.latin.to_lowercase(), "title": format!("{} — {}", self.app.arabic, self.app.latin), "version": env!("CARGO_PKG_VERSION")},
                    "instructions": instructions,
                }}));
            }
            (Some("ping"), Some(id)) if self.child.is_none() => send(&json!({"jsonrpc": "2.0", "id": id, "result": {}})),
            (Some("tools/list"), Some(id)) => self.tools_list(id, msg),
            (Some("tools/call"), Some(id)) if msg.pointer("/params/name").and_then(Value::as_str) == Some(OPEN_TOOL) => {
                let path = msg.pointer("/params/arguments/path").and_then(Value::as_str).map(str::to_owned);
                let reply = match self.open_window(path.as_deref()) {
                    Ok(()) => json!({"content": [{"type": "text", "text": format!("{} is open.", self.app.latin)}]}),
                    Err(e) => json!({"content": [{"type": "text", "text": e}], "isError": true}),
                };
                send(&json!({"jsonrpc": "2.0", "id": id, "result": reply}));
            }
            (Some("notifications/initialized"), None) => {}
            (Some(m), None) => {
                // Other notifications (cancellations, roots changed) only matter to a running server.
                if self.child.is_some() {
                    self.to_child(&msg);
                } else {
                    self.log(&format!("dropped notification {m}"));
                }
            }
            (Some(m), Some(id)) => {
                let m = m.to_owned();
                if let Err(e) = self.ensure_child() {
                    self.log(&format!("{m}: {e}"));
                    if m == "tools/call" {
                        send(&json!({"jsonrpc": "2.0", "id": id, "result": {"content": [{"type": "text", "text": e}], "isError": true}}));
                    } else {
                        send(&json!({"jsonrpc": "2.0", "id": id, "error": {"code": -32603, "message": e}}));
                    }
                    return;
                }
                if m == "tools/call" {
                    self.calls.insert(id.to_string(), (msg.clone(), 0));
                }
                self.pending.insert(id.to_string(), m);
                self.to_child(&msg);
            }
            // A response to a request the app's server made of the client (roots, sampling).
            (None, Some(_)) => {
                if self.child.is_some() {
                    self.to_child(&msg);
                }
            }
            (None, None) => {}
        }
    }

    fn tools_list(&mut self, id: Value, msg: Value) {
        if self.child.is_some() {
            self.pending.insert(id.to_string(), "tools/list".into());
            self.to_child(&msg);
            return;
        }
        let tools = match self.cached() {
            Some(c) => Ok(c["tools"].clone()),
            None => self.list_headless().map(|_| self.cached().map(|c| c["tools"].clone()).unwrap_or(json!([]))),
        };
        match tools {
            Ok(mut tools) => {
                self.add_own_tools(&mut tools);
                self.tools_listed = true;
                send(&json!({"jsonrpc": "2.0", "id": id, "result": {"tools": tools}}));
            }
            Err(e) => send(&json!({"jsonrpc": "2.0", "id": id, "error": {"code": -32603, "message": e}})),
        }
    }

    fn add_own_tools(&self, tools: &mut Value) {
        if self.app.bridged.is_none()
            && let Some(list) = tools.as_array_mut()
        {
            list.push(json!({
                "name": OPEN_TOOL,
                "description": format!("Open {} ({}) on the user's screen, optionally with a file (a PDF), so the user can see the result.", self.app.latin, self.app.arabic),
                "inputSchema": {"type": "object", "properties": {"path": {"type": "string", "description": "Absolute path of a file to open"}}},
            }));
        }
    }

    /// Start the app's headless MCP server just to read its tool list into the cache.
    fn list_headless(&mut self) -> Result<usize, String> {
        let args: Vec<String> = self.app.headless.iter().map(|a| self.fill(a)).collect();
        let (mut proc, mut stdin, rx) = self.spawn_server(&args)?;
        let result = (|| {
            let init = self.init.clone().unwrap_or_else(|| json!({"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "warsha-mcp", "version": env!("CARGO_PKG_VERSION")}}));
            write_line(&mut stdin, &json!({"jsonrpc": "2.0", "id": "warsha-init", "method": "initialize", "params": init}))?;
            wait_reply(&rx, "warsha-init", Duration::from_secs(30))?;
            write_line(&mut stdin, &json!({"jsonrpc": "2.0", "method": "notifications/initialized"}))?;
            write_line(&mut stdin, &json!({"jsonrpc": "2.0", "id": "warsha-tools", "method": "tools/list", "params": {}}))?;
            let t = wait_reply(&rx, "warsha-tools", Duration::from_secs(30))?;
            let tools = t.pointer("/result/tools").cloned().ok_or("the app's server listed no tools")?;
            let n = tools.as_array().map(Vec::len).unwrap_or(0);
            self.save_cache(&tools);
            Ok(n)
        })();
        drop(stdin);
        let _ = proc.kill();
        let _ = proc.wait();
        result
    }

    fn spawn_server(&mut self, args: &[String]) -> Result<(Child, ChildStdin, Receiver<String>), String> {
        let cli = self.cli();
        if !cli.is_file() {
            return Err(format!("{} ({}) isn't installed with its AI connection; update it from Warsha (missing {}).", self.app.latin, self.app.arabic, cli.display()));
        }
        let mut cmd = Command::new(&cli);
        cmd.args(args).current_dir(&self.dir).stdin(Stdio::piped()).stdout(Stdio::piped());
        match self.log.as_ref().and_then(|f| f.try_clone().ok()) {
            Some(f) => cmd.stderr(Stdio::from(f)),
            None => cmd.stderr(Stdio::null()),
        };
        #[cfg(windows)]
        {
            use std::os::windows::process::CommandExt;
            cmd.creation_flags(CREATE_NO_WINDOW);
        }
        let mut proc = cmd.spawn().map_err(|e| format!("can't start {}: {e}", cli.display()))?;
        let stdin = proc.stdin.take().ok_or("no stdin")?;
        let stdout = proc.stdout.take().ok_or("no stdout")?;
        let (tx, rx) = channel();
        std::thread::spawn(move || {
            for line in BufReader::new(stdout).lines() {
                let Ok(line) = line else { break };
                if tx.send(line).is_err() {
                    break;
                }
            }
        });
        Ok((proc, stdin, rx))
    }

    /// Open the app's window, with its control channel on, unless it is open already.
    fn open_window(&mut self, file: Option<&str>) -> Result<(), String> {
        if let Some(port) = self.app.port
            && port_open(port)
            && file.is_none()
        {
            return Ok(());
        }
        let mut proc = self.spawn_window(file, true)?;
        self.opened_at = Some(Instant::now());
        self.log(&format!("opened window pid {}", proc.id()));
        let Some(port) = self.app.port else { return Ok(()) };
        let start = Instant::now();
        while start.elapsed() < LAUNCH_WAIT {
            if port_open(port) {
                return Ok(());
            }
            if let Ok(Some(status)) = proc.try_wait() {
                return Err(format!("{} closed while opening ({status}); another copy may be using its AI connection port {port}.", self.app.latin));
            }
            std::thread::sleep(Duration::from_millis(250));
        }
        Err(format!("{} didn't open its AI connection within {}s.", self.app.latin, LAUNCH_WAIT.as_secs()))
    }

    /// Start the app's window (`with_ai`: its control channel on), detached from this process.
    fn spawn_window(&self, file: Option<&str>, with_ai: bool) -> Result<Child, String> {
        let gui = self.gui();
        if !gui.is_file() {
            return Err(format!("{} ({}) isn't installed (missing {}).", self.app.latin, self.app.arabic, gui.display()));
        }
        let mut cmd = Command::new(&gui);
        cmd.current_dir(&self.dir).stdin(Stdio::null()).stdout(Stdio::null()).stderr(Stdio::null());
        if with_ai {
            for (k, v) in self.app.gui_env {
                cmd.env(k, self.fill(v));
            }
            cmd.args(self.app.gui_args.iter().map(|a| self.fill(a)));
        }
        if let Some(f) = file {
            cmd.arg(f);
        }
        // Out of the AI app's job, so the window stays open when the AI app quits.
        #[cfg(windows)]
        let spawned = {
            use std::os::windows::process::CommandExt;
            cmd.creation_flags(CREATE_BREAKAWAY_FROM_JOB);
            cmd.spawn().or_else(|_| {
                cmd.creation_flags(0);
                cmd.spawn()
            })
        };
        #[cfg(not(windows))]
        let spawned = cmd.spawn();
        spawned.map_err(|e| format!("can't open {}: {e}", self.app.latin))
    }

    /// A running MCP server for the app: attached to its window (opened if need be), or headless.
    fn ensure_child(&mut self) -> Result<(), String> {
        if let Some(c) = &mut self.child {
            let alive = matches!(c.process.try_wait(), Ok(None));
            let window = self.app.port.is_none_or(port_open);
            if alive && window {
                return Ok(());
            }
            self.log("app server or window gone; restarting");
            self.stop_child();
        }
        let args: Vec<String> = match self.app.bridged {
            Some(b) => {
                self.open_window(None)?;
                b.iter().map(|a| self.fill(a)).collect()
            }
            None => self.app.headless.iter().map(|a| self.fill(a)).collect(),
        };
        let (process, mut stdin, rx) = self.spawn_server(&args)?;
        self.generation += 1;
        let generation = self.generation;
        let init = self.init.clone().unwrap_or_else(|| json!({"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "warsha-mcp", "version": env!("CARGO_PKG_VERSION")}}));
        write_line(&mut stdin, &json!({"jsonrpc": "2.0", "id": "warsha-init", "method": "initialize", "params": init}))?;
        // The handshake reply, then everything else goes through the event loop.
        let reply = wait_reply(&rx, "warsha-init", Duration::from_secs(30));
        let tx = self.tx.clone();
        std::thread::spawn(move || {
            for line in rx {
                if tx.send(Event::Child(generation, line)).is_err() {
                    return;
                }
            }
            let _ = tx.send(Event::ChildEnd(generation));
        });
        let mut running = Running { process, stdin, generation };
        if let Err(e) = reply {
            let _ = running.process.kill();
            return Err(format!("{}'s AI connection didn't answer: {e}", self.app.latin));
        }
        write_line(&mut running.stdin, &json!({"jsonrpc": "2.0", "method": "notifications/initialized"}))?;
        self.log(&format!("app server {} started ({})", generation, args.join(" ")));
        self.child = Some(running);
        // The server attached to the window can list other tools than the cached ones.
        if self.tools_listed {
            self.pending.insert(RELIST.into(), "tools/list".into());
            self.to_child(&json!({"jsonrpc": "2.0", "id": "warsha-relist", "method": "tools/list", "params": {}}));
        }
        Ok(())
    }

    fn to_child(&mut self, msg: &Value) {
        let failed = match &mut self.child {
            Some(c) => write_line(&mut c.stdin, msg).is_err(),
            None => true,
        };
        if failed {
            self.log("write to app server failed");
            let g = self.child.as_ref().map(|c| c.generation).unwrap_or(0);
            self.child_ended(g);
        }
    }

    fn from_child(&mut self, generation: u32, line: &str) {
        if self.child.as_ref().map(|c| c.generation) != Some(generation) {
            return;
        }
        let Ok(mut msg) = serde_json::from_str::<Value>(line) else {
            self.log(&format!("non-JSON from app server: {}", line.chars().take(200).collect::<String>()));
            return;
        };
        if msg.get("method").is_none()
            && let Some(id) = msg.get("id").cloned()
        {
            let key = id.to_string();
            if let Some(method) = self.pending.remove(&key) {
                if method == "tools/call" {
                    let call = self.calls.remove(&key);
                    // The window had its port open but wasn't answering yet: wait and try again.
                    let not_ready = msg.pointer("/result/isError").and_then(Value::as_bool) == Some(true) && {
                        let text = msg.pointer("/result/content").map(Value::to_string).unwrap_or_default().to_lowercase();
                        text.contains("cannot reach") || text.contains("timed out") || text.contains("connection refused")
                    };
                    if not_ready
                        && self.opened_at.is_some_and(|t| t.elapsed() < STARTUP_GRACE)
                        && let Some((call, tries)) = call
                        && tries < 4
                    {
                        self.log(&format!("{key}: the window isn't answering yet; trying again ({})", tries + 1));
                        std::thread::sleep(Duration::from_millis(1500));
                        self.calls.insert(key.clone(), (call.clone(), tries + 1));
                        self.pending.insert(key, method);
                        self.to_child(&call);
                        return;
                    }
                }
                if method == "tools/list" {
                    let tools = msg.pointer("/result/tools").cloned();
                    if key == RELIST {
                        // The window's server lists other tools than the cache had: tell the client.
                        if let Some(tools) = tools
                            && self.cached().map(|c| c["tools"].clone()).as_ref() != Some(&tools)
                        {
                            self.save_cache(&tools);
                            send(&json!({"jsonrpc": "2.0", "method": "notifications/tools/list_changed"}));
                        }
                        return;
                    }
                    if let Some(tools) = &tools
                        && msg.pointer("/result/nextCursor").is_none()
                    {
                        self.save_cache(tools);
                    }
                    if let Some(t) = msg.pointer_mut("/result/tools") {
                        self.add_own_tools(t);
                    }
                }
            } else if key.starts_with("\"warsha-") {
                return;
            }
        }
        send(&msg);
    }

    fn child_ended(&mut self, generation: u32) {
        if self.child.as_ref().map(|c| c.generation) != Some(generation) {
            return;
        }
        self.log(&format!("app server {generation} ended"));
        self.stop_child();
    }

    fn stop_child(&mut self) {
        if let Some(mut c) = self.child.take() {
            let _ = c.process.kill();
            let _ = c.process.wait();
        }
        // Whatever the app's server didn't answer gets an error, so the AI app doesn't wait on it.
        for (key, method) in std::mem::take(&mut self.pending) {
            if key.starts_with("\"warsha-") {
                continue;
            }
            let Ok(id) = serde_json::from_str::<Value>(&key) else { continue };
            let text = format!("{} was closed before it answered; try again to reopen it.", self.app.latin);
            if method == "tools/call" {
                send(&json!({"jsonrpc": "2.0", "id": id, "result": {"content": [{"type": "text", "text": text}], "isError": true}}));
            } else {
                send(&json!({"jsonrpc": "2.0", "id": id, "error": {"code": -32603, "message": text}}));
            }
        }
    }
}

fn write_line(stdin: &mut ChildStdin, msg: &Value) -> Result<(), String> {
    writeln!(stdin, "{msg}").and_then(|()| stdin.flush()).map_err(|e| e.to_string())
}

/// Wait for the reply with string id `id` from an app server's output, skipping anything else.
fn wait_reply(rx: &Receiver<String>, id: &str, wait: Duration) -> Result<Value, String> {
    let end = Instant::now() + wait;
    loop {
        let left = end.saturating_duration_since(Instant::now());
        if left.is_zero() {
            return Err(format!("no reply in {}s", wait.as_secs()));
        }
        match rx.recv_timeout(left) {
            Ok(line) => {
                if let Ok(v) = serde_json::from_str::<Value>(&line)
                    && v.get("id").and_then(Value::as_str) == Some(id)
                {
                    if let Some(e) = v.get("error") {
                        return Err(e.get("message").and_then(Value::as_str).unwrap_or("error").to_owned());
                    }
                    return Ok(v);
                }
            }
            Err(std::sync::mpsc::RecvTimeoutError::Timeout) => return Err(format!("no reply in {}s", wait.as_secs())),
            Err(std::sync::mpsc::RecvTimeoutError::Disconnected) => return Err("the app's server stopped".into()),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn every_app_has_a_distinct_port() {
        let mut ports: Vec<u16> = APPS.iter().filter_map(|a| a.port).collect();
        let n = ports.len();
        ports.sort_unstable();
        ports.dedup();
        assert_eq!(ports.len(), n);
        assert_eq!(APPS.len(), 12);
    }
}
