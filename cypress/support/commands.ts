/// <reference types="cypress" />
import { mount } from "cypress/react";
import { IBalanceConfig } from "./config/balanceConfig";
import "./commands/index";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      /**
       * This will set amount in Modal
       * @param amount number
       * @param max boolean optional
       * @example cy.setAmount('137')
       */
      setAmount(amount?: number, max?: boolean): void;
      /**
       * This will make confirmation in Modal
       * @param hasApproval boolean
       * @param actionName string optional, verification button text
       * @param assetName string optional, verification asset name
       * @example cy.doDepositSubmit(true)
       */
      doDepositSubmit(hasApproval: boolean, actionName?: string, assetName?: string): void;
      /**
       * This will make confirmation in Modal
       * @example cy.doDepositSubmit(true)
       */
      doWithdrawSubmit(): void;
      /**
       * Sets up the anvil test environment by initializing the blockchain state
       */
      setupAnvilTestEnvironment(testBalanceData: IBalanceConfig): void;
      /**
       * Sets up the tenderly test environment by initializing the blockchain state
       */
      setupTenderlyTestEnvironment(balanceConfig: IBalanceConfig): void;

      /**
       * Performs a deposit action
       * @param address string Address to deposit to
       * @param amount number Amount to deposit
       * @param hasApproval boolean Whether approval is required
       * @param isMaxAmount boolean optional Whether to deposit the max amount
       * @example cy.deposit({ address: '0x...', amount: 100, hasApproval: true })
       */
      deposit(params: { address: string; amount: number; hasApproval: boolean; isMaxAmount?: boolean }): void;
      /**
       * Performs a withdraw action
       * @param amount number Amount to withdraw
       * @param isMaxAmount boolean optional Whether to withdraw the max amount
       * @example cy.withdraw({ amount: 100 })
       */
      withdraw(params: { amount: number; isMaxAmount?: boolean }): void;
    }
  }
}

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("setAmount", (amount?: number, max?: boolean) => {
  cy.get("[data-cy=Form]").find('button:contains("Enter amount")').should("be.disabled");
  if (max) {
    cy.wait(2000);
    cy.get(`[data-cy='max-button']`).click();
  } else {
    cy.get("[data-cy=Form] input")
      .first()
      .type(amount?.toString() || "");
  }
});

Cypress.Commands.add("doDepositSubmit", (hasApproval: boolean) => {
  if (!hasApproval) {
    cy.get(`[data-cy=approvalButton]`, { timeout: 20000 }).last().should("not.be.disabled").click({ force: true });
  }
  cy.get("[data-cy=actionButton]", { timeout: 30000 }).last().should("not.be.disabled").click({ force: true });
});

Cypress.Commands.add("doWithdrawSubmit", () => {
  cy.get("[data-cy=actionButton]", { timeout: 30000 }).last().should("not.be.disabled").click({ force: true });
});

export {};
