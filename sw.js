var CACHE = 'np-v10';
var ASSETS = ['./', './index.html', './css/style.css', './css/pets.css',
  './sprites/cat.png', './sprites/cat2.png', './sprites/dog.png',
  './js/firebase-sync.js',
  './js/pet-sprites.js', './js/classnotes.js', './js/data.js', './js/shop.js', './js/srs.js',
  './js/pet.js', './js/economy.js', './js/inventory.js', './js/room.js',
  './js/achievements.js', './js/diary.js', './js/app.js',
  './manifest.json', './icons/icon.svg'];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(ks) {
    return Promise.all(ks.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  var isHTML = e.request.mode === 'navigate' || url.endsWith('/') || url.endsWith('.html');

  if (isHTML) {
    // Network-first for HTML so updates propagate immediately
    e.respondWith(
      fetch(e.request).then(function(res) {
        if (res.status === 200) {
          var clone = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return res;
      }).catch(function() { return caches.match(e.request).then(function(r) { return r || caches.match('./index.html'); }); })
    );
    return;
  }

  // Cache-first for static assets (CSS/JS/images — versioned via query strings)
  e.respondWith(caches.match(e.request).then(function(r) {
    return r || fetch(e.request).then(function(res) {
      if (res.status === 200 && e.request.method === 'GET') {
        var c = res.clone();
        caches.open(CACHE).then(function(ca) { ca.put(e.request, c); });
      }
      return res;
    });
  }).catch(function() { return caches.match('./index.html'); }));
});
