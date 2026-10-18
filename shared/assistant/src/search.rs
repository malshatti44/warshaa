//! Bilingual (Arabic / English) command search: BM25 over id, label, menu path and parameter doc.
//! Follows `assistant/eval/arsearch.py`; keep the two in step.

use std::collections::HashMap;

/// Arabic → English words that people use but labels rarely share (the labels give the rest).
const SYNONYMS: &[(&str, &str)] = &[
    ("تباين", "contrast"), ("سطوع", "brightness"), ("اضاءه", "brightness exposure"), ("اشراق", "brightness"),
    ("تعريض", "exposure"), ("تشبع", "saturation"), ("الوان", "color hue saturation"), ("لون", "color hue"),
    ("دفء", "temperature warm"), ("دافي", "warm"), ("دافيه", "warm"), ("بارد", "cool"), ("حده", "sharpen"),
    ("وضوح", "sharpen clarity"), ("تنعيم", "smooth blur"), ("ضبابيه", "blur"), ("تمويه", "blur"), ("قص", "crop"),
    ("اقتصاص", "crop"), ("تدوير", "rotate"), ("دور", "rotate"), ("قلب", "flip"), ("حجم", "size resize"),
    ("تكبير", "zoom enlarge"), ("تصغير", "zoom reduce"), ("طبقه", "layer"), ("طبقات", "layers"), ("نص", "text type"),
    ("كتابه", "text type"), ("خلفيه", "background"), ("ازاله", "remove"), ("حذف", "delete"), ("تحديد", "select selection"),
    ("قناع", "mask"), ("منحنيات", "curves"), ("مستويات", "levels"), ("ابيض", "white black"), ("اسود", "black white"),
    ("رمادي", "grayscale gray"), ("ضوضاء", "noise"), ("تشويش", "noise"), ("بقع", "spot healing"), ("ترميم", "healing"),
    ("شوايب", "spot healing blemish"), ("عيون", "red eye"), ("حفظ", "save"), ("تصدير", "export"), ("فتح", "open"),
    ("جديد", "new"), ("تراجع", "undo"), ("اعاده", "redo"), ("دمج", "merge flatten"), ("نسخ", "copy duplicate"),
    ("لصق", "paste"), ("فلتر", "filter"), ("تصفيه", "filter"), ("ازل", "remove"), ("شيل", "remove"), ("امسح", "delete erase"),
    ("زد", "increase"), ("زيد", "increase"), ("قلل", "reduce decrease"), ("خفف", "reduce"), ("حول", "convert"),
    ("صغر", "reduce resize size"), ("كبر", "enlarge resize size"), ("وجه", "skin portrait healing"), ("بشره", "skin healing"),
    ("مربع", "square crop"), ("عنوان", "title text type"), ("اضف", "add new"), ("صوت", "audio volume"), ("مقطع", "clip"),
    ("فيديو", "video clip"), ("موسيقى", "music audio"), ("شريحه", "slide"), ("شرايح", "slides"), ("جدول", "table"),
    ("خليه", "cell"), ("عمود", "column"), ("صف", "row"), ("صفحه", "page"), ("خط", "font line"), ("فقره", "paragraph"),
    ("ترقيم", "numbering list"), ("نقاط", "bullets list"), ("رسم", "draw shape"), ("شكل", "shape"), ("دايره", "circle ellipse"),
    ("مستطيل", "rectangle"), ("سهم", "arrow"), ("حركه", "animation motion"), ("انتقال", "transition"), ("ترجمه", "subtitle caption"),
];

const STOP: &[&str] = &[
    "the", "a", "an", "of", "to", "and", "or", "in", "on", "for", "with", "by", "في", "من", "علي", "الي", "عن", "مع", "او",
    "ثم", "هذا", "هذه", "ذلك", "التي", "الذي", "ان", "كل", "لو", "شوي", "ابي", "ابغي", "اريد", "ودي", "خل", "خلي", "سوي", "اعمل",
    "اجعل", "ممكن", "لي", "الصوره", "صوره",
];

