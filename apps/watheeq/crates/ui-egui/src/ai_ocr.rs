//! Scan & OCR ▸ Arabic text with the Warsha assistant's model (وارشة): the pages are rendered as
//! pictures (300 dpi reads best), read on a worker thread by `warsha_assistant::vision`, and
//! written next to the PDF as a Word document with right-to-left paragraphs and as a text file.
//! The bundled recognition engine reads only the Latin alphabet; this reads Arabic.

use std::path::PathBuf;
use std::sync::{Arc, Mutex};

use crate::WatheeqApp;

/// The Recognize Text dialog's language code for this engine.
pub const LANGUAGE: &str = "ar-ai";

/// Pages are read at most at this resolution (a scan at its own, if lower).
const DPI: f32 = 300.0;

#[derive(Default)]
pub struct Progress {
    /// Page being read (from 0) and how many.
    pub page: usize,
    pub pages: usize,
    /// Strip of lines being read on that page, and how many.
    pub strip: usize,
    pub strips: usize,
    pub cancel: bool,
    /// The Word document written, once done.
    pub result: Option<Result<PathBuf, String>>,
}

pub struct Run {
    pub progress: Arc<Mutex<Progress>>,
}

/// Is a model there to read with (downloaded, or a provider with a key)?
/// Open the Word document: in Satr when Warsha installed it beside Watheeq (`…\Warsha\Satr\satr.exe`
/// next to `…\Warsha\Watheeq\watheeq.exe`), else with the system's program for `.docx`.
fn open_document(path: &std::path::Path) -> std::io::Result<()> {
    let satr = std::env::current_exe()
        .ok()
        .and_then(|exe| exe.parent()?.parent().map(|warsha| warsha.join("Satr").join(if cfg!(windows) { "satr.exe" } else { "satr" })))
        .filter(|p| p.is_file());
    if let Some(satr) = satr {
        return std::process::Command::new(satr).arg(path).spawn().map(drop);
    }
    let (program, args): (&str, Vec<&std::ffi::OsStr>) = if cfg!(windows) {
        ("explorer.exe", vec![path.as_os_str()])
    } else if cfg!(target_os = "macos") {
        ("open", vec![path.as_os_str()])
    } else {
        ("xdg-open", vec![path.as_os_str()])
    };
    std::process::Command::new(program).args(args).spawn().map(drop)
}

pub fn ready() -> bool {
    warsha_assistant::vision::ready()
}

/// Paragraphs as a flowing Word document: one A4 page per source page, plain 12 pt paragraphs.
fn word(pages: &[Vec<String>], title: &str) -> Vec<u8> {
    let (w, h) = (595.0, 842.0);
    let out: Vec<watheeq_export::Page> = pages
        .iter()
        .map(|paras| {
            // Stacked boxes down the page, so the exporter reads them in order as flowing text.
            let step = (h - 144.0) / paras.len().max(1) as f64;
            let blocks = paras
                .iter()
                .enumerate()
                .map(|(i, text)| {
                    let top = h - 72.0 - step * i as f64;
                    watheeq_export::Block {
                        text: text.clone(),
                        rect: [72.0, top - step * 0.8, w - 72.0, top],
                        size: 12.0,
                        bold: false,
                        italic: false,
                        color: [0.0, 0.0, 0.0],
                        rotation: 0.0,
                    }
                })
                .collect();
            watheeq_export::Page { width: w, height: h, blocks, images: Vec::new() }
        })
        .collect();
    watheeq_export::docx(&out, title)
}

