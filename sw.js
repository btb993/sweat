// SWEAT service worker: makes the app open offline.
const CACHE = 'sweat-v16';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // The app page: network first so updates arrive, cache when offline.
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('/index.html'))) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Same-site scripts and data: network first, so config changes arrive.
  if (url.origin === location.origin && /\.(js|json|webmanifest)$/.test(url.pathname)) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req)));
    return;
  }
  // Everything else (icons, fonts): cache first, then network.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok && (url.origin === location.origin || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com'))) {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    }
    return r;
  }).catch(() => hit)));
});
