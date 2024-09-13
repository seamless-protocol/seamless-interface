import { TimeOuts } from "../constants";

Cypress.Commands.add("withdraw", ({ amount, isMaxAmount = true }) => {
  cy.log("Starting withdraw");
  // *** Navigate *** //
  cy.get(`[data-cy='withdraw-button']`, { timeout: TimeOuts.otherTimeout }).click();
  // *** Set amount *** //
  cy.setAmount(amount, isMaxAmount);
  // *** Submit form *** //
  cy.doWithdrawSubmit();
  // *** Check success *** //
  cy.checkTransactionSuccess();
});

export {};