fn is_arabic(c: char) -> bool {
    ('\u{0621}'..='\u{064a}').contains(&c)
}

fn is_diacritic(c: char) -> bool {
    matches!(c, '\u{0610}'..='\u{061a}' | '\u{064b}'..='\u{065f}' | '\u{0670}' | '\u{06d6}'..='\u{06ed}' | '\u{0640}')
}

/// Lower case, no diacritics, one form of alef / yaa / taa marbuta / hamza seats.
pub fn norm(s: &str) -> String {
    s.chars()
        .filter(|c| !is_diacritic(*c))
        .flat_map(char::to_lowercase)
        .map(|c| match c {
            'إ' | 'أ' | 'آ' | 'ٱ' => 'ا',
            'ى' | 'ئ' => 'ي',
            'ة' => 'ه',
            'ؤ' => 'و',
            c => c,
        })
        .collect()
}

/// Light Arabic stemming (the article, one-letter prefixes, common suffixes); English plural `s`.
fn stem(w: &str) -> String {
    let chars: Vec<char> = w.chars().collect();
    if chars.first().is_some_and(|c| is_arabic(*c)) {
        let mut s: &[char] = &chars;
        let prefixes: [&[char]; 6] = [&['و', 'ا', 'ل'], &['ب', 'ا', 'ل'], &['ك', 'ا', 'ل'], &['ف', 'ا', 'ل'], &['ل', 'ل'], &['ا', 'ل']];
        let mut stripped = false;
        for p in prefixes {
            if s.starts_with(p) && s.len() - p.len() >= 2 {
                s = &s[p.len()..];
                stripped = true;
                break;
            }
        }
        if !stripped && s.len() > 3 && matches!(s[0], 'و' | 'ب' | 'ف' | 'ل') {
            s = &s[1..];
        }
        let suffixes: [&[char]; 5] = [&['ا', 'ت'], &['و', 'ن'], &['ي', 'ن'], &['ه', 'ا'], &['ه']];
        for suf in suffixes {
            if s.ends_with(suf) && s.len() - suf.len() >= 3 {
                s = &s[..s.len() - suf.len()];
                break;
            }
        }
        s.iter().collect()
    } else if w.len() > 3 && w.ends_with('s') {
        w[..w.len() - 1].to_string()
    } else {
        w.to_string()
    }
}

/// Words of `s`: camelCase split, normalised, stop words out (not stemmed).
fn words(s: &str) -> Vec<String> {
    let mut spaced = String::with_capacity(s.len() + 8);
    let mut prev_lower = false;
    for c in s.chars() {
        if c.is_ascii_uppercase() && prev_lower {
            spaced.push(' ');
        }
        prev_lower = c.is_ascii_lowercase();
        spaced.push(c);
    }
    let n = norm(&spaced);
    let mut out = Vec::new();
    let mut cur = String::new();
    let mut cur_ar = false;
    let flush = |cur: &mut String, out: &mut Vec<String>| {
        if !cur.is_empty() {
            out.push(std::mem::take(cur));
        }
    };
    for c in n.chars() {
        let ar = is_arabic(c);
        let latin = c.is_ascii_alphanumeric();
        if ar || latin {
            if !cur.is_empty() && ar != cur_ar {
                flush(&mut cur, &mut out);
            }
            cur_ar = ar;
            cur.push(c);
        } else {
            flush(&mut cur, &mut out);
        }
    }
    flush(&mut cur, &mut out);
    out.retain(|w| !STOP.contains(&w.as_str()));
    out
}

pub fn tokens(s: &str) -> Vec<String> {
    words(s).iter().map(|w| stem(w)).collect()
}

fn query_tokens(q: &str) -> Vec<String> {
    let mut t = tokens(q);
    for w in words(q) {
        let st = stem(&w);
        if let Some((_, en)) = SYNONYMS.iter().find(|(ar, _)| *ar == w || *ar == st) {
            t.extend(tokens(en));
        }
    }
    t
}

