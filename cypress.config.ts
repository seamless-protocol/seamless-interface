import { defineConfig } from "cypress";
import viteConfig from "./vite.config";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  env: {
    url: "http://localhost:5173",
    private_key: "0xe30165a9c8c2a7f249f1cf04ba5f2ed8afacb762cc813a66b86c898cc806d58a",
    tenderly_test_rpc: "https://virtual.base.rpc.tenderly.co/9e91d861-0bbc-4459-bade-777df8e83da6",
    tenderly_access_key: "RDHizgXiBFXLHy2ZhVMSZeeo26Wufpi-",
    tenderly_account: "seamless",
    tenderly_project: "dev",
    test_env: "tenderly",
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
