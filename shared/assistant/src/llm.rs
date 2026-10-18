//! Chat completions with tools. Messages and tools are kept in the OpenAI chat format; Claude's
//! Messages API gets them converted.

use std::time::Duration;

use serde::{Deserialize, Serialize};
use serde_json::{Value, json};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, Default)]
pub enum Provider {
    /// The free model running on this computer (llama.cpp).
    #[default]
    Local,
    Claude,
    OpenAi,
    Gemini,
}

impl Provider {
    pub const ALL: [Provider; 4] = [Provider::Local, Provider::Claude, Provider::OpenAi, Provider::Gemini];

    pub fn name(self, ar: bool) -> &'static str {
        match (self, ar) {
            (Provider::Local, true) => "نموذج ورشة المجاني (على جهازك)",
            (Provider::Local, false) => "Free Warsha model (on this computer)",
            (Provider::Claude, _) => "Claude",
            (Provider::OpenAi, _) => "ChatGPT (OpenAI)",
            (Provider::Gemini, _) => "Gemini (Google)",
        }
    }

    pub fn default_model(self) -> &'static str {
        match self {
            Provider::Local => "local",
            Provider::Claude => "claude-sonnet-5-5",
            Provider::OpenAi => "gpt-5-mini",
            Provider::Gemini => "gemini-2.5-flash",
        }
    }

    /// Where the user gets a key.
    pub fn key_page(self) -> &'static str {
        match self {
            Provider::Local => "",
            Provider::Claude => "https://console.anthropic.com/settings/keys",
            Provider::OpenAi => "https://platform.openai.com/api-keys",
            Provider::Gemini => "https://aistudio.google.com/apikey",
        }
    }

    fn base(self) -> &'static str {
        match self {
            Provider::Local => "",
            Provider::Claude => "https://api.anthropic.com/v1",
            Provider::OpenAi => "https://api.openai.com/v1",
            Provider::Gemini => "https://generativelanguage.googleapis.com/v1beta/openai",
        }
    }
}

#[derive(Clone)]
pub struct Endpoint {
    pub provider: Provider,
    /// The local server's address (`http://127.0.0.1:<port>/v1`); providers use their own.
    pub local_base: String,
    pub key: String,
    pub model: String,
    pub think: bool,
}

fn agent(timeout: u64) -> ureq::Agent {
    ureq::Agent::config_builder()
        .timeout_global(Some(Duration::from_secs(timeout)))
        .http_status_as_error(false)
        .build()
        .into()
}

fn post(url: &str, headers: &[(&str, &str)], body: &Value, timeout: u64) -> Result<Value, String> {
    let mut req = agent(timeout).post(url).header("Content-Type", "application/json");
    for (k, v) in headers {
        req = req.header(*k, *v);
    }
    let mut resp = req.send_json(body).map_err(|e| format!("network: {e}"))?;
    let status = resp.status().as_u16();
    let text = resp.body_mut().with_config().limit(32 * 1024 * 1024).read_to_string().map_err(|e| format!("network: {e}"))?;
    let v: Value = serde_json::from_str(&text).unwrap_or_else(|_| json!({"raw": text}));
    if status >= 400 {
        let msg = v
            .pointer("/error/message")
            .or_else(|| v.pointer("/0/error/message"))
            .and_then(Value::as_str)
            .map(str::to_string)
            .unwrap_or_else(|| text.chars().take(300).collect());
        return Err(match status {
            401 | 403 => format!("the key was refused ({status}): {msg}"),
            429 => format!("rate limit or quota reached (429): {msg}"),
            _ => format!("error {status}: {msg}"),
        });
    }
    Ok(v)
}

/// One assistant message (OpenAI format: `content`, optional `tool_calls`).
pub fn complete(ep: &Endpoint, messages: &[Value], tools: &[Value]) -> Result<Value, String> {
    complete_at(ep, messages, tools, 0.2)
}

/// [`complete`] at a given sampling temperature (0 for transcription: no guessing).
pub fn complete_at(ep: &Endpoint, messages: &[Value], tools: &[Value], temperature: f64) -> Result<Value, String> {
    match ep.provider {
        Provider::Claude => claude(ep, messages, tools, temperature),
        _ => openai(ep, messages, tools, temperature),
    }
}

fn openai(ep: &Endpoint, messages: &[Value], tools: &[Value], temperature: f64) -> Result<Value, String> {
    let local = ep.provider == Provider::Local;
    let base = if local { ep.local_base.as_str() } else { ep.provider.base() };
    let mut body = json!({"model": ep.model, "messages": messages, "tools": tools, "temperature": temperature});
    if local {
        body["max_tokens"] = json!(if ep.think { 6000 } else { 2000 });
        body["chat_template_kwargs"] = json!({"enable_thinking": ep.think});
    }
    let auth = format!("Bearer {}", ep.key);
    let r = post(&format!("{base}/chat/completions"), &[("Authorization", &auth)], &body, if local { 900 } else { 300 })?;
    let mut m = r.pointer("/choices/0/message").cloned().ok_or("no reply from the model")?;
    // Thinking stays out of the conversation that is sent back.
    if let Some(o) = m.as_object_mut() {
        o.remove("reasoning_content");
        o.remove("reasoning");
        if o.get("content").is_none_or(Value::is_null) {
            o.insert("content".into(), json!(""));
        }
    }
    Ok(m)
}

