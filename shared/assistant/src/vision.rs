//! Reading the text in a picture (a scanned page) with the assistant's model. A small vision model
//! reads a whole page poorly and a few lines well, so the page is cut into strips of three text
//! lines (measured: about 97% of characters right on a scanned Arabic page), each strip is read,
//! and the lines are put back together into paragraphs by where they sit on the page.

use serde_json::{Value, json};

use crate::config::Settings;
use crate::llm::{self, Endpoint, Provider};
use crate::local;

/// Text lines per request: fewer loses context, more makes the model skip words.
const LINES_PER_STRIP: usize = 3;

const PROMPT: &str = "Transcribe ALL the Arabic text in this image exactly as written, line by line, from the first word of each line to its last; do not skip or summarise any word. Output only the text, no translation, no comments, no numbering.";

/// Is there a model to read with: the local one downloaded, or a provider with a key?
pub fn ready() -> bool {
    let s = Settings::load();
    match s.provider {
        Provider::Local => local::installed(),
        p => s.has_key(p),
    }
}

/// The model to read with, from the assistant's settings (starting the local server if needed).
fn endpoint() -> Result<Endpoint, String> {
    let s = Settings::load();
    let p = s.provider;
    let mut ep = Endpoint { provider: p, local_base: String::new(), key: s.key(p), model: s.model(p), think: false };
    if p == Provider::Local {
        if !local::installed() {
            return Err("the assistant's model isn't downloaded yet: open the assistant panel and download it first".into());
        }
        let (base, key) = local::ensure_server(&|_| {})?;
        ep.local_base = base;
        ep.key = key;
    } else if !s.has_key(p) {
        return Err("the assistant has no key for its model: add one in the assistant's settings".into());
    }
    Ok(ep)
}

/// A greyscale picture.
struct Gray {
    w: usize,
    h: usize,
    px: Vec<u8>,
}

impl Gray {
    fn from_rgba(w: u32, h: u32, rgba: &[u8]) -> Self {
        let px = rgba
            .chunks_exact(4)
            .map(|p| {
                // Transparent counts as paper.
                let a = u32::from(p[3]);
                let l = (299 * u32::from(p[0]) + 587 * u32::from(p[1]) + 114 * u32::from(p[2])) / 1000;
                ((l * a + 255 * (255 - a)) / 255) as u8
            })
            .collect();
        Self { w: w as usize, h: h as usize, px }
    }

    fn at(&self, x: usize, y: usize) -> u8 {
        self.px.get(y * self.w + x).copied().unwrap_or(255)
    }

    /// The part `[x0, x1) × [y0, y1)` as a PNG.
    fn png(&self, x0: usize, y0: usize, x1: usize, y1: usize) -> Result<Vec<u8>, String> {
        let (w, h) = (x1.saturating_sub(x0).max(1), y1.saturating_sub(y0).max(1));
        let mut data = Vec::with_capacity(w * h);
        for y in y0..y0 + h {
            for x in x0..x0 + w {
                data.push(self.at(x, y));
            }
        }
        let mut out = Vec::new();
        {
            let mut enc = png::Encoder::new(&mut out, w as u32, h as u32);
            enc.set_color(png::ColorType::Grayscale);
            enc.set_depth(png::BitDepth::Eight);
            let mut wr = enc.write_header().map_err(|e| e.to_string())?;
            wr.write_image_data(&data).map_err(|e| e.to_string())?;
        }
        Ok(out)
    }
}

/// One line of text on the page: its rows and its ink's left and right edges.
#[derive(Clone, Copy, Debug)]
struct Band {
    y0: usize,
    y1: usize,
    x0: usize,
    x1: usize,
}

/// The text lines: rows with ink, merged across gaps smaller than a line's spacing.
fn bands(g: &Gray) -> Vec<Band> {
    let mean = g.px.iter().map(|&p| u64::from(p)).sum::<u64>() / g.px.len().max(1) as u64;
    // Ink is clearly darker than the paper; a grey scan's paper is darker too.
    let dark = if mean >= 200 { 160 } else { (mean as u8).saturating_sub(40).max(60) };
    let ink_row: Vec<usize> = (0..g.h).map(|y| (0..g.w).step_by(2).filter(|&x| g.at(x, y) < dark).count()).collect();
    let threshold = (g.w / 400).max(2);
    let min_gap = 6;
    let mut out = Vec::new();
    let (mut start, mut gap) = (None::<usize>, 0usize);
    for (y, &n) in ink_row.iter().enumerate() {
        if n > threshold {
            start.get_or_insert(y);
            gap = 0;
        } else if let Some(s) = start {
            gap += 1;
            if gap > min_gap {
                out.push((s, y - gap));
                start = None;
                gap = 0;
            }
        }
    }
    if let Some(s) = start {
        out.push((s, g.h - 1));
    }
    let min_height = (g.h / 300).max(6);
    out.into_iter()
        .filter(|(a, b)| b - a >= min_height)
        .map(|(y0, y1)| {
            let has_ink = |x: usize| (y0..=y1).step_by(2).any(|y| g.at(x, y) < dark);
            let x0 = (0..g.w).find(|&x| has_ink(x)).unwrap_or(0);
            let x1 = (0..g.w).rev().find(|&x| has_ink(x)).unwrap_or(g.w.saturating_sub(1));
            Band { y0, y1, x0, x1 }
        })
        .collect()
}

