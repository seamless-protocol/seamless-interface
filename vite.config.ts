import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@shared": path.resolve(__dirname, "src/shared/index"),
      "@meta": path.resolve(__dirname, "src/app/meta"),
      "@generated": path.resolve(__dirname, "src/app/generated"),
      // "@state": path.resolve(__dirname, "src/app/state"),
      // "@app-components": path.resolve(__dirname, "src/app/components"),
      "@router": path.resolve(__dirname, "src/app/router"),
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
