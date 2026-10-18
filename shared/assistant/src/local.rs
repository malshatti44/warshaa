//! The free local model: download (once, shared by every Warsha app), then a llama.cpp server on
//! 127.0.0.1 with a random key. One server serves all the open apps; it ends with the app that started it.

use std::io::{Read, Write};
use std::path::{Path, PathBuf};
use std::process::{Child, Command, Stdio};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};

use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

pub struct Asset {
    pub file: &'static str,
    pub url: &'static str,
    pub sha256: &'static str,
    pub size: u64,
}

/// llama.cpp b11700 (MIT): Windows x64 with Vulkan + CPU.
#[cfg(not(target_os = "macos"))]
pub const RUNTIME: Asset = Asset {
    file: "llama-b11700-bin-win-vulkan-x64.zip",
    url: "https://github.com/ggml-org/llama.cpp/releases/download/b11700/llama-b11700-bin-win-vulkan-x64.zip",
    sha256: "d93ccad5992d6640d7081407c24d3ceddf717bc0a1c3c269225c9bef0182f83e",
    size: 32_240_958,
};
/// llama.cpp b11700 (MIT): macOS on Apple silicon, with Metal.
#[cfg(all(target_os = "macos", target_arch = "aarch64"))]
pub const RUNTIME: Asset = Asset {
    file: "llama-b11700-bin-macos-arm64.tar.gz",
    url: "https://github.com/ggml-org/llama.cpp/releases/download/b11700/llama-b11700-bin-macos-arm64.tar.gz",
    sha256: "75d795f8826e09893d44e040742ca5dd604d9402dc40393aed0aea6866aadd73",
    size: 12_231_542,
};
/// llama.cpp b11700 (MIT): macOS on Intel.
#[cfg(all(target_os = "macos", not(target_arch = "aarch64")))]
pub const RUNTIME: Asset = Asset {
    file: "llama-b11700-bin-macos-x64.tar.gz",
    url: "https://github.com/ggml-org/llama.cpp/releases/download/b11700/llama-b11700-bin-macos-x64.tar.gz",
    sha256: "957911e205758c5ffc5e835e631dd428ba7a46c91f8824e3a3e1a2f107aa7c79",
    size: 11_715_425,
};
/// Qwen3.5-4B (Apache-2.0), Q4_K_M.
pub const MODEL: Asset = Asset {
    file: "Qwen3.5-4B-Q4_K_M.gguf",
    url: "https://huggingface.co/unsloth/Qwen3.5-4B-GGUF/resolve/e87f176479d0855a907a41277aca2f8ee7a09523/Qwen3.5-4B-Q4_K_M.gguf",
    sha256: "00fe7986ff5f6b463e62455821146049db6f9313603938a70800d1fb69ef11a4",
    size: 2_740_937_888,
};
/// Its vision projector: lets the model see the image.
pub const VISION: Asset = Asset {
    file: "mmproj-F16.gguf",
    url: "https://huggingface.co/unsloth/Qwen3.5-4B-GGUF/resolve/e87f176479d0855a907a41277aca2f8ee7a09523/mmproj-F16.gguf",
    sha256: "cd88edcf8d031894960bb0c9c5b9b7e1fea6ebee02b9f7ce925a00d12891f864",
    size: 672_423_616,
};

pub fn total_size() -> u64 {
    RUNTIME.size + MODEL.size + VISION.size
}

/// `assistant` in Warsha's data folder: `%LOCALAPPDATA%\Warsha\assistant` on Windows
/// (`Warsha\ai` belongs to the AI link's bridge), `~/Library/Application Support/Warsha/assistant`
/// on macOS.
pub fn dir() -> PathBuf {
    crate::config::data_dir().join("assistant")
}

fn runtime_dir() -> PathBuf {
    dir().join("runtime")
}

fn models_dir() -> PathBuf {
    dir().join("models")
}

const SERVER: &str = if cfg!(windows) { "llama-server.exe" } else { "llama-server" };

fn server_exe() -> PathBuf {
    runtime_dir().join(SERVER)
}

/// Everything downloaded and verified?
pub fn installed() -> bool {
    server_exe().exists() && done_marker(&MODEL).exists() && done_marker(&VISION).exists()
}

fn done_marker(a: &Asset) -> PathBuf {
    models_dir().join(format!("{}.ok", a.file))
}

/// Bytes on disk (for the settings page).
pub fn disk_size() -> u64 {
    fn walk(p: &Path) -> u64 {
        std::fs::read_dir(p)
            .map(|rd| rd.flatten().map(|e| if e.path().is_dir() { walk(&e.path()) } else { e.metadata().map(|m| m.len()).unwrap_or(0) }).sum())
            .unwrap_or(0)
    }
    walk(&dir())
}

