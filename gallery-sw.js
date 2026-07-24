// Public gallery service worker. The app shell (page code, icons) is cached so it opens
// instantly and works offline. catalog.json — the actual published data — is always
// fetched fresh first so visitors see the latest publish; it only falls back to the
// cached copy if there's no signal at all.
const CACHE_NAME = 'wunderkammer-gallery-v3';
const SHELL_FILES = [
  './gallery.html',
  './gallery-manifest.json',
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

self.addEventListener('fetch', event=>{
  if(event.request.method !== 'GET') return;
  const url = event.request.url;

  if(url.includes('catalog.json')){
    // network-first for the data itself, so visitors get the latest publish
    event.respondWith(
      fetch(event.request).then(res=>{
        if(res && res.ok){
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(event.request, copy));
        }
        return res;
      }).catch(()=>caches.match(event.request))
    );
    return;
  }

  // cache-first for the app shell itself
  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(res=>{
        if(res && res.ok && url.startsWith(self.location.origin)){
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(event.request, copy));
        }
        return res;
      }).catch(()=>cached);
    })
  );
});