/// The model's reading of a strip, one entry per non-empty line.
fn read_strip(ep: &Endpoint, png: &[u8]) -> Result<Vec<String>, String> {
    use base64::Engine as _;
    let url = format!("data:image/png;base64,{}", base64::engine::general_purpose::STANDARD.encode(png));
    let messages = [json!({"role": "user", "content": [{"type": "text", "text": PROMPT}, {"type": "image_url", "image_url": {"url": url}}]})];
    let reply = llm::complete_at(ep, &messages, &[], 0.0)?;
    let text = reply.get("content").and_then(Value::as_str).unwrap_or("");
    Ok(text
        .lines()
        .map(|l| l.trim().trim_start_matches(['-', '•', '*']).trim())
        .filter(|l| !l.is_empty() && !l.starts_with("```"))
        .map(str::to_string)
        .collect())
}

fn is_rtl(text: &str) -> bool {
    text.chars().find(|c| c.is_alphabetic()).is_some_and(|c| matches!(c, '\u{0590}'..='\u{08FF}' | '\u{FB1D}'..='\u{FDFF}' | '\u{FE70}'..='\u{FEFF}'))
}

/// Tanween al-fath written on the final letter (شكراً, not شكرًا).
fn tidy(text: &str) -> String {
    text.replace("\u{064B}\u{0627}", "\u{0627}\u{064B}").replace("\u{064B}\u{0649}", "\u{0649}\u{064B}")
}

/// Read the text of a page picture (RGBA, any resolution; about 200 dpi reads best). Returns its
/// paragraphs. `progress(done, total)` follows the strips; returning `false` stops.
pub fn read_rgba(width: u32, height: u32, rgba: &[u8], progress: &mut dyn FnMut(usize, usize) -> bool) -> Result<Vec<String>, String> {
    if rgba.len() < (width as usize) * (height as usize) * 4 || width == 0 || height == 0 {
        return Err("the picture is empty".into());
    }
    let g = Gray::from_rgba(width, height, rgba);
    let lines = bands(&g);
    if lines.is_empty() {
        return Ok(Vec::new());
    }
    let ep = endpoint()?;
    let left = lines.iter().map(|b| b.x0).min().unwrap_or(0);
    let right = lines.iter().map(|b| b.x1).max().unwrap_or(g.w - 1);
    let (cx0, cx1) = (left.saturating_sub(20), (right + 20).min(g.w));
    let pad = |y: usize| y.saturating_sub(12);
    let strips: Vec<&[Band]> = lines.chunks(LINES_PER_STRIP).collect();
    let mut texts: Vec<Option<String>> = vec![None; lines.len()];
    for (k, strip) in strips.iter().enumerate() {
        if !progress(k, strips.len()) {
            return Err("stopped".into());
        }
        let (y0, y1) = (pad(strip[0].y0), (strip[strip.len() - 1].y1 + 12).min(g.h));
        let mut read = read_strip(&ep, &g.png(cx0, y0, cx1, y1)?)?;
        // A line short: the model skipped one; read the strip's lines one by one.
        if read.len() != strip.len() && strip.len() > 1 {
            read = Vec::new();
            for b in strip.iter() {
                let one = read_strip(&ep, &g.png(cx0, pad(b.y0), cx1, (b.y1 + 12).min(g.h))?)?;
                read.push(one.join(" "));
            }
        }
        let first = k * LINES_PER_STRIP;
        for (i, t) in read.into_iter().take(strip.len()).enumerate() {
            if let Some(slot) = texts.get_mut(first + i) {
                *slot = Some(tidy(&t));
            }
        }
    }
    // A line much shorter than its ink (letters per pixel well under the page's usual) lost words:
    // read it again on its own and keep the longer reading.
    let density: Vec<Option<f64>> =
        (0..lines.len()).map(|i| texts[i].as_ref().map(|t| t.chars().count() as f64 / (lines[i].x1 - lines[i].x0).max(1) as f64)).collect();
    let mut d: Vec<f64> = density.iter().flatten().copied().filter(|v| *v > 0.0).collect();
    d.sort_by(f64::total_cmp);
    if let Some(&usual) = d.get(d.len() / 2) {
        for i in 0..lines.len() {
            if density[i].is_some_and(|v| v < usual * 0.8) {
                let b = lines[i];
                let again = read_strip(&ep, &g.png(cx0, pad(b.y0), cx1, (b.y1 + 12).min(g.h))?)?.join(" ");
                if again.chars().count() > texts[i].as_ref().map_or(0, |t| t.chars().count()) {
                    texts[i] = Some(tidy(&again));
                }
            }
        }
    }
    let _ = progress(strips.len(), strips.len());
    Ok(paragraphs(&lines, &texts, cx0, cx1))
}

