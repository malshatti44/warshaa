/* مكتبة ورشة WARSHA — تثبيت التطبيقات وفتحها وإدارتها */
(function () {
  'use strict';
  const R = W.registry;

  W.init({
    id: 'hub',
    i18n: {
      ar: {
        'hub.home': 'كل التطبيقات', 'hub.installed': 'المثبّتة', 'hub.updates': 'التحديثات', 'hub.about': 'حول ورشة',
        'hub.categories': 'الفئات', 'hub.library': 'المكتبة', 'hub.search': 'ابحث عن تطبيق…',
        'hub.heroTitle': 'ورشتك الإبداعية بالعربي', 'hub.heroText': 'اثنا عشر تطبيقًا للصور والتصميم والفيديو والصوت والمستندات — بواجهة عربية كاملة، تعمل دون إنترنت. ثبّت ما تحتاجه فقط.',
        'hub.installAll': 'تثبيت الكل', 'hub.browse': 'تصفح التطبيقات',
        'hub.install': 'تثبيت', 'hub.open': 'فتح', 'hub.uninstall': 'إزالة التثبيت', 'hub.reinstall': 'إعادة إنشاء الاختصارات',
        'hub.installing': 'جارٍ التثبيت…', 'hub.isInstalled': 'مثبّت', 'hub.notInstalled': 'غير مثبّت',
        'hub.installedToast': 'تم تثبيت {app} — تجد اختصاره على سطح المكتب وفي قائمة ابدأ',
        'hub.installedToastMac': 'تم تثبيت {app} في مكتبتك', 'hub.installedToastLinux': 'تم تثبيت {app} — تجده في قائمة التطبيقات',
        'hub.removed': 'تمت إزالة {app}', 'hub.confirmRemove': 'إزالة {app} من الأجهزة المثبّتة؟ يمكنك تثبيته مجددًا في أي وقت.',
        'hub.allApps': 'جميع التطبيقات', 'hub.appsCount': '{n} تطبيق', 'hub.noInstalled': 'لم تثبّت أي تطبيق بعد. اختر من «كل التطبيقات».',
        'hub.noResults': 'لا توجد نتائج مطابقة', 'hub.more': 'المزيد',
        'hub.checkUpdates': 'التحقق من التحديثات', 'hub.checking': 'جارٍ التحقق…', 'hub.upToDate': 'أنت تستخدم أحدث إصدار ({v}).',
        'hub.newVersion': 'يتوفر إصدار جديد: {v}', 'hub.download': 'تنزيل', 'hub.updateFailed': 'تعذّر الاتصال بخادم التحديثات. تأكد من اتصالك بالإنترنت.',
        'hub.releases': 'صفحة الإصدارات', 'hub.currentVersion': 'الإصدار الحالي', 'hub.platform': 'النظام', 'hub.engine': 'المحرّك',
        'hub.standalone': 'تنزيل نسخة مستقلة', 'hub.aboutText': 'ورشة منصة عربية تضم مجموعة متكاملة من التطبيقات الإبداعية والمكتبية، مصممة من الأساس لدعم اللغة العربية والكتابة من اليمين لليسار.',
        'hub.website': 'الموقع', 'hub.email': 'البريد', 'hub.license': 'الترخيص', 'hub.licenseText': 'مجاني للاستخدام الشخصي والتجاري — جميع الحقوق محفوظة',
        'hub.welcome': 'مرحبًا بك في ورشة', 'hub.welcomeSub': 'اختر تطبيقًا لتثبيته أو فتحه', 'hub.macNote': 'على ماك تُفتح التطبيقات من هذه المكتبة مباشرة.',
        'hub.howUpdate': 'لتحديث ورشة: نزّل المثبّت الجديد من صفحة الإصدارات وثبّته فوق النسخة الحالية — ستبقى إعداداتك كما هي.',
        'hub.installedAllToast': 'تم تثبيت جميع التطبيقات'
      },
      en: {
        'hub.home': 'All apps', 'hub.installed': 'Installed', 'hub.updates': 'Updates', 'hub.about': 'About WARSHA',
        'hub.categories': 'Categories', 'hub.library': 'Library', 'hub.search': 'Search apps…',
        'hub.heroTitle': 'Your creative workshop, in Arabic', 'hub.heroText': 'Twelve apps for photos, design, video, audio and documents — with a complete Arabic interface that works offline. Install only what you need.',
        'hub.installAll': 'Install all', 'hub.browse': 'Browse apps',
        'hub.install': 'Install', 'hub.open': 'Open', 'hub.uninstall': 'Uninstall', 'hub.reinstall': 'Recreate shortcuts',
        'hub.installing': 'Installing…', 'hub.isInstalled': 'Installed', 'hub.notInstalled': 'Not installed',
        'hub.installedToast': '{app} installed — find it on your desktop and Start menu',
        'hub.installedToastMac': '{app} added to your library', 'hub.installedToastLinux': '{app} installed — find it in your applications menu',
        'hub.removed': '{app} removed', 'hub.confirmRemove': 'Uninstall {app}? You can install it again at any time.',
        'hub.allApps': 'All apps', 'hub.appsCount': '{n} apps', 'hub.noInstalled': 'No apps installed yet. Pick some from “All apps”.',
        'hub.noResults': 'No matching apps', 'hub.more': 'More',
        'hub.checkUpdates': 'Check for updates', 'hub.checking': 'Checking…', 'hub.upToDate': 'You are on the latest version ({v}).',
        'hub.newVersion': 'A new version is available: {v}', 'hub.download': 'Download', 'hub.updateFailed': 'Could not reach the update server. Check your internet connection.',
        'hub.releases': 'Releases page', 'hub.currentVersion': 'Current version', 'hub.platform': 'Platform', 'hub.engine': 'Engine',
        'hub.standalone': 'Download standalone app', 'hub.aboutText': 'WARSHA is an Arabic platform bringing together an integrated set of creative and office apps, designed from the ground up for Arabic and right-to-left writing.',
        'hub.website': 'Website', 'hub.email': 'Email', 'hub.license': 'License', 'hub.licenseText': 'Free for personal and commercial use — all rights reserved',
        'hub.welcome': 'Welcome to WARSHA', 'hub.welcomeSub': 'Pick an app to install or open', 'hub.macNote': 'On macOS, apps open directly from this library.',
        'hub.howUpdate': 'To update WARSHA, download the new installer from the releases page and install it over the current version — your settings are kept.',
        'hub.installedAllToast': 'All apps installed'
      }
    }
  });

  const native = W.native && W.native.hub ? W.native.hub : null;
  const RELEASES = 'https://github.com/' + R.repository + '/releases/latest';
  const state = { view: 'all', q: '', installed: new Set(W.store.get('hub.installed', [])), platform: 'web', canShortcut: false, busy: new Set(), info: null };

  W.mountChrome({
    menus: [
      {
        i18n: 'hub.library', items: [
          { i18n: 'hub.installAll', icon: 'download', action: () => installAll() },
          { i18n: 'hub.checkUpdates', icon: 'refresh', action: () => { setView('updates'); checkUpdates(); } },
          '-',
          { i18n: 'cmd.quit', shortcut: 'Mod+Q', action: () => window.close(), hidden: () => !W.isElectron }
        ]
      },
      { i18n: 'menu.view', items: W.stdViewItems() },
      W.stdHelpMenu()
    ]
  });

  const nav = document.querySelector('.hub-nav');
  const content = document.getElementById('content');

  function appName(a) { return W.L(a.name); }
  function setView(v) { state.view = v; render(); content.scrollTop = 0; }

  /* ───── التنقل ───── */
  function renderNav() {
    nav.innerHTML = '';
    const item = (id, icon, label, count) => {
      const b = W.h('button', { class: state.view === id ? 'active' : '', type: 'button', onclick: () => setView(id) },
        W.iconEl(icon), W.h('span', { text: label }), count != null ? W.h('span', { class: 'nav-count', text: count }) : null);
      nav.append(b);
    };
    item('all', 'apps', W.t('hub.home'), R.apps.length);
    item('installed', 'check-circle', W.t('hub.installed'), state.installed.size);
    nav.append(W.h('div', { class: 'nav-title', text: W.t('hub.categories') }));
    const catIcon = { photo: 'image', design: 'pen', media: 'film', docs: 'file' };
    R.categories.forEach((c) => item('cat:' + c.id, catIcon[c.id] || 'grid', W.L(c.name), R.apps.filter((a) => a.category === c.id).length));
    nav.append(W.h('div', { class: 'nav-title', text: ' ' }));
    item('updates', 'refresh', W.t('hub.updates'));
    item('about', 'info', W.t('hub.about'));
    nav.append(W.h('div', { class: 'nav-spacer' }));
    nav.append(W.h('div', { class: 'nav-dev' },
      W.h('span', { text: W.t('ui.developedBy') }),
      W.h('b', { text: W.L(R.developer.name) }),
      W.h('a', { href: '#', class: 'ltr', text: R.developer.websiteLabel, onclick: (e) => { e.preventDefault(); W.openExternal(R.developer.website); } }),
      W.h('a', { href: '#', class: 'ltr', text: R.developer.email, onclick: (e) => { e.preventDefault(); W.openExternal('mailto:' + R.developer.email); } })
    ));
  }

  /* ───── بطاقة تطبيق ───── */
  function card(a) {
    const installed = state.installed.has(a.id);
    const busy = state.busy.has(a.id);
    const cat = R.categories.find((c) => c.id === a.category);
    const el = W.h('div', { class: 'app-card', style: { '--card-color': a.color }, 'data-app': a.id },
      W.h('img', { src: '../shared/icons/' + a.id + '.png', alt: '' }),
      W.h('div', { class: 'info' },
        W.h('div', { class: 'name' }, W.h('span', { text: appName(a) }), W.h('span', { class: 'en', text: a.name.en.toUpperCase() })),
        W.h('div', { class: 'desc', text: W.L(a.desc) }),
        W.h('div', { class: 'meta' },
          W.h('span', { class: 'chip', text: W.L(cat.name) }),
          installed ? W.h('span', { class: 'chip ok', text: '✓ ' + W.t('hub.isInstalled') }) : null
        ),
        W.h('div', { class: 'actions' })
      )
    );
    const actions = el.querySelector('.actions');
    if (busy) {
      actions.append(W.h('span', { class: 'small muted', text: W.t('hub.installing') }), W.h('div', { class: 'w-progress' }, W.h('div', { style: { width: '0%' } })));
    } else if (installed) {
      actions.append(
        W.h('button', { class: 'w-btn primary', type: 'button', onclick: () => openApp(a.id) }, W.iconEl('external'), W.h('span', { text: W.t('hub.open') })),
        W.h('button', {
          class: 'w-icon-btn', type: 'button', 'data-tip': 'hub.more', html: W.icon('more'),
          onclick: (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            W.showMenu([
              { i18n: 'hub.open', icon: 'external', action: () => openApp(a.id) },
              { i18n: 'hub.reinstall', icon: 'refresh', action: () => install(a.id), hidden: () => !state.canShortcut },
              { i18n: 'hub.standalone', icon: 'cloud-down', action: () => W.openExternal(RELEASES) },
              '-',
              { i18n: 'hub.uninstall', icon: 'trash', action: () => uninstall(a.id) }
            ], W.isRTL() ? r.right : r.left, r.bottom + 4);
          }
        })
      );
    } else {
      actions.append(
        W.h('button', { class: 'w-btn primary', type: 'button', onclick: () => install(a.id) }, W.iconEl('download'), W.h('span', { text: W.t('hub.install') })),
        W.h('button', { class: 'w-btn ghost', type: 'button', onclick: () => openApp(a.id) }, W.h('span', { text: W.t('hub.open') }))
      );
    }
    return el;
  }

  function filtered(list) {
    const q = state.q.trim().toLowerCase();
    if (!q) return list;
    return list.filter((a) => [a.name.ar, a.name.en, a.desc.ar, a.desc.en, a.id].join(' ').toLowerCase().includes(q));
  }

  function head(title, sub) {
    const search = W.h('div', { class: 'hub-search' },
      W.h('input', { class: 'w-input', type: 'search', value: state.q, placeholder: W.t('hub.search'), oninput: (e) => { state.q = e.target.value; renderGrid(); } }));
    search.insertAdjacentHTML('afterbegin', W.icon('search'));
    return W.h('div', { class: 'hub-head' },
      W.h('div', null, W.h('h1', { text: title }), sub ? W.h('div', { class: 'sub', text: sub }) : null),
      W.h('div', { class: 'w-spacer' }),
      search);
  }

  let gridBox = null;
  let gridSource = [];
  function renderGrid() {
    if (!gridBox) return;
    gridBox.innerHTML = '';
    const list = filtered(gridSource);
    if (!list.length) {
      gridBox.append(W.h('div', { class: 'hub-empty', text: state.view === 'installed' && !state.q ? W.t('hub.noInstalled') : W.t('hub.noResults') }));
      gridBox.classList.remove('hub-grid');
      return;
    }
    gridBox.classList.add('hub-grid');
    list.forEach((a) => gridBox.append(card(a)));
  }

  function hero() {
    const icons = W.h('div', { class: 'hero-icons' }, ...R.apps.slice(0, 8).map((a) => W.h('img', { src: '../shared/icons/' + a.id + '.png', alt: '' })));
    return W.h('div', { class: 'hub-hero' },
      W.h('div', { class: 'hero-text' },
        W.h('h2', { text: W.t('hub.heroTitle') }),
        W.h('p', { text: W.t('hub.heroText') }),
        W.h('div', { class: 'row' },
          W.h('button', { class: 'w-btn primary lg', type: 'button', onclick: () => installAll() }, W.iconEl('download'), W.h('span', { text: W.t('hub.installAll') })),
          W.h('button', { class: 'w-btn lg', type: 'button', onclick: () => document.querySelector('.hub-grid') && document.querySelector('.hub-grid').scrollIntoView({ behavior: 'smooth' }) }, W.h('span', { text: W.t('hub.browse') }))
        )
      ),
      icons);
  }

  /* ───── العرض ───── */
  function render() {
    renderNav();
    content.innerHTML = '';
    gridBox = null;
    const v = state.view;
    if (v === 'all' || v === 'installed' || v.startsWith('cat:')) {
      let title, list;
      if (v === 'all') { title = W.t('hub.welcome'); list = R.apps; }
      else if (v === 'installed') { title = W.t('hub.installed'); list = R.apps.filter((a) => state.installed.has(a.id)); }
      else { const c = R.categories.find((x) => 'cat:' + x.id === v); title = W.L(c.name); list = R.apps.filter((a) => a.category === c.id); }
      content.append(head(title, v === 'all' ? W.t('hub.welcomeSub') : W.t('hub.appsCount', { n: list.length })));
      if (v === 'all' && !state.q) content.append(hero());
      if (v === 'all') content.append(W.h('div', { class: 'hub-section-title' }, W.h('span', { text: W.t('hub.allApps') }), W.h('span', { class: 'muted', text: W.t('hub.appsCount', { n: R.apps.length }) })));
      if (state.platform === 'darwin' && v === 'all') content.append(W.h('div', { class: 'small muted', style: { marginBottom: '10px' }, text: W.t('hub.macNote') }));
      gridBox = W.h('div', { class: 'hub-grid' });
      gridSource = list;
      content.append(gridBox);
      renderGrid();
    } else if (v === 'updates') {
      content.append(W.h('div', { class: 'hub-head' }, W.h('h1', { text: W.t('hub.updates') })));
      const result = W.h('div', { class: 'col', id: 'update-result', style: { marginTop: '12px' } });
      content.append(W.h('div', { class: 'hub-panel' },
        W.h('div', { class: 'hub-kv' },
          W.h('div', { text: W.t('hub.currentVersion') }), W.h('div', { class: 'ltr', style: { textAlign: 'start' }, text: R.version }),
          W.h('div', { text: W.t('hub.platform') }), W.h('div', { text: platformLabel() })
        ),
        W.h('div', { class: 'row', style: { marginTop: '16px' } },
          W.h('button', { class: 'w-btn primary', type: 'button', onclick: () => checkUpdates() }, W.iconEl('refresh'), W.h('span', { text: W.t('hub.checkUpdates') })),
          W.h('button', { class: 'w-btn', type: 'button', onclick: () => W.openExternal(RELEASES) }, W.iconEl('external'), W.h('span', { text: W.t('hub.releases') }))
        ),
        result,
        W.h('p', { class: 'small muted', text: W.t('hub.howUpdate') })
      ));
    } else if (v === 'about') {
      content.append(W.h('div', { class: 'hub-head' }, W.h('h1', { text: W.t('hub.about') })));
      content.append(W.h('div', { class: 'hub-panel' },
        W.h('div', { class: 'hub-about' },
          W.h('img', { src: '../shared/icons/hub.png', alt: '' }),
          W.h('div', null,
            W.h('h3', { text: 'ورشة WARSHA' }),
            W.h('div', { class: 'muted', text: W.L(R.platform.tagline) }),
            W.h('p', { text: W.t('hub.aboutText') })
          )
        ),
        W.h('div', { class: 'hub-kv' },
          W.h('div', { text: W.t('ui.dev') }), W.h('div', { style: { fontWeight: 700 }, text: W.L(R.developer.name) }),
          W.h('div', { text: W.t('hub.website') }), W.h('div', null, W.h('a', { href: '#', class: 'ltr', text: R.developer.websiteLabel, onclick: (e) => { e.preventDefault(); W.openExternal(R.developer.website); } })),
          W.h('div', { text: W.t('hub.email') }), W.h('div', null, W.h('a', { href: '#', class: 'ltr', text: R.developer.email, onclick: (e) => { e.preventDefault(); W.openExternal('mailto:' + R.developer.email); } })),
          W.h('div', { text: W.t('hub.currentVersion') }), W.h('div', { class: 'ltr', style: { textAlign: 'start' }, text: R.version }),
          W.h('div', { text: W.t('hub.engine') }), W.h('div', { class: 'ltr', style: { textAlign: 'start' }, text: state.info ? 'Electron ' + state.info.electron : W.t('ui.webVersion') }),
          W.h('div', { text: W.t('hub.license') }), W.h('div', { text: W.t('hub.licenseText') })
        ),
        W.h('p', { class: 'small muted', style: { marginTop: '16px' }, text: W.t('ui.rights', { year: R.copyrightYear, dev: W.L(R.developer.name) }) })
      ));
    }
  }

  function platformLabel() {
    return { win32: 'Windows', darwin: 'macOS', linux: 'Linux', web: W.t('ui.webVersion') }[state.platform] || state.platform;
  }

  /* ───── الإجراءات ───── */
  function persistWeb() { W.store.set('hub.installed', Array.from(state.installed)); }

  async function install(id, quiet) {
    const a = R.apps.find((x) => x.id === id);
    if (!a || state.busy.has(id)) return false;
    state.busy.add(id);
    render();
    const animate = (async () => {
      for (let p = 0; p <= 100; p += 4) {
        const bar = content.querySelector('[data-app="' + id + '"] .w-progress > div');
        if (bar) bar.style.width = p + '%';
        await W.sleep(18);
      }
    })();
    let ok = true;
    try {
      if (native) { const r = await native.install(id); ok = !!(r && r.ok); }
    } catch (e) { ok = false; console.error(e); }
    await animate;
    state.busy.delete(id);
    if (ok) {
      state.installed.add(id);
      if (!native) persistWeb();
      if (!quiet) {
        const key = state.platform === 'win32' ? 'hub.installedToast' : state.platform === 'linux' ? 'hub.installedToastLinux' : 'hub.installedToastMac';
        W.toast(W.t(key, { app: appName(a) }), 'success', 3600);
      }
    } else {
      W.toast(W.t('ui.error'), 'error');
    }
    render();
    return ok;
  }

  async function installAll() {
    for (const a of R.apps) if (!state.installed.has(a.id)) await install(a.id, true);
    W.toast(W.t('hub.installedAllToast'), 'success');
  }

  async function uninstall(id) {
    const a = R.apps.find((x) => x.id === id);
    if (!(await W.confirm(W.t('hub.confirmRemove', { app: appName(a) }), { ok: W.t('hub.uninstall'), danger: true }))) return;
    if (native) await native.uninstall(id);
    state.installed.delete(id);
    if (!native) persistWeb();
    W.toast(W.t('hub.removed', { app: appName(a) }));
    render();
  }

  function openApp(id) {
    if (native) native.launch(id);
    else window.open('../apps/' + id + '/index.html', '_blank');
  }

  async function checkUpdates() {
    const box = document.getElementById('update-result');
    if (!box) return;
    box.innerHTML = '';
    box.append(W.h('div', { class: 'muted', text: W.t('hub.checking') }));
    let r = null;
    try {
      if (native) r = await native.checkUpdate();
      else {
        const res = await fetch('https://api.github.com/repos/' + R.repository + '/releases/latest');
        if (res.ok) { const j = await res.json(); r = { ok: true, tag: j.tag_name, url: j.html_url }; } else r = { ok: false };
      }
    } catch (e) { r = { ok: false }; }
    box.innerHTML = '';
    if (!r || !r.ok) { box.append(W.h('div', { class: 'muted', text: W.t('hub.updateFailed') })); return; }
    const latest = String(r.tag || '').replace(/^v/, '');
    if (cmpVersion(latest, R.version) > 0) {
      box.append(W.h('div', { class: 'row' },
        W.h('b', { text: W.t('hub.newVersion', { v: latest }) }),
        W.h('button', { class: 'w-btn primary sm', type: 'button', onclick: () => W.openExternal(r.url || RELEASES) }, W.iconEl('download'), W.h('span', { text: W.t('hub.download') }))));
    } else {
      box.append(W.h('div', { class: 'row', style: { color: 'var(--success)' } }, W.iconEl('check-circle'), W.h('span', { text: W.t('hub.upToDate', { v: R.version }) })));
    }
  }
  function cmpVersion(a, b) {
    const pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number);
    for (let i = 0; i < 3; i++) { const d = (pa[i] || 0) - (pb[i] || 0); if (d) return d; }
    return 0;
  }

  W.on('langchange', render);
  W.on('themechange', () => {});

  (async function start() {
    if (native) {
      try {
        const s = await native.state();
        state.installed = new Set(s.installed || []);
        state.platform = s.platform;
        state.canShortcut = !!s.canShortcut;
        state.info = await W.native.info();
      } catch (e) { console.error(e); }
    }
    render();
  })();

  window.__warshaSelfTest = async function () {
    const errors = [];
    if (document.querySelectorAll('.app-card').length !== R.apps.length) errors.push('cards: ' + document.querySelectorAll('.app-card').length);
    return { errors };
  };
})();
