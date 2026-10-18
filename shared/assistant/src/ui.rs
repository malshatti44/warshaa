//! The chat panel.

use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::{Receiver, channel};
use std::sync::{Arc, Mutex};

use egui::{Align, Frame, Layout, Margin, RichText, ScrollArea, Stroke, TextEdit};

use crate::agent::{Bridge, Engine, Event};
use crate::config::Settings;
use crate::llm::{Endpoint, Provider};
use crate::local::{self, Progress};
use crate::{AppSpec, Translate};

enum Entry {
    User(String),
    Step { label: String, ok: bool, detail: String },
    Answer(String),
    Error(String),
}

#[derive(PartialEq)]
enum View {
    Chat,
    Settings,
}

struct Download {
    progress: Arc<Mutex<Progress>>,
    cancel: Arc<AtomicBool>,
    result: Receiver<Result<(), String>>,
}

pub struct Assistant {
    /// Is the panel shown?
    pub open: bool,
    app: AppSpec,
    translate: Translate,
    settings: Settings,
    engine: Option<Engine>,
    entries: Vec<Entry>,
    input: String,
    /// A request typed before the app's channel was ready, with the app's state line then; sent
    /// once the engine has connected.
    pending: Option<(String, String)>,
    busy: bool,
    status: String,
    view: View,
    download: Option<Download>,
    download_error: Option<String>,
    key_input: String,
    models: Option<Result<Vec<String>, String>>,
    models_rx: Option<Receiver<Result<Vec<String>, String>>>,
    arabic: bool,
    /// The panel goes on the right (left in a right-to-left interface).
    rtl: bool,
    focus_input: bool,
    /// A question waiting for the user's yes or no.
    question: Option<String>,
    /// Files the assistant wrote, oldest first, until the app takes them ([`Self::take_saved`]).
    saved: Vec<String>,
}

impl Assistant {
    pub fn new(app: AppSpec, translate: Translate) -> Self {
        Self {
            open: false,
            app,
            translate,
            settings: Settings::load(),
            engine: None,
            entries: Vec::new(),
            input: String::new(),
            pending: None,
            busy: false,
            status: String::new(),
            view: View::Chat,
            download: None,
            download_error: None,
            key_input: String::new(),
            models: None,
            models_rx: None,
            arabic: true,
            rtl: true,
            focus_input: false,
            question: None,
            saved: Vec::new(),
        }
    }

    pub fn toggle(&mut self) {
        self.open = !self.open;
        self.focus_input = self.open;
    }

    /// The interface language and direction (call when they change, or every frame).
    pub fn set_language(&mut self, arabic: bool, rtl: bool) {
        self.arabic = arabic;
        self.rtl = rtl;
    }

    fn t<'a>(&self, ar: &'a str, en: &'a str) -> &'a str {
        if self.arabic { ar } else { en }
    }

    /// The next file the assistant wrote, for an app that opens results in its window (the
    /// assistant worked on files, not on the window).
    pub fn take_saved(&mut self) -> Option<String> {
        (!self.saved.is_empty()).then(|| self.saved.remove(0))
    }

    /// Start talking to the app through `bridge` (after `show` returned true).
    pub fn connect(&mut self, bridge: Bridge, ctx: &egui::Context) {
        self.engine = Some(Engine::start(self.app, bridge, self.arabic, self.translate.clone(), ctx.clone()));
        if let Some((text, state)) = self.pending.take() {
            self.send(text, state);
        }
    }

    /// Is the engine connected to the app?
    pub fn connected(&self) -> bool {
        self.engine.is_some()
    }

    fn endpoint(&self) -> Endpoint {
        let p = self.settings.provider;
        Endpoint { provider: p, local_base: String::new(), key: self.settings.key(p), model: self.settings.model(p), think: self.settings.think }
    }

    fn send(&mut self, text: String, state: String) {
        let ep = self.endpoint();
        if let Some(e) = &self.engine {
            self.entries.push(Entry::User(text.clone()));
            self.busy = true;
            self.status = self.t("يفكّر…", "Thinking…").into();
            e.ask(text, state, ep);
        }
    }

    fn ready(&self) -> bool {
        match self.settings.provider {
            Provider::Local => local::installed(),
            p => self.settings.has_key(p),
        }
    }

