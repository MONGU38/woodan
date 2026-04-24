const CACHE = 'woodan-' + new Date().toISOString();
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/woodan/'])));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('sw.js')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
