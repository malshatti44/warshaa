//! The line the model reads about each app ("now: …"), on a real document in the app's headless
//! MCP server: a state function that reads the wrong fields says "empty" or "0 pages" and the model
//! works blind. Needs the release build and the showcase documents, so it is ignored by default:
//!
//!   cargo test --release state_lines -- --ignored --nocapture

use std::path::PathBuf;

use serde_json::json;

use super::for_app;
use crate::mcp::Mcp;

const RELEASE: &str = r"E:\warsha-src\target\x86_64-pc-windows-msvc\release";
const WORK: &str = r"E:\warsha-src\showcase\v22\work";

/// (app, extra CLI args, MCP tool that opens the document, its arguments, a word the line must hold)
fn cases() -> Vec<(&'static str, Vec<String>, &'static str, serde_json::Value, &'static str)> {
    let w = |f: &str| format!(r"{WORK}\{f}");
    vec![
        ("retoush", vec!["--automation-read-root".into(), WORK.into(), "--automation-write-root".into(), WORK.into()], "doc_open", json!({"path": w("retoush-portrait.psd")}), "layers"),
        ("reesha", vec![], "open_file", json!({"path": w("kuwait-starry-night.svg")}), "objects"),
        ("minbar", vec![], "open_presentation", json!({"path": w("hirfa-launch.pptx")}), "5 slides"),
        ("satr", vec![], "open_document", json!({"path": w("employee-handbook.docx")}), "paragraph"),
        ("kashf", vec![], "open_workbook", json!({"path": w("hirfa-q3-sales.xlsx")}), "sheet"),
        ("monteer", vec![], "command_run", json!({"id": "file.open", "params": {"path": w("warsha-promo.fcproj")}}), "clips"),
        ("nasaq", vec![], "open_document", json!({"path": w("warsha-magazine.nasaq")}), "3 pages"),
        ("watheeq", vec!["--root".into(), r"E:\warsha-src\showcase".into()], "doc_open", json!({"path": w("sidra-menu.pdf")}), "page"),
        ("sada", vec![], "open_session", json!({"path": w("nabd-warsha.sada")}), "الإيقاع"),
        ("tayf", vec!["--demo".into()], "", json!({}), "active photo"),
        ("wamda", vec![], "open_project", json!({"path": w("warsha-intro.ecproj")}), "layers"),
        ("mukhattat", vec![], "open", json!({"path": w("cafe-floorplan.dxf")}), "entities"),
    ]
}

#[test]
#[ignore]
fn state_lines() {
    let mut bad = Vec::new();
    for (app, args, open, open_args, expect) in cases() {
        let exe = PathBuf::from(RELEASE).join(format!("{app}-cli.exe"));
        let mut all = vec!["mcp".to_string()];
        all.extend(args);
        let mut mcp = match Mcp::start(&exe, &all, &[]) {
            Ok(m) => m,
            Err(e) => {
                bad.push(format!("{app}: start: {e}"));
                continue;
            }
        };
        let mut ad = for_app(app).expect("adapter");
        ad.prepare(&mcp);
        if !open.is_empty() {
            let r = mcp.call(open, open_args.clone());
            if !r.ok {
                bad.push(format!("{app}: {open}: {}", r.text.chars().take(200).collect::<String>()));
                continue;
            }
        }
        let line = ad.state_line(&mut mcp);
        println!("{app:10} {line}");
        if !line.contains(expect) || line.contains("empty") || line.starts_with("0 ") {
            bad.push(format!("{app}: {line}"));
        }
    }
    assert!(bad.is_empty(), "state lines that don't describe the document:\n{}", bad.join("\n"));
}