impl WatheeqApp {
    /// Read the pages chosen in the Recognize Text dialog with the assistant's model, in the background.
    pub fn start_ai_ocr(&mut self) {
        let Some((vi, id)) = self.active_ids() else { return };
        if self.ai_ocr.is_some() {
            self.notify_tr("Text recognition is already running");
            return;
        }
        if !ready() {
            self.notify_tr("Download the assistant's model first (the Assistant button, then Download)");
            return;
        }
        let Some(doc) = self.session.get(id) else { return };
        // Next to the PDF; a document without a file goes to the Documents folder.
        let source = doc.path.clone().map(PathBuf::from);
        let stem = source.as_ref().and_then(|p| p.file_stem()).map(|s| s.to_string_lossy().into_owned()).unwrap_or_else(|| doc.name.trim_end_matches(".pdf").to_string());
        let dir = source
            .as_ref()
            .and_then(|p| p.parent().map(PathBuf::from))
            .or_else(|| std::env::var_os("USERPROFILE").or_else(|| std::env::var_os("HOME")).map(|h| PathBuf::from(h).join("Documents")))
            .unwrap_or_default();
        let d = &self.ocr_draft;
        let pages: Vec<usize> = match d.pages {
            crate::ocr_ui::OcrPages::All => Vec::new(),
            crate::ocr_ui::OcrPages::Current => vec![self.views[vi].current],
            crate::ocr_ui::OcrPages::Range => (d.from.saturating_sub(1)..d.to).collect(),
        };
        let mut settings = d.settings();
        settings.dpi = DPI;
        let Some(job) = self.session.ocr_job(id, &pages, settings) else { return };
        let progress = Arc::new(Mutex::new(Progress { pages: job.pages.len(), ..Default::default() }));
        let p = progress.clone();
        let work = move || {
            let cancelled = |p: &Arc<Mutex<Progress>>| p.lock().map_or(true, |s| s.cancel);
            let shots = job.render_pages(|done, total| {
                if let Ok(mut s) = p.lock() {
                    s.page = done;
                    s.pages = total;
                }
                !cancelled(&p)
            });
            let mut paragraphs: Vec<Vec<String>> = Vec::new();
            let mut failure = None;
            for (k, (_, w, h, rgba)) in shots.iter().enumerate() {
                if let Ok(mut s) = p.lock() {
                    s.page = k;
                    s.pages = shots.len();
                }
                let read = warsha_assistant::vision::read_rgba(*w, *h, rgba, &mut |strip, strips| {
                    if let Ok(mut s) = p.lock() {
                        s.strip = strip;
                        s.strips = strips;
                    }
                    !cancelled(&p)
                });
                match read {
                    Ok(paras) => paragraphs.push(paras),
                    Err(e) => {
                        failure = Some(e);
                        break;
                    }
                }
            }
            let result = match failure {
                Some(e) => Err(e),
                None if shots.is_empty() => Err("no page to read (pages that already have text are skipped)".into()),
                None => {
                    let docx = dir.join(format!("{stem}-نص.docx"));
                    let txt = dir.join(format!("{stem}-نص.txt"));
                    let text = paragraphs.iter().map(|p| p.join("\n\n")).collect::<Vec<_>>().join("\n\n\u{c}\n\n");
                    std::fs::write(&docx, word(&paragraphs, &stem))
                        .and_then(|()| std::fs::write(&txt, format!("\u{feff}{text}\n")))
                        .map(|()| docx)
                        .map_err(|e| e.to_string())
                }
            };
            if let Ok(mut s) = p.lock() {
                s.result = Some(result);
            }
        };
        std::thread::Builder::new().name("watheeq-ai-ocr".into()).spawn(work).ok();
        self.ai_ocr = Some(Run { progress });
        self.poll_ai_ocr();
    }

    pub fn cancel_ai_ocr(&mut self) {
        if let Some(r) = &self.ai_ocr
            && let Ok(mut s) = r.progress.lock()
        {
            s.cancel = true;
        }
    }

    /// Show progress; when done, say where the text went and open the Word document.
    pub(crate) fn poll_ai_ocr(&mut self) {
        let Some(run) = self.ai_ocr.as_ref() else { return };
        let progress = run.progress.clone();
        let Ok(mut s) = progress.lock() else { return };
        let Some(result) = s.result.take() else {
            // The progress card, like Optimize's: page and strip as a bar, and Cancel.
            let pages = s.pages.max(1);
            let label = if s.cancel {
                tl!("Cancelling…").to_string()
            } else {
                crate::i18n::fmt(tl!("Reading the Arabic text… page {d} of {t}"), &[("d", &(s.page + 1).min(pages).to_string()), ("t", &pages.to_string())])
            };
            let within = if s.strips > 0 { s.strip as f32 / s.strips as f32 } else { 0.0 };
            let fraction = ((s.page as f32 + within) / pages as f32).clamp(0.0, 1.0);
            let cancellable = !s.cancel;
            drop(s);
            self.progress_notice = Some(crate::widgets::ProgressNotice { label, fraction, cancellable });
            if let Some(ctx) = &self.ctx {
                ctx.request_repaint_after(std::time::Duration::from_millis(300));
            }
            return;
        };
        drop(s);
        self.ai_ocr = None;
        self.progress_notice = None;
        match result {
            Ok(path) => {
                self.notify(crate::i18n::fmt(tl!("The text is saved in {file} (check it: the model can misread a word)"), &[("file", &path.display().to_string())]));
                if let Err(e) = open_document(&path) {
                    log::warn!("open {}: {e}", path.display());
                }
            }
            Err(e) if e == "stopped" => self.notify_tr("Text recognition stopped"),
            Err(e) => self.notify(e),
        }
    }
}
