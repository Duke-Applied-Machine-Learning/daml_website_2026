// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The AITP site — deployed on its own to aitp.dukedaml.com. It has no
// node_modules or package.json of its own: run it from the repo root with
// `npm run dev:aitp` / `npm run build:aitp`, which `cd aitp` first. (Not
// `--root aitp`: Astro's background dev mode re-applies a relative root from
// inside the folder and ends up looking in aitp/aitp.) It shares the main
// site's stylesheet, layout, nav, footer and data through the `@/` alias (see
// tsconfig.json), so the two stay one design.
export default defineConfig({
  site: "https://aitp.dukedaml.com",
  integrations: [
    sitemap({ filter: (page) => !/\/404\/?$/.test(new URL(page).pathname) }),
  ],
  // One port above the main site's 4321, so both dev servers can run at once.
  server: { port: 4322 },
  build: {
    inlineStylesheets: "never",
  },
});
