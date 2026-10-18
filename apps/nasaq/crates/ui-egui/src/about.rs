//! Help › About Nasaq: tabs About · Contributors · Models. About is the splash with the
//! Warsha (ورشة) mark, version, and community links (Discord first and largest), plus the other Warsha
//! apps; Contributors and Models are the compiled-in credits (`crate::credits`).

use nasaq_engine::links;
use egui::{Color32, Rect, Sense, Stroke, pos2, vec2};
use serde_json::json;

use crate::DesignApp;
use crate::theme::{Tokens, semibold};

/// The accent blue of the About splash.
pub const BRAND: Color32 = Color32::from_rgb(0x4e, 0x7b, 0xfb);
/// Discord's brand colour, used for the "Contact the Developer" buttons (colour only; no Discord artwork).
pub const DISCORD: Color32 = Color32::from_rgb(0x58, 0x65, 0xf2);

/// The other Warsha apps (app-page slug, name, what it is) — same list as the README.
pub const SIBLINGS: &[(&str, &str, &str)] = &[
    ("retoush", "Retoush", "image editing"),
    ("reesha", "Reesha", "vector illustration"),
    ("monteer", "Monteer", "video editing, color and sound"),
    ("tayf", "Tayf", "photo library and raw development"),
    ("watheeq", "Watheeq", "reading, organizing and protecting PDFs"),
    ("wamda", "Wamda", "motion graphics and visual effects"),
];

/// The About window's tabs, in `UiState::about_tab` order (`help.about {tab}` names them in lowercase).
pub const ABOUT_TABS: [&str; 3] = ["About", "Contributors", "Models"];

/// Paint the Warsha (ورشة) mark into `rect` (square): four rounded tiles in the colours of
/// ريتوش، مونتير، وثيق and صدى. It replaces the Warsha mark, which a modified version may not show.
pub fn paint_mark(ui: &egui::Ui, rect: Rect, _color: Color32) {
    const TILES: [Color32; 4] = [
        Color32::from_rgb(0x1e, 0x6b, 0xf0),
        Color32::from_rgb(0x6a, 0x1f, 0xd1),
        Color32::from_rgb(0xd9, 0x26, 0x2c),
        Color32::from_rgb(0x8b, 0x2b, 0xe2),
    ];
    let side = rect.width().min(rect.height());
    let r = Rect::from_center_size(rect.center(), vec2(side, side));
    let gap = side * 0.09;
    let cell = (side - gap) / 2.0;
    for (k, colour) in TILES.into_iter().enumerate() {
        let min = r.min + vec2((k % 2) as f32 * (cell + gap), (k / 2) as f32 * (cell + gap));
        ui.painter().rect_filled(Rect::from_min_size(min, vec2(cell, cell)), cell * 0.24, colour);
    }
}

/// A speech-bubble glyph (drawn in code) for Discord buttons.
pub fn paint_chat_icon(p: &egui::Painter, c: egui::Pos2, s: f32, color: Color32) {
    let body = Rect::from_center_size(c - vec2(0.0, s * 0.06), vec2(s, s * 0.72));
    p.rect_filled(body, s * 0.24, color);
    let tail = vec![
        pos2(body.left() + s * 0.22, body.bottom() - 1.0),
        pos2(body.left() + s * 0.12, body.bottom() + s * 0.24),
        pos2(body.left() + s * 0.44, body.bottom() - 1.0),
    ];
    p.add(egui::Shape::convex_polygon(tail, color, Stroke::NONE));
    let eye = s * 0.09;
    let bg = if color.r() as u32 + color.g() as u32 + color.b() as u32 > 380 { DISCORD } else { Color32::WHITE };
    p.circle_filled(body.center() - vec2(s * 0.18, 0.0), eye, bg);
    p.circle_filled(body.center() + vec2(s * 0.18, 0.0), eye, bg);
}

/// The big "Contact the Developer" button. Returns true when clicked.
pub fn discord_button(ui: &mut egui::Ui, label: &str, size: egui::Vec2) -> bool {
    let (r, resp) = ui.allocate_exact_size(size, Sense::click());
    let resp = resp.on_hover_text(links::DISCORD).on_hover_cursor(egui::CursorIcon::PointingHand);
    let fill = if resp.hovered() { Color32::from_rgb(0x47, 0x52, 0xc4) } else { DISCORD };
    ui.painter().rect_filled(r, size.y / 2.0, fill);
    let icon = size.y * 0.5;
    let font = semibold((size.y * 0.42).max(11.0));
    let galley = crate::rtl::plain(ui.ctx(), label, font, Color32::WHITE);
    let total = icon + 8.0 + galley.size().x;
    let x0 = r.center().x - total / 2.0;
    paint_chat_icon(ui.painter(), pos2(x0 + icon / 2.0, r.center().y), icon, Color32::WHITE);
    ui.painter().galley(pos2(x0 + icon + 8.0, r.center().y - galley.size().y / 2.0), galley, Color32::WHITE);
    resp.clicked()
}

/// A text link that opens `url`. Returns true when clicked.
fn link(ui: &mut egui::Ui, text: &str, url: &str, color: Color32) -> bool {
    let resp = ui.add(egui::Label::new(egui::RichText::new(text).size(13.0).color(color).underline()).sense(Sense::click()));
    let resp = resp.on_hover_text(url).on_hover_cursor(egui::CursorIcon::PointingHand);
    resp.clicked()
}

