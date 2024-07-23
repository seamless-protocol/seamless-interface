import { defineConfig } from "cypress";
import viteConfig from "./vite.config";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig,
    },
  },

  e2e: {
    // todo: read this dynamically?
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", vitePreprocessor(config));
    },
    specPattern: "src/app/__tests__/**/*.cy.ts",
  },
});
