"""Build the Warsha pages for malshatti.com/apps/ (Arabic first, English toggle like the rest of the
site), the launcher feed (release_info.json) and the downloads list, from the packaged builds.

  python build_site.py        -> site/out/apps/
"""
import datetime
import hashlib
import html
import json
import pathlib
import re
import shutil

from apps_data import APPS, LAUNCHER, VERSION

HERE = pathlib.Path(__file__).parent
ROOT = HERE.parent
DIST = ROOT / "dist"
LIVE = HERE / "live"
OUT = HERE / "out" / "apps"
BASE = "https://malshatti.com/apps/"
ICONS = ROOT / "icons" / "apps"


def esc(s):
    return html.escape(s, quote=True)


def t(ar, en, tag="span", cls=""):
    c = f' class="{cls}"' if cls else ""
    return f'<{tag}{c} data-ar="{esc(ar)}" data-en="{esc(en)}">{esc(ar)}</{tag}>'


def ar_digits(s):
    """Sizes and versions keep Western digits, like the rest of the technical details."""
    return s


def size_mb(n):
    return f"{n / 1e6:.0f}"


def sums():
    out = {}
    for line in (DIST / "SHA256SUMS.txt").read_text(encoding="utf-8").splitlines():
        h, _, name = line.partition("  ")
        out[name.strip()] = h
    return out


def files_for(app, shas):
    setup = DIST / f"{app['en']}-Setup-{VERSION}-x64.exe"
    portable = DIST / f"{app['bin']}-{VERSION}-windows-x64-portable.zip"
    out = {}
    for kind, f in (("setup", setup), ("portable", portable)):
        if f.exists():
            out[kind] = dict(name=f.name, size=f.stat().st_size, sha=shas.get(f.name, ""), url=f"downloads/{f.name}")
    return out


# ---- shared page frame -------------------------------------------------------------------------

def base_css():
    s = (LIVE / "portfolio.html").read_text(encoding="utf-8")
    return re.findall(r"<style[^>]*>(.*?)</style>", s, re.S)[0]


