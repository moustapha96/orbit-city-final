import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";

const pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["logo-color.svg", "logo_192.png", "logo_512.png"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg,jpeg}"],
    navigateFallback: "/",
    cleanupOutdatedCaches: true, // Supprime les anciens caches automatiquement
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg|css|js)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "assets-cache",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
          },
        },
      },
    ],
  },
  manifest: {
    name: "ccbm-shop",
    short_name: "ccbm-shop",
    description: "Boutique électroménager, CCBM Shop",
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

export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig), tailwind()],
  build: {
    outDir: "../deploy-ccbm-shop-dev/",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]", // Ajout du hash pour les assets
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Limite d'avertissement de taille (1 Mo)
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
