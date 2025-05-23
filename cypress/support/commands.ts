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
import { findTestnetIdByDisplayName } from "./tenderly/utils/findTestnetIdBySlug";
import { tenderlyDeleteFork } from "./tenderly/utils/tenderlyDeleteFork";

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
       * @example cy.doDepositSubmit(true)
       */
      doDepositSubmit(hasApproval: boolean, depositNativeETH?: boolean): void;
      /**
       * This will make confirmation in Modal
       * @example cy.doWithdrawSubmit()
       */
      doWithdrawSubmit(): void;
      /**
       * Sets up the anvil test environment by initializing the blockchain state
       */
      setupAnvilTestEnvironment(testBalanceData?: IBalanceConfig): void;
      /**
       * Sets up the tenderly test environment by initializing the blockchain state
       */
      setupTenderlyTestEnvironment(balanceConfig?: IBalanceConfig): void;

      /**
       * Performs a deposit action
       * @param address string Address to deposit to
       * @param amount number Amount to deposit
       * @param hasApproval boolean Whether approval is required
       * @param isMaxAmount boolean optional Whether to deposit the max amount
       * @param shouldErrorBeThrown boolean optional Whether to check if error is present in UI
       * @param depositNativeETH boolean optional Whether to deposit native ETH instea of WETH
       * @example cy.deposit({ address: '0x...', amount: 100, hasApproval: true })
       */
      deposit(params: {
        address: string;
        amount: number;
        hasApproval: boolean;
        isMaxAmount?: boolean;
        shouldErrorBeThrown?: boolean;
        tab?: string;
        depositNativeETH?: boolean;
      }): void;

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
      /**
       * Checks if the transaction error notification is visible
       * @example cy.checkTransactionError()
       */
      checkTransactionError(): void;
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

  cy.wait(2500);
  // *** Set amount *** //
  cy.setAmount(amount, isMaxAmount);

  cy.wait(2500);
  // *** Submit form *** //
  cy.doWithdrawSubmit();
  // *** Check success *** //
  cy.checkTransactionSuccess();
});
Cypress.Commands.add(
  "deposit",
  ({
    address,
    amount,
    hasApproval = true,
    isMaxAmount = false,
    shouldErrorBeThrown = false,
    tab,
    depositNativeETH,
  }) => {
    cy.log(`Starting deposit for address: ${address}`);

    if (tab) {
      cy.get(`[data-cy='tab-${tab}']`, { timeout: TimeOuts.otherTimeout }).click();
    }
    // *** Navigate *** //
    cy.get(`[data-cy='table-row-${address}']`, { timeout: TimeOuts.otherTimeout }).click();

    // *** Handle depositNativeETH switch/button if provided *** //
    if (depositNativeETH != null) {
      if (depositNativeETH === false) {
        // If depositNativeETH is true, assert that the button exists (but don't click it).
        cy.get("[data-cy='depositNativeETH']").should("exist");
      } else {
        // If depositNativeETH is false, click the switch/button.
        cy.get("[data-cy='depositNativeETH']").click();
      }
    } else {
      // If depositNativeETH is undefined, assert that the button does not exist.
      cy.get("[data-cy='depositNativeETH']").should("not.exist");
    }

    // *** Set amount *** //
    cy.setAmount(amount, isMaxAmount);
    // *** Submit form *** //
    cy.doDepositSubmit(hasApproval, depositNativeETH);

    if (shouldErrorBeThrown) {
      cy.checkTransactionError();
    } else {
      // *** Check success *** //
      cy.checkTransactionSuccess();
    }
  }
);

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
Cypress.Commands.add("doDepositSubmit", (hasApproval: boolean, depositNativeETH?: boolean) => {
  if (!hasApproval && !depositNativeETH) {
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
  cy.validateAmountInputs();

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

Cypress.Commands.add("checkTransactionError", () => {
  cy.get(`[data-cy='notification-error-icon']`, { timeout: TimeOuts.transactionTimeout }).should("be.visible");

  cy.get(`[data-cy='close-modal']`, { timeout: TimeOuts.otherTimeout }).should("be.visible").click();
});

Cypress.Commands.add("validateAmountInputs", () => {
  cy.get("[data-cy=amount-input-v3]").each(($input) => {
    cy.wrap($input).within(() => {
      cy.get("[data-cy=loader]").should("not.exist");
    });
  });
});

/* ------------- */
/*   Setup env   */
/* ------------- */
Cypress.Commands.add("setupAnvilTestEnvironment", (balanceConfig?: IBalanceConfig) => {
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
    if (balanceConfig) {
      await anvilSetErc20Balance({
        address: balanceConfig.account,
        tokenAddress: balanceConfig.tokenAddress,
        value: balanceConfig.balance,
      });
    }
  });
});

Cypress.Commands.add("setupTenderlyTestEnvironment", (balanceConfig?: IBalanceConfig) => {
  cy.log("Setting up Tenderly test environment");
  // eslint-disable-next-line no-console
  console.log("Setting up Tenderly test environment");

  cy.wrap(null).then(async () => {
    try {
      const tenderlyOldForkId = await findTestnetIdByDisplayName("Cypress TestNet");
      cy.log(`Deleting existing fork: ${tenderlyOldForkId}`);
      // eslint-disable-next-line no-console
      console.log(`Deleting existing fork: ${tenderlyOldForkId}`);
      if (tenderlyOldForkId) await tenderlyDeleteFork(tenderlyOldForkId);
      cy.log("Existing fork deleted");
      // eslint-disable-next-line no-console
      console.log("Existing fork deleted");
    } catch (error: any) {
      cy.log(`No existing fork to delete or deletion failed: ${error?.message}`);
      // eslint-disable-next-line no-console
      console.log(`No existing fork to delete or deletion failed: ${error?.message}`);
    }

    const result = await tenderlyCreateFork();
    cy.log("Fork created");
    // eslint-disable-next-line no-console
    console.log("Fork created");
    const { forkUrl, id } = result;

    localStorage.setItem(LOCALSTORAGE_TESTNET_ID_KEY, JSON.stringify({ id }));
    localStorage.setItem(LOCALSTORAGE_IS_TEST_MODE_KEY, "true");
    localStorage.setItem(LOCALSTORAGE_TESTNET_URL_KEY, JSON.stringify({ forkUrl }));
    localStorage.setItem(PRIVATE_KEY, JSON.stringify({ KEY: Cypress.env("private_key") }));
    cy.log("Local storage set");
    // eslint-disable-next-line no-console
    console.log("Local storage set");

    await tenderlyFundAccount(forkUrl);
    cy.log("Funding account done");
    // eslint-disable-next-line no-console
    console.log("Funding account done");

    if (balanceConfig) {
      cy.log(`Funding account with ${balanceConfig.tokenAddress}...`);
      // eslint-disable-next-line no-console
      console.log(`Funding account with ${balanceConfig.tokenAddress} ...`);
      await tenderlyFundAccountERC20(forkUrl, balanceConfig.tokenAddress, balanceConfig.account, balanceConfig.balance);
      cy.log(`Funding account with ${balanceConfig.tokenAddress} done`);
      // eslint-disable-next-line no-console
      console.log(`Funding account with ${balanceConfig.tokenAddress} done`);
    }
  });
});

export {};
