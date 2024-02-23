import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "configure-server",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const { url } = req;
          const isApiRoute = url.startsWith("/api"); // Example API route check
          // Only rewrite non-file and non-API requests to `index.html`
          if (!isApiRoute && !url.includes(".")) {
            req.url = "/index.html";
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
      "@shared": resolve(__dirname, "src/shared/index"),
      "@meta": resolve(__dirname, "src/app/meta"),
      "@generated": resolve(__dirname, "src/app/generated"),
      "@router": resolve(__dirname, "src/app/router"),
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  // Additional configuration...
});
