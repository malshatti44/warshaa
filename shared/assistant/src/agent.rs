//! The conversation loop, on its own thread: the model asks for tools, the app's MCP server runs them.

use std::collections::HashSet;
use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::{Receiver, Sender, channel};
use std::sync::Arc;

use serde_json::{Value, json};

use crate::adapters::{self, Adapter, Command, func};
use crate::llm::{self, Endpoint, Provider};
use crate::mcp::{Mcp, ToolResult};
use crate::search::{Doc, Index};
use crate::{AppSpec, Translate, local};

/// How to start the app's MCP server against the open window.
#[derive(Clone)]
pub struct Bridge {
    pub program: PathBuf,
    pub args: Vec<String>,
    pub env: Vec<(String, String)>,
}

/// The steps' names in the chat (tool, Arabic, English), for the adapters' tools.
const TOOL_LABELS: &[(&str, &str, &str)] = &[
    ("add_effect", "إضافة تأثير", "Add effect"),
    ("add_keyframe", "إضافة إطار مفتاحي", "Add keyframe"),
    ("add_shape", "إضافة شكل", "Add shape"),
    ("add_slide", "إضافة شريحة", "Add slide"),
    ("add_text", "إضافة نص", "Add text"),
    ("add_text_box", "إضافة مربع نص", "Add text box"),
    ("align_objects", "محاذاة العناصر", "Align objects"),
    ("apply_effect", "تطبيق تأثير", "Apply effect"),
    ("apply_preset", "تطبيق إعداد جاهز", "Apply preset"),
    ("bounce_mix", "تصدير المكس", "Bounce mix"),
    ("command_line", "سطر الأوامر", "Command line"),
    ("create_table", "إنشاء جدول", "Create table"),
    ("crop", "قص", "Crop"),
    ("crop_to_ratio", "قص بنسبة", "Crop to ratio"),
    ("distribute_objects", "توزيع العناصر", "Distribute objects"),
    ("doc_combine", "دمج الملفات", "Combine files"),
    ("doc_open", "فتح المستند", "Open document"),
    ("doc_save", "حفظ المستند", "Save document"),
    ("doc_split", "تقسيم المستند", "Split document"),
    ("document_info", "قراءة المستند", "Read document"),
    ("draw_path", "رسم مسار", "Draw path"),
    ("draw_shape", "رسم شكل", "Draw shape"),
    ("edit_undo", "تراجع", "Undo"),
    ("evaluate_formula", "حساب صيغة", "Evaluate formula"),
    ("export", "تصدير", "Export"),
    ("export_png", "تصدير صورة", "Export picture"),
    ("filter", "تصفية", "Filter"),
    ("format_range", "تنسيق الخلايا", "Format cells"),
    ("get_cell", "قراءة خلية", "Read cell"),
    ("get_comp", "قراءة التكوين", "Read composition"),
    ("get_develop", "قراءة التعديلات", "Read adjustments"),
    ("get_layer", "قراءة الطبقة", "Read layer"),
    ("get_property", "قراءة خاصية", "Read property"),
    ("get_story", "قراءة النص", "Read text"),
    ("get_text", "قراءة النص", "Read text"),
    ("go_to_slide", "الانتقال إلى شريحة", "Go to slide"),
    ("group_objects", "تجميع العناصر", "Group objects"),
    ("import", "استيراد", "Import"),
    ("import_audio", "استيراد صوت", "Import audio"),
    ("insert_chart", "إدراج مخطط بياني", "Insert chart"),
    ("insert_picture", "إدراج صورة", "Insert picture"),
    ("insert_table", "إدراج جدول", "Insert table"),
    ("list_controls", "قائمة أدوات الضبط", "List controls"),
    ("list_effects", "قائمة التأثيرات", "List effects"),
    ("list_functions", "قائمة الدوال", "List functions"),
    ("look", "النظر إلى النتيجة", "Look at the result"),
    ("media_import", "استيراد وسائط", "Import media"),
    ("new_document", "مستند جديد", "New document"),
    ("new_drawing", "مخطط جديد", "New drawing"),
    ("new_presentation", "عرض تقديمي جديد", "New presentation"),
    ("new_session", "جلسة جديدة", "New session"),
    ("new_workbook", "مصنف جديد", "New workbook"),
    ("open", "فتح ملف", "Open file"),
    ("open_document", "فتح مستند", "Open document"),
    ("open_file", "فتح ملف", "Open file"),
    ("open_presentation", "فتح عرض تقديمي", "Open presentation"),
    ("open_project", "فتح مشروع", "Open project"),
    ("open_session", "فتح جلسة", "Open session"),
    ("open_workbook", "فتح مصنف", "Open workbook"),
    ("pathfinder", "دمج الأشكال", "Pathfinder"),
    ("place_clip", "وضع مقطع على الخط الزمني", "Place clip"),
    ("place_image", "وضع صورة", "Place image"),
    ("query_entities", "قراءة عناصر الرسم", "Read entities"),
    ("query_photos", "البحث في الصور", "Find photos"),
    ("read_range", "قراءة الخلايا", "Read cells"),
    ("save", "حفظ", "Save"),
    ("save_document", "حفظ", "Save"),
    ("save_file", "حفظ", "Save"),
    ("save_presentation", "حفظ", "Save"),
    ("save_project", "حفظ", "Save"),
    ("save_session", "حفظ", "Save"),
    ("save_workbook", "حفظ", "Save"),
    ("select", "تحديد", "Select"),
    ("select_photos", "تحديد الصور", "Select photos"),
    ("select_text", "تحديد نص", "Select text"),
    ("set_cell", "كتابة في خلية", "Write cell"),
    ("set_develop", "تعديل الصورة", "Adjust photo"),
    ("set_paint", "ضبط التعبئة والحد", "Set fill and stroke"),
    ("set_property", "تعديل خاصية", "Set property"),
    ("set_story_text", "كتابة النص", "Write text"),
    ("set_text", "كتابة النص", "Write text"),
    ("slide_info", "قراءة الشريحة", "Read slide"),
    ("sort_range", "فرز", "Sort"),
    ("text_extract", "استخراج النص", "Extract text"),
    ("text_find", "بحث في النص", "Find text"),
    ("transform", "تحويل", "Transform"),
    ("transition_all", "انتقال لكل الشرائح", "Transition on all slides"),
    ("type_text", "كتابة", "Type text"),
    ("undo", "تراجع", "Undo"),
    ("write_range", "كتابة في الخلايا", "Write cells"),
    ("go_to_paragraph", "الانتقال إلى الفقرة", "Go to paragraph"),
    ("replace_all", "استبدال الكل", "Replace all"),
    ("format_paragraph", "تنسيق الفقرة", "Format paragraph"),
    ("freeze_top_row", "تثبيت صف العناوين", "Freeze header row"),
    ("build_presentation", "إنشاء العرض التقديمي", "Build presentation"),
    ("new_slide", "شريحة جديدة", "New slide"),
    ("delete_slide", "حذف شريحة", "Delete slide"),
    ("speaker_notes", "ملاحظات المتحدث", "Speaker notes"),
    ("animate", "إضافة حركة", "Animate"),
    ("adjust", "ضبط الصورة", "Adjust photo"),
    ("rate_photo", "تقييم الصورة", "Rate photo"),
    ("flag_photo", "تعليم الصورة", "Flag photo"),
    ("margins_and_columns", "الهوامش والأعمدة", "Margins and columns"),
    ("fade_clip", "تلاشي المقطع", "Fade clip"),
    ("move_entities", "تحريك العناصر", "Move entities"),
    ("offset_wall", "سماكة الجدار", "Wall thickness"),
    ("new_solid", "طبقة لون", "Solid layer"),
    ("delete_layers", "حذف طبقات", "Delete layers"),
    ("add_transition", "إضافة انتقال", "Add transition"),
    ("extract_pages", "استخراج الصفحات", "Extract pages"),
    ("recognize_text", "قراءة النص من الصور", "Read text in pictures"),
];