    fn poll(&mut self) {
        let Some(e) = &self.engine else { return };
        while let Ok(ev) = e.events.try_recv() {
            match ev {
                Event::Status(s) => self.status = s,
                Event::Confirm(q) => self.question = Some(q),
                Event::Step { label, ok, detail } => self.entries.push(Entry::Step { label, ok, detail }),
                Event::Answer(a) => {
                    if !a.is_empty() {
                        self.entries.push(Entry::Answer(a));
                    }
                }
                Event::Error(err) => self.entries.push(Entry::Error(err)),
                Event::Saved(file) => {
                    if self.saved.len() >= 16 {
                        self.saved.remove(0);
                    }
                    self.saved.push(file);
                }
                Event::Idle => {
                    self.busy = false;
                    self.status.clear();
                    self.question = None;
                }
            }
        }
        if let Some(d) = &self.download {
            if let Ok(r) = d.result.try_recv() {
                self.download = None;
                self.download_error = r.err().filter(|e| e != "cancelled");
            }
        }
        if let Some(rx) = &self.models_rx {
            if let Ok(r) = rx.try_recv() {
                if let Ok(list) = &r {
                    let p = self.settings.provider;
                    let current = self.settings.model(p);
                    if !list.contains(&current) {
                        if let Some(first) = pick_default(p, list) {
                            self.settings.set_model(p, &first);
                            self.settings.save();
                        }
                    }
                }
                self.models = Some(r);
                self.models_rx = None;
            }
        }
    }

    /// Draw the panel when it is open. `state` is one line about the app now (the open document).
    /// Returns true when the assistant needs the app's control channel: call [`Self::connect`].
    pub fn show(&mut self, ui: &mut egui::Ui, state: &str) -> bool {
        self.poll();
        if !self.open {
            return false;
        }
        let panel = if self.rtl { egui::Panel::left("warsha-assistant") } else { egui::Panel::right("warsha-assistant") };
        let fill = ui.visuals().panel_fill;
        let mut need = false;
        let r = panel
            .resizable(true)
            .default_size(self.settings.width)
            .size_range(300.0..=720.0)
            .frame(Frame::NONE.fill(fill).inner_margin(Margin::symmetric(10, 8)))
            .show(ui, |ui| {
                self.header(ui);
                ui.separator();
                match self.view {
                    View::Settings => self.settings_view(ui),
                    View::Chat => need = self.chat_view(ui, state),
                }
            });
        let w = r.response.rect.width();
        if (w - self.settings.width).abs() > 4.0 && !ui.ctx().input(|i| i.pointer.any_down()) {
            self.settings.width = w;
            self.settings.save();
        }
        if self.busy || self.download.is_some() || self.models_rx.is_some() {
            ui.ctx().request_repaint_after(std::time::Duration::from_millis(150));
        }
        need
    }

    fn header(&mut self, ui: &mut egui::Ui) {
        // The model's name goes under the title: beside it, the buttons overlap it in a narrow panel.
        ui.horizontal(|ui| {
            ui.label(RichText::new(self.t("مساعد ورشة", "Warsha Assistant")).strong().size(15.0));
            ui.with_layout(Layout::right_to_left(Align::Center), |ui| {
                if ui.button("×").on_hover_text(self.t("إغلاق", "Close")).clicked() {
                    self.open = false;
                }
                let (label, tip) = if self.view == View::Chat { (self.t("الإعدادات", "Settings"), "") } else { (self.t("المحادثة", "Chat"), "") };
                let _ = tip;
                if ui.button(label).clicked() {
                    self.view = if self.view == View::Chat { View::Settings } else { View::Chat };
                }
                if self.view == View::Chat && !self.entries.is_empty() && ui.add_enabled(!self.busy, egui::Button::new(self.t("محادثة جديدة", "New chat"))).clicked() {
                    self.entries.clear();
                    if let Some(e) = &self.engine {
                        e.reset();
                    }
                }
            });
        });
        ui.label(RichText::new(short_name(self.settings.provider, self.arabic)).small().weak());
    }

