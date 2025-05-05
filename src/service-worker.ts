
// This is a basic service worker that caches the app shell
const CACHE_NAME = 'social-command-cache-v1';

const appShellFiles = [
  '/',
  '/index.html',
  '/main.js',
  '/main.css',
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Don't cache API calls
        if (!event.request.url.includes('/api/')) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        }
        return fetchResponse;
      });
    }).catch(() => {
      // Return offline page if available
      if (event.request.headers.get('accept')?.includes('text/html')) {
        return caches.match('/offline.html');
      }
    })
  );
});

self.addEventListener('activate', (event: any) => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheAllowlist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