pub enum Event {
    /// What the assistant is doing now (shown under the conversation).
    Status(String),
    /// A question the user answers with yes or no ([`Engine::answer`]), e.g. replacing an original file.
    Confirm(String),
    /// A finished step.
    Step { label: String, ok: bool, detail: String },
    Answer(String),
    Error(String),
    /// The assistant wrote this file (a save or an export).
    Saved(String),
    /// The turn is over (after an answer, an error or a stop).
    Idle,
}

enum Cmd {
    Ask { text: String, state: String, endpoint: Endpoint },
    Reset,
}

pub struct Engine {
    tx: Sender<Cmd>,
    pub events: Receiver<Event>,
    stop: Arc<AtomicBool>,
    answers: Sender<bool>,
}

impl Engine {
    pub fn start(app: AppSpec, bridge: Bridge, arabic: bool, translate: Translate, ctx: egui::Context) -> Self {
        let (tx, rx) = channel::<Cmd>();
        let (etx, events) = channel::<Event>();
        let stop = Arc::new(AtomicBool::new(false));
        let stop2 = Arc::clone(&stop);
        let (answers, answers_rx) = channel::<bool>();
        std::thread::Builder::new()
            .name("warsha-assistant".into())
            .spawn(move || {
                let mut w = Worker { app, bridge, arabic, translate, out: etx, ctx, stop: stop2, mcp: None, adapter: None, cat: Vec::new(), ids: HashSet::new(), index: None, messages: Vec::new(), failed: Default::default(), answers: answers_rx };
                while let Ok(cmd) = rx.recv() {
                    match cmd {
                        Cmd::Ask { text, state, endpoint } => {
                            w.stop.store(false, Ordering::Relaxed);
                            if let Err(e) = w.ask(&text, &state, endpoint) {
                                w.send(Event::Error(e));
                            }
                            w.send(Event::Idle);
                        }
                        Cmd::Reset => w.messages.clear(),
                    }
                }
            })
            .expect("assistant thread");
        Self { tx, events, stop, answers }
    }