    fn chat_view(&mut self, ui: &mut egui::Ui, state: &str) -> bool {
        if !self.ready() {
            self.setup_card(ui);
            return false;
        }
        let mut need = false;
        let input_h = 86.0;
        let list_h = (ui.available_height() - input_h).max(80.0);
        ScrollArea::vertical().auto_shrink([false, false]).stick_to_bottom(true).max_height(list_h).show(ui, |ui| {
            ui.set_width(ui.available_width());
            if self.entries.is_empty() {
                self.welcome(ui);
            }
            for e in &self.entries {
                entry_ui(ui, e, self.arabic);
            }
            if let Some(q) = self.question.clone() {
                ui.add_space(6.0);
                Frame::NONE
                    .stroke(Stroke::new(1.0, ui.visuals().warn_fg_color))
                    .corner_radius(8.0)
                    .inner_margin(Margin::symmetric(10, 8))
                    .show(ui, |ui| {
                        ui.set_width(ui.available_width());
                        ui.label(q);
                        ui.horizontal(|ui| {
                            let keep = self.t("لا، احفظ نسخة جديدة", "No, save a new copy");
                            let replace = self.t("نعم، استبدل الأصل", "Yes, replace the original");
                            if ui.button(keep).clicked() {
                                self.question = None;
                                if let Some(e) = &self.engine {
                                    e.answer(false);
                                }
                            }
                            if ui.button(replace).clicked() {
                                self.question = None;
                                if let Some(e) = &self.engine {
                                    e.answer(true);
                                }
                            }
                        });
                    });
            } else if self.busy {
                ui.horizontal(|ui| {
                    ui.spinner();
                    ui.label(RichText::new(&self.status).weak());
                });
            }
        });
        ui.separator();
        let example = examples(self.app.id, self.arabic)[1];
        let hint = if self.arabic { format!("اطلب أي شيء… مثل: {example}") } else { format!("Ask anything… e.g. {example}") };
        let edit = TextEdit::multiline(&mut self.input)
            .hint_text(hint)
            .desired_rows(2)
            .desired_width(f32::INFINITY)
            .return_key(Some(egui::KeyboardShortcut::new(egui::Modifiers::SHIFT, egui::Key::Enter)));
        let resp = ui.add(edit);
        if self.focus_input {
            resp.request_focus();
            self.focus_input = false;
        }
        let enter = resp.has_focus() && ui.input(|i| i.key_pressed(egui::Key::Enter) && !i.modifiers.shift);
        ui.horizontal(|ui| {
            if self.busy {
                if ui.button(self.t("إيقاف", "Stop")).clicked() {
                    if let Some(e) = &self.engine {
                        e.stop();
                    }
                }
            } else {
                let send = ui.add_enabled(!self.input.trim().is_empty(), egui::Button::new(self.t("إرسال", "Send"))).clicked() || enter;
                if send && !self.input.trim().is_empty() {
                    let text = std::mem::take(&mut self.input).trim().to_string();
                    if self.engine.is_some() {
                        self.send(text, state.to_string());
                    } else {
                        self.pending = Some((text, state.to_string()));
                        self.busy = true;
                        self.status = self.t("الاتصال بالتطبيق…", "Connecting to the app…").into();
                        need = true;
                    }
                    resp.request_focus();
                }
            }
            ui.with_layout(Layout::right_to_left(Align::Center), |ui| {
                ui.label(RichText::new(self.t("Enter للإرسال · Shift+Enter لسطر جديد", "Enter to send · Shift+Enter new line")).small().weak());
            });
        });
        need
    }

    fn welcome(&mut self, ui: &mut egui::Ui) {
        ui.add_space(6.0);
        ui.label(RichText::new(self.t(
            &format!("أهلاً! أنا مساعدك داخل {}. اطلب مني ما تريد وأنا أنفّذه في التطبيق مباشرة.", self.app.name_ar),
            &format!("Hi! I'm your assistant in {}. Ask for anything and I'll do it in the app.", self.app.name_en),
        )));
        ui.add_space(6.0);
        ui.label(RichText::new(self.t("أمثلة (اضغط مثالاً لتجربته):", "Examples (click one to try it):")).small().weak());
        for ex in examples(self.app.id, self.arabic) {
            let r = ui.add(egui::Label::new(RichText::new(format!("• {ex}")).weak()).sense(egui::Sense::click()));
            if r.on_hover_cursor(egui::CursorIcon::PointingHand).clicked() {
                self.input = ex.to_string();
            }
        }
    }

