import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@shared": path.resolve(__dirname, "src/shared/index"),
      "@meta": path.resolve(__dirname, "src/app/meta"),
      "@generated": path.resolve(__dirname, "src/app/generated"),
      "@router": path.resolve(__dirname, "src/app/router"),
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});

// Custom middleware for handling SPA fallback
// Note: This should be outside of the defineConfig if using the latest Vite API
export function configureServer(server) {
  return () => {
    server.middlewares.use((req, res, next) => {
      const url = req.url;
      // Check if the request is for a file or not
      if (!url.startsWith("/api") && !url.includes(".")) {
        // Rewrite the request to /index.html
        req.url = "/index.html";
      }
      next();
    });
  };
}
