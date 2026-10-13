<div dir="rtl">

# ورشة WARSHA

**منصة عربية من ١٢ تطبيقاً إبداعياً ومكتبياً مفتوح المصدر، معرّبة بالكامل وتدعم الكتابة من اليمين إلى اليسار.**

تعريب وتطوير: **محمد الشطي** — [malshatti.com](https://malshatti.com) — [info@malshatti.com](mailto:info@malshatti.com)

| التطبيق | الاسم اللاتيني | الاستخدام | مبني على |
|---|---|---|---|
| ريتوش | Retoush | تحرير الصور | PhotoCraft |
| ريشة | Reesha | الرسم المتجهي | VectorCraft |
| مونتير | Monteer | مونتاج الفيديو | FilmCraft |
| طيف | Tayf | مكتبة الصور ومعالجة RAW | LightCraft |
| وثيق | Watheeq | ملفات PDF | PdfCraft |
| ومضة | Wamda | الرسوم المتحركة والمؤثرات | EffectCraft |
| نسق | Nasaq | تنسيق الصفحات والنشر | DesignCraft |
| سطر | Satr | معالجة النصوص | WordCraft |
| منبر | Minbar | العروض التقديمية | DeckCraft |
| كشف | Kashf | الجداول الحسابية | GridCraft |
| مخطط | Mukhattat | التصميم الهندسي CAD | CADCraft |
| صدى | Sada | تحرير الصوت | SoundCraft |
| **ورشة** | Warsha | منصة تثبيت التطبيقات وتحديثها | ArtCraft Launcher |

## التنزيل والتثبيت

من صفحة التطبيقات في موقعي: **[malshatti.com/apps](https://malshatti.com/apps/)**، أو من [إصدارات GitHub](https://github.com/malshatti44/warshaa/releases).
الواجهة بالعربية افتراضياً، ويمكن التحويل إلى الإنجليزية من إعدادات اللغة في كل تطبيق.

### ويندوز (10/11، 64 بت)

- **`Warsha-Suite-Setup-<الإصدار>-x64.exe`**: مثبّت واحد يضم كل التطبيقات، تختار منها ما تريد تثبيته.
- **`<الاسم>-Setup-<الإصدار>-x64.exe`**: مثبّت كل تطبيق على حدة (معالج تثبيت عربي، مع خيار الإنجليزية).
- **`<المعرّف>-<الإصدار>-windows-x64-portable.zip`**: نسخة محمولة بلا تثبيت (وهي ما تستخدمه منصة ورشة للتثبيت والتحديث).
- **`SHA256SUMS.txt`**: بصمات SHA-256 للتحقق من سلامة الملفات.

الملفات غير موقّعة رقمياً حالياً، لذلك قد يظهر تحذير SmartScreen عند أول تشغيل: اختر «مزيد من المعلومات» ثم «تشغيل على أي حال».
تحقق من البصمة في PowerShell:

```powershell
Get-FileHash .\Warsha-Suite-Setup-1.0.0-x64.exe -Algorithm SHA256
```

### ماك (macOS 11 أو أحدث، Apple silicon و Intel)

- **`Warsha-Suite-<الإصدار>-macos-universal.dmg`**: قرص يضم كل التطبيقات؛ اسحب ما تريد منها إلى «التطبيقات».
- **`<المعرّف>-<الإصدار>-macos-universal.dmg`**: قرص لكل تطبيق على حدة (وهو ما تستخدمه منصة ورشة على ماك).

التطبيقات غير موثّقة من Apple بعد، لذا عند أول فتح: انقر بزر الفأرة الأيمن على التطبيق ثم «فتح»، أو من
«إعدادات النظام ← الخصوصية والأمن» اختر «فتح على أي حال». ويمكن أيضاً من الطرفية:

```bash
xattr -cr "/Applications/ورشة.app"
```

### لينكس (x86_64، أوبونتو 22.04 أو أحدث وما يماثلها)

- **`Warsha-Suite-<الإصدار>-linux-x86_64.tar.gz`**: كل التطبيقات بصيغة AppImage؛ فكّ الضغط ثم شغّل `./install.sh` لتثبيتها في `~/Applications` وإضافتها إلى قائمة البرامج.
- **`<المعرّف>-<الإصدار>-linux-x86_64.AppImage`**: تطبيق واحد يعمل مباشرة بعد `chmod +x` (وهو ما تستخدمه منصة ورشة على لينكس).
- **`<المعرّف>-<الإصدار>-linux-x86_64.deb`**: لأوبونتو وديبيان: `sudo apt install ./<الملف>.deb`.
- **`<المعرّف>-<الإصدار>-linux-x86_64.tar.gz`**: الملفات كما هي لمن يفضّل التثبيت اليدوي.

تحقق من الملفات ببصماتها المنشورة معها (`SHA256SUMS.txt`): `sha256sum -c SHA256SUMS.txt --ignore-missing` (أو `shasum -a 256 -c` على ماك).

## ما الذي تغيّر عن المشروع الأصلي

- تعريب كامل لواجهات التطبيقات الاثني عشر والمنصة (أكثر من ٢١ ألف نص)، مع صيغ الجمع العربية الست.
- دعم ثنائي الاتجاه (Unicode Bidi) في محرك النصوص `shared/epaint` حتى تُقرأ الجمل العربية والمختلطة بترتيبها الصحيح، مع خط IBM Plex Sans Arabic.
- طبقة ترجمة في `shared/egui` لتطبيقَي منبر وصدى اللذين لم يكن لهما نظام ترجمة.
- أسماء وأيقونات وعلامة «ورشة» الجديدة بدل علامات ArtCraft التجارية، كما تشترط رخصة العلامة.

## البناء من المصدر

يتطلب Rust (MSVC) على ويندوز:

```bash
bash packaging/build_release.sh               # بناء التطبيقات
python packaging/package.py --version 1.0.0   # الحزم والمثبّتات (يتطلب Inno Setup 6)
```

وعلى ماك ولينكس، بعد `cargo build --release` لكل تطبيق ووضع الملفات التنفيذية في مجلد واحد:

```bash
python packaging/package_unix.py --os macos --bin-dir <المجلد>   # ‎.dmg لكل تطبيق وللحزمة الشاملة
python packaging/package_unix.py --os linux --bin-dir <المجلد>   # AppImage و‎.deb و‎.tar.gz (يتطلب appimagetool)
```

ويبني GitHub Actions (`.github/workflows/warsha2.yml`) كل التطبيقات على الأنظمة الثلاثة ويحزمها مع كل تعديل؛
الحزم متاحة للتنزيل من صفحة كل تشغيل (`warsha2-windows` و`warsha2-macos` و`warsha2-linux`)، ودفع وسم `v2.*`
يجمعها في مسودة إصدار على GitHub تُنشر بعد مراجعتها.

كل تطبيق في `apps/<المستودع>`، والمكتبات المعدّلة المشتركة في `shared/`، وأدوات الترجمة وذاكرتها في `i18n/`.

## الترخيص والإسناد

هذا المشروع نسخة عربية معدّلة من [تطبيقات Craft مفتوحة المصدر](https://github.com/storytold) لفريق ArtCraft،
المرخّصة بموجب **MIT أو Apache-2.0** حسب اختيارك. ملفات الترخيص الأصلية `LICENSE-MIT` و`LICENSE-APACHE` و`NOTICE`
محفوظة في كل مجلد تحت `apps/`. ورشة **ليست منتجاً من فريق ArtCraft** ولا يتبنّاها الفريق، وقد استُبدلت علاماته التجارية
(الاسم والشعار) بعلامة ورشة كما تشترط شروطه للنسخ المعدّلة.

</div>

---

# Warsha (ورشة)

An Arabic suite of 12 open-source creative and office apps, fully localized with right-to-left text support.
Arabic edition and development: **Mohammed Al-Shatti** — [malshatti.com](https://malshatti.com) — info@malshatti.com

Warsha is a modified Arabic edition of the open-source [Craft apps](https://github.com/storytold) by the ArtCraft team
(MIT OR Apache-2.0). It is **not an ArtCraft product** and is not endorsed by the ArtCraft Team; the ArtCraft marks were
removed and replaced with Warsha's own, as their brand terms require for modified versions. Each app's original
`LICENSE-MIT`, `LICENSE-APACHE` and `NOTICE` are kept under `apps/<repo>/`.

Downloads: **[malshatti.com/apps](https://malshatti.com/apps/)** or [GitHub releases](https://github.com/malshatti44/warshaa/releases).

- Windows 10/11 x64: the suite installer, one installer per app (Arabic wizard) and portable zips.
- macOS 11+ (universal, Apple silicon and Intel): one `.dmg` per app and a suite `.dmg`.
- Linux x86_64: one AppImage, `.deb` and `.tar.gz` per app, and a suite `.tar.gz` with `install.sh`.

SHA-256 checksums are published next to the files. Builds are not code-signed or notarized yet. GitHub Actions
(`.github/workflows/warsha2.yml`) builds and packages every app for all three systems; a `v2.*` tag collects the
packages into a draft release.