/// Remove the model and the runtime (the server must not be running from this app).
pub fn uninstall() -> std::io::Result<()> {
    stop_server();
    let _ = std::fs::remove_dir_all(models_dir());
    let _ = std::fs::remove_dir_all(runtime_dir());
    let _ = std::fs::remove_file(dir().join("server.json"));
    Ok(())
}

#[derive(Clone, Default)]
pub struct Progress {
    pub done: u64,
    pub total: u64,
    /// What is being fetched or checked.
    pub step: String,
}

/// Download what is missing. `progress` is updated as bytes arrive; `cancel` stops (the partial
/// file stays and the next run resumes it).
pub fn install(progress: &Arc<Mutex<Progress>>, cancel: &Arc<AtomicBool>) -> Result<(), String> {
    std::fs::create_dir_all(models_dir()).map_err(|e| e.to_string())?;
    std::fs::create_dir_all(runtime_dir()).map_err(|e| e.to_string())?;
    let total = total_size();
    let mut before = 0u64;
    for a in [&RUNTIME, &VISION, &MODEL] {
        let done_already = if std::ptr::eq(a, &RUNTIME) { server_exe().exists() } else { done_marker(a).exists() };
        if !done_already {
            let target = models_dir().join(a.file);
            fetch(a, &target, |n| {
                if let Ok(mut p) = progress.lock() {
                    *p = Progress { done: before + n, total, step: a.file.to_string() };
                }
            }, cancel)?;
            if let Ok(mut p) = progress.lock() {
                p.step = format!("verify {}", a.file);
            }
            verify(&target, a.sha256)?;
            if std::ptr::eq(a, &RUNTIME) {
                unpack_runtime(&target)?;
                let _ = std::fs::remove_file(&target);
            } else {
                std::fs::write(done_marker(a), a.sha256).map_err(|e| e.to_string())?;
            }
        }
        before += a.size;
    }
    if let Ok(mut p) = progress.lock() {
        *p = Progress { done: total, total, step: "ready".into() };
    }
    Ok(())
}

fn fetch(a: &Asset, target: &Path, mut on: impl FnMut(u64), cancel: &AtomicBool) -> Result<(), String> {
    let part = target.with_extension("part");
    let have = std::fs::metadata(&part).map(|m| m.len()).unwrap_or(0);
    if have == a.size {
        std::fs::rename(&part, target).map_err(|e| e.to_string())?;
        return Ok(());
    }
    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_connect(Some(Duration::from_secs(30)))
        .timeout_recv_body(None)
        .http_status_as_error(false)
        .build()
        .into();
    let mut req = agent.get(a.url).header("User-Agent", "Warsha-Assistant");
    if have > 0 {
        req = req.header("Range", &format!("bytes={have}-"));
    }
    let mut resp = req.call().map_err(|e| format!("download {}: {e}", a.file))?;
    let status = resp.status().as_u16();
    let resume = status == 206;
    if status >= 400 {
        return Err(format!("download {}: HTTP {status}", a.file));
    }
    let mut file = std::fs::OpenOptions::new()
        .create(true)
        .write(true)
        .append(resume)
        .truncate(!resume)
        .open(&part)
        .map_err(|e| e.to_string())?;
    let mut done = if resume { have } else { 0 };
    on(done);
    let mut reader = resp.body_mut().with_config().limit(u64::MAX).reader();
    let mut buf = vec![0u8; 1 << 20];
    let mut last = Instant::now();
    loop {
        if cancel.load(Ordering::Relaxed) {
            return Err("cancelled".into());
        }
        let n = reader.read(&mut buf).map_err(|e| format!("download {}: {e}", a.file))?;
        if n == 0 {
            break;
        }
        file.write_all(&buf[..n]).map_err(|e| e.to_string())?;
        done += n as u64;
        if last.elapsed() > Duration::from_millis(200) {
            on(done);
            last = Instant::now();
        }
    }
    file.flush().map_err(|e| e.to_string())?;
    drop(file);
    if done != a.size {
        return Err(format!("download {}: got {done} of {} bytes, try again to resume", a.file, a.size));
    }
    on(done);
    std::fs::rename(&part, target).map_err(|e| e.to_string())
}

fn verify(path: &Path, sha: &str) -> Result<(), String> {
    let mut f = std::fs::File::open(path).map_err(|e| e.to_string())?;
    let mut h = Sha256::new();
    let mut buf = vec![0u8; 1 << 20];
    loop {
        let n = f.read(&mut buf).map_err(|e| e.to_string())?;
        if n == 0 {
            break;
        }
        h.update(&buf[..n]);
    }
    let got: String = h.finalize().iter().map(|b| format!("{b:02x}")).collect();
    if got != sha {
        let _ = std::fs::remove_file(path);
        return Err(format!("{} is damaged (checksum), download it again", path.display()));
    }
    Ok(())
}

