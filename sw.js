// Caches the app shell so it opens instantly and works with no signal at all.
// Your gallery data itself lives in IndexedDB (see index.html), not here — this
// only caches the code/icons needed to run the app.
const CACHE_NAME = 'sais-shell-v3';
const SHELL_FILES = [
  './',
  './index.html',
  './apply.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL_FILES)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', event=>{
  event.waitUntil(
    caches.keys().then(names=>Promise.all(
      names.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n))
    )).then(()=>self.clients.claim())
  );
});

// App shell: cache-first, falling back to network (and re-caching what we fetch).
// Anything not in our list (e.g. the Google Fonts CSS/files) is just fetched normally.
self.addEventListener('fetch', event=>{
  if(event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(res=>{
        if(res && res.ok && event.request.url.startsWith(self.location.origin)){
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(event.request, copy));
        }
        return res;
      }).catch(()=>cached);
    })
  );
});