    /// The user's answer to [`Event::Confirm`].
    pub fn answer(&self, yes: bool) {
        let _ = self.answers.send(yes);
    }

    pub fn ask(&self, text: String, state: String, endpoint: Endpoint) {
        let _ = self.tx.send(Cmd::Ask { text, state, endpoint });
    }

    pub fn reset(&self) {
        let _ = self.tx.send(Cmd::Reset);
    }

    pub fn stop(&self) {
        self.stop.store(true, Ordering::Relaxed);
        // A pending question counts as "no".
        let _ = self.answers.send(false);
    }
}

struct Worker {
    app: AppSpec,
    bridge: Bridge,
    arabic: bool,
    translate: Translate,
    out: Sender<Event>,
    ctx: egui::Context,
    stop: Arc<AtomicBool>,
    mcp: Option<Mcp>,
    adapter: Option<Box<dyn Adapter>>,
    cat: Vec<Command>,
    ids: HashSet<String>,
    index: Option<Index>,
    messages: Vec<Value>,
    /// Failed calls of this turn (tool name + arguments → count).
    failed: std::collections::HashMap<String, u32>,
    answers: Receiver<bool>,
}

const SYSTEM: &str = r#"You are «مساعد ورشة» (Warsha Assistant), built into {app_ar} ({app_en}). You operate the app for the user with
your tools: you do the work yourself, you don't tell the user how to do it by hand.

Rules:
- Reply in the user's language ({lang} by default: clear, short and friendly). No tables.
- Act at once when the request is clear. Ask one short question only when you can't proceed (nothing open and no file
  named, or a choice that changes the result a lot).
- Commands: use the ids in the guide below; for anything else call `find_commands` and use the `params` it returns
  exactly. Never invent ids or parameter names. Tools (open_file, save_file, …) are called directly, never through
  run_command.
- When a tool fails, read the error and fix the call, or try another command, before giving up.
- Honesty: say something was done only when its tool call succeeded. If you could not do it, say so plainly.
- Do only what was asked: don't open, save or export files, and don't add extras, unless the request asks for it.
- Work in the document the app state names; don't create a new one unless the user asks for a new document.
- Finish with one or two sentences: what you changed (with the values), and at most one useful next step.

{guide}
"#;

impl Worker {
    fn send(&self, e: Event) {
        let _ = self.out.send(e);
        self.ctx.request_repaint();
    }

    fn status(&self, ar: &str, en: &str) {
        self.send(Event::Status(if self.arabic { ar } else { en }.to_string()));
    }

