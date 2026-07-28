// @ts-check

import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://christianbuchert.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Keep all of elkjs (mermaid's ELK layout) in one chunk. elkjs runs
          // its layout in an in-thread "web worker" whose dispatcher and payload
          // reference each other; when Rollup splits them across chunks (only
          // happens once mermaid's large graph is in the bundle), elk.layout()
          // never resolves, so mermaid.run() hangs and the diagram renders empty
          // in production. Works in `astro dev` (unbundled) either way.
          manualChunks(id) {
            if (id.includes("elkjs") || id.includes("layout-elk")) return "elk"
          },
        },
      },
    },
  },
})
