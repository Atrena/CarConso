// Offline cache of the website (the Android app does not need it): every app
// file is cached on install.
const CACHE = 'carconso-v23';
const APP_SHELL = [
  './',
  'index.html',
  'style.css',
  'vendor/chart.umd.min.js',
  'i18n.js',
  'stats.js',
  'storage.js',
  'native.js',
  'app.js',
  'expenses.js',
  'stats-view.js',
  'sim-view.js',
  'data-view.js',
  'settings-view.js',
  'confidentialite.html',
  'privacy.html',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Network first (immediate updates), cache as an offline fallback.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true })),
  );
});