/// OpenAI-format messages → Claude Messages API, and the reply back.
fn claude(ep: &Endpoint, messages: &[Value], tools: &[Value], temperature: f64) -> Result<Value, String> {
    let mut system = String::new();
    let mut out: Vec<Value> = Vec::new();
    let push = |out: &mut Vec<Value>, role: &str, block: Value| {
        if let Some(last) = out.last_mut().filter(|m| m["role"] == role) {
            if let Some(a) = last["content"].as_array_mut() {
                a.push(block);
                return;
            }
        }
        out.push(json!({"role": role, "content": [block]}));
    };
    for m in messages {
        match m["role"].as_str().unwrap_or("") {
            "system" => system.push_str(m["content"].as_str().unwrap_or("")),
            "user" => match &m["content"] {
                Value::String(s) => push(&mut out, "user", json!({"type": "text", "text": s})),
                Value::Array(parts) => {
                    for p in parts {
                        if p["type"] == "text" {
                            push(&mut out, "user", json!({"type": "text", "text": p["text"]}));
                        } else if p["type"] == "image_url" {
                            let url = p.pointer("/image_url/url").and_then(Value::as_str).unwrap_or("");
                            if let Some((head, data)) = url.split_once(";base64,") {
                                let mime = head.trim_start_matches("data:");
                                push(&mut out, "user", json!({"type": "image", "source": {"type": "base64", "media_type": mime, "data": data}}));
                            }
                        }
                    }
                }
                _ => {}
            },
            "assistant" => {
                if let Some(t) = m["content"].as_str().filter(|t| !t.is_empty()) {
                    push(&mut out, "assistant", json!({"type": "text", "text": t}));
                }
                for c in m["tool_calls"].as_array().into_iter().flatten() {
                    let input: Value = serde_json::from_str(c.pointer("/function/arguments").and_then(Value::as_str).unwrap_or("{}")).unwrap_or(json!({}));
                    push(&mut out, "assistant", json!({"type": "tool_use", "id": c["id"], "name": c.pointer("/function/name"), "input": input}));
                }
            }
            "tool" => push(&mut out, "user", json!({"type": "tool_result", "tool_use_id": m["tool_call_id"], "content": m["content"]})),
            _ => {}
        }
    }
    let tools: Vec<Value> = tools
        .iter()
        .map(|t| json!({"name": t.pointer("/function/name"), "description": t.pointer("/function/description"), "input_schema": t.pointer("/function/parameters")}))
        .collect();
    let body = json!({"model": ep.model, "max_tokens": 4096, "system": system, "messages": out, "tools": tools, "temperature": temperature});
    let r = post(&format!("{}/messages", Provider::Claude.base()), &[("x-api-key", &ep.key), ("anthropic-version", "2023-06-01")], &body, 300)?;
    let mut text = String::new();
    let mut calls = Vec::new();
    for b in r["content"].as_array().into_iter().flatten() {
        match b["type"].as_str() {
            Some("text") => text.push_str(b["text"].as_str().unwrap_or("")),
            Some("tool_use") => calls.push(json!({"id": b["id"], "type": "function",
                "function": {"name": b["name"], "arguments": b["input"].to_string()}})),
            _ => {}
        }
    }
    let mut m = json!({"role": "assistant", "content": text});
    if !calls.is_empty() {
        m["tool_calls"] = Value::Array(calls);
    }
    Ok(m)
}

/// The models a key can use (ids), for the settings list.
pub fn list_models(provider: Provider, key: &str) -> Result<Vec<String>, String> {
    let url = format!("{}/models", provider.base());
    let mut req = agent(30).get(&url);
    req = match provider {
        Provider::Claude => req.header("x-api-key", key).header("anthropic-version", "2023-06-01"),
        _ => req.header("Authorization", &format!("Bearer {key}")),
    };
    let mut resp = req.call().map_err(|e| format!("network: {e}"))?;
    let status = resp.status().as_u16();
    let v: Value = resp.body_mut().read_json().map_err(|e| format!("network: {e}"))?;
    if status >= 400 {
        return Err(v.pointer("/error/message").and_then(Value::as_str).unwrap_or("the key was refused").to_string());
    }
    let mut ids: Vec<String> = v["data"]
        .as_array()
        .into_iter()
        .flatten()
        .filter_map(|m| m["id"].as_str().map(|s| s.trim_start_matches("models/").to_string()))
        .filter(|id| match provider {
            Provider::OpenAi => id.starts_with("gpt") || id.starts_with('o'),
            Provider::Gemini => id.starts_with("gemini"),
            _ => true,
        })
        .collect();
    ids.sort();
    ids.dedup();
    Ok(ids)
}
