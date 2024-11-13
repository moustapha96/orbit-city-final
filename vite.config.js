import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "tailwindcss";

import { VitePWA } from "vite-plugin-pwa";

// Add PWA configuration
const pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["logo-color.svg"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg,jpeg}"], // Include your asset types
    navigateFallback: "/", // The fallback for client-side routing
    navigateFallbackAllowlist: [/^(?!\/__).*/], // Allowlist for navigateFallback
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg)$/, // Define the regex pattern for your assets
        handler: "StaleWhileRevalidate", // Caching strategy
      },
    ],
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
  },
  manifest: {
    name: "ccbm-shop",
    short_name: "ccbm-shop",
    description: "Boutique électroménager , CCBM Shop",
    start_url: "/",
    display: "standalone",
    background_color: "#09aef8",
    theme_color: "#09aef8",
    icons: [
      {
        src: "/logo_192.png",
        sizes: "192x192",
        purpose: "any maskable",
      },
      {
        src: "/logo_512.png",
        sizes: "512x512",
        purpose: "maskable any",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  basename: "/",
  plugins: [react(), VitePWA(pwaConfig), tailwind()],
  build: {
    // outDir: "../deploy-ccbm-shop/",
    outDir: "../deploy-ccbm-shop-dev/",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 1 MB
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