    /// First run: download the free model, or go to the settings for a key.
    fn setup_card(&mut self, ui: &mut egui::Ui) {
        ui.add_space(8.0);
        if self.settings.provider != Provider::Local {
            ui.label(self.t("أضف مفتاح الخدمة من الإعدادات لتبدأ.", "Add the service's key in the settings to start."));
            if ui.button(self.t("فتح الإعدادات", "Open settings")).clicked() {
                self.view = View::Settings;
            }
            return;
        }
        ui.label(RichText::new(self.t("نموذج ورشة المجاني", "The free Warsha model")).strong());
        ui.label(self.t(
            "يعمل المساعد بنموذج ذكاء اصطناعي مفتوح المصدر على جهازك: مجاني، بلا حساب، ويعمل دون إنترنت بعد تنزيله مرة واحدة لكل تطبيقات ورشة.",
            "The assistant runs an open-source AI model on your computer: free, no account, and offline after a one-time download shared by all Warsha apps.",
        ));
        ui.add_space(6.0);
        let size = gb(local::total_size(), self.arabic);
        if let Some(d) = &self.download {
            let p = d.progress.lock().map(|p| p.clone()).unwrap_or_default();
            let frac = if p.total > 0 { p.done as f32 / p.total as f32 } else { 0.0 };
            ui.add(egui::ProgressBar::new(frac).show_percentage());
            ui.label(RichText::new(format!("{} / {}", gb(p.done, self.arabic), gb(p.total.max(1), self.arabic))).small().weak());
            if ui.button(self.t("إيقاف مؤقت", "Pause")).clicked() {
                d.cancel.store(true, Ordering::Relaxed);
            }
        } else {
            if ui.button(RichText::new(format!("{} ({size})", self.t("تنزيل النموذج", "Download the model"))).strong()).clicked() {
                self.start_download(ui.ctx());
            }
            if let Some(e) = &self.download_error {
                ui.colored_label(ui.visuals().error_fg_color, format!("{}: {e}", self.t("تعذّر التنزيل", "Download failed")));
            }
        }
        ui.add_space(10.0);
        ui.label(RichText::new(self.t("أو استخدم Claude أو ChatGPT أو Gemini بمفتاحك:", "Or use Claude, ChatGPT or Gemini with your key:")).small().weak());
        if ui.link(self.t("الإعدادات", "Settings")).clicked() {
            self.view = View::Settings;
        }
    }

    fn start_download(&mut self, ctx: &egui::Context) {
        let progress = Arc::new(Mutex::new(Progress::default()));
        let cancel = Arc::new(AtomicBool::new(false));
        let (tx, result) = channel();
        let (p, c, ctx) = (Arc::clone(&progress), Arc::clone(&cancel), ctx.clone());
        std::thread::spawn(move || {
            let r = local::install(&p, &c);
            let _ = tx.send(r);
            ctx.request_repaint();
        });
        self.download_error = None;
        self.download = Some(Download { progress, cancel, result });
    }