pub fn show(app: &mut DesignApp, ctx: &egui::Context) {
    if !app.ui.about {
        return;
    }
    let t = Tokens::get(ctx);
    let mut open: Option<&'static str> = None;
    // Warsha: the About page only (the Contributors and Models tabs were removed).
    app.ui.about_tab = 0;
    let resp = egui::Modal::new(egui::Id::new("about")).show(ctx, |ui| {
        ui.set_width(if app.ui.about_tab == 0 { 460.0 } else { 640.0 });
        ui.horizontal(|ui| {
            for (i, l) in ABOUT_TABS.iter().take(1).enumerate() {
                let i = i as u8;
                if ui.selectable_label(app.ui.about_tab == i, crate::rtl::widget(ui, crate::i18n::tr(&app.ui.language, l))).clicked() {
                    app.ui.about_tab = i;
                }
            }
        });
        ui.separator();
        if app.ui.about_tab != 0 {
            let h = 400.0_f32.min(ctx.content_rect().height() * 0.7).max(160.0);
            ui.allocate_ui_with_layout(vec2(ui.available_width(), h), egui::Layout::top_down(egui::Align::Min), |ui| {
                ui.set_min_height(h);
                if app.ui.about_tab == 1 {
                    crate::credits::contributors_ui(ui);
                } else {
                    crate::credits::models_ui(ui);
                }
            });
            ui.separator();
            ui.vertical_centered(|ui| {
                if ui.button(crate::rtl::widget(ui, crate::i18n::tr(&app.ui.language, "  Close  "))).clicked() {
                    app.ui.about = false;
                }
            });
            return;
        }
        ui.vertical_centered(|ui| {
            ui.add_space(8.0);
            let (r, _) = ui.allocate_exact_size(vec2(72.0, 72.0), Sense::hover());
            paint_mark(ui, r, BRAND);
            ui.add_space(6.0);
            ui.label(crate::rtl::widget(
                ui,
                egui::RichText::new(crate::i18n::tr(&app.ui.language, "Nasaq")).font(semibold(26.0)).color(t.text_strong),
            ));
            crate::rtl::label(
                ui,
                egui::RichText::new(format!("{} {}", crate::i18n::tr(&app.ui.language, "Version"), env!("CARGO_PKG_VERSION")))
                    .size(12.0)
                    .color(t.text_dim),
            );
            // Arabic build (ورشة): the localisation credit.
            ui.hyperlink_to("تعريب وتطوير: محمد الشطي · malshatti.com", "https://malshatti.com");
            ui.hyperlink_to("info@malshatti.com", "mailto:info@malshatti.com");
            ui.add_space(4.0);
            ui.label(crate::rtl::widget(
                ui,
                egui::RichText::new(crate::i18n::tr(&app.ui.language, "Page layout for print and screen — fast, open and scriptable."))
                    .size(13.0)
                    .color(t.text),
            ));
            ui.label(crate::rtl::widget(
                ui,
                egui::RichText::new(crate::i18n::tr(&app.ui.language, "Part of Warsha."))
                    .size(12.0)
                    .color(t.text_dim),
            ));
            ui.add_space(16.0);
            if discord_button(ui, "Contact the Developer", vec2(300.0, 40.0)) {
                open = Some("discord");
            }
            ui.add_space(4.0);
            ui.label(crate::rtl::widget(
                ui,
                egui::RichText::new(crate::i18n::tr(&app.ui.language, "malshatti.com — help and feedback"))
                    .size(11.0)
                    .color(t.text_dim),
            ));
            ui.add_space(14.0);
            ui.horizontal(|ui| {
                // Centre the row of links.
                let w = 330.0;
                ui.add_space(((ui.available_width() - w) / 2.0).max(0.0));
                for (text, key) in
                    [("Nasaq page", "appPage"), ("GitHub", "github"), ("malshatti.com", "website"), ("Report an issue", "issues")]
                {
                    if link(ui, text, links::get(key).unwrap_or_default(), t.accent) {
                        open = Some(key);
                    }
                    ui.add_space(6.0);
                }
            });
            ui.add_space(16.0);
            ui.separator();
            ui.add_space(6.0);
            ui.label(crate::rtl::widget(
                ui,
                egui::RichText::new(crate::i18n::tr(&app.ui.language, "More Warsha apps")).font(semibold(12.0)).color(t.text_strong),
            ));
            ui.add_space(4.0);
            ui.horizontal(|ui| {
                let pad = ui.spacing().button_padding.x * 2.0 + ui.spacing().item_spacing.x;
                let w: f32 = SIBLINGS
                    .iter()
                    .map(|(_, n, _)| ui.painter().layout_no_wrap(n.to_string(), egui::FontId::proportional(12.0), Color32::WHITE).size().x + pad)
                    .sum::<f32>()
                    - ui.spacing().item_spacing.x;
                ui.add_space(((ui.available_width() - w) / 2.0).max(0.0));
                for (slug, name, what) in SIBLINGS {
                    let url = format!("{}/apps/{slug}", links::WEBSITE);
                    let b =
                        ui.add(egui::Button::new(egui::RichText::new(*name).size(12.0)).corner_radius(10.0)).on_hover_text(format!("{what} — {url}"));
                    if b.clicked() {
                        app.ui.pending_urls.push(url);
                    }
                }
            });
            ui.add_space(12.0);
            ui.label(crate::rtl::widget(
                ui,
                egui::RichText::new(crate::i18n::tr(&app.ui.language, "Open source. No telemetry.")).size(11.0).color(t.text_dim),
            ));
            ui.add_space(8.0);
            if ui.button(crate::rtl::widget(ui, crate::i18n::tr(&app.ui.language, "  Close  "))).clicked() {
                app.ui.about = false;
            }
        });
    });
    if resp.should_close() {
        app.ui.about = false;
    }
    if let Some(k) = open {
        let _ = app.run(&format!("help.{k}"), json!({}));
    }
}
