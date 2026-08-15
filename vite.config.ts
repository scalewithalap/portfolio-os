import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, Plugin } from "vite";
import { writeSitemap } from "./scripts/generate-sitemap";

function sitemapPlugin(): Plugin {
  return {
    name: "dynamic-sitemap-generator",
    buildStart() {
      try {
        writeSitemap();
      } catch (err) {
        console.error("[sitemap] Error generating dynamic sitemap:", err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sitemapPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // split one 421KB monolith into parallel-loadable, independently-cacheable vendor chunks
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-gsap": ["gsap"],
            "vendor-state": ["zustand", "immer"],
            "vendor-ui": ["lucide-react"],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
