/// <reference types="cypress" />

Cypress.Commands.add("deposit", ({ address, amount, hasApproval = true, isMaxAmount = false }) => {
  cy.log(`Starting deposit for address: ${address}`);

  cy.get(`[data-cy='table-row-${address}']`, { timeout: 3000 }).click();
  cy.wait(4000);
  cy.setAmount(amount, isMaxAmount);
  cy.wait(4000);
  cy.doDepositSubmit(hasApproval);
  cy.get(`[data-cy='notification-success-icon']`, { timeout: 20000 }).should("be.visible");
  cy.wait(1000);
  cy.get(`[data-cy='close-modal']`, { timeout: 2000 }).should("be.visible").click();
});

export {};
