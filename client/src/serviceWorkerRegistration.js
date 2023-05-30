// En tu archivo de Service Worker

const CACHE_NAME = "mi-cache";

// Archivos a cachear
const filesToCache = [
  "/",
  "/index.html",
  "/styles/main.css",
  "/scripts/main.js",
  "/images/logo.png",
  // Agrega aquí las rutas de las imágenes y otros recursos que deseas cachear
];

// Evento de instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(filesToCache))
  );
});

// Evento fetch para responder a las solicitudes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso se encuentra en caché, se devuelve la respuesta caché
      if (response) {
        return response;
      }

      // Si el recurso no se encuentra en caché, se realiza la solicitud a la red
      return fetch(event.request);
    })
  );
});
