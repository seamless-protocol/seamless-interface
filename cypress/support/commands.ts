/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * This will set amount in Modal
       * @param amount number
       * @param max boolean optional
       * @example cy.setAmount('137')
       */
      setAmount(amount: number, max?: boolean): void;
      /**
       * This will make confirmation in Modal
       * @param hasApproval boolean
       * @param actionName string optional, verification button text
       * @param assetName string optional, verification asset name
       * @example cy.doConfirm(true)
       */
      doConfirm(hasApproval: boolean, actionName?: string, assetName?: string): void;
    }
  }
}

Cypress.Commands.add("setAmount", (amount: number, max?: boolean) => {
  cy.get("[data-cy=Form]").find('button:contains("Enter amount")').should("be.disabled");
  if (max) {
    cy.wait(2000);
    cy.get("[data-cy=Form]").find('button:contains("Max")').click();
  } else {
    cy.get("[data-cy=Form] input").first().type(amount.toString());
  }
});

Cypress.Commands.add("doConfirm", (hasApproval: boolean) => {
  if (!hasApproval) {
    cy.get(`[data-cy=approvalButton]`, { timeout: 20000 }).last().should("not.be.disabled").click({ force: true });
  }
  cy.get("[data-cy=actionButton]", { timeout: 30000 }).last().should("not.be.disabled").click({ force: true });
});

export { };
