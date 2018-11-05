self.addEventListener('install', event => {
  const urlsToCache = [
    '/',
    '/css/responsive.css',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/restaurant.html'
  ];
  event.waitUntil(
    caches.open('restaurant-app').then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response) return response;
      return fetch(event.request).then(resp => {
        const clone = resp.clone();
        caches.open('restaurant-app').then(cache => {
          cache.put(event.request, resp);
        });
        return clone;
      }).catch(err => {
        console.log('error fetching', err, event.request);
      })
    })
  );
});