/// Lines back into paragraphs: a wider gap than the usual line spacing, or a line that stops short
/// of the column's far edge (the left one for right-to-left text), ends a paragraph.
fn paragraphs(lines: &[Band], texts: &[Option<String>], cx0: usize, cx1: usize) -> Vec<String> {
    let mut gaps: Vec<usize> = lines.windows(2).map(|w| w[1].y0.saturating_sub(w[0].y1)).collect();
    gaps.sort_unstable();
    // Line spacing: the lower quartile (on a page of short paragraphs most gaps are paragraph gaps).
    let usual = gaps.get(gaps.len() / 4).copied().unwrap_or(0).max(1) as f64;
    let width = (cx1 - cx0).max(1) as f64;
    let mut out: Vec<String> = Vec::new();
    let mut current = String::new();
    for (i, b) in lines.iter().enumerate() {
        let Some(text) = texts.get(i).cloned().flatten().filter(|t| !t.is_empty()) else { continue };
        if !current.is_empty() {
            current.push(' ');
        }
        current.push_str(&text);
        let ends = match lines.get(i + 1) {
            None => true,
            Some(next) => {
                let gap = next.y0.saturating_sub(b.y1) as f64;
                let short = if is_rtl(&text) { b.x0.saturating_sub(cx0) } else { cx1.saturating_sub(b.x1) } as f64;
                gap > usual * 1.6 || short > width * 0.15
            }
        };
        if ends {
            out.push(std::mem::take(&mut current));
        }
    }
    if !current.is_empty() {
        out.push(current);
    }
    out
}

/// [`read_rgba`] for a PNG file's bytes.
pub fn read_png(png_bytes: &[u8], progress: &mut dyn FnMut(usize, usize) -> bool) -> Result<Vec<String>, String> {
    let mut dec = png::Decoder::new(std::io::Cursor::new(png_bytes));
    dec.set_transformations(png::Transformations::EXPAND | png::Transformations::STRIP_16);
    let mut r = dec.read_info().map_err(|e| e.to_string())?;
    let mut buf = vec![0; r.output_buffer_size()];
    let info = r.next_frame(&mut buf).map_err(|e| e.to_string())?;
    let (w, h) = (info.width, info.height);
    let n = (w as usize) * (h as usize);
    let rgba: Vec<u8> = match info.color_type {
        png::ColorType::Rgba => buf[..n * 4].to_vec(),
        png::ColorType::Rgb => buf[..n * 3].chunks_exact(3).flat_map(|p| [p[0], p[1], p[2], 255]).collect(),
        png::ColorType::GrayscaleAlpha => buf[..n * 2].chunks_exact(2).flat_map(|p| [p[0], p[0], p[0], p[1]]).collect(),
        _ => buf[..n].iter().flat_map(|&v| [v, v, v, 255]).collect(),
    };
    read_rgba(w, h, &rgba, progress)
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Three dark stripes as three text lines; the middle one stops short on the left (RTL end).
    #[test]
    fn finds_lines_and_paragraphs() {
        let (w, h) = (400u32, 200u32);
        let mut rgba = vec![255u8; (w * h * 4) as usize];
        let mut stripe = |y0: u32, y1: u32, x0: u32, x1: u32| {
            for y in y0..y1 {
                for x in x0..x1 {
                    let i = ((y * w + x) * 4) as usize;
                    rgba[i..i + 3].copy_from_slice(&[0, 0, 0]);
                }
            }
        };
        stripe(20, 40, 20, 380);
        stripe(60, 80, 200, 380);
        stripe(100, 120, 20, 380);
        let g = Gray::from_rgba(w, h, &rgba);
        let b = bands(&g);
        assert_eq!(b.len(), 3, "{b:?}");
        let texts = vec![Some("أ ب".to_string()), Some("ج د".to_string()), Some("هـ و".to_string())];
        let p = paragraphs(&b, &texts, 0, 400);
        assert_eq!(p, vec!["أ ب ج د".to_string(), "هـ و".to_string()]);
    }

    #[test]
    fn tanween_goes_on_the_last_letter() {
        assert_eq!(tidy("ظهرًا شكرًا"), "ظهراً شكراً");
    }
}
