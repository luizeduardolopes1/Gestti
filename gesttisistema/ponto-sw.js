// Gestti Ponto: sempre busca a versão nova; sem internet, mostra a última guardada.
const C = 'gestti-ponto-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(C).then((c) => c.addAll(['ponto.html', 'ponto-icone-192.png']))); });
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || !/\/ponto(\.html|-icone)/.test(u.pathname)) return;
  e.respondWith(fetch(e.request).then((r) => { const k = r.clone(); caches.open(C).then((c) => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