    /// Start the app's MCP server and read its commands (once).
    fn connect(&mut self) -> Result<(), String> {
        if self.mcp.as_mut().is_some_and(Mcp::alive) {
            return Ok(());
        }
        self.status("الاتصال بالتطبيق…", "Connecting to the app…");
        let mut mcp = Mcp::start(&self.bridge.program, &self.bridge.args, &self.bridge.env)?;
        let mut adapter = adapters::for_app(self.app.id).ok_or_else(|| format!("no assistant adapter for {}", self.app.id))?;
        adapter.prepare(&mcp);
        let mut cat = adapter.catalog(&mut mcp)?;
        cat.retain(|c| !adapter.hidden(&c.id));
        for c in &mut cat {
            c.label_ar = (self.translate)(&c.id, &c.label);
            if c.label_ar == c.label {
                c.label_ar.clear();
            }
            c.menu_ar = c.menu.iter().map(|m| (self.translate)("", m)).collect();
        }
        let docs: Vec<Doc> = cat
            .iter()
            .map(|c| Doc {
                fields: vec![
                    (c.id.clone(), 3.0),
                    (c.label.clone(), 3.0),
                    (c.label_ar.clone(), 3.0),
                    (c.menu.join(" "), 1.0),
                    (c.menu_ar.join(" "), 1.0),
                    (c.params.clone(), 0.3),
                ],
            })
            .collect();
        self.index = Some(Index::new(&docs));
        self.ids = cat.iter().map(|c| c.id.clone()).collect();
        self.cat = cat;
        self.adapter = Some(adapter);
        self.mcp = Some(mcp);
        Ok(())
    }

    fn tools(&self) -> Vec<Value> {
        let mut t = vec![
            func("find_commands", "Search the app's commands by meaning, in Arabic or English (e.g. 'تباين', 'gaussian blur'). Returns ids with their params doc.",
                 json!({"query": {"type": "string"}}), &["query"]),
            func("run_command", "Run an app command by id with its params (ids from the guide or find_commands).",
                 json!({"id": {"type": "string"}, "params": {"type": "object"}}), &["id"]),
        ];
        if let Some(a) = &self.adapter {
            t.extend(a.tools());
        }
        if self.app.id == "watheeq" {
            t.push(func(
                "recognize_text",
                "Read the text of scanned pages (pictures of text, Arabic included) with the vision model and save it as a text file next to the PDF. Pages counted from 1; all pages when none are given.",
                json!({"pages": {"type": "array", "items": {"type": "integer"}}}),
                &[],
            ));
        }
        t
    }

    /// Watheeq: the open document's scanned pages read as text (vision.rs), saved as `<name>-نص.txt`.
    fn recognize_text(&mut self, args: &Value) -> ToolResult {
        use base64::Engine as _;
        let Some(mcp) = self.mcp.as_mut() else { return adapters::err("not connected") };
        let docs = mcp.call_json("doc_list", json!({})).ok().and_then(|d| d.get("documents").and_then(Value::as_array).cloned()).unwrap_or_default();
        let Some(doc) = docs.last().cloned() else { return adapters::err("no document open yet: doc_open the file first") };
        let id = doc.get("doc").cloned().unwrap_or(Value::Null);
        let count = doc.get("pages").and_then(Value::as_u64).unwrap_or(1);
        let pages: Vec<u64> = match args.get("pages").and_then(Value::as_array) {
            Some(p) if !p.is_empty() => p.iter().filter_map(Value::as_u64).filter(|n| (1..=count).contains(n)).collect(),
            _ => (1..=count).collect(),
        };
        let mut text = Vec::new();
        for page in &pages {
            self.send(Event::Status(if self.arabic { format!("قراءة الصفحة {page}…") } else { format!("Reading page {page}…") }));
            let Some(mcp) = self.mcp.as_mut() else { return adapters::err("not connected") };
            let shot = mcp.call("page_render", json!({"doc": id, "page": page, "dpi": 300}));
            let Some((_, data)) = shot.image else { return adapters::err(format!("page {page} could not be rendered: {}", shot.text)) };
            let Ok(png) = base64::engine::general_purpose::STANDARD.decode(data) else { return adapters::err("the page picture is broken") };
            let stop = self.stop.clone();
            match crate::vision::read_png(&png, &mut |_, _| !stop.load(Ordering::Relaxed)) {
                Ok(paras) => text.push(paras.join("\n\n")),
                Err(e) => return adapters::err(e),
            }
        }
        let all = text.join("\n\n");
        let source = doc.get("path").and_then(Value::as_str).unwrap_or("");
        let stem = source.strip_suffix(".pdf").or_else(|| source.strip_suffix(".PDF")).unwrap_or(source);
        let mut saved = String::new();
        if !stem.is_empty() {
            let file = format!("{stem}-نص.txt");
            if std::fs::write(&file, format!("\u{feff}{all}\n")).is_ok() {
                saved = format!("(saved to {file})\n");
            }
        }
        let shown: String = all.chars().take(3000).collect();
        adapters::ok(format!("{saved}{shown}"))
    }

