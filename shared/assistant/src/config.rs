//! The assistant's settings, shared by every Warsha app (`assistant.json` in [`config_dir`]).
//! API keys are stored encrypted for this Windows user (DPAPI); on macOS and Linux the file is
//! readable by its owner only.

use std::collections::BTreeMap;
use std::path::PathBuf;

use base64::Engine as _;
use serde::{Deserialize, Serialize};

use crate::llm::Provider;

#[derive(Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct Settings {
    pub provider: Provider,
    /// Model per provider.
    pub models: BTreeMap<String, String>,
    /// Encrypted keys per provider (base64 of DPAPI blobs).
    keys: BTreeMap<String, String>,
    /// Let the model think before it acts (slower, better on long requests).
    pub think: bool,
    /// Panel width in points.
    pub width: f32,
}

impl Default for Settings {
    fn default() -> Self {
        Self { provider: Provider::Local, models: BTreeMap::new(), keys: BTreeMap::new(), think: false, width: 380.0 }
    }
}

fn pname(p: Provider) -> String {
    format!("{p:?}")
}

fn home() -> Option<PathBuf> {
    std::env::var_os(if cfg!(windows) { "USERPROFILE" } else { "HOME" }).filter(|h| !h.is_empty()).map(PathBuf::from)
}

/// Warsha's settings folder: `%APPDATA%\Warsha`, `~/Library/Application Support/Warsha` on macOS,
/// `$XDG_CONFIG_HOME/warsha` (`~/.config/warsha`) elsewhere.
pub fn config_dir() -> PathBuf {
    let env = |k: &str| std::env::var_os(k).filter(|v| !v.is_empty()).map(PathBuf::from);
    if cfg!(windows) {
        env("APPDATA").unwrap_or_else(std::env::temp_dir).join("Warsha")
    } else if cfg!(target_os = "macos") {
        home().map(|h| h.join("Library").join("Application Support").join("Warsha")).unwrap_or_else(|| std::env::temp_dir().join("Warsha"))
    } else {
        env("XDG_CONFIG_HOME").or_else(|| home().map(|h| h.join(".config"))).unwrap_or_else(std::env::temp_dir).join("warsha")
    }
}

/// Warsha's data folder (the model and its runtime): `%LOCALAPPDATA%\Warsha`, the same folder as
/// [`config_dir`] on macOS, `$XDG_DATA_HOME/warsha` (`~/.local/share/warsha`) elsewhere.
pub fn data_dir() -> PathBuf {
    let env = |k: &str| std::env::var_os(k).filter(|v| !v.is_empty()).map(PathBuf::from);
    if cfg!(windows) {
        env("LOCALAPPDATA").unwrap_or_else(std::env::temp_dir).join("Warsha")
    } else if cfg!(target_os = "macos") {
        config_dir()
    } else {
        env("XDG_DATA_HOME").or_else(|| home().map(|h| h.join(".local").join("share"))).unwrap_or_else(std::env::temp_dir).join("warsha")
    }
}

fn file() -> PathBuf {
    config_dir().join("assistant.json")
}

/// Keys are in the file in clear outside Windows: only its owner may read it.
#[cfg(unix)]
fn owner_only(path: &std::path::Path) {
    use std::os::unix::fs::PermissionsExt;
    let _ = std::fs::set_permissions(path, std::fs::Permissions::from_mode(0o600));
}

#[cfg(not(unix))]
fn owner_only(_path: &std::path::Path) {}

impl Settings {
    pub fn load() -> Self {
        std::fs::read_to_string(file()).ok().and_then(|s| serde_json::from_str(&s).ok()).unwrap_or_default()
    }

    pub fn save(&self) {
        let f = file();
        if let Some(d) = f.parent() {
            let _ = std::fs::create_dir_all(d);
        }
        if let Ok(s) = serde_json::to_string_pretty(self) {
            let tmp = f.with_extension("json.tmp");
            if std::fs::write(&tmp, s).is_ok() {
                owner_only(&tmp);
                let _ = std::fs::rename(&tmp, &f);
            }
        }
    }

    pub fn model(&self, p: Provider) -> String {
        self.models.get(&pname(p)).cloned().filter(|m| !m.is_empty()).unwrap_or_else(|| p.default_model().to_string())
    }

    pub fn set_model(&mut self, p: Provider, m: &str) {
        self.models.insert(pname(p), m.trim().to_string());
    }

    pub fn key(&self, p: Provider) -> String {
        self.keys
            .get(&pname(p))
            .and_then(|b| base64::engine::general_purpose::STANDARD.decode(b).ok())
            .and_then(|blob| unprotect(&blob))
            .unwrap_or_default()
    }

    pub fn has_key(&self, p: Provider) -> bool {
        self.keys.contains_key(&pname(p))
    }

    pub fn set_key(&mut self, p: Provider, key: &str) {
        let key = key.trim();
        if key.is_empty() {
            self.keys.remove(&pname(p));
        } else if let Some(blob) = protect(key) {
            self.keys.insert(pname(p), base64::engine::general_purpose::STANDARD.encode(blob));
        }
    }
}

#[cfg(windows)]
fn protect(text: &str) -> Option<Vec<u8>> {
    use windows_sys::Win32::Foundation::LocalFree;
    use windows_sys::Win32::Security::Cryptography::{CRYPT_INTEGER_BLOB, CRYPTPROTECT_UI_FORBIDDEN, CryptProtectData};
    let data = text.as_bytes();
    let input = CRYPT_INTEGER_BLOB { cbData: data.len() as u32, pbData: data.as_ptr().cast_mut() };
    let mut out = CRYPT_INTEGER_BLOB { cbData: 0, pbData: std::ptr::null_mut() };
    // SAFETY: DPAPI reads `input` and allocates `out`, which we copy and free with LocalFree.
    unsafe {
        if CryptProtectData(&input, std::ptr::null(), std::ptr::null(), std::ptr::null(), std::ptr::null(), CRYPTPROTECT_UI_FORBIDDEN, &mut out) == 0 {
            return None;
        }
        let v = std::slice::from_raw_parts(out.pbData, out.cbData as usize).to_vec();
        LocalFree(out.pbData.cast());
        Some(v)
    }
}

#[cfg(windows)]
fn unprotect(blob: &[u8]) -> Option<String> {
    use windows_sys::Win32::Foundation::LocalFree;
    use windows_sys::Win32::Security::Cryptography::{CRYPT_INTEGER_BLOB, CRYPTPROTECT_UI_FORBIDDEN, CryptUnprotectData};
    let input = CRYPT_INTEGER_BLOB { cbData: blob.len() as u32, pbData: blob.as_ptr().cast_mut() };
    let mut out = CRYPT_INTEGER_BLOB { cbData: 0, pbData: std::ptr::null_mut() };
    // SAFETY: as in `protect`.
    unsafe {
        if CryptUnprotectData(&input, std::ptr::null_mut(), std::ptr::null(), std::ptr::null(), std::ptr::null(), CRYPTPROTECT_UI_FORBIDDEN, &mut out) == 0 {
            return None;
        }
        let v = std::slice::from_raw_parts(out.pbData, out.cbData as usize).to_vec();
        LocalFree(out.pbData.cast());
        String::from_utf8(v).ok()
    }
}

#[cfg(not(windows))]
fn protect(text: &str) -> Option<Vec<u8>> {
    Some(text.as_bytes().to_vec())
}

#[cfg(not(windows))]
fn unprotect(blob: &[u8]) -> Option<String> {
    String::from_utf8(blob.to_vec()).ok()
}
