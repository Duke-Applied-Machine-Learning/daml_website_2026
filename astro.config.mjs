// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // ⚠️ PLACEHOLDER — set this to the real production domain before deploying.
  // It is what canonical and og:url tags are built from, so a wrong value here
  // points every page's canonical at a domain you don't own.
  site: "https://dukedaml.com",
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