/// One searchable entry: weighted text fields.
pub struct Doc {
    pub fields: Vec<(String, f32)>,
}

pub struct Index {
    tf: Vec<HashMap<String, f32>>,
    len: Vec<f32>,
    avg: f32,
    idf: HashMap<String, f32>,
}

impl Index {
    pub fn new(docs: &[Doc]) -> Self {
        let mut tf = Vec::with_capacity(docs.len());
        let mut len = Vec::with_capacity(docs.len());
        let mut df: HashMap<String, usize> = HashMap::new();
        for d in docs {
            let mut c: HashMap<String, f32> = HashMap::new();
            for (text, w) in &d.fields {
                for t in tokens(text) {
                    *c.entry(t).or_default() += w;
                }
            }
            for t in c.keys() {
                *df.entry(t.clone()).or_default() += 1;
            }
            len.push(c.values().sum());
            tf.push(c);
        }
        let n = docs.len() as f32;
        let avg = (len.iter().sum::<f32>() / n.max(1.0)).max(1.0);
        let idf = df.into_iter().map(|(t, k)| (t, (1.0 + (n - k as f32 + 0.5) / (k as f32 + 0.5)).ln())).collect();
        Self { tf, len, avg, idf }
    }

    /// Indices of the best `k` matches, best first.
    pub fn search(&self, q: &str, k: usize) -> Vec<usize> {
        let (k1, b) = (1.2f32, 0.6f32);
        let qt = query_tokens(q);
        let mut scored: Vec<(f32, usize)> = Vec::new();
        for (i, c) in self.tf.iter().enumerate() {
            let mut s = 0.0;
            for t in &qt {
                if let Some(f) = c.get(t) {
                    let idf = self.idf.get(t).copied().unwrap_or(0.0);
                    s += idf * f * (k1 + 1.0) / (f + k1 * (1.0 - b + b * self.len[i] / self.avg));
                }
            }
            if s > 0.0 {
                scored.push((s, i));
            }
        }
        scored.sort_by(|a, b| b.0.total_cmp(&a.0));
        scored.into_iter().take(k).map(|(_, i)| i).collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn index() -> (Vec<&'static str>, Index) {
        let rows = [
            ("image.adjustments.brightnessContrast", "Brightness/Contrast…", "السطوع/التباين…"),
            ("filter.blur.gaussianBlur", "Gaussian Blur…", "ضبابية غاوسية…"),
            ("image.crop", "Crop", "اقتصاص"),
            ("paint.spotHealing", "Spot Healing Brush", "فرشاة المعالجة الموضعية"),
            ("layer.removeBackground", "Remove Background", "إزالة الخلفية"),
        ];
        let docs: Vec<Doc> = rows
            .iter()
            .map(|(id, en, ar)| Doc { fields: vec![(id.to_string(), 3.0), (en.to_string(), 3.0), (ar.to_string(), 3.0)] })
            .collect();
        (rows.iter().map(|r| r.0).collect(), Index::new(&docs))
    }

    #[test]
    fn arabic_requests_find_their_commands() {
        let (ids, ix) = index();
        let top = |q: &str| ids[ix.search(q, 1)[0]];
        assert_eq!(top("زد التباين شوي"), "image.adjustments.brightnessContrast");
        assert_eq!(top("ضبابية"), "filter.blur.gaussianBlur");
        assert_eq!(top("قص الصورة"), "image.crop");
        assert_eq!(top("أزل الشوائب من الوجه"), "paint.spotHealing");
        assert_eq!(top("شيل الخلفية"), "layer.removeBackground");
    }

    #[test]
    fn normalisation() {
        assert_eq!(norm("إضاءةٌ"), "اضاءه");
        assert_eq!(tokens("brightnessContrast"), vec!["brightnes", "contrast"]);
    }
}
