import { BalanceConfig } from "../../../../cypress/support/config/balanceConfig";
import { VIRTUAL_TESTNET_KEY } from "../../../../cypress/support/constants";

export const prepareTestForRun = () => {
  before(() => {
    cy.setupTestEnvironment(BalanceConfig);
    cy.visit("/");
  });

  after(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem(VIRTUAL_TESTNET_KEY);
    });
  });
};
