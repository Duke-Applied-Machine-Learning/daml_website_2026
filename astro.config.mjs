// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Pages a search engine shouldn't list: the 404, and the old routes that only
// exist to redirect.
const unlisted = /\/(404|students|partnerWithUs)\/?$/;

export default defineConfig({
  // The production domain. Canonical URLs, og:url, share images and the
  // sitemap are all built from it, so it must match where the site is served.
  site: "https://dukedaml.com",
  integrations: [
    sitemap({ filter: (page) => !unlisted.test(new URL(page).pathname) }),
  ],
  // The old routes, kept alive for existing links and indexed pages.
  redirects: {
    "/partnerWithUs": "/partner",
    "/students": "/team",
  },
  build: {
    // one stylesheet for the whole site rather than a <style> block per page —
    // it is small enough that a single cached file beats per-route inlining
    inlineStylesheets: "never",
  },
  // No global image `layout`: the responsive layouts inject their own sizing
  // rules, which fight the object-fit covers the heroes and grids rely on.
  // Every <Image> passes its own widths/sizes instead, so the srcsets are
  // still there and the CSS stays ours.
});
