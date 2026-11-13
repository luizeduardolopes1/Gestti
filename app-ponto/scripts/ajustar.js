// Depois do "npx cap add android": permissões de câmera e GPS, ícone e versão.
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..'), and = path.join(raiz, 'android', 'app', 'src', 'main');
const mf = path.join(and, 'AndroidManifest.xml');
let x = fs.readFileSync(mf, 'utf8');
const perms = ['android.permission.CAMERA', 'android.permission.ACCESS_FINE_LOCATION', 'android.permission.ACCESS_COARSE_LOCATION', 'android.permission.VIBRATE'];
const novas = perms.filter((p) => !x.includes(p)).map((p) => `    <uses-permission android:name="${p}" />`).join('\n');
x = x.replace('</manifest>', `${novas}\n    <uses-feature android:name="android.hardware.camera" android:required="false" />\n    <uses-feature android:name="android.hardware.location.gps" android:required="false" />\n</manifest>`);
x = x.replace('<activity', '<activity android:screenOrientation="portrait"');
fs.writeFileSync(mf, x);
// ícone (troca o padrão do Capacitor; tira o ícone adaptativo para usar o PNG)
const res = path.join(and, 'res');
fs.rmSync(path.join(res, 'mipmap-anydpi-v26'), { recursive: true, force: true });
for (const d of fs.readdirSync(path.join(raiz, 'icones'))) for (const f of fs.readdirSync(path.join(raiz, 'icones', d))) fs.copyFileSync(path.join(raiz, 'icones', d, f), path.join(res, d, f));
// versão = número do build
const gr = path.join(raiz, 'android', 'app', 'build.gradle'), n = process.env.GITHUB_RUN_NUMBER || '1';
fs.writeFileSync(gr, fs.readFileSync(gr, 'utf8').replace(/versionCode \d+/, `versionCode ${n}`).replace(/versionName "[^"]*"/, `versionName "1.0.${n}"`));
console.log('Android ajustado: permissões, ícone e versão 1.0.' + n);
