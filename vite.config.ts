import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

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
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    proxy: {
      // Define your proxies here if needed
    },
    setupMiddlewares: (middlewares, { app }) => {
      // Custom middleware to serve index.html on unmatched routes
      app.use("*", (req, res, next) => {
        res.type("html");
        res.send(indexHtml);
      });
      return middlewares;
    },
  },
});