APPS_CSS = r"""
  .apps-hero { padding: 132px 0 40px; }
  .apps-hero .container { display: grid; grid-template-columns: 1.2fr .8fr; gap: 40px; align-items: center; }
  .apps-kicker { display: inline-flex; align-items: center; gap: 10px; font: 600 13px/1 var(--font-head); letter-spacing: .14em;
    color: var(--brand); background: var(--brand-tint); border: 1px solid var(--brand-line); padding: 8px 14px; border-radius: 999px; }
  .apps-kicker img { width: 18px; height: 18px; }
  .apps-title { font: 700 clamp(34px, 5vw, 60px)/1.12 var(--font-head); margin: 18px 0 14px; color: var(--ink); }
  .apps-title .blue-text { color: var(--brand); }
  .apps-lead { font-size: 18px; line-height: 1.85; color: #4a4a52; max-width: 640px; }
  .apps-credit { margin-top: 14px; font-size: 14px; color: var(--muted); }
  .apps-credit a { color: var(--brand); text-decoration: none; border-bottom: 1px solid var(--brand-line); }
  .suite-card { background: linear-gradient(160deg, var(--brand) 0%, var(--brand-deep) 100%); color: #fff; border-radius: var(--radius-xl);
    padding: 30px; box-shadow: var(--shadow-lg); position: relative; overflow: hidden; }
  .suite-card::after { content: ""; position: absolute; inset: auto -40px -60px auto; width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,.18), transparent 70%); }
  .suite-card h2 { font: 700 24px/1.3 var(--font-head); margin: 14px 0 8px; color: #fff; }
  .suite-card p { color: rgba(255,255,255,.82); line-height: 1.75; margin: 0 0 18px; font-size: 15px; }
  .suite-card .suite-icon { width: 72px; height: 72px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,.25); }
  .dl-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; border-radius: 14px; font: 600 16px/1 var(--font-head);
    text-decoration: none; transition: transform .25s var(--ease), box-shadow .25s var(--ease); }
  .dl-btn svg { flex: none; }
  .dl-btn:hover { transform: translateY(-2px); }
  .dl-primary { background: var(--gold); color: #fff; box-shadow: var(--shadow-gold); }
  .dl-primary:hover { background: var(--gold-deep); }
  .dl-light { background: #fff; color: var(--brand-deep); }
  .dl-ghost { background: transparent; color: var(--brand); border: 1.5px solid var(--brand-line); }
  .dl-meta { display: block; margin-top: 10px; font-size: 13px; opacity: .8; }
  .suite-card .dl-meta { color: rgba(255,255,255,.75); }
  .apps-section { padding: 36px 0 64px; }
  .apps-section h2.sec { font: 700 28px/1.3 var(--font-head); margin: 0 0 8px; }
  .apps-section p.sec-sub { color: var(--muted); margin: 0 0 26px; }
  .apps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 18px; }
  .app-card { display: flex; flex-direction: column; gap: 12px; padding: 22px; background: #fff; border: 1px solid var(--line);
    border-radius: var(--radius-lg); text-decoration: none; color: var(--ink); box-shadow: var(--shadow-sm);
    transition: transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s var(--ease); }
  .app-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--brand-line); }
  .app-card-top { display: flex; align-items: center; gap: 14px; }
  .app-card img { width: 64px; height: 64px; border-radius: 16px; }
  .app-card h3 { font: 700 22px/1.2 var(--font-head); margin: 0; }
  .app-card .latin { font: 600 11px/1 var(--font-head); letter-spacing: .16em; color: var(--muted); margin-top: 6px; display: block; }
  .app-card p { margin: 0; color: #55545c; line-height: 1.7; font-size: 15px; }
  .app-card .go { margin-top: auto; font: 600 14px/1 var(--font-head); color: var(--brand); }
  .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .step { background: #fff; border: 1px solid var(--line); border-radius: var(--radius-lg); padding: 22px; }
  .step b { display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--brand-tint);
    color: var(--brand); font: 700 15px/1 var(--font-head); margin-bottom: 12px; }
  .step h3 { font: 700 18px/1.3 var(--font-head); margin: 0 0 6px; }
  .step p { margin: 0; color: #55545c; line-height: 1.75; font-size: 15px; }
  .note { margin-top: 18px; background: var(--gold-tint); border: 1px solid var(--gold-line); border-radius: var(--radius); padding: 16px 18px;
    color: #5a4520; line-height: 1.8; font-size: 14.5px; }
  .note code, .sha code { font-family: ui-monospace, Consolas, monospace; font-size: 12.5px; direction: ltr; unicode-bidi: isolate; word-break: break-all; }
  /* app page */
  .crumb { font-size: 14px; color: var(--muted); }
  .crumb a { color: var(--brand); text-decoration: none; }
  .app-hero { padding: 124px 0 30px; }
  .app-hero .container { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
  .app-id { display: flex; align-items: center; gap: 20px; margin: 18px 0 18px; }
  .app-id img { width: 112px; height: 112px; border-radius: 28px; box-shadow: var(--shadow-lg); }
  .app-id h1 { font: 700 clamp(38px, 5vw, 58px)/1.05 var(--font-head); margin: 0; }
  .app-id .latin { font: 600 13px/1 var(--font-head); letter-spacing: .2em; color: var(--muted); margin-top: 10px; display: block; }
  .app-id .tag { display: block; margin-top: 10px; font-size: 18px; color: var(--accent, var(--brand)); font-weight: 600; }
  .app-about { font-size: 18px; line-height: 1.95; color: #3d3d45; }
  .dl-panel { background: #fff; border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 26px; box-shadow: var(--shadow); position: sticky; top: 96px; }
  .dl-panel h2 { font: 700 20px/1.3 var(--font-head); margin: 0 0 14px; }
  .dl-panel .dl-btn { width: 100%; justify-content: center; }
  .dl-panel .dl-ghost { margin-top: 10px; }
  .dl-panel ul { list-style: none; padding: 0; margin: 16px 0 0; font-size: 14px; color: #55545c; line-height: 1.9; }
  .dl-panel li::before { content: "✓"; color: var(--brand); margin-inline-end: 8px; font-weight: 700; }
  .sha { margin-top: 14px; font-size: 13px; color: var(--muted); }
  .sha summary { cursor: pointer; color: var(--brand); }
  .feat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
  .feat { display: flex; gap: 12px; align-items: flex-start; background: #fff; border: 1px solid var(--line); border-radius: var(--radius); padding: 16px 18px; }
  .feat i { flex: none; width: 10px; height: 10px; border-radius: 3px; margin-top: 9px; background: var(--accent, var(--brand)); }
  .feat span { line-height: 1.7; font-size: 15.5px; }
  .types { display: inline-block; margin-top: 18px; font: 600 13px/1 var(--font-head); letter-spacing: .06em; color: var(--muted);
    background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 9px 14px; direction: ltr; }
  .more-apps { display: flex; flex-wrap: wrap; gap: 12px; }
  .more-apps a { display: flex; align-items: center; gap: 10px; padding: 8px 14px 8px 8px; background: #fff; border: 1px solid var(--line);
    border-radius: 999px; text-decoration: none; color: var(--ink); font-weight: 600; transition: border-color .2s; }
  [dir="rtl"] .more-apps a { padding: 8px 8px 8px 14px; }
  .more-apps a:hover { border-color: var(--brand-line); }
  .more-apps img { width: 32px; height: 32px; border-radius: 9px; }
  @media (max-width: 900px) {
    .apps-hero .container, .app-hero .container { grid-template-columns: 1fr; }
    .steps { grid-template-columns: 1fr; }
    .dl-panel { position: static; }
    .apps-hero { padding-top: 108px; }
    .app-id img { width: 84px; height: 84px; border-radius: 22px; }
  }
"""