    fn system(&self) -> String {
        SYSTEM.replace("{app_ar}", self.app.name_ar)
            .replace("{app_en}", self.app.name_en)
            .replace("{lang}", if self.arabic { "Arabic: Modern Standard Arabic" } else { "English" })
            .replace("{guide}", adapters::guide(self.app.id))
    }

    fn find(&self, query: &str) -> String {
        let Some(ix) = &self.index else { return "[]".into() };
        let hits: Vec<Value> = ix
            .search(query, 8)
            .into_iter()
            .map(|i| {
                let c = &self.cat[i];
                let menu = if c.menu_ar.is_empty() { c.menu.join(" › ") } else { c.menu_ar.join(" › ") };
                let mut h = json!({"id": c.id, "label": if c.label_ar.is_empty() { &c.label } else { &c.label_ar }, "menu": menu,
                                   "params": if c.params.is_empty() { "{}".to_string() } else { c.params.chars().take(400).collect() }});
                if let Some(note) = self.adapter.as_ref().and_then(|a| a.annotate(&c.id, &self.ids)) {
                    h["note"] = json!(note);
                }
                h
            })
            .collect();
        if hits.is_empty() { "no matching command; try other words (English works too)".into() } else { Value::Array(hits).to_string() }
    }

    /// A label for a step, in the interface language.
    fn label(&self, name: &str, args: &Value) -> String {
        let ar = self.arabic;
        match name {
            "run_command" => {
                let id = args.get("id").and_then(Value::as_str).unwrap_or("");
                self.cat
                    .iter()
                    .find(|c| c.id == id)
                    .map(|c| if ar && !c.label_ar.is_empty() { c.label_ar.clone() } else { c.label.clone() })
                    .map(|l| l.trim_end_matches('…').to_string())
                    .or_else(|| TOOL_LABELS.iter().find(|(n, _, _)| *n == id).map(|(_, a, e)| if ar { a } else { e }.to_string()))
                    .unwrap_or_else(|| id.to_string())
            }
            "find_commands" => if ar { "بحث في الأوامر" } else { "Search commands" }.into(),
            other => match TOOL_LABELS.iter().find(|(n, _, _)| *n == other) {
                Some((_, a, e)) => if ar { a } else { e }.to_string(),
                None => other.replace('_', " "),
            },
        }
    }

    fn tool(&mut self, name: &str, args: &Value) -> ToolResult {
        if name == "recognize_text" && self.app.id == "watheeq" {
            return self.recognize_text(args);
        }
        if name == "find_commands" {
            return adapters::ok(self.find(args.get("query").and_then(Value::as_str).unwrap_or("")));
        }
        let (Some(mcp), Some(adapter)) = (self.mcp.as_mut(), self.adapter.as_mut()) else { return adapters::err("not connected") };
        match name {
            "run_command" => {
                let id = args.get("id").and_then(Value::as_str).unwrap_or("").to_string();
                let mut params = args.get("params").cloned().unwrap_or(json!({}));
                if let Some(s) = params.as_str() {
                    params = serde_json::from_str(s).unwrap_or(json!({}));
                }
                if params.is_null() {
                    params = json!({});
                }
                // The user agreed to save over an original (see `ask_user`).
                if adapters::confirmed(args) {
                    if let Some(o) = params.as_object_mut() {
                        o.insert("confirmed".into(), json!(true));
                    }
                }
                // A tool passed as a command: call the tool.
                if adapter.tools().iter().any(|t| t.pointer("/function/name").and_then(Value::as_str) == Some(id.as_str())) {
                    return adapter.call(mcp, &id, &params).unwrap_or_else(|| adapters::err("unknown tool"));
                }
                if !self.ids.contains(&id) {
                    let near: Vec<String> = self.index.as_ref().map(|ix| ix.search(&id.replace('.', " "), 5).into_iter().map(|i| self.cat[i].id.clone()).collect()).unwrap_or_default();
                    return adapters::err(format!("unknown command id `{id}`. Similar ids: {near:?}. Use find_commands."));
                }
                let mut r = adapter.run(mcp, &id, params);
                if r.text.is_empty() || r.text == "null" {
                    r.text = "done".into();
                }
                r.text = r.text.chars().take(1500).collect();
                if r.ok {
                    let line = adapter.state_line(mcp);
                    if !line.is_empty() {
                        r.text += &format!("\n→ now: {line}");
                    }
                }
                r
            }
            other => adapter.call(mcp, other, args).unwrap_or_else(|| adapters::err(format!("no tool named {other}"))),
        }
    }

