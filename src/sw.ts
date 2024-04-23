// @ts-ignore
// import { defaultCache } from "@serwist/next/browser";
import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // runtimeCaching: defaultCache,
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.endsWith("/share-target/") &&
    event.request.method === "GET"
  ) {
    console.log(11111);
    return event.respondWith(
      (async () => {
        const formData = await event.request.formData();
        // Extract shared data from formData
        const title = formData.get("title");
        const text = formData.get("text");
        const url = formData.get("url");

        console.log("11111");

        // Process and store the shared data
        // ...

        // Redirect to the home page
        return Response.redirect("/", 303);
      })()
    );
  }

  /* Your regular fetch handler */
});
