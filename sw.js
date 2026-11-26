const CACHE="fischerpruefung-v3";
const FILES=["./", "index.html", "manifest.webmanifest", "fragen.json", "fotos.json", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png", "img/B1.1.jpg", "img/B1.2.jpg", "img/B1.3.jpg", "img/B1.4.jpg", "img/B1.5.jpg", "img/B1.6.jpg", "img/B2.1.jpg", "img/B2.10.jpg", "img/B2.11.jpg", "img/B2.12.jpg", "img/B2.13.jpg", "img/B2.14.jpg", "img/B2.15.jpg", "img/B2.16.jpg", "img/B2.17.jpg", "img/B2.18.jpg", "img/B2.19.jpg", "img/B2.2.jpg", "img/B2.20.jpg", "img/B2.21.jpg", "img/B2.22.jpg", "img/B2.23.jpg", "img/B2.24.jpg", "img/B2.3.jpg", "img/B2.4.jpg", "img/B2.5.jpg", "img/B2.6.jpg", "img/B2.7.jpg", "img/B2.8.jpg", "img/B2.9.jpg", "img/B3.1.jpg", "img/B3.10.jpg", "img/B3.11.jpg", "img/B3.12.jpg", "img/B3.13.jpg", "img/B3.14.jpg", "img/B3.15.jpg", "img/B3.16.jpg", "img/B3.17.jpg", "img/B3.2.jpg", "img/B3.3.jpg", "img/B3.4.jpg", "img/B3.5.jpg", "img/B3.6.jpg", "img/B3.7.jpg", "img/B3.8.jpg", "img/B3.9.jpg", "img/B4.1.jpg", "img/B4.2.jpg", "img/B4.3.jpg", "img/B4.4.jpg", "img/B4.5.jpg", "img/B4.6.jpg", "img/B4.7.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(async c=>{await c.addAll(FILES);
  try{const f=await (await fetch("fotos.json")).json();await Promise.all(Object.values(f).map(x=>fetch(x.u,{mode:"no-cors",referrerPolicy:"no-referrer"}).then(r=>c.put(x.u,r)).catch(()=>{})))}catch(e){}
}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET")return;
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))));
  }else if(u.hostname.endsWith("wikimedia.org")||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith(caches.match(e.request.url).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(CACHE).then(x=>x.put(e.request.url,c));return n})));
  }
});
