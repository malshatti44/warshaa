//! Right-to-left text (Arabic, Hebrew, Persian, Urdu) in laid-out rows.
//!
//! Added for the Arabic builds of the Craft apps (تعريب وتطوير: محمد الشطي).
//!
//! Upstream epaint 0.36 shapes every font run with HarfRust, so the letters of an
//! Arabic word join and read right to left, but it places the runs of a line left to
//! right in logical order: «حفظ الملف» came out as «الملف حفظ». Here every laid-out
//! row is reordered into visual order with the Unicode Bidirectional Algorithm
//! (UAX #9, rules L1 and L2), after line breaking so wrapped paragraphs keep their
//! reading order from row to row.
//!
//! [`super::text_layout`] splits font runs wherever right-to-left letters start or
//! stop, so the glyphs of one right-to-left run (an *atom*) are already in visual
//! order and move as one block; every other glyph moves on its own.

use std::ops::Range;
use std::sync::atomic::{AtomicBool, Ordering};

use unicode_bidi::{BidiClass, Level, ParagraphBidiInfo, bidi_class};

use super::Glyph;

static PREFER_RTL: AtomicBool = AtomicBool::new(false);

/// Lay out every paragraph that contains right-to-left letters with a right-to-left
/// base direction, even when it starts with a Latin word or a number.
///
/// Apps turn this on while their interface language is Arabic, so that a label such
/// as «PDF ملفات» reads in Arabic order. With it off, the first strong letter of the
/// paragraph decides (the UAX #9 default).
pub fn set_prefer_rtl(prefer: bool) {
    PREFER_RTL.store(prefer, Ordering::Relaxed);
}

/// See [`set_prefer_rtl`].
pub fn prefer_rtl() -> bool {
    PREFER_RTL.load(Ordering::Relaxed)
}

static REORDER: AtomicBool = AtomicBool::new(true);

/// Turn row reordering off (shaping is unchanged) for an app that already puts its
/// right-to-left text into visual order itself, which would otherwise be reversed twice.
pub fn set_reorder(on: bool) {
    REORDER.store(on, Ordering::Relaxed);
}

/// See [`set_reorder`].
pub fn reorder() -> bool {
    REORDER.load(Ordering::Relaxed)
}

/// A strong right-to-left letter (bidi class R or AL).
#[inline]
pub(crate) fn is_rtl_char(c: char) -> bool {
    // Fast path: nothing below U+0590 is right-to-left.
    (c as u32) >= 0x0590 && matches!(bidi_class(c), BidiClass::R | BidiClass::AL)
}

/// Marks and joiners that belong to the glyph before them.
#[inline]
fn is_attached(c: char) -> bool {
    matches!(bidi_class(c), BidiClass::NSM | BidiClass::BN)
}

/// The glyph to draw for `c` on a right-to-left level: `(` becomes `)` and so on.
#[inline]
pub(crate) fn mirrored(c: char) -> Option<char> {
    unicode_bidi_mirroring::get_mirrored(c)
}

/// Whether the paragraph made of these rows needs reordering, and if so whether its
/// base direction is right to left.
pub(crate) fn paragraph_direction<'a>(
    mut glyphs: impl Iterator<Item = &'a Glyph>,
) -> Option<bool> {
    let mut first_strong_rtl = None;
    let mut has_rtl = false;
    for g in glyphs.by_ref() {
        let rtl = is_rtl_char(g.chr);
        has_rtl |= rtl;
        if first_strong_rtl.is_none() {
            if rtl {
                first_strong_rtl = Some(true);
            } else if bidi_class(g.chr) == BidiClass::L {
                first_strong_rtl = Some(false);
            }
        }
        if has_rtl && first_strong_rtl.is_some() {
            break;
        }
    }
    if !has_rtl {
        return None;
    }
    Some(prefer_rtl() || first_strong_rtl.unwrap_or(true))
}

/// A block of glyphs that moves as one: a right-to-left run (`atom`) or a single
/// glyph with any marks attached to it.
#[derive(Clone, Debug)]
pub(crate) struct Unit {
    pub range: Range<usize>,
    pub atom: bool,
}

