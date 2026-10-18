"""Patch epaint 0.36.2 fonts.rs: an Arabic fallback face at the end of every font family."""
import pathlib
import shutil

root = pathlib.Path(r"E:\warsha-ar\shared\epaint")
(root / "fonts").mkdir(exist_ok=True)
src = pathlib.Path(r"E:\warsha-ar\upstream\warsha-fonts\fonts\noto-sans-arabic")
shutil.copy(src / "NotoSansArabic.ttf", root / "fonts" / "NotoSansArabic.ttf")
shutil.copy(src / "OFL.txt", root / "fonts" / "NotoSansArabic-OFL.txt")

p = root / "src" / "text" / "fonts.rs"
s = p.read_text(encoding="utf-8")


def sub(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)


# Load the two Arabic faces next to the app's own fonts.
sub("""            let key = FontFaceKey::new();
            fonts_by_id.insert(key, font_face);
            fonts_by_name.insert(name.clone(), key);
        }

        Self {""", """            let key = FontFaceKey::new();
            fonts_by_id.insert(key, font_face);
            fonts_by_name.insert(name.clone(), key);
        }

        let mut arabic_fallback = [None, None];
        for (slot, (name, weight)) in arabic_fallback.iter_mut().zip(ARABIC_FALLBACK_FACES) {
            if fonts_by_name.contains_key(name) {
                continue;
            }
            let data = FontData::from_static(ARABIC_FALLBACK_FONT).tweak(FontTweak {
                scale: 1.04,
                coords: VariationCoords::new([("wght", weight)]),
                ..Default::default()
            });
            let blob = blob_from_font_data(&data);
            if let Ok(font_face) =
                FontFace::new(options, name.to_owned(), blob, data.index, data.tweak.clone())
            {
                let key = FontFaceKey::new();
                fonts_by_id.insert(key, font_face);
                fonts_by_name.insert(name.to_owned(), key);
                *slot = Some(key);
            }
        }

        Self {""")

sub("""            family_cache: Default::default(),
            shape_buffer: Some(harfrust::UnicodeBuffer::new()),
        }
    }""", """            family_cache: Default::default(),
            shape_buffer: Some(harfrust::UnicodeBuffer::new()),
            arabic_fallback,
        }
    }""")

sub("""    /// Recycled `harfrust` shaping buffer to avoid per-layout allocations.
    shape_buffer: Option<harfrust::UnicodeBuffer>,
}""", """    /// Recycled `harfrust` shaping buffer to avoid per-layout allocations.
    shape_buffer: Option<harfrust::UnicodeBuffer>,

    /// Noto Sans Arabic, regular and bold, appended to every family so Arabic
    /// labels never fall back to tofu (Arabic builds of the Warsha apps).
    arabic_fallback: [Option<FontFaceKey>; 2],
}""")

sub("""            let fonts: Vec<FontFaceKey> = fonts
                .iter()
                .map(|font_name| {
                    *self
                        .fonts_by_name
                        .get(font_name)
                        .unwrap_or_else(|| panic!("No font data found for {font_name:?}"))
                })
                .collect();
""", """            let mut keys: Vec<FontFaceKey> = fonts
                .iter()
                .map(|font_name| {
                    *self
                        .fonts_by_name
                        .get(font_name)
                        .unwrap_or_else(|| panic!("No font data found for {font_name:?}"))
                })
                .collect();

            // Bold families get the bold Arabic face, the rest the regular one.
            let bold = fonts.first().is_some_and(|name| {
                let name = name.to_ascii_lowercase();
                ["bold", "semibold", "heavy", "black", "strong"]
                    .iter()
                    .any(|w| name.contains(w))
            });
            let arabic = if bold {
                self.arabic_fallback[1].or(self.arabic_fallback[0])
            } else {
                self.arabic_fallback[0]
            };
            if let Some(arabic) = arabic
                && !keys.contains(&arabic)
            {
                keys.push(arabic);
            }
            let fonts = keys;
""")

# The font file and its names.
sub("""pub struct FontsImpl {""", """/// Arabic fallback font (SIL Open Font License, see `fonts/NotoSansArabic-OFL.txt`).
const ARABIC_FALLBACK_FONT: &[u8] = include_bytes!("../../fonts/NotoSansArabic.ttf");

/// Face names and `wght` values of the Arabic fallback faces.
const ARABIC_FALLBACK_FACES: [(&str, f32); 2] =
    [("warsha-arabic-ui", 400.0), ("warsha-arabic-ui-bold", 650.0)];

pub struct FontsImpl {""")

p.write_text(s, encoding="utf-8", newline="\n")

# Cargo.toml: deps + packaged files
c = root / "Cargo.toml"
cs = c.read_text(encoding="utf-8")
if "unicode-bidi" not in cs:
    cs = cs.replace("""[dependencies.unicode-segmentation]""", """[dependencies.unicode-bidi]
version = "0.3.18"

[dependencies.unicode-bidi-mirroring]
version = "0.4"

[dependencies.unicode-segmentation]""", 1)
c.write_text(cs, encoding="utf-8", newline="\n")
print("patched fonts + Cargo.toml")