    fn settings_view(&mut self, ui: &mut egui::Ui) {
        ScrollArea::vertical().auto_shrink([false, false]).show(ui, |ui| {
            ui.label(RichText::new(self.t("النموذج", "Model")).strong());
            let before = self.settings.provider;
            for p in Provider::ALL {
                ui.radio_value(&mut self.settings.provider, p, p.name(self.arabic));
            }
            if self.settings.provider != before {
                self.settings.save();
                self.key_input.clear();
                self.models = None;
            }
            ui.add_space(8.0);
            let p = self.settings.provider;
            if p == Provider::Local {
                if local::installed() {
                    ui.label(format!("{} {}", self.t("منزَّل على جهازك:", "Downloaded:"), gb(local::disk_size(), self.arabic)));
                    ui.label(RichText::new(self.t("لا يخرج شيء من جهازك: الطلبات والصور تبقى محلية.", "Nothing leaves your computer: requests and images stay local.")).small().weak());
                    if ui.button(self.t("حذف النموذج من الجهاز", "Delete the model")).clicked() {
                        let _ = local::uninstall();
                    }
                } else {
                    ui.label(self.t("غير منزَّل بعد: يُنزَّل من صفحة المحادثة.", "Not downloaded yet: download it from the chat page."));
                }
            } else {
                ui.horizontal(|ui| {
                    ui.label(self.t("المفتاح (API key):", "API key:"));
                    if self.settings.has_key(p) {
                        ui.label(RichText::new(self.t("محفوظ ✓", "saved ✓")).weak());
                    }
                });
                let hint = if self.settings.has_key(p) {
                    self.t("اكتب مفتاحاً جديداً لاستبداله", "Type a new key to replace it")
                } else {
                    self.t("الصق المفتاح هنا", "Paste the key here")
                };
                ui.add(TextEdit::singleline(&mut self.key_input).password(true).desired_width(f32::INFINITY).hint_text(hint));
                ui.horizontal(|ui| {
                    if ui.add_enabled(!self.key_input.trim().is_empty(), egui::Button::new(self.t("حفظ المفتاح", "Save key"))).clicked() {
                        self.settings.set_key(p, &self.key_input);
                        self.settings.save();
                        self.key_input.clear();
                        self.fetch_models(ui.ctx());
                    }
                    if self.settings.has_key(p) && ui.button(self.t("حذف", "Remove")).clicked() {
                        self.settings.set_key(p, "");
                        self.settings.save();
                        self.models = None;
                    }
                    ui.hyperlink_to(self.t("احصل على مفتاح", "Get a key"), p.key_page());
                });
                ui.add_space(6.0);
                ui.horizontal(|ui| {
                    ui.label(self.t("الطراز:", "Model:"));
                    let mut model = self.settings.model(p);
                    let list = self.models.as_ref().and_then(|m| m.as_ref().ok()).cloned().unwrap_or_default();
                    if list.is_empty() {
                        if ui.add(TextEdit::singleline(&mut model).desired_width(200.0)).changed() {
                            self.settings.set_model(p, &model);
                            self.settings.save();
                        }
                        if self.settings.has_key(p) && self.models_rx.is_none() && ui.button(self.t("تحديث القائمة", "Load list")).clicked() {
                            self.fetch_models(ui.ctx());
                        }
                    } else {
                        egui::ComboBox::from_id_salt("warsha-assistant-model").selected_text(&model).show_ui(ui, |ui| {
                            for m in &list {
                                if ui.selectable_label(*m == model, m).clicked() {
                                    self.settings.set_model(p, m);
                                    self.settings.save();
                                }
                            }
                        });
                    }
                    if self.models_rx.is_some() {
                        ui.spinner();
                    }
                });
                if let Some(Err(e)) = &self.models {
                    ui.colored_label(ui.visuals().error_fg_color, e);
                }
                ui.label(RichText::new(self.t(
                    "الطلبات وصور العمل تُرسل إلى الخدمة، والتكلفة على حسابك فيها حسب الاستخدام. المفتاح محفوظ مشفّراً لمستخدم ويندوز هذا.",
                    "Requests and pictures of your work go to the service, billed to your account there. The key is stored encrypted for this Windows user.",
                )).small().weak());
            }
            ui.add_space(10.0);
            let think = self.t("تفكير أعمق (أبطأ، وأدق في الطلبات الطويلة)", "Think deeper (slower, better on long requests)");
            if ui.checkbox(&mut self.settings.think, think).changed() {
                self.settings.save();
            }
            ui.add_space(12.0);
            ui.label(RichText::new(self.t(
                "نموذج ورشة مبني على Qwen3.5-4B مفتوح المصدر (Apache-2.0)، ويعمل بمحرك llama.cpp (MIT).",
                "The Warsha model is built on the open-source Qwen3.5-4B (Apache-2.0) and runs on llama.cpp (MIT).",
            )).small().weak());
        });
    }

    fn fetch_models(&mut self, ctx: &egui::Context) {
        let p = self.settings.provider;
        let key = self.settings.key(p);
        let (tx, rx) = channel();
        let ctx = ctx.clone();
        std::thread::spawn(move || {
            let _ = tx.send(crate::llm::list_models(p, &key));
            ctx.request_repaint();
        });
        self.models_rx = Some(rx);
    }
}

