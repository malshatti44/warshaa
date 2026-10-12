#!/usr/bin/env node
/*
 * بناء المثبّتات بواسطة electron-builder.
 *
 *   node scripts/build.js <id|hub|all> [--win] [--mac] [--linux] [--dir]
 *
 * لكل تطبيق مثبّت مستقل بمعرّف واسم وأيقونة خاصة، و"hub" هو مكتبة ورشة الكاملة
 * التي تضم جميع التطبيقات.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const registry = require('../src/shared/registry.js');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const which = args.find((a) => !a.startsWith('--')) || 'hub';
const flags = new Set(args.filter((a) => a.startsWith('--')));

const MAC_CATEGORY = {
  photo: 'public.app-category.photography',
  design: 'public.app-category.graphics-design',
  media: 'public.app-category.video',
  docs: 'public.app-category.productivity'
};
const LINUX_CATEGORY = { photo: 'Graphics', design: 'Graphics', media: 'AudioVideo', docs: 'Office' };

function configFor(id) {
  const isHub = id === 'hub';
  const meta = isHub ? null : registry.apps.find((a) => a.id === id);
  if (!isHub && !meta) throw new Error('Unknown app: ' + id);
  const productName = isHub ? registry.platform.productName : meta.productName;
  const nameAr = isHub ? registry.platform.name.ar : meta.name.ar;
  const nameEn = isHub ? registry.platform.name.en : meta.name.en;
  const descAr = isHub ? registry.platform.tagline.ar : meta.desc.ar;
  const descEn = isHub ? registry.platform.tagline.en : meta.desc.en;
  const appId = isHub ? registry.platform.appId : registry.platform.appId + '.' + id;
  const dev = registry.developer;
  const icoRel = 'build/icons/' + id + '/icon.ico';
  const pngRel = 'build/icons/' + id + '/icon.png';

  const files = ['package.json', 'src/main/**/*', 'src/shared/**/*'];
  if (isHub) files.push('src/hub/**/*', 'src/apps/**/*');
  else files.push('src/apps/' + id + '/**/*');

  const extraResources = isHub
    ? [{ from: 'build/icons', to: 'icons', filter: ['**/*'] }]
    : [{ from: 'build/icons/' + id, to: 'icons/' + id, filter: ['**/*'] }];

  const assoc = isHub ? [] : meta.files.map((f) => ({ ext: f.ext, name: f.name.en, description: f.name.ar, role: 'Editor' }));

  return {
    appId,
    productName,
    copyright: '© ' + registry.copyrightYear + ' ' + dev.name.en + ' — ' + dev.website,
    directories: { output: 'dist/' + id, buildResources: 'build' },
    extraMetadata: {
      name: isHub ? 'warsha' : 'warsha-' + id,
      productName,
      description: descAr + ' — ' + descEn,
      warshaApp: id,
      main: 'src/main/main.js'
    },
    files,
    extraResources,
    asar: true,
    electronLanguages: ['ar', 'en-US', 'en-GB'],
    icon: pngRel,
    afterPack: path.join(__dirname, 'after-pack.js'),
    publish: null,
    win: {
      target: [{ target: 'nsis', arch: ['x64'] }],
      icon: icoRel,
      artifactName: productName + '-Setup-${version}-win-${arch}.${ext}',
      fileAssociations: assoc.map((a) => Object.assign({}, a, { icon: icoRel })),
      legalTrademarks: 'WARSHA ورشة'
    },
    nsis: {
      oneClick: false,
      perMachine: false,
      allowElevation: true,
      allowToChangeInstallationDirectory: true,
      createDesktopShortcut: true,
      createStartMenuShortcut: true,
      shortcutName: nameAr + ' - ' + nameEn,
      menuCategory: 'ورشة WARSHA',
      uninstallDisplayName: nameAr + ' ' + nameEn,
      installerIcon: icoRel,
      uninstallerIcon: icoRel,
      installerLanguages: ['ar_SA', 'en_US'],
      language: '1025',
      multiLanguageInstaller: true,
      displayLanguageSelector: false,
      license: 'build/license.txt',
      deleteAppDataOnUninstall: false,
      differentialPackage: false
    },
    mac: {
      target: [{ target: 'dmg', arch: ['x64', 'arm64'] }],
      category: isHub ? 'public.app-category.graphics-design' : MAC_CATEGORY[meta.category],
      identity: null,
      hardenedRuntime: false,
      gatekeeperAssess: false,
      artifactName: productName + '-${version}-mac-${arch}.${ext}',
      fileAssociations: assoc,
      extendInfo: { CFBundleDisplayName: nameEn, NSHumanReadableCopyright: '© ' + dev.name.en }
    },
    dmg: {
      title: productName + ' ${version}',
      artifactName: productName + '-${version}-mac-${arch}.${ext}'
    },
    linux: {
      target: [{ target: 'AppImage', arch: ['x64'] }, { target: 'deb', arch: ['x64'] }],
      category: isHub ? 'Graphics' : LINUX_CATEGORY[meta.category],
      maintainer: dev.name.en + ' <' + dev.email + '>',
      vendor: dev.name.en,
      synopsis: descEn,
      description: descAr + '\n' + descEn,
      executableName: isHub ? 'warsha' : 'warsha-' + id,
      artifactName: productName + '-${version}-linux-${arch}.${ext}',
      fileAssociations: assoc
    },
    deb: {
      artifactName: productName + '_${version}_${arch}.${ext}'
    }
  };
}

function build(id) {
  const cfg = configFor(id);
  const cfgPath = path.join(ROOT, 'dist', 'config-' + id + '.json');
  fs.mkdirSync(path.dirname(cfgPath), { recursive: true });
  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
  const platformFlags = [];
  if (flags.has('--win')) platformFlags.push('--win');
  if (flags.has('--mac')) platformFlags.push('--mac');
  if (flags.has('--linux')) platformFlags.push('--linux');
  if (flags.has('--dir')) platformFlags.push('--dir');
  const cmd = 'npx electron-builder --config "' + cfgPath + '" ' + platformFlags.join(' ') + ' --publish never';
  console.log('\n▶ ' + id + ': ' + cmd);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
}

if (require.main === module) {
  if (flags.has('--print-config')) {
    console.log(JSON.stringify(configFor(which), null, 2));
  } else if (which === 'all') {
    ['hub'].concat(registry.apps.map((a) => a.id)).forEach(build);
  } else {
    build(which);
  }
}

module.exports = { configFor };
