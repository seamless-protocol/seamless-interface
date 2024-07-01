import { defineConfig } from "cypress";
// import viteConfig from "./vite.config";

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // optionally pass in vite config
      // viteConfig: customViteConfig,
      // or a function - the result is merged with
      // any `vite.config` file that is detected
      // viteConfig,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
