import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
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
            "vendor-motion": ["motion"],
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
