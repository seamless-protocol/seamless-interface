/// <reference types="cypress" />

import { TimeOuts } from "../constants";

Cypress.Commands.add("deposit", ({ address, amount, hasApproval = true, isMaxAmount = false }) => {
  cy.log(`Starting deposit for address: ${address}`);
  // *** Navigate *** //
  cy.get(`[data-cy='table-row-${address}']`, { timeout: TimeOuts.otherTimeout }).click();
  // *** Set amount *** //
  cy.setAmount(amount, isMaxAmount);
  // *** Submit form *** //
  cy.doDepositSubmit(hasApproval);
  // *** Check success *** //
  cy.checkTransactionSuccess();
});

export {};
