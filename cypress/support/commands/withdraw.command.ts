Cypress.Commands.add("withdraw", ({ amount, isMaxAmount = true }) => {
  cy.log("Starting withdraw");

  cy.get(`[data-cy='withdraw-button']`, { timeout: 3000 }).click();
  cy.wait(4000);
  cy.setAmount(amount, isMaxAmount);
  cy.wait(4000);
  cy.doWithdrawSubmit();
  cy.get('[data-cy="notification-success-icon"]', { timeout: 20000 }).should("be.visible");
  cy.wait(5000);
});

export {};