DL_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>'


def nav():
    links = [("../index.html", "الرئيسية", "Home", ""), ("../index.html#about", "عني", "About", ""),
             ("../portfolio.html", "أعمالي", "Portfolio", ""), ("../courses.html", "الدورات", "Courses", ""),
             ("./", "تطبيقاتي", "Apps", "active"), ("../index.html#contact", "تواصل", "Contact", "")]
    def a(cls, href, ar, en, state):
        cur = ' aria-current="page"' if state else ""
        return f'<a href="{href}" class="{cls}{" active" if state else ""}"{cur} data-ar="{ar}" data-en="{en}">{ar}</a>'
    desk = "\n      ".join(a("nav-link", *l) for l in links)
    mob = "\n      ".join(a("mobile-link", *l) for l in links)
    return f"""<nav id="main-nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="../index.html" class="nav-brand" aria-label="Mohammad Al Shatti — home">
      <img class="brand-mark" src="../assets/images/brand/emblem.png" alt="Mohammad Al Shatti" width="38" height="38">
    </a>
    <div class="nav-links" role="list">
      {desk}
    </div>
    <div class="nav-actions">
      <button class="lang-btn" id="langBtn" onclick="toggleLang()" aria-label="Toggle language">EN</button>
      <a href="./#download" class="nav-cta" aria-label="Download Warsha">{DL_ICON}<span data-ar="حمّل ورشة" data-en="Download Warsha">حمّل ورشة</span></a>
      <button class="menu-btn" id="menuBtn" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
        <span class="menu-bar"></span><span class="menu-bar"></span><span class="menu-bar"></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu" hidden>
      {mob}
    </div>
  </div>
</nav>"""


FOOTER = """<footer role="contentinfo">
  <div class="container">
    <div class="footer-links">
      <a href="../index.html" class="footer-link" data-ar="الرئيسية" data-en="Home">الرئيسية</a>
      <a href="./" class="footer-link" data-ar="تطبيقاتي" data-en="Apps">تطبيقاتي</a>
      <a href="https://www.linkedin.com/in/malshatti" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="LinkedIn profile">LinkedIn</a>
      <a href="https://www.instagram.com/tr.mhmd.kw" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="Instagram profile">Instagram</a>
      <a href="mailto:info@malshatti.com" class="footer-link" aria-label="Email">info@malshatti.com</a>
    </div>
    <p class="footer-copy" data-ar="© ٢٠٢٦ محمد الشطي · الكويت" data-en="© 2026 Mohammad Al Shatti · Kuwait City, Kuwait">© ٢٠٢٦ محمد الشطي · الكويت</p>
  </div>
</footer>"""


