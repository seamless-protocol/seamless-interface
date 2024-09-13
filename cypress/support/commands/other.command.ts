/* --------------------------- */
/*   Input field interaction   */

import { TimeOuts } from "../constants";

/* --------------------------- */
Cypress.Commands.add("setAmount", (amount?: number, max?: boolean) => {
  cy.validateAmountInputs();

  cy.get("[data-cy=Form]").find('button:contains("Enter amount")').should("be.disabled");

  if (max) {
    cy.get(`[data-cy='max-button']`).click();
  } else {
    cy.get("[data-cy=Form] input")
      .first()
      .type(amount?.toString() || "");
  }
});

/* ------------------ */
/*   Button actions   */
/* ------------------ */
Cypress.Commands.add("doDepositSubmit", (hasApproval: boolean) => {
  if (!hasApproval) {
    cy.get(`[data-cy=approvalButton]`, { timeout: TimeOuts.otherTimeout })
      .last()
      .should("not.be.disabled")
      .click({ force: true });
  }
  cy.get("[data-cy=actionButton]", { timeout: TimeOuts.otherTimeout })
    .last()
    .should("not.be.disabled")
    .click({ force: true });
});

Cypress.Commands.add("doWithdrawSubmit", () => {
  cy.validateAmountInputs(true);

  cy.get("[data-cy=actionButton]", { timeout: TimeOuts.otherTimeout })
    .last()
    .should("not.be.disabled")
    .click({ force: true });
});

/* -------------- */
/*   Assertions   */
/* -------------- */
Cypress.Commands.add("checkTransactionSuccess", () => {
  cy.get(`[data-cy='notification-success-icon']`, { timeout: TimeOuts.transactionTimeout }).should("be.visible");

  cy.get(`[data-cy='close-modal']`, { timeout: TimeOuts.otherTimeout }).should("be.visible").click();
});

Cypress.Commands.add("validateAmountInputs", (checkValues?: boolean) => {
  cy.get("[data-cy=amount-input-v3]").each(($input) => {
    cy.wrap($input).within(() => {
      cy.get("[data-cy=loader]").should("not.exist");

      if (checkValues) {
        cy.get("input").should(($inputField) => {
          const value = $inputField.val();
          expect(value).to.not.be.oneOf([0, "", "0"]);
        });
      }
    });
  });
});

export {};
