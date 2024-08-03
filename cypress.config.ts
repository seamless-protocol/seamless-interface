import { defineConfig } from "cypress";
import viteConfig from "./vite.config";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  env: {
    url: "http://localhost:5173",
    test_rpc: "https://virtual.base.rpc.tenderly.co/ee8497a0-46bc-4a54-8412-11aa72e813c6",
    private_key: "0xe30165a9c8c2a7f249f1cf04ba5f2ed8afacb762cc813a66b86c898cc806d58a",
    access_key: "RDHizgXiBFXLHy2ZhVMSZeeo26Wufpi-",
  },
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
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
});
