import { defineConfig } from "cypress";
import viteConfig from "./vite.config";
import vitePreprocessor from "cypress-vite";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.development" });

export default defineConfig({
  env: {
    url: "http://localhost:5173",
    private_key: "0xe30165a9c8c2a7f249f1cf04ba5f2ed8afacb762cc813a66b86c898cc806d58a",
    tenderly_test_rpc: process.env.VITE_TEST_RPC_URL,
    tenderly_access_key: process.env.VITE_TEST_ACCESS_KEY,
    tenderly_account: process.env.VITE_TEST_PROFILE,
    tenderly_project: process.env.VITE_TEST_PROJECT,
    test_env: process.env.VITE_TEST_ENV,
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