pub(crate) fn units(glyphs: &[Glyph]) -> Vec<Unit> {
    let mut out: Vec<Unit> = Vec::with_capacity(glyphs.len());
    for (i, g) in glyphs.iter().enumerate() {
        let c = g.chr;
        if is_rtl_char(c) {
            if let Some(last) = out.last_mut()
                && last.atom
                && last.range.end == i
            {
                last.range.end = i + 1;
            } else {
                out.push(Unit { range: i..i + 1, atom: true });
            }
        } else if is_attached(c) {
            let next_is_rtl = glyphs.get(i + 1).is_some_and(|n| is_rtl_char(n.chr));
            match out.last_mut() {
                Some(last) if last.atom || !next_is_rtl => last.range.end = i + 1,
                _ => out.push(Unit { range: i..i + 1, atom: next_is_rtl }),
            }
        } else {
            out.push(Unit { range: i..i + 1, atom: false });
        }
    }
    out
}

/// Embedding level of every glyph of a row (after rule L1), or `None` when the row
/// stays left to right as it is.
pub(crate) fn glyph_levels(glyphs: &[Glyph], units: &[Unit], base_rtl: bool) -> Option<Vec<Level>> {
    // One char per glyph: atoms are all right to left (their glyphs are in visual
    // order, so their own chars would be backwards), the rest keep their class.
    let mut text = String::with_capacity(glyphs.len() * 2);
    for unit in units {
        for g in glyphs.get(unit.range.clone()).unwrap_or_default() {
            text.push(if unit.atom { '\u{05D0}' } else { sanitize(g.chr) });
        }
    }
    let base = if base_rtl { Level::rtl() } else { Level::ltr() };
    let info = ParagraphBidiInfo::new(&text, Some(base));
    let levels = info.reordered_levels_per_char(0..text.len());
    if levels.len() != glyphs.len() {
        return None;
    }
    if levels.iter().all(|l| l.number() == 0) {
        return None;
    }
    Some(levels)
}

/// Paragraph separators would split the bidi paragraph; a row never holds one, but
/// a stray glyph for one must not change the char count either.
#[inline]
fn sanitize(c: char) -> char {
    match bidi_class(c) {
        BidiClass::B => ' ',
        _ => c,
    }
}

/// Rule L2: the visual order of the units, given each unit's level.
pub(crate) fn visual_order(levels: &[u8]) -> Vec<usize> {
    let mut order: Vec<usize> = (0..levels.len()).collect();
    let Some(&max) = levels.iter().max() else {
        return order;
    };
    let Some(min_odd) = levels.iter().copied().filter(|l| l % 2 == 1).min() else {
        return order;
    };
    let mut level = max;
    while level >= min_odd {
        let mut i = 0;
        while i < order.len() {
            if levels[order[i]] >= level {
                let start = i;
                while i < order.len() && levels[order[i]] >= level {
                    i += 1;
                }
                order[start..i].reverse();
            } else {
                i += 1;
            }
        }
        if level == 0 {
            break;
        }
        level -= 1;
    }
    order
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn l2_reverses_rtl_runs() {
        // Arabic word, space, Arabic word on an RTL base: fully reversed.
        assert_eq!(visual_order(&[1, 1, 1]), vec![2, 1, 0]);
        // Number inside Arabic: the number keeps its own order.
        assert_eq!(visual_order(&[1, 1, 2, 2, 1]), vec![4, 2, 3, 1, 0]);
        // LTR base with an Arabic island.
        assert_eq!(visual_order(&[0, 0, 1, 1, 1, 0]), vec![0, 1, 4, 3, 2, 5]);
        assert_eq!(visual_order(&[0, 0]), vec![0, 1]);
    }

    #[test]
    fn classes() {
        assert!(is_rtl_char('ح'));
        assert!(is_rtl_char('א'));
        assert!(!is_rtl_char('a'));
        assert!(!is_rtl_char('١')); // Arabic-Indic digit: AN, not a letter
        assert_eq!(mirrored('('), Some(')'));
        assert_eq!(mirrored('«'), Some('»'));
    }
}
