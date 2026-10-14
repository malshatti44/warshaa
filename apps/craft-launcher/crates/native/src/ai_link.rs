//! Linking Warsha's apps to AI apps (Claude Desktop, ChatGPT/Codex, Gemini CLI).
//!
//! Each Warsha app ships an MCP server; `warsha-mcp.exe` (next to the launcher) starts it on
//! demand and attaches it to the app's window. Linking adds one MCP server entry per installed
//! app to the AI app's own settings file, which the AI app reads at start: the user signs in to
//! the AI app with their account, and nothing else is needed. Unlinking removes exactly those
//! entries. Before the first change a settings file is copied to `<name>.warsha-backup`.

use std::path::{Path, PathBuf};

use artcraft_launcher_core::protocol::{AiClient, AiClientState};
use serde_json::{Map, Value, json};

/// The broker's file name, next to the launcher.
pub const BROKER: &str = "warsha-mcp.exe";

/// The Warsha apps an AI app can be linked to: catalog id and the MCP server name it gets.
pub const SERVERS: &[(&str, &str)] = &[
    ("photocraft", "retoush"),
    ("vectorcraft", "reesha"),
    ("filmcraft", "monteer"),
    ("lightcraft", "tayf"),
    ("pdfcraft", "watheeq"),
    ("effectcraft", "wamda"),
    ("designcraft", "nasaq"),
    ("wordcraft", "satr"),
    ("deckcraft", "minbar"),
    ("gridcraft", "kashf"),
    ("cadcraft", "mukhattat"),
    ("soundcraft", "sada"),
];

const BLOCK_START: &str = "# >>> Warsha (ورشة) apps — added by Warsha; Settings ▸ AI removes this block";
const BLOCK_END: &str = "# <<< Warsha (ورشة) apps";

/// An installed app the AI app can drive: catalog id and install folder.
pub struct Ready {
    pub id: String,
    pub dir: PathBuf,
}

fn env_path(var: &str) -> Option<PathBuf> {
    std::env::var_os(var).filter(|v| !v.is_empty()).map(PathBuf::from)
}

fn home() -> Option<PathBuf> {
    env_path("USERPROFILE").or_else(|| env_path("HOME"))
}

/// The settings files an AI app reads (Claude Desktop has one per kind of install).
fn configs(client: AiClient) -> Vec<PathBuf> {
    match client {
        AiClient::Claude => {
            let mut v = Vec::new();
            // The Microsoft Store / MSIX install keeps its settings in its package folder.
            if let Some(local) = env_path("LOCALAPPDATA") {
                let msix = local.join("Packages").join("Claude_pzs8sxrjxfjjc").join("LocalCache").join("Roaming").join("Claude");
                if msix.is_dir() {
                    v.push(msix.join("claude_desktop_config.json"));
                }
            }
            if let Some(roaming) = env_path("APPDATA") {
                let dir = roaming.join("Claude");
                if dir.is_dir() || v.is_empty() {
                    v.push(dir.join("claude_desktop_config.json"));
                }
            }
            v
        }
        AiClient::ChatGpt => home().map(|h| vec![h.join(".codex").join("config.toml")]).unwrap_or_default(),
        AiClient::Gemini => home().map(|h| vec![h.join(".gemini").join("settings.json")]).unwrap_or_default(),
    }
}

/// Whether the AI app is on this computer: its settings folder, or the app itself.
fn found(client: AiClient) -> bool {
    if configs(client).iter().any(|c| c.parent().is_some_and(Path::is_dir)) {
        return true;
    }
    let local = env_path("LOCALAPPDATA");
    let roaming = env_path("APPDATA");
    match client {
        AiClient::Claude => local.is_some_and(|l| l.join("AnthropicClaude").is_dir()),
        AiClient::ChatGpt => local.is_some_and(|l| {
            std::fs::read_dir(l.join("Packages"))
                .map(|d| d.flatten().any(|e| e.file_name().to_string_lossy().starts_with("OpenAI.")))
                .unwrap_or(false)
        }),
        AiClient::Gemini => roaming.is_some_and(|r| r.join("npm").join("gemini.cmd").is_file()),
    }
}

