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
        nested: resolve(__dirname, "nested/index.html"),
      },
    },
  },
  // server: {
  //   proxy: {
  //     // Define proxies if necessary
  //   },
  //   setupMiddlewares: (middlewares, { app }) => {
  //     // Use history API fallback middleware
  //     const history = require("connect-history-api-fallback");
  //     app.use(history());
  //     return middlewares;
  //   },
  // },
});
