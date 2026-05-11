const CACHE_NAME = 'tachyon-v1.4.5';
const PRECACHE = ['/','/index.html','/manifest.json','/icon-192.png','/icon-512.png','/agnes-sprites.png','/agnes-sprites-json.json','/snack-sprites.png','/snack-sprites.json','/drink-sprites.png','/drink-sprites.json','/Cleaning-cooking-sprites.png','/Cleaning-cooking-sprites.json','/toothpaste-sprite.png','/toothpaste-sprite.json','/emotes-sprites.png','/emotes-sprites.json'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
    if (new URL(e.request.url).pathname === '/version.json') { e.respondWith(fetch(e.request)); return; }
    e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