fn entry_ui(ui: &mut egui::Ui, e: &Entry, arabic: bool) {
    let v = ui.visuals().clone();
    match e {
        Entry::User(t) => {
            ui.add_space(6.0);
            Frame::NONE
                .fill(v.selection.bg_fill.gamma_multiply(0.35))
                .corner_radius(8.0)
                .inner_margin(Margin::symmetric(10, 6))
                .show(ui, |ui| {
                    ui.set_width(ui.available_width());
                    ui.label(t);
                });
        }
        Entry::Step { label, ok, detail } => {
            let (mark, color) = if *ok { ("✓", v.weak_text_color()) } else { ("✗", v.error_fg_color) };
            ui.horizontal_wrapped(|ui| {
                ui.label(RichText::new(mark).color(color).small());
                ui.label(RichText::new(label).color(color).small());
                if !detail.is_empty() {
                    ui.label(RichText::new(detail).color(v.weak_text_color()).small());
                }
            });
        }
        Entry::Answer(t) => {
            ui.add_space(4.0);
            Frame::NONE
                .fill(v.faint_bg_color)
                .stroke(Stroke::new(1.0, v.widgets.noninteractive.bg_stroke.color))
                .corner_radius(8.0)
                .inner_margin(Margin::symmetric(10, 6))
                .show(ui, |ui| {
                    ui.set_width(ui.available_width());
                    ui.add(egui::Label::new(t.as_str()).selectable(true));
                });
        }
        Entry::Error(t) => {
            ui.add_space(4.0);
            ui.colored_label(v.error_fg_color, format!("{} {t}", if arabic { "تعذّر ذلك:" } else { "Couldn't do that:" }));
        }
    }
}

/// Requests that work well in each app, for the welcome card.
fn examples(app: &str, arabic: bool) -> [&'static str; 4] {
    match (app, arabic) {
        ("retoush", true) => ["الصورة باهتة شوي، خلها أوضح وألوانها أحلى", "زد التباين شوي", "حوّلها أبيض وأسود", "قصها مربع للانستقرام واحفظها"],
        ("retoush", false) => ["The photo is dull: make it clearer and the colours nicer", "Add a little contrast", "Make it black and white", "Crop it square for Instagram and save it"],
        ("reesha", true) => ["ارسم دائرة حمراء في وسط الصفحة", "أضف عنواناً كبيراً أعلى الصفحة", "وسّط كل الأشكال أفقياً", "جمّع الأشكال المحددة"],
        ("reesha", false) => ["Draw a red circle in the middle of the page", "Add a big title at the top", "Centre all the shapes horizontally", "Group the selected shapes"],
        ("satr", true) => ["اكتب خطاباً رسمياً لمدير المدرسة أطلب فيه إجازة", "خلّ السطر الأول عنواناً رئيسياً", "استبدل كلمة الخميس بالجمعة في كل المستند", "احفظ المستند PDF"],
        ("satr", false) => ["Write a formal letter to the head teacher asking for a day off", "Make the first line a main heading", "Replace Thursday with Friday everywhere", "Save the document as PDF"],
        ("minbar", true) => ["سوّ عرضاً تقديمياً عن أهمية الماء من ٥ شرائح", "أضف انتقال تلاشي لكل الشرائح", "اكتب ملاحظات المتحدث للشريحة الأولى", "صدّر العرض PDF"],
        ("minbar", false) => ["Make a 5-slide presentation on why water matters", "Add a fade transition to every slide", "Write speaker notes for the first slide", "Export the presentation as PDF"],
        ("kashf", true) => ["سوّ جدولاً فيه أسماء ٤ طلاب ودرجاتهم", "احسب المجموع تحت العمود", "سوّ رسماً بيانياً بالأعمدة للدرجات", "ثبّت صف العناوين"],
        ("kashf", false) => ["Make a table of 4 students and their marks", "Total the column below it", "Make a column chart of the marks", "Freeze the header row"],
        ("watheeq", true) => ["لخّص لي محتوى الملف", "احذف الصفحة الأخيرة", "استخرج الصفحتين ٢ و٣ في ملف منفصل", "في أي صفحة تُذكر كلمة الميزانية؟"],
        ("watheeq", false) => ["Summarise the file for me", "Delete the last page", "Extract pages 2 and 3 into a new file", "Which page mentions the budget?"],
        ("nasaq", true) => ["أضف عنواناً أعلى الصفحة", "خلّ الصفحة بثلاثة أعمدة", "اكتب فقرة قصيرة تحت العنوان", "صدّر الصفحة صورة PNG"],
        ("nasaq", false) => ["Add a title at the top of the page", "Make the page three columns", "Write a short paragraph under the title", "Export the page as a PNG"],
        ("monteer", true) => ["حط المقطع على الخط الزمني", "أضف انتقال تلاشي في بداية المقطع", "خلّ السلسلة عمودية للجوال", "قص المقطع عند الثانية ٥"],
        ("monteer", false) => ["Put the clip on the timeline", "Add a fade at the start of the clip", "Make the sequence vertical for phones", "Cut the clip at 5 seconds"],
        ("wamda", true) => ["أضف نص «مرحبا» في التكوين", "خلّ الطبقة تظهر تدريجياً في أول ثانية", "أضف ضبابية على الطبقة", "أضف خلفية سوداء"],
        ("wamda", false) => ["Add the text \"Hello\" to the composition", "Fade the layer in over the first second", "Blur the layer", "Add a black background"],
        ("sada", true) => ["أضف مسار صوت ستيريو جديد", "أضف صدى (ريفيرب) على المسار", "أضف فيد إن وفيد آوت للمقطع", "صدّر المكس ملف wav"],
        ("sada", false) => ["Add a new stereo audio track", "Put reverb on the track", "Fade the clip in and out", "Bounce the mix to a wav file"],
        ("tayf", true) => ["الصورة غامقة، فتّحها شوي", "خلّ ألوانها أدفى", "قصها مربعاً", "قيّمها خمس نجوم"],
        ("tayf", false) => ["The photo is dark: brighten it a little", "Make the colours warmer", "Crop it square", "Rate it five stars"],
        ("mukhattat", true) => ["ارسم غرفة ٥ × ٤ متر", "سوّ الجدار الداخلي بسماكة ٢٠ سم", "أضف بُعداً لطول الغرفة", "احفظ المخطط DXF"],
        ("mukhattat", false) => ["Draw a 5 × 4 m room", "Make the inner wall 20 cm thick", "Add a dimension for the room's length", "Save the drawing as DXF"],
        (_, true) => ["ماذا تستطيع أن تفعل هنا؟", "اعرض لي المستند الحالي", "تراجع عن آخر خطوة", "احفظ العمل"],
        (_, false) => ["What can you do here?", "Show me the current document", "Undo the last step", "Save the work"],
    }
}

