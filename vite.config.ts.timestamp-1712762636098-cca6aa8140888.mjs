// vite.config.ts
import { sentryVitePlugin } from "file:///D:/repos-d/prod/seamless/seamless-interface/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { nodePolyfills } from "file:///D:/repos-d/prod/seamless/seamless-interface/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { defineConfig, loadEnv } from "file:///D:/repos-d/prod/seamless/seamless-interface/node_modules/vite/dist/node/index.js";
import react from "file:///D:/repos-d/prod/seamless/seamless-interface/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\repos-d\\prod\\seamless\\seamless-interface";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      nodePolyfills(),
      react(),
      sentryVitePlugin({
        org: "seamless-jw",
        project: "javascript-react",
        authToken: env.VITE_SENTRY_AUTH_TOKEN
      })
    ],
    resolve: {
      alias: {
        "@assets": path.resolve(__vite_injected_original_dirname, "src/assets"),
        "@shared": path.resolve(__vite_injected_original_dirname, "src/shared/index"),
        "@generated": path.resolve(__vite_injected_original_dirname, "src/app/generated"),
        // "@state": path.resolve(__dirname, "src/app/state"),
        // "@app-components": path.resolve(__dirname, "src/app/components"),
        "@router": path.resolve(__vite_injected_original_dirname, "src/app/router"),
        "@meta": path.resolve(__vite_injected_original_dirname, "src/meta/index")
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        onLog(level, log, handler) {
          if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
            return;
          }
          handler(level, log);
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyZXBvcy1kXFxcXHByb2RcXFxcc2VhbWxlc3NcXFxcc2VhbWxlc3MtaW50ZXJmYWNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyZXBvcy1kXFxcXHByb2RcXFxcc2VhbWxlc3NcXFxcc2VhbWxlc3MtaW50ZXJmYWNlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yZXBvcy1kL3Byb2Qvc2VhbWxlc3Mvc2VhbWxlc3MtaW50ZXJmYWNlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gXCJAc2VudHJ5L3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSBcInZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIG5vZGVQb2x5ZmlsbHMoKSxcbiAgICAgIHJlYWN0KCksXG4gICAgICBzZW50cnlWaXRlUGx1Z2luKHtcbiAgICAgICAgb3JnOiBcInNlYW1sZXNzLWp3XCIsXG4gICAgICAgIHByb2plY3Q6IFwiamF2YXNjcmlwdC1yZWFjdFwiLFxuICAgICAgICBhdXRoVG9rZW46IGVudi5WSVRFX1NFTlRSWV9BVVRIX1RPS0VOLFxuICAgICAgfSksXG4gICAgXSxcblxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQGFzc2V0c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9hc3NldHNcIiksXG4gICAgICAgIFwiQHNoYXJlZFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9zaGFyZWQvaW5kZXhcIiksXG4gICAgICAgIFwiQGdlbmVyYXRlZFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9hcHAvZ2VuZXJhdGVkXCIpLFxuICAgICAgICAvLyBcIkBzdGF0ZVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9hcHAvc3RhdGVcIiksXG4gICAgICAgIC8vIFwiQGFwcC1jb21wb25lbnRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2FwcC9jb21wb25lbnRzXCIpLFxuICAgICAgICBcIkByb3V0ZXJcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYXBwL3JvdXRlclwiKSxcbiAgICAgICAgXCJAbWV0YVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9tZXRhL2luZGV4XCIpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcblxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvbkxvZyhsZXZlbCwgbG9nLCBoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKGxvZy5jYXVzZSAmJiAobG9nLmNhdXNlIGFzIGFueSkubWVzc2FnZSA9PT0gYENhbid0IHJlc29sdmUgb3JpZ2luYWwgbG9jYXRpb24gb2YgZXJyb3IuYCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoYW5kbGVyKGxldmVsLCBsb2cpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZULFNBQVMsd0JBQXdCO0FBQzlWLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLGNBQWM7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLFFBQ2YsS0FBSztBQUFBLFFBQ0wsU0FBUztBQUFBLFFBQ1QsV0FBVyxJQUFJO0FBQUEsTUFDakIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLFdBQVcsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUMvQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxRQUNyRCxjQUFjLEtBQUssUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQTtBQUFBO0FBQUEsUUFHekQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsUUFDbkQsU0FBUyxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDbkQ7QUFBQSxJQUNGO0FBQUEsSUFFQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsTUFFWCxlQUFlO0FBQUEsUUFDYixNQUFNLE9BQU8sS0FBSyxTQUFTO0FBQ3pCLGNBQUksSUFBSSxTQUFVLElBQUksTUFBYyxZQUFZLDZDQUE2QztBQUMzRjtBQUFBLFVBQ0Y7QUFDQSxrQkFBUSxPQUFPLEdBQUc7QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
