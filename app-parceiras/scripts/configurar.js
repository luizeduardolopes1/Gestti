// Antes do "npx cap add android": escreve o capacitor.config.json da versão pedida.
// Uso: node scripts/configurar.js producao|demo
// producao → site das lojas (/Gestti/gesttisistema/); demo → site da demonstração (/Gestti/gesttisistema/demo/). IDs diferentes: os dois podem ficar instalados.
const fs = require('fs'), path = require('path');
const v = process.argv[2];
const V = {
  producao: { appId: 'br.com.gestti.parceiras', appName: 'Gestti Parceiras', url: 'https://luizeduardolopes1.github.io/Gestti/gesttisistema/index.html?app=1' },
  demo: { appId: 'br.com.gestti.parceiras.demo', appName: 'Parceiras demo', url: 'https://luizeduardolopes1.github.io/Gestti/gesttisistema/demo/index.html?app=1' },
}[v];
if (!V) { console.error('uso: node scripts/configurar.js producao|demo'); process.exit(1); }
const cfg = {
  appId: V.appId, appName: V.appName, webDir: 'www',
  server: { url: V.url, androidScheme: 'https', allowNavigation: ['luizeduardolopes1.github.io', 'wcrfhxijeoxgklyqkhko.supabase.co', 'cdn.jsdelivr.net'] },
  android: { backgroundColor: '#0F1B2D' },
};
fs.writeFileSync(path.join(__dirname, '..', 'capacitor.config.json'), JSON.stringify(cfg, null, 2) + '\n');
console.log('configurado:', v, V.appId, V.url);
