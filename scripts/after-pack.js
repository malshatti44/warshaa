'use strict';
/*
 * بعد التغليف: توقيع ذاتي (ad-hoc) لتطبيقات ماك حتى تعمل على معالجات Apple Silicon
 * دون شهادة مطوّر مدفوعة. (سيظهر تحذير Gatekeeper عند أول تشغيل — افتح بزر الفأرة الأيمن ← فتح)
 */
const { execFileSync } = require('child_process');
const path = require('path');

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== 'darwin') return;
  const appName = context.packager.appInfo.productFilename + '.app';
  const appPath = path.join(context.appOutDir, appName);
  console.log('  • ad-hoc signing ' + appPath);
  execFileSync('codesign', ['--force', '--deep', '--sign', '-', appPath], { stdio: 'inherit' });
};