/// The system's tar (bsdtar on Windows and macOS) reads the zip and the tar.gz; keep the server and
/// its libraries, at the top of the runtime folder (the macOS archives hold them in a subfolder).
fn unpack_runtime(archive: &Path) -> Result<(), String> {
    let dir = runtime_dir();
    let mut cmd = Command::new("tar");
    cmd.arg("-xf").arg(archive).arg("-C").arg(&dir);
    no_window(&mut cmd);
    let st = cmd.status().map_err(|e| format!("unpack: {e}"))?;
    if !st.success() {
        return Err("unpack failed".into());
    }
    if !server_exe().exists() {
        if let Some(found) = find_file(&dir, SERVER, 4) {
            let from = found.parent().map(Path::to_path_buf).unwrap_or_else(|| dir.clone());
            for e in std::fs::read_dir(&from).map_err(|e| e.to_string())?.flatten() {
                let _ = std::fs::rename(e.path(), dir.join(e.file_name()));
            }
        }
    }
    for e in std::fs::read_dir(&dir).map_err(|e| e.to_string())?.flatten() {
        let name = e.file_name().to_string_lossy().to_lowercase();
        let program = name.ends_with(".exe") || (!cfg!(windows) && name.starts_with("llama-") && !name.contains('.'));
        if program && name != SERVER {
            let _ = std::fs::remove_file(e.path());
        }
    }
    if !server_exe().exists() { Err(format!("{SERVER} missing from the runtime")) } else { Ok(()) }
}

/// The first file called `name` under `dir`, at most `depth` folders down.
fn find_file(dir: &Path, name: &str, depth: u32) -> Option<PathBuf> {
    let entries: Vec<_> = std::fs::read_dir(dir).ok()?.flatten().collect();
    if let Some(e) = entries.iter().find(|e| e.file_name() == name && e.path().is_file()) {
        return Some(e.path());
    }
    if depth == 0 {
        return None;
    }
    entries.iter().filter(|e| e.path().is_dir()).find_map(|e| find_file(&e.path(), name, depth - 1))
}

fn no_window(cmd: &mut Command) {
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        cmd.creation_flags(0x0800_0000); // CREATE_NO_WINDOW
    }
    #[cfg(not(windows))]
    let _ = cmd;
}

// ---- the server ------------------------------------------------------------------------------

#[derive(Serialize, Deserialize, Clone)]
struct ServerInfo {
    port: u16,
    pid: u32,
    key: String,
}

/// The server this process started (killed with the process through a job object).
static OWN: Mutex<Option<Child>> = Mutex::new(None);

fn info_file() -> PathBuf {
    dir().join("server.json")
}

fn healthy(port: u16, key: &str) -> bool {
    let agent: ureq::Agent = ureq::Agent::config_builder().timeout_global(Some(Duration::from_secs(3))).http_status_as_error(false).build().into();
    agent
        .get(&format!("http://127.0.0.1:{port}/health"))
        .header("Authorization", &format!("Bearer {key}"))
        .call()
        .map(|r| r.status().as_u16() == 200)
        .unwrap_or(false)
}

/// `(base url, key)` of a running server: the shared one, or a new one (loading takes a few seconds).
pub fn ensure_server(on_status: &dyn Fn(&str)) -> Result<(String, String), String> {
    if let Some(i) = std::fs::read_to_string(info_file()).ok().and_then(|s| serde_json::from_str::<ServerInfo>(&s).ok()) {
        if healthy(i.port, &i.key) {
            return Ok((format!("http://127.0.0.1:{}/v1", i.port), i.key));
        }
    }
    if !installed() {
        return Err("the free model is not downloaded".into());
    }
    on_status("starting");
    let port = std::net::TcpListener::bind("127.0.0.1:0").and_then(|l| l.local_addr()).map(|a| a.port()).map_err(|e| e.to_string())?;
    let key = random_hex(24);
    let log = std::fs::File::create(dir().join("server.log")).map_err(|e| e.to_string())?;
    let mut cmd = server_command();
    cmd.current_dir(runtime_dir())
        .arg("-m")
        .arg(models_dir().join(MODEL.file))
        .arg("--mmproj")
        .arg(models_dir().join(VISION.file))
        .args(["--jinja", "--host", "127.0.0.1", "--port", &port.to_string(), "--api-key", &key, "-c", "32768", "-np", "2", "--no-webui"])
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(log);
    no_window(&mut cmd);
    let child = cmd.spawn().map_err(|e| format!("cannot start the model: {e}"))?;
    kill_with_this_process(&child);
    let pid = child.id();
    if let Ok(mut own) = OWN.lock() {
        *own = Some(child);
    }
    let start = Instant::now();
    loop {
        if healthy(port, &key) {
            break;
        }
        let exited = OWN.lock().ok().and_then(|mut o| o.as_mut().and_then(|c| c.try_wait().ok().flatten())).is_some();
        if exited || start.elapsed() > Duration::from_secs(240) {
            let tail = std::fs::read_to_string(dir().join("server.log")).unwrap_or_default();
            let tail: String = tail.lines().rev().take(4).collect::<Vec<_>>().join(" | ");
            return Err(format!("the model did not start: {tail}"));
        }
        on_status("loading");
        std::thread::sleep(Duration::from_millis(500));
    }
    let info = ServerInfo { port, pid, key: key.clone() };
    let _ = std::fs::write(info_file(), serde_json::to_string(&info).unwrap_or_default());
    Ok((format!("http://127.0.0.1:{port}/v1"), key))
}

