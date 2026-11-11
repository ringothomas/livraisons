// Garde l'appli livreurs utilisable même avec un réseau faible :
// la page est servie depuis le cache si internet ne répond pas.
const CACHE = "livraisons-v2";
const FICHIERS = ["./", "./index.html", "./manifest.json", "./icone-192.png", "./icone-512.png", "./vendor/capacitor.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // l'API passe toujours par le réseau
  e.respondWith(
    fetch(e.request).then((r) => {
      const copie = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copie));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