def script(title_ar, title_en):
    return f"""<script>
(function(){{
  'use strict';
  var lang = 'ar';
  try {{ lang = localStorage.getItem('portfolio_lang') || 'ar'; }} catch (e) {{}}
  function applyLang(l) {{
    lang = l;
    try {{ localStorage.setItem('portfolio_lang', l); }} catch (e) {{}}
    var h = document.documentElement;
    h.setAttribute('lang', l);
    h.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.title = l === 'ar' ? {json.dumps(title_ar, ensure_ascii=False)} : {json.dumps(title_en)};
    document.getElementById('langBtn').textContent = l === 'ar' ? 'EN' : 'AR';
    document.querySelectorAll('[data-ar][data-en]').forEach(function(el){{ el.textContent = el.dataset[l]; }});
  }}
  window.toggleLang = function() {{ applyLang(lang === 'en' ? 'ar' : 'en'); }};
  var nav = document.getElementById('main-nav');
  function updateNavStyle() {{ nav.classList.toggle('scrolled', window.scrollY > 40); }}
  window.addEventListener('scroll', updateNavStyle, {{ passive: true }});
  var menuBtn = document.getElementById('menuBtn'), mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', function(){{
    var opening = mobileMenu.hasAttribute('hidden');
    if (opening) mobileMenu.removeAttribute('hidden'); else mobileMenu.setAttribute('hidden', '');
    menuBtn.classList.toggle('open', opening);
    menuBtn.setAttribute('aria-expanded', String(opening));
  }});
  var revealEls = document.querySelectorAll('.reveal');
  document.body.classList.add('js-rev');
  if ('IntersectionObserver' in window) {{
    var obs = new IntersectionObserver(function(entries){{
      entries.forEach(function(e){{ if (e.isIntersecting) {{ e.target.classList.add('revealed'); obs.unobserve(e.target); }} }});
    }}, {{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' }});
    revealEls.forEach(function(el){{ obs.observe(el); }});
  }}
  setTimeout(function(){{ revealEls.forEach(function(el){{ el.classList.add('revealed'); }}); }}, 2500);
  applyLang(lang);
  updateNavStyle();
}})();
</script>"""


