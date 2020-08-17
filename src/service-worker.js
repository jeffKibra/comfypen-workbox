importScripts("workbox-v5.1.3/workbox-sw.js");
//workbox.loadModule("workbox-core");
/*self.addEventListener("message", (event) => {
  console.log(event);
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
    console.log("yes");
  }
});*/

self.addEventListener("install", function (event) {
  const channel = new BroadcastChannel("service-worker-channel");
  channel.postMessage({ promptToReload: true });

  channel.onmessage = (message) => {
    if (message.data.skipWaiting) {
      self.skipWaiting();
      console.log("skipping the wait!!");
    }
  };
});

if (workbox) {
  workbox.setConfig({ modulePathPrefix: "workbox-v5.1.3" });

  const { core, precaching, routing } = workbox;
  const { clientsClaim } = core;
  const { precacheAndRoute, createHandlerBoundToURL } = precaching;
  const { NavigationRoute, registerRoute } = routing;

  clientsClaim();

  //precache all files
  precacheAndRoute(self.__WB_MANIFEST);

  //spa handler for routes
  const handler = createHandlerBoundToURL("index.html");
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);
  console.log(`Yay! Workbox is loaded 🎉`);
  /* 
  registerRoute(
    /(.*)articles(.*)\.(?:png|gif|jpg)/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  const articleHandler = workbox.strategies.networkFirst({
    cacheName: "articles-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      }),
    ],
  });

  registerRoute(/(.*)article(.*)\.html/, (args) => {
    return articleHandler.handle(args).then((response) => {
      if (!response) {
        return caches.match("pages/offline.html");
      } else if (response.status === 404) {
        return caches.match("pages/404.html");
      }
      return response;
    });
  });*/
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
