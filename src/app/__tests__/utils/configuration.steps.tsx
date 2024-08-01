import { BalanceConfig } from "../../../../cypress/support/config/balanceConfig";
import { VIRTUAL_TESTNET_KEY } from "../../../../cypress/support/constants";

type TestEnv = "anvil" | "tenderly";

export const prepareTestForRun = () => {
  // const testEnv = (import.meta.env.VITE_TEST_ENVIRONMENT || "tenderly") as TestEnv;
  const testEnv = "anvil";

  before(() => {
    if (testEnv === "anvil") {
      cy.setupAnvilTestEnvironment(BalanceConfig);
    } else if (testEnv === "tenderly") {
      cy.setupTenderlyTestEnvironment(BalanceConfig);
    }
    cy.visit("/");
  });

  after(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem(VIRTUAL_TESTNET_KEY);
    });
  });
};
