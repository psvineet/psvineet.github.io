// Service worker: installable + offline, network-first caching
const CACHE = 'psvineet';
const ASSETS = [
  '/', '/index.html', '/404.html', '/site.webmanifest',
  '/favicon.ico', '/favicon-32.png', '/apple-touch-icon.png',
  '/icon-192.png', '/icon-512.png',
  '/icon-maskable-192.png', '/icon-maskable-512.png'
];

// In-app routes (match the nav links / section ids in index.html)
const ROUTES = [
  'ask', 'facts', 'work', 'skills', 'education', 'badges', 'notes', 'reach'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
    .then((c) => Promise.allSettled(ASSETS.map((a) => c.add(a))))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // fonts, external sites: browser handles
  const nav = req.mode === 'navigate';
  const first = url.pathname.replace(/^\/+|\/+$/g, '').split('/')[0];
  const isRoute = nav && ROUTES.indexOf(first) !== -1;

  // Routes aren't real files on GitHub Pages, so serve index.html directly instead of 404ing
  const target = isRoute ? new Request('/index.html') : req;

  e.respondWith(
    fetch(target)
    .then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(nav ? '/index.html' : req, copy));
      }
      return res;
    })
    .catch(() =>
    caches.match(nav ? '/index.html' : req, { ignoreSearch: true })
    .then((hit) => hit || Response.error())
    )
  );
});
