import { sentryVitePlugin } from "@sentry/vite-plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "",
    plugins: [
      nodePolyfills(),
      react(),
      sentryVitePlugin({
        org: "seamless-jw",
        project: "javascript-react",
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
      }),
    ],

    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
        "@shared": path.resolve(__dirname, "src/shared/index"),
        "@generated": path.resolve(__dirname, "src/app/generated"),
        "@router": path.resolve(__dirname, "src/app/router"),
        "@meta": path.resolve(__dirname, "src/meta/index"),
        "@generated-graphql": path.resolve(__dirname, "src/generated-graphql/index"),
        "@app": path.resolve(__dirname, "src/app/"),
        "jsbi": path.resolve(__dirname, "node_modules/jsbi/dist/jsbi-cjs.js"),
      },
    },

    define: {
      "process.env": {},
    },

    build: {
      sourcemap: true,

      rollupOptions: {
        onLog(level, log, handler) {
          if (log.cause && (log.cause as any).message === `Can't resolve original location of error.`) {
            return;
          }
          handler(level, log);
        },
      },
    },
  };
});
