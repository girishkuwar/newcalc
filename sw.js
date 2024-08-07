
const staticCachename = "Something"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/manifest.json",
    "/js/scripts.js"
]

self.addEventListener('install', evt => {
    console.log("Service worker installed");
    evt.waitUntil(
        caches.open(staticCachename).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', evt => {
    console.log("Service worker activated");
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );

})