fn server_name(id: &str) -> Option<&'static str> {
    SERVERS.iter().find(|(i, _)| *i == id).map(|(_, n)| *n)
}

fn id_of(server: &str) -> Option<&'static str> {
    SERVERS.iter().find(|(_, n)| *n == server).map(|(i, _)| *i)
}

/// Whether a JSON server entry is one of ours (its command is the broker).
fn is_ours(entry: &Value) -> bool {
    entry.get("command").and_then(Value::as_str).is_some_and(|c| c.to_ascii_lowercase().ends_with(BROKER))
}

fn read_json(path: &Path) -> Result<Map<String, Value>, String> {
    match std::fs::read_to_string(path) {
        Ok(text) if text.trim().is_empty() => Ok(Map::new()),
        Ok(text) => match serde_json::from_str::<Value>(text.trim_start_matches('\u{feff}')) {
            Ok(Value::Object(o)) => Ok(o),
            Ok(_) => Err(format!("{} isn't a JSON object", path.display())),
            Err(e) => Err(format!("{} can't be read as JSON ({e}); fix or remove it, then try again", path.display())),
        },
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(Map::new()),
        Err(e) => Err(format!("{}: {e}", path.display())),
    }
}

fn linked_in(client: AiClient, path: &Path) -> Vec<String> {
    match client {
        AiClient::ChatGpt => {
            let text = std::fs::read_to_string(path).unwrap_or_default();
            let Some((_, rest)) = text.split_once(BLOCK_START) else { return Vec::new() };
            let block = rest.split(BLOCK_END).next().unwrap_or_default();
            block
                .lines()
                .filter_map(|l| l.trim().strip_prefix("[mcp_servers.")?.strip_suffix(']'))
                .filter_map(id_of)
                .map(str::to_owned)
                .collect()
        }
        AiClient::Claude | AiClient::Gemini => {
            let Ok(o) = read_json(path) else { return Vec::new() };
            let Some(Value::Object(servers)) = o.get("mcpServers") else { return Vec::new() };
            servers.iter().filter(|(_, v)| is_ours(v)).filter_map(|(k, _)| id_of(k)).map(str::to_owned).collect()
        }
    }
}

pub fn status() -> Vec<AiClientState> {
    AiClient::ALL
        .iter()
        .map(|&client| {
            let paths = configs(client);
            let mut linked: Vec<String> = paths.iter().flat_map(|p| linked_in(client, p)).collect();
            linked.sort();
            linked.dedup();
            AiClientState {
                client,
                found: found(client),
                linked,
                config: paths.first().map(|p| p.display().to_string()).unwrap_or_default(),
            }
        })
        .collect()
}

fn backup(path: &Path) {
    let mut name = path.file_name().unwrap_or_default().to_os_string();
    name.push(".warsha-backup");
    let copy = path.with_file_name(name);
    if path.is_file() && !copy.exists() {
        let _ = std::fs::copy(path, copy);
    }
}

/// Write `text` next to `path`, then move it into place, so a crash never leaves half a file.
fn write_atomic(path: &Path, text: &str) -> Result<(), String> {
    if let Some(dir) = path.parent() {
        std::fs::create_dir_all(dir).map_err(|e| format!("{}: {e}", dir.display()))?;
    }
    backup(path);
    let tmp = path.with_extension("warsha-tmp");
    std::fs::write(&tmp, text).map_err(|e| format!("{}: {e}", tmp.display()))?;
    std::fs::rename(&tmp, path).map_err(|e| {
        let _ = std::fs::remove_file(&tmp);
        format!("{}: {e}", path.display())
    })
}