fn short_name(p: Provider, arabic: bool) -> &'static str {
    match (p, arabic) {
        (Provider::Local, true) => "مجاني · على جهازك",
        (Provider::Local, false) => "free · on this computer",
        (Provider::Claude, _) => "Claude",
        (Provider::OpenAi, _) => "ChatGPT",
        (Provider::Gemini, _) => "Gemini",
    }
}

/// `2.7 GB`, in Arabic-Indic digits in the Arabic interface.
fn gb(bytes: u64, arabic: bool) -> String {
    let s = format!("{:.1}", bytes as f64 / 1e9);
    if arabic {
        let digits: String = s.chars().map(|c| match c {
            '0'..='9' => char::from_u32(0x0660 + c as u32 - '0' as u32).unwrap_or(c),
            '.' => '٫',
            c => c,
        }).collect();
        format!("{digits} غيغابايت")
    } else {
        format!("{s} GB")
    }
}

/// A sensible model from a provider's list when the saved one isn't offered.
fn pick_default(p: Provider, list: &[String]) -> Option<String> {
    let prefs: &[&str] = match p {
        Provider::Claude => &["claude-sonnet", "claude-haiku", "claude"],
        Provider::OpenAi => &["gpt-5-mini", "gpt-5", "gpt-4.1-mini", "gpt-4o-mini", "gpt"],
        Provider::Gemini => &["gemini-2.5-flash", "flash", "gemini"],
        Provider::Local => &[],
    };
    for pre in prefs {
        let mut hits: Vec<&String> = list.iter().filter(|m| m.contains(pre) && !m.contains("preview") && !m.contains("tts") && !m.contains("image")).collect();
        hits.sort();
        if let Some(h) = hits.last() {
            return Some((*h).clone());
        }
    }
    list.first().cloned()
}
