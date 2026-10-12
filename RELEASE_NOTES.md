## ورشة WARSHA 1.0.0 — منصة تطبيقات إبداعية عربية

تطوير **محمد الشطي** — [malshatti.com](https://malshatti.com) — info@malshatti.com

### ماذا أحمّل؟
- **Warsha** (المكتبة الكاملة): تحتوي على جميع التطبيقات الاثني عشر، وتثبّت منها ما تريد بضغطة زر.
- أو حمّل أي تطبيق بشكل مستقل:

| التطبيق | الاسم في الملفات | الوصف |
|---|---|---|
| رتوش | Retoush | تحرير الصور والرسم بالطبقات |
| ريشة | Reesha | رسم متجهي وتصميم الشعارات |
| مونتير | Monteer | مونتاج الفيديو والعناوين والموسيقى |
| طيف | Tayf | تحميض الصور وتصحيح الألوان |
| وثيق | Watheeq | عرض ملفات PDF ودمجها وتقسيمها وتوقيعها |
| ومضة | Wamda | تصاميم سريعة للتواصل الاجتماعي |
| نسق | Nasaq | تنسيق الصفحات والمجلات والكتيبات |
| سطر | Satr | معالج نصوص (DOCX) |
| منبر | Minbar | العروض التقديمية (PPTX) |
| كشف | Kashf | الجداول الحسابية (XLSX) |
| مخطط | Mukhattat | الرسم الهندسي CAD (DXF) |
| صدى | Sada | تسجيل الصوت وتحريره (WAV/MP3) |

| النظام | الملف |
|---|---|
| ويندوز 10/11 | `*-Setup-1.0.0-win-x64.exe` |
| ماك (Apple Silicon M1–M4) | `*-1.0.0-mac-arm64.dmg` |
| ماك (Intel) | `*-1.0.0-mac-x64.dmg` |
| لينكس | `*-1.0.0-linux-x86_64.AppImage` أو `*_1.0.0_amd64.deb` |

### ملاحظات التثبيت (المثبّتات غير موقّعة رقميًا حاليًا)
- **ويندوز:** إذا ظهرت رسالة «Windows protected your PC» اضغط **More info** ثم **Run anyway**.
- **ماك:** اسحب التطبيق إلى Applications، ثم انقر عليه بزر الفأرة الأيمن ← **Open** ← **Open**. إذا ظهرت رسالة «تالف» نفّذ في الطرفية: `xattr -cr /Applications/اسم-التطبيق.app`
- **لينكس:** للـ AppImage: `chmod +x *.AppImage` ثم شغّله. للـ deb: `sudo apt install ./الملف.deb`

---

**English:** WARSHA is a suite of 12 offline creative apps with a native Arabic (RTL) and English interface. Download **Warsha** for the full library, or any single app. Installers are not code-signed yet — see the notes above to open them on first launch.