fn update_json(client: AiClient, path: &Path, broker: &Path, apps: &[Ready]) -> Result<(), String> {
    if apps.is_empty() && !path.exists() {
        return Ok(());
    }
    let mut o = read_json(path)?;
    let empty = {
        let servers = o.entry("mcpServers").or_insert_with(|| json!({}));
        let Some(servers) = servers.as_object_mut() else {
            return Err(format!("{}: `mcpServers` isn't an object", path.display()));
        };
        servers.retain(|_, v| !is_ours(v));
        for app in apps {
            let Some(name) = server_name(&app.id) else { continue };
            let mut entry = json!({"command": broker.display().to_string(), "args": [app.id, app.dir.display().to_string()]});
            if client == AiClient::Gemini {
                // Milliseconds: the first call can wait for the app's window to open.
                entry["timeout"] = json!(180_000);
            }
            servers.insert(name.to_string(), entry);
        }
        servers.is_empty()
    };
    if empty {
        o.remove("mcpServers");
    }
    let text = serde_json::to_string_pretty(&Value::Object(o)).map_err(|e| e.to_string())?;
    write_atomic(path, &(text + "\n"))
}

fn toml_literal(s: &str) -> String {
    if s.contains('\'') { format!("\"{}\"", s.replace('\\', "\\\\").replace('"', "\\\"")) } else { format!("'{s}'") }
}

fn update_toml(path: &Path, broker: &Path, apps: &[Ready]) -> Result<(), String> {
    let text = match std::fs::read_to_string(path) {
        Ok(t) => t,
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => String::new(),
        Err(e) => return Err(format!("{}: {e}", path.display())),
    };
    // Drop an earlier block of ours, keep everything else as it was.
    let mut kept = String::new();
    let mut rest = text.as_str();
    while let Some((before, after)) = rest.split_once(BLOCK_START) {
        kept.push_str(before);
        rest = after.split_once(BLOCK_END).map(|(_, a)| a.strip_prefix("\r\n").or_else(|| a.strip_prefix('\n')).unwrap_or(a)).unwrap_or("");
    }
    kept.push_str(rest);
    let mut out = kept.trim_end().to_string();
    if !apps.is_empty() {
        if !out.is_empty() {
            out.push_str("\n\n");
        }
        out.push_str(BLOCK_START);
        out.push('\n');
        for app in apps {
            let Some(name) = server_name(&app.id) else { continue };
            out.push_str(&format!(
                "[mcp_servers.{name}]\ncommand = {}\nargs = [{}, {}]\nstartup_timeout_sec = 30\ntool_timeout_sec = 180\n\n",
                toml_literal(&broker.display().to_string()),
                toml_literal(&app.id),
                toml_literal(&app.dir.display().to_string()),
            ));
        }
        out.push_str(BLOCK_END);
    }
    out.push('\n');
    if out.trim().is_empty() && !path.exists() {
        return Ok(());
    }
    write_atomic(path, &out)
}

/// Link (`apps` non-empty) or unlink (`apps` empty) an AI app. Returns how many apps are linked.
pub fn set(client: AiClient, broker: &Path, apps: &[Ready]) -> Result<usize, String> {
    if !apps.is_empty() && !broker.is_file() {
        return Err(format!("{} is missing next to Warsha; reinstall Warsha", BROKER));
    }
    for path in configs(client) {
        match client {
            AiClient::ChatGpt => update_toml(&path, broker, apps)?,
            AiClient::Claude | AiClient::Gemini => update_json(client, &path, broker, apps)?,
        }
    }
    Ok(apps.len())
}

/// Fill each linked app's tool cache, so the AI app's first start doesn't wait on twelve servers.
pub fn warm(broker: &Path, apps: &[Ready]) {
    for app in apps {
        let mut cmd = std::process::Command::new(broker);
        cmd.args([app.id.as_str(), &app.dir.display().to_string(), "--warm"])
            .stdin(std::process::Stdio::null())
            .stdout(std::process::Stdio::null())
            .stderr(std::process::Stdio::null());
        #[cfg(windows)]
        {
            use std::os::windows::process::CommandExt;
            cmd.creation_flags(0x0800_0000);
        }
        let _ = cmd.status();
    }
}