pub fn stop_server() {
    if let Ok(mut own) = OWN.lock() {
        if let Some(mut c) = own.take() {
            terminate(&mut c);
            let _ = c.wait();
            let _ = std::fs::remove_file(info_file());
        }
    }
}

/// The command that runs the server. On Windows the server itself (a job object ends it with
/// this process); elsewhere a shell that starts it and ends it when this process is gone or the
/// shell is asked to stop (SIGTERM).
#[cfg(windows)]
fn server_command() -> Command {
    Command::new(server_exe())
}

#[cfg(not(windows))]
fn server_command() -> Command {
    let watch = format!(
        r#""$0" "$@" & s=$!; trap 'kill $s 2>/dev/null; exit 0' TERM INT HUP; while kill -0 {} 2>/dev/null && kill -0 $s 2>/dev/null; do sleep 2; done; kill $s 2>/dev/null; wait $s"#,
        std::process::id()
    );
    let mut cmd = Command::new("/bin/sh");
    cmd.arg("-c").arg(watch).arg(server_exe());
    cmd
}

#[cfg(windows)]
fn terminate(c: &mut Child) {
    let _ = c.kill();
}

/// SIGTERM, so the watching shell stops the server before it goes.
#[cfg(not(windows))]
fn terminate(c: &mut Child) {
    let stopped = Command::new("kill").arg("-TERM").arg(c.id().to_string()).status().is_ok_and(|s| s.success());
    if !stopped {
        let _ = c.kill();
    }
}

#[cfg(windows)]
fn kill_with_this_process(child: &Child) {
    use std::os::windows::io::AsRawHandle;
    use windows_sys::Win32::System::JobObjects::{
        AssignProcessToJobObject, CreateJobObjectW, JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE, JOBOBJECT_EXTENDED_LIMIT_INFORMATION,
        JobObjectExtendedLimitInformation, SetInformationJobObject,
    };
    // SAFETY: plain Win32 calls on a job handle we own (kept open for the life of the process, so
    // closing it — at exit — ends the server) and on the child's live process handle.
    unsafe {
        let job = CreateJobObjectW(std::ptr::null(), std::ptr::null());
        if job.is_null() {
            return;
        }
        let mut info: JOBOBJECT_EXTENDED_LIMIT_INFORMATION = std::mem::zeroed();
        info.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
        SetInformationJobObject(
            job,
            JobObjectExtendedLimitInformation,
            (&raw const info).cast(),
            std::mem::size_of::<JOBOBJECT_EXTENDED_LIMIT_INFORMATION>() as u32,
        );
        AssignProcessToJobObject(job, child.as_raw_handle());
    }
}

#[cfg(not(windows))]
fn kill_with_this_process(_child: &Child) {}

pub fn random_hex(bytes: usize) -> String {
    let mut buf = vec![0u8; bytes];
    #[cfg(windows)]
    // SAFETY: fills our buffer with the system's preferred random generator.
    unsafe {
        use windows_sys::Win32::Security::Cryptography::{BCRYPT_USE_SYSTEM_PREFERRED_RNG, BCryptGenRandom};
        BCryptGenRandom(std::ptr::null_mut(), buf.as_mut_ptr(), buf.len() as u32, BCRYPT_USE_SYSTEM_PREFERRED_RNG);
    }
    #[cfg(not(windows))]
    {
        // The kernel's generator; the hasher's random keys only if it can't be read.
        let read = std::fs::File::open("/dev/urandom").and_then(|mut f| f.read_exact(&mut buf));
        if read.is_err() {
            use std::hash::{BuildHasher, Hasher};
            for (i, b) in buf.iter_mut().enumerate() {
                let mut h = std::collections::hash_map::RandomState::new().build_hasher();
                h.write_usize(i);
                *b = h.finish() as u8;
            }
        }
    }
    buf.iter().map(|b| format!("{b:02x}")).collect()
}
