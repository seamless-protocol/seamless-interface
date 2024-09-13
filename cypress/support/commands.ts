/// <reference types="cypress" />
import { IBalanceConfig } from "./config/balanceConfig";
import {
  LOCALSTORAGE_IS_TEST_MODE_KEY,
  LOCALSTORAGE_TESTNET_ID_KEY,
  LOCALSTORAGE_TESTNET_SNAPSHOT_KEY,
  LOCALSTORAGE_TESTNET_URL_KEY,
  PRIVATE_KEY,
  targetAccount,
  TimeOuts,
} from "./constants";
import { anvilForkUrl, testAnvilClient } from "./anvil";
import { anvilSetErc20Balance } from "./anvil/utils/anvilSetErc20Balance";
import { tenderlyCreateFork } from "./tenderly/utils/tenderlyCreateFork";
import { tenderlyFundAccount } from "./tenderly/utils/tenderlyFundAccount";
import { tenderlyFundAccountERC20 } from "./tenderly/utils/tenderlyFundAccountERC20";

declare global {
  namespace Cypress {
    interface Chainable {
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

      /**
       * Validates that all amount inputs have non-zero values and no loaders are present
       * @param options ValidateAmountInputsOptions optional, allows specifying custom loader or input selectors
       * @example cy.validateAmountInputs({ loaderSelector: "[data-cy=custom-loader]" })
       */
      validateAmountInputs(checkValues?: boolean): void;

      /**
       * Checks if the transaction success notification is visible
       * @example cy.checkTransactionSuccess()
       */
      checkTransactionSuccess(): void;
    }
  }
}

// move all of this to separate file

/* ---------------------- */
/*   Deposit & Withdraw   */
/* ---------------------- */

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

/* --------------------------- */
/*   Input field interaction   */
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

/* ------------- */
/*   Setup env   */
/* ------------- */
Cypress.Commands.add("setupAnvilTestEnvironment", (balanceConfig: IBalanceConfig) => {
  const forkUrl = anvilForkUrl;

  localStorage.setItem(LOCALSTORAGE_IS_TEST_MODE_KEY, "true");
  localStorage.setItem(LOCALSTORAGE_TESTNET_URL_KEY, JSON.stringify({ forkUrl }));
  localStorage.setItem(PRIVATE_KEY, JSON.stringify({ KEY: Cypress.env("private_key") }));

  cy.wrap(null).then(async () => {
    const snapshotId = await testAnvilClient.snapshot();
    localStorage.setItem(LOCALSTORAGE_TESTNET_SNAPSHOT_KEY, JSON.stringify({ snapshotId }));

    await testAnvilClient.setBalance({
      address: targetAccount,
      value: BigInt(1e18),
    });

    // Set up balances and other test states
    await anvilSetErc20Balance({
      address: balanceConfig.account,
      tokenAddress: balanceConfig.tokenAddress,
      value: balanceConfig.balance,
    });
  });
});

Cypress.Commands.add("setupTenderlyTestEnvironment", (balanceConfig: IBalanceConfig) => {
  cy.log("Setting up Tenderly test environment");

  cy.wrap(null).then(async () => {
    const result = await tenderlyCreateFork();
    const { forkUrl, id } = result;

    localStorage.setItem(LOCALSTORAGE_TESTNET_ID_KEY, JSON.stringify({ id }));
    localStorage.setItem(LOCALSTORAGE_IS_TEST_MODE_KEY, "true");
    localStorage.setItem(LOCALSTORAGE_TESTNET_URL_KEY, JSON.stringify({ forkUrl }));
    localStorage.setItem(PRIVATE_KEY, JSON.stringify({ KEY: Cypress.env("private_key") }));

    await tenderlyFundAccount(forkUrl);

    await tenderlyFundAccountERC20(forkUrl, balanceConfig.tokenAddress, balanceConfig.account, balanceConfig.balance);
  });
});

export {};