#[cfg(test)]
#[allow(clippy::unwrap_used)]
mod tests {
    use super::*;

    fn tmp(name: &str) -> PathBuf {
        let d = std::env::temp_dir().join(format!("warsha-ai-test-{}-{name}", std::process::id()));
        let _ = std::fs::remove_dir_all(&d);
        std::fs::create_dir_all(&d).unwrap();
        d
    }

    fn ready() -> Vec<Ready> {
        vec![
            Ready { id: "photocraft".into(), dir: PathBuf::from(r"C:\Program Files\Warsha\Retoush") },
            Ready { id: "deckcraft".into(), dir: PathBuf::from(r"C:\Program Files\Warsha\Minbar") },
        ]
    }

    #[test]
    fn json_link_keeps_other_settings_and_unlink_removes_only_ours() {
        let d = tmp("json");
        let p = d.join("claude_desktop_config.json");
        std::fs::write(&p, r#"{"globalShortcut":"Ctrl+Space","mcpServers":{"files":{"command":"npx","args":["fs"]}}}"#).unwrap();
        let broker = d.join(BROKER);
        update_json(AiClient::Claude, &p, &broker, &ready()).unwrap();
        let v: Value = serde_json::from_str(&std::fs::read_to_string(&p).unwrap()).unwrap();
        assert_eq!(v["globalShortcut"], "Ctrl+Space");
        assert_eq!(v["mcpServers"]["files"]["command"], "npx");
        assert_eq!(v["mcpServers"]["retoush"]["args"][0], "photocraft");
        assert_eq!(linked_in(AiClient::Claude, &p), vec!["deckcraft".to_string(), "photocraft".to_string()]);
        assert!(d.join("claude_desktop_config.json.warsha-backup").is_file());
        update_json(AiClient::Claude, &p, &broker, &[]).unwrap();
        let v: Value = serde_json::from_str(&std::fs::read_to_string(&p).unwrap()).unwrap();
        assert!(v["mcpServers"].get("retoush").is_none());
        assert_eq!(v["mcpServers"]["files"]["command"], "npx");
    }

    #[test]
    fn toml_block_is_replaced_and_removed_whole() {
        let d = tmp("toml");
        let p = d.join("config.toml");
        std::fs::write(&p, "model = \"gpt-5\"\n\n[mcp_servers.other]\ncommand = \"x\"\n").unwrap();
        let broker = d.join(BROKER);
        update_toml(&p, &broker, &ready()).unwrap();
        update_toml(&p, &broker, &ready()).unwrap();
        let text = std::fs::read_to_string(&p).unwrap();
        assert_eq!(text.matches(BLOCK_START).count(), 1, "{text}");
        assert!(text.starts_with("model = \"gpt-5\""));
        assert!(text.contains("[mcp_servers.other]") && text.contains("[mcp_servers.minbar]"));
        assert_eq!(linked_in(AiClient::ChatGpt, &p), vec!["photocraft".to_string(), "deckcraft".to_string()]);
        update_toml(&p, &broker, &[]).unwrap();
        let text = std::fs::read_to_string(&p).unwrap();
        assert!(!text.contains("Warsha") && text.contains("[mcp_servers.other]"), "{text}");
    }

    #[test]
    fn unreadable_json_is_left_alone() {
        let d = tmp("bad");
        let p = d.join("settings.json");
        std::fs::write(&p, "{ // a comment\n}").unwrap();
        assert!(update_json(AiClient::Gemini, &p, &d.join(BROKER), &ready()).is_err());
        assert_eq!(std::fs::read_to_string(&p).unwrap(), "{ // a comment\n}");
    }
}
