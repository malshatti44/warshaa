//! The assistant's settings, shared by every Warsha app (%APPDATA%\Warsha\assistant.json).
//! API keys are stored encrypted for this Windows user (DPAPI).

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

fn file() -> PathBuf {
    let base = std::env::var_os("APPDATA").map(PathBuf::from).unwrap_or_else(std::env::temp_dir);
    base.join("Warsha").join("assistant.json")
}

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
