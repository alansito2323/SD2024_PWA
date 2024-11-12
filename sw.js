//asigar nombre y version de la cache
const cache_name = "v1_cache_pwa";

var urlsToCache = [
    './',
    './styles/styles.css',
    './img/icon/Dukiii16.png',
    './img/icon/Dukiii23.png',
    './img/icon/Dukiii64.png',
    './img/icon/Dukiii96.png',
    './img/icon/Dukiii128.png',
    './img/icon/Dukiii192.png',
    './img/icon/Dukiii256.png',
    './img/icon/Dukiii384.png',
    './img/icon/Dukiii512.png',
    './img/icon/Dukiii1024.png',
    './img/icon/Dukiii1024.png',
    './img/icon/Dukiii1024.png',
    './img/icon/Dukiii1024.png',
    './img/icon/Dukiii1024.png',
    './img/icon/Dukiii1024.png',
    './img/icon/Dukiii1024.png',
    './img/icon/Dukiii1024.png',
    
]

self.addEventListener('install',e => {
    e.waitUntil(
        caches.open(cache_name)
                .then(cache => {
                    return cache.addAll(urlsToCache)
                        .then(() =>{
                            self.skipWaiting();
                        })
                        .catch(err => {
                            console.log('Cache No cargado', err)
                        })
                })
    );
});

self.addEventListener('activate', e=> {
    //añadimos todos los elementos en la cache
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
                .then(cacheNames =>{
                    return Promise.all(
                        cacheNames.map(cacheName =>{
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                //borrar elements que no esten en cache
                                //o no se necesiten
                                return caches.delete(cacheName);
                            }
                        })
                    );
                })
                .then(() => {
                    //activar cache en el dispositivo
                    self.clients.claim();
                })
    );
});



self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});

