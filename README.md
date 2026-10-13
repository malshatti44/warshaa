<div dir="rtl">

# ورشة WARSHA

**منصة عربية من ١٢ تطبيقًا إبداعيًا ومكتبيًا مفتوح المصدر، معرّبة بالكامل وتدعم الكتابة من اليمين إلى اليسار.**

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

## التنزيل والتثبيت (ويندوز 10/11، 64 بت)

من صفحة [الإصدارات](https://github.com/malshatti44/warshaa/releases):

- **`Warsha-Suite-Setup-<الإصدار>-x64.exe`**: مثبّت واحد يضم كل التطبيقات، تختار منها ما تريد تثبيته.
- **`<الاسم>-Setup-<الإصدار>-x64.exe`**: مثبّت كل تطبيق على حدة (معالج تثبيت عربي، مع خيار الإنجليزية).
- **`<المعرّف>-<الإصدار>-windows-x64-portable.zip`**: نسخة محمولة بلا تثبيت (وهي ما تستخدمه منصة ورشة للتثبيت والتحديث).
- **`SHA256SUMS.txt`**: بصمات SHA-256 للتحقق من سلامة الملفات.

الملفات غير موقّعة رقميًا حاليًا، لذلك قد يظهر تحذير SmartScreen عند أول تشغيل: اختر «مزيد من المعلومات» ثم «تشغيل على أي حال».
تحقق من البصمة في PowerShell:

```powershell
Get-FileHash .\Warsha-Suite-Setup-1.0.0-x64.exe -Algorithm SHA256
```

الواجهة بالعربية افتراضيًا، ويمكن التحويل إلى الإنجليزية من إعدادات اللغة في كل تطبيق.

**لينكس وماك:** الشيفرة تُبنى عليهما، لكن الحزم الجاهزة لهما لم تُنشر بعد.

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

كل تطبيق في `apps/<المستودع>`، والمكتبات المعدّلة المشتركة في `shared/`، وأدوات الترجمة وذاكرتها في `i18n/`.

## الترخيص والإسناد

هذا المشروع نسخة عربية معدّلة من [تطبيقات Craft مفتوحة المصدر](https://github.com/storytold) لفريق ArtCraft،
المرخّصة بموجب **MIT أو Apache-2.0** حسب اختيارك. ملفات الترخيص الأصلية `LICENSE-MIT` و`LICENSE-APACHE` و`NOTICE`
محفوظة في كل مجلد تحت `apps/`. ورشة **ليست منتجًا من فريق ArtCraft** ولا يتبنّاها الفريق، وقد استُبدلت علاماته التجارية
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

Downloads (Windows x64): see [Releases](https://github.com/malshatti44/warshaa/releases) — the suite installer, one
installer per app (Arabic wizard), portable zips, and `SHA256SUMS.txt`. Builds are not code-signed yet.
