const CACHE_NAME = "tele-blast-v3";
const STATIC_ASSETS = ["/", "/index.html"];

// Install: pre-cache shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Determine if a request is a network-first (API/canister) call
function isNetworkFirst(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith("/api") ||
    url.hostname.endsWith(".ic0.app") ||
    url.hostname.endsWith(".icp0.io") ||
    url.hostname.endsWith(".raw.icp0.io") ||
    request.method !== "GET"
  );
}

// Network-first: try network, fall back to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || caches.match("/index.html");
  }
}

// Cache-first: serve from cache, fall back to network
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // For navigation requests, serve the app shell
    if (request.mode === "navigate") {
      return caches.match("/index.html");
    }
    return new Response("Network error", { status: 503 });
  }
}

self.addEventListener("fetch", (event) => {
  // Skip non-http(s) requests (e.g. chrome-extension://)
  if (!event.request.url.startsWith("http")) return;

  if (isNetworkFirst(event.request)) {
    event.respondWith(networkFirst(event.request));
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});
