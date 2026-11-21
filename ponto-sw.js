// Endereço antigo do Gestti: este service worker só se desliga (o sistema agora fica em gesttisistema/).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.registration.unregister()));