    /// Ask whether to replace an original file; call again when the user agrees.
    fn ask_user(&mut self, name: &str, args: &Value, file: &str) -> ToolResult {
        while self.answers.try_recv().is_ok() {}
        let short = std::path::Path::new(file).file_name().map(|f| f.to_string_lossy().into_owned()).unwrap_or_else(|| file.to_string());
        self.send(Event::Confirm(if self.arabic {
            format!("هل أحفظ التعديلات فوق الملف الأصلي «{short}»؟ لن تستطيع الرجوع إلى النسخة الأصلية بعدها.")
        } else {
            format!("Save the changes over the original file \"{short}\"? The original can't be recovered afterwards.")
        }));
        let yes = self.answers.recv().unwrap_or(false) && !self.stop.load(Ordering::Relaxed);
        if !yes {
            return adapters::err("The user chose to keep the original file. Save a copy under a new name next to it (e.g. add -edited) instead.");
        }
        let mut a = args.clone();
        if let Some(o) = a.as_object_mut() {
            o.insert("confirmed".into(), json!(true));
        }
        self.tool(name, &a)
    }

    fn ask(&mut self, text: &str, state: &str, mut ep: Endpoint) -> Result<(), String> {
        self.connect()?;
        if ep.provider == Provider::Local {
            let arabic = self.arabic;
            let out = self.out.clone();
            let ctx = self.ctx.clone();
            let (base, key) = local::ensure_server(&move |s| {
                let msg = match (s, arabic) {
                    ("starting", true) => "تشغيل النموذج…",
                    ("starting", false) => "Starting the model…",
                    (_, true) => "تحميل النموذج في الذاكرة…",
                    (_, false) => "Loading the model…",
                };
                let _ = out.send(Event::Status(msg.into()));
                ctx.request_repaint();
            })?;
            ep.local_base = base;
            ep.key = key;
        }
        if self.messages.is_empty() {
            self.messages.push(json!({"role": "system", "content": self.system()}));
        }
        forget_old_pictures(&mut self.messages);
        // The app's own line, then the live one from its server (the caret, the selection…): the user
        // may have changed the document since the last turn.
        let live = match (self.mcp.as_mut(), self.adapter.as_ref()) {
            (Some(mcp), Some(adapter)) => adapter.state_line(mcp),
            _ => String::new(),
        };
        let state = match (state.is_empty(), live.is_empty()) {
            (_, true) => state.to_string(),
            (true, false) => format!("now: {live}"),
            (false, false) => format!("{state}; now: {live}"),
        };
        log::info!("assistant: request with state [{state}]");
        let content = if state.is_empty() { text.to_string() } else { format!("[{state}]\n{text}") };
        self.messages.push(json!({"role": "user", "content": content}));
        self.failed.clear();
        let tools = self.tools();
        // Calls this turn: a request that needs more is going wrong.
        let mut made = 0usize;
        for _ in 0..16 {
            if self.stop.load(Ordering::Relaxed) {
                self.send(Event::Answer(if self.arabic { "توقفت." } else { "Stopped." }.into()));
                return Ok(());
            }
            self.status("يفكّر…", "Thinking…");
            let reply = match llm::complete(&ep, &self.messages, &tools) {
                Ok(r) => r,
                // The shared local server went away with the app that started it: start another.
                Err(e) if ep.provider == Provider::Local && e.starts_with("network") => {
                    let (base, key) = local::ensure_server(&|_| {})?;
                    ep.local_base = base;
                    ep.key = key;
                    llm::complete(&ep, &self.messages, &tools)?
                }
                Err(e) => {
                    self.messages.pop();
                    return Err(e);
                }
            };
            let calls = reply.get("tool_calls").and_then(Value::as_array).cloned().unwrap_or_default();
            let said = reply.get("content").and_then(Value::as_str).unwrap_or("").trim().to_string();
            let mut msg = json!({"role": "assistant", "content": said});
            if !calls.is_empty() {
                msg["tool_calls"] = Value::Array(calls.clone());
            }
            self.messages.push(msg);
            if calls.is_empty() {
                self.send(Event::Answer(clean(&said)));
                return Ok(());
            }
            let mut pictures = Vec::new();
            // The same call a fourth time: the model is going round in circles; end the turn.
            let mut circling = false;
            for c in &calls {
                if self.stop.load(Ordering::Relaxed) {
                    self.messages.push(json!({"role": "tool", "tool_call_id": c["id"], "content": "stopped by the user"}));
                    continue;
                }
                let name = c.pointer("/function/name").and_then(Value::as_str).unwrap_or("").to_string();
                let args: Value = c.pointer("/function/arguments").and_then(Value::as_str).and_then(|a| serde_json::from_str(a).ok()).unwrap_or(json!({}));
                // The parsed arguments (sorted keys, no spacing): the same call however it was written.
                let key = format!("{name}{args}");
                let label = self.label(&name, &args);
                self.send(Event::Status(format!("{label}…")));
                let mut r = self.tool(&name, &args);
                log::info!(
                    "assistant: {name} {} → {}",
                    args.to_string().chars().take(300).collect::<String>(),
                    if r.ok { "ok".to_string() } else { format!("error: {}", r.text.chars().take(200).collect::<String>()) }
                );
                if let Some(file) = r.confirm.take() {
                    r = self.ask_user(&name, &args, &file);
                }
                if let Some(file) = r.saved.take() {
                    self.send(Event::Saved(file));
                }
                if name != "find_commands" {
                    self.send(Event::Step { label, ok: r.ok, detail: if r.ok { String::new() } else { r.text.chars().take(200).collect() } });
                }
                let mut body = if r.ok { r.text.clone() } else { format!("ERROR: {}", r.text) };
                // The same call again: a failure won't fix itself, and a success won't do more.
                let n = self.failed.entry(key).or_insert(0);
                *n += 1;
                made += 1;
                circling |= *n >= 4 || made >= 30;
                if !r.ok && *n >= 2 {
                    body += "\nYou already made this exact call and it failed again. Don't repeat it: read the error, use another tool or command (find_commands), or tell the user you couldn't.";
                } else if r.ok && *n >= 3 {
                    body += "\nYou have made this exact call several times; repeating it changes nothing. Take the next step with another tool or command (find_commands if you need one), or answer the user.";
                }
                self.messages.push(json!({"role": "tool", "tool_call_id": c["id"], "content": body}));
                if let Some(p) = r.image {
                    pictures.push(p);
                }
            }
            for (mime, data) in pictures {
                self.messages.push(json!({"role": "user", "content": [
                    {"type": "text", "text": "(the picture you asked for)"},
                    {"type": "image_url", "image_url": {"url": format!("data:{mime};base64,{data}")}}]}));
            }
            if circling {
                let text = if self.arabic {
                    "توقفت لأني كنت أكرر الخطوة نفسها دون فائدة. جرّب أن تصيغ الطلب بطريقة أخرى أو بتفاصيل أكثر."
                } else {
                    "I stopped because I kept repeating the same step. Try asking another way, or with more detail."
                };
                self.messages.push(json!({"role": "assistant", "content": text}));
                self.send(Event::Answer(text.into()));
                return Ok(());
            }
        }
        self.send(Event::Answer(if self.arabic { "توقفت بعد خطوات كثيرة، قل لي إن أردت أن أكمل." } else { "I stopped after many steps; tell me to go on." }.into()));
        Ok(())
    }
}

/// Pictures from earlier turns become a short note (they are large and the model has seen them).
fn forget_old_pictures(messages: &mut [Value]) {
    for m in messages.iter_mut() {
        if m["role"] == "user" && m["content"].is_array() {
            m["content"] = json!("(a picture from earlier)");
        }
    }
}

/// Markdown the panel doesn't draw: bold marks and heading hashes.
fn clean(s: &str) -> String {
    s.replace("**", "").lines().map(|l| l.trim_start_matches('#').trim_start()).collect::<Vec<_>>().join("\n")
}