def page(title_ar, title_en, desc, url, image, body, ld, css_extra=""):
    return f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title_ar)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{esc(title_ar)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{image}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="/favicon.ico" sizes="any"/>
  <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,500;0,600;1,500;1,600&display=swap" rel="stylesheet">
  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
  <style>{BASE_CSS}
{APPS_CSS}{css_extra}</style>
</head>
<body>
<a href="#main" class="skip-link" data-ar="انتقل للمحتوى" data-en="Skip to content">انتقل للمحتوى</a>
{nav()}
<main id="main">
{body}
</main>
{FOOTER}
{script(title_ar, title_en)}
</body>
</html>
"""


# ---- pages --------------------------------------------------------------------------------------

def install_steps():
    steps = [("حمّل المثبّت", "Download the installer", "اختر «المكتبة الكاملة» لكل التطبيقات، أو حمّل تطبيقاً واحداً من صفحته.",
              "Pick the full suite for every app, or download one app from its page."),
             ("شغّله واختر العربية", "Run it and pick a language", "يبدأ معالج التثبيت بالعربية (والإنجليزية متاحة)، وفي المكتبة الكاملة تختار التطبيقات التي تريدها.",
              "The setup wizard opens in Arabic (English is available); in the suite you tick the apps you want."),
             ("ابدأ العمل", "Start creating", "تجد التطبيقات في قائمة «ابدأ» داخل مجلد «ورشة»، ومنصة ورشة تحدّثها لك تلقائياً.",
              "Find the apps in the Start menu under «ورشة»; the Warsha app keeps them up to date.")]
    cards = "".join(f'<div class="step reveal"><b>{ar_digits(str(i + 1))}</b>{t(a1, e1, "h3")}{t(a2, e2, "p")}</div>'
                    for i, (a1, e1, a2, e2) in enumerate(steps))
    note = (f'<div class="note reveal">{t("الملفات غير موقّعة رقمياً بعد، لذلك قد يظهر تحذير SmartScreen عند أول تشغيل: اختر «مزيد من المعلومات» ثم «تشغيل على أي حال». يمكنك التحقق من سلامة الملف ببصمة SHA-256 المذكورة في صفحة كل تطبيق:", "The files are not code-signed yet, so Windows SmartScreen may warn on first run: choose “More info”, then “Run anyway”. You can check a file against the SHA-256 shown on each app page:", "span")}'
            f' <code>Get-FileHash .\\file.exe -Algorithm SHA256</code></div>')
    return cards, note


def index_page(shas, sizes):
    suite = DIST / f"Warsha-Suite-Setup-{VERSION}-x64.exe"
    launcher = DIST / f"Warsha-Setup-{VERSION}-x64.exe"
    suite_mb = size_mb(suite.stat().st_size)
    launcher_mb = size_mb(launcher.stat().st_size)
    cards = []
    for a in APPS:
        cards.append(f'''<a class="app-card reveal" href="{a["slug"]}.html" style="--accent:{a["color"]}">
      <div class="app-card-top"><img src="icons/{a["slug"]}.png" alt="{esc(a["ar"])}" width="64" height="64" loading="lazy">
        <div><h3>{esc(a["ar"])}</h3><span class="latin">{a["en"].upper()}</span></div></div>
      {t(a["tag"][0], a["tag"][1], "p")}
      {t("التفاصيل والتحميل ←", "Details & download →", "span", "go")}
    </a>''')
    steps, note = install_steps()
    body = f'''
<section class="apps-hero">
  <div class="container">
    <div class="reveal">
      <span class="apps-kicker"><img src="icons/warsha-mark.svg" alt="" width="18" height="18">ورشة · WARSHA</span>
      <h1 class="apps-title">{t("تطبيقات إبداعية ومكتبية", "Creative and office apps,")} <span class="blue-text" data-ar="بالعربي، ومجاناً" data-en="in Arabic, for free">بالعربي، ومجاناً</span></h1>
      {t("ورشة منصة من اثني عشر تطبيقاً لتحرير الصور والفيديو والصوت والتصميم والمستندات والجداول والعروض والرسم الهندسي. تطبيقات سريعة تعمل على جهازك دون اشتراك ودون إنترنت، بواجهة عربية كاملة.", "Warsha is a suite of twelve apps for photos, video, sound, design, documents, spreadsheets, presentations and drafting — fast native apps that run on your own computer with no subscription and no internet, in a full Arabic interface.", "p", "apps-lead")}
      <p class="apps-credit">{t("تعريب وتطوير: محمد الشطي", "Arabic edition and development: Mohammad Al Shatti")} · <a href="mailto:info@malshatti.com">info@malshatti.com</a></p>
    </div>
    <div class="suite-card reveal reveal-d1" id="download">
      <img class="suite-icon" src="icons/warsha.png" alt="ورشة" width="72" height="72">
      {t("المكتبة الكاملة", "The full suite", "h2")}
      {t("مثبّت واحد يضم التطبيقات الاثني عشر ومنصة ورشة، وتختار منها ما تريد تثبيته.", "One installer with all twelve apps and the Warsha app — pick the ones you want.", "p")}
      <a class="dl-btn dl-primary" href="downloads/{suite.name}" download>{DL_ICON}{t("حمّل المكتبة الكاملة", "Download the full suite")}</a>
      <span class="dl-meta" data-ar="ويندوز 10/11 · 64 بت · {ar_digits(suite_mb)} ميغابايت · الإصدار {ar_digits(VERSION)}" data-en="Windows 10/11 · 64-bit · {suite_mb} MB · version {VERSION}">ويندوز 10/11 · 64 بت · {ar_digits(suite_mb)} ميغابايت · الإصدار {ar_digits(VERSION)}</span>
      <div style="margin-top:16px"><a class="dl-btn dl-light" href="downloads/{launcher.name}" download>{DL_ICON}{t("منصة ورشة وحدها", "The Warsha app only")}</a>
      <span class="dl-meta" data-ar="{ar_digits(launcher_mb)} ميغابايت · تثبّت التطبيقات وتحدّثها من داخلها" data-en="{launcher_mb} MB · installs and updates the apps from inside">{ar_digits(launcher_mb)} ميغابايت · تثبّت التطبيقات وتحدّثها من داخلها</span></div>
    </div>
  </div>
</section>

<section class="apps-section">
  <div class="container">
    {t("التطبيقات", "The apps", "h2", "sec reveal")}
    {t("كل تطبيق متاح للتحميل منفرداً من صفحته.", "Every app can also be downloaded on its own from its page.", "p", "sec-sub reveal")}
    <div class="apps-grid">
    {"".join(cards)}
    </div>
  </div>
</section>

<section class="apps-section">
  <div class="container">
    {t("طريقة التثبيت", "How to install", "h2", "sec reveal")}
    <div class="steps">{steps}</div>
    {note}
  </div>
</section>
'''
    ld = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "ورشة WARSHA — تطبيقات محمد الشطي",
          "url": BASE, "inLanguage": ["ar", "en"], "author": {"@type": "Person", "name": "Mohammad Al Shatti", "url": "https://malshatti.com/"},
          "mainEntity": {"@type": "ItemList", "itemListElement": [
              {"@type": "ListItem", "position": i + 1, "item": {"@type": "SoftwareApplication", "name": f'{a["ar"]} ({a["en"]})', "url": f'{BASE}{a["slug"]}.html',
                                                               "operatingSystem": "Windows 10, Windows 11", "applicationCategory": "MultimediaApplication",
                                                               "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}}
              for i, a in enumerate(APPS)]}}
    return page("ورشة — تطبيقات عربية مجانية | محمد الشطي", "Warsha — free Arabic apps | Mohammad Al Shatti",
                "ورشة: اثنا عشر تطبيقاً عربياً مجانياً لتحرير الصور والفيديو والصوت والتصميم والمستندات والجداول والعروض والرسم الهندسي. تعريب وتطوير محمد الشطي.",
                BASE, f"{BASE}icons/warsha.png", body, ld)


def app_page(a, shas):
    f = files_for(a, shas)
    setup, portable = f.get("setup"), f.get("portable")
    feats = "".join(f'<div class="feat reveal"><i></i>{t(ar, en)}</div>' for ar, en in a["features"])
    others = "".join(f'<a href="{o["slug"]}.html"><img src="icons/{o["slug"]}.png" alt="" width="32" height="32" loading="lazy">{esc(o["ar"])}</a>'
                     for o in APPS if o is not a)
    sha_block = ""
    if setup:
        sha_block = (f'<details class="sha"><summary data-ar="بصمة SHA-256" data-en="SHA-256">بصمة SHA-256</summary>'
                     f'<p>{esc(setup["name"])}<br><code>{setup["sha"]}</code></p>'
                     + (f'<p>{esc(portable["name"])}<br><code>{portable["sha"]}</code></p>' if portable else "") + '</details>')
    body = f'''
<section class="app-hero" style="--accent:{a["color"]}">
  <div class="container">
    <div>
      <p class="crumb reveal"><a href="./" data-ar="تطبيقاتي" data-en="Apps">تطبيقاتي</a> / {esc(a["ar"])}</p>
      <div class="app-id reveal">
        <img src="icons/{a["slug"]}.png" alt="{esc(a["ar"])}" width="112" height="112">
        <div><h1>{esc(a["ar"])}</h1><span class="latin">{a["en"].upper()}</span>{t(a["tag"][0], a["tag"][1], "span", "tag")}</div>
      </div>
      {t(a["about"][0], a["about"][1], "p", "app-about reveal")}
      <span class="types reveal">{esc(a["types"])}</span>
    </div>
    <aside class="dl-panel reveal reveal-d1" id="download">
      {t("تحميل " + a["ar"], "Download " + a["en"], "h2")}
      <a class="dl-btn dl-primary" href="downloads/{setup["name"]}" download>{DL_ICON}{t("حمّل المثبّت", "Download the installer")}</a>
      <span class="dl-meta" data-ar="مثبّت ويندوز · {size_mb(setup["size"])} ميغابايت" data-en="Windows installer · {size_mb(setup["size"])} MB">مثبّت ويندوز · {size_mb(setup["size"])} ميغابايت</span>
      <a class="dl-btn dl-ghost" href="downloads/{portable["name"]}" download>{t("النسخة المحمولة (zip)", "Portable version (zip)")}</a>
      <ul>
        <li data-ar="ويندوز 10 أو 11 (64 بت)" data-en="Windows 10 or 11 (64-bit)">ويندوز 10 أو 11 (64 بت)</li>
        <li data-ar="مجاني بالكامل ودون اشتراك" data-en="Completely free, no subscription">مجاني بالكامل ودون اشتراك</li>
        <li data-ar="يعمل دون اتصال بالإنترنت" data-en="Works offline">يعمل دون اتصال بالإنترنت</li>
        <li data-ar="الإصدار {ar_digits(VERSION)}" data-en="Version {VERSION}">الإصدار {ar_digits(VERSION)}</li>
      </ul>
      {sha_block}
    </aside>
  </div>
</section>

<section class="apps-section" style="--accent:{a["color"]}">
  <div class="container">
    {t("المزايا", "Features", "h2", "sec reveal")}
    <div class="feat-grid">{feats}</div>
  </div>
</section>

<section class="apps-section">
  <div class="container">
    {t("تطبيقات أخرى من ورشة", "More Warsha apps", "h2", "sec reveal")}
    <div class="more-apps reveal">{others}</div>
    <div class="note reveal">{t("تفضّل كل التطبيقات معاً؟ حمّل المكتبة الكاملة من", "Want every app? Get the full suite on", "span")} <a href="./#download" data-ar="صفحة ورشة" data-en="the Warsha page">صفحة ورشة</a>.</div>
  </div>
</section>
'''
    ld = {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": f'{a["ar"]} ({a["en"]})', "url": f'{BASE}{a["slug"]}.html',
          "description": a["about"][0], "operatingSystem": "Windows 10, Windows 11", "applicationCategory": "MultimediaApplication",
          "softwareVersion": VERSION, "inLanguage": ["ar", "en"], "image": f'{BASE}icons/{a["slug"]}.png',
          "downloadUrl": f'{BASE}downloads/{setup["name"]}', "fileSize": f'{size_mb(setup["size"])} MB',
          "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
          "author": {"@type": "Person", "name": "Mohammad Al Shatti", "url": "https://malshatti.com/"}}
    return page(f'{a["ar"]} — {a["tag"][0]} | ورشة', f'{a["en"]} — {a["tag"][1]} | Warsha', a["about"][0],
                f'{BASE}{a["slug"]}.html', f'{BASE}icons/{a["slug"]}.png', body, ld)


def feed(shas):
    """release_info.json for the Warsha app: every app's portable build under /apps/downloads/."""
    now = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    apps = {}
    for a in APPS + [LAUNCHER]:
        z = DIST / f"{a['bin']}-{VERSION}-windows-x64-portable.zip"
        apps[a["bin"]] = {
            "latest_release": {
                "tag": f"v{VERSION}", "name": f"{a['ar']} {VERSION}", "published_at": now,
                "html_url": f"{BASE}{a['slug']}.html", "prerelease": False,
                "notes_markdown": f"{a['ar']} {VERSION} — {a['tag'][0]}",
                "assets": [{"name": z.name, "size_bytes": z.stat().st_size, "download_url": f"{BASE}downloads/{z.name}", "sha256": shas.get(z.name)}],
            },
            "app_last_fetched": now,
        }
    return {"release_info": {"apps": apps, "last_fetched": now}, "app_renames": [], "repo_renames": [],
            "important_notices": {"announcements": [], "alerts": []}}


def main():
    global BASE_CSS
    BASE_CSS = base_css()
    shas = sums()
    shutil.rmtree(OUT, ignore_errors=True)
    (OUT / "icons").mkdir(parents=True)
    for a in APPS:
        shutil.copy2(ICONS / f"{a['repo']}-256.png", OUT / "icons" / f"{a['slug']}.png")
    shutil.copy2(ICONS / "warsha-256.png", OUT / "icons" / "warsha.png")
    shutil.copy2(ROOT / "icons" / "brand" / "artcraft-mark.svg", OUT / "icons" / "warsha-mark.svg")
    (OUT / "index.html").write_text(index_page(shas, None), encoding="utf-8")
    for a in APPS:
        (OUT / f"{a['slug']}.html").write_text(app_page(a, shas), encoding="utf-8")
    (OUT / "release_info.json").write_text(json.dumps(feed(shas), ensure_ascii=False, indent=1), encoding="utf-8")
    # Pages and the Warsha feed stay fresh behind the CDN; the builds download as files.
    (OUT / ".htaccess").write_text("""Options -Indexes
AddType application/octet-stream .exe
AddType application/zip .zip
AddType application/json .json
<IfModule mod_headers.c>
  <FilesMatch "\\.(html|json)$">
    Header set Cache-Control "public, max-age=300"
  </FilesMatch>
  <FilesMatch "\\.(exe|zip|txt)$">
    Header set Content-Disposition "attachment"
    Header set Cache-Control "public, max-age=86400"
  </FilesMatch>
</IfModule>
""", encoding="utf-8", newline="\n")
    # the files the pages and the feed link to (uploaded to /apps/downloads/)
    names = sorted(p.name for p in list(DIST.glob("*.exe")) + list(DIST.glob("*.zip"))) + ["SHA256SUMS.txt"]
    (OUT.parent / "downloads.txt").write_text("\n".join(names) + "\n", encoding="utf-8")
    print(f"wrote {OUT} ({len(APPS) + 1} pages), feed with {len(APPS) + 1} apps, {len(names)} downloads")


if __name__ == "__main__":
    main()
