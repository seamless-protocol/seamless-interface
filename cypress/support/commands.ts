/// <reference types="cypress" />
import { mount } from "cypress/react";
import {
  PRIVATE_KEY,
  LOCALSTORAGE_TESTNET_URL_KEY,
  LOCALSTORAGE_TESTNET_SNAPSHOT_KEY,
  targetAccount,
} from "./constants";
import { IBalanceConfig } from "./config/balanceConfig";
import { anvilSetErc20Balance } from "./anvil/utils/anvilSetErc20Balance";
import { anvilForkUrl, testAnvilClient } from "./anvil";
import { tenderlyEvmSnapshot } from "./tenderly/utils/tenderlyEvmSnapshot";
import { tenderlyFundAccount } from "./tenderly/utils/tenderlyFundAccount";
import { tenderlyFundAccountERC20 } from "./tenderly/utils/tenderlyFundAccountERC20";

const tenderlyVirtualTestnet = Cypress.env("tenderly_test_rpc");

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
      setAmount(amount: number, max?: boolean): void;
      /**
       * This will make confirmation in Modal
       * @param hasApproval boolean
       * @param actionName string optional, verification button text
       * @param assetName string optional, verification asset name
       * @example cy.doDepositSubmit(true)
       */
      doDepositSubmit(hasApproval: boolean, actionName?: string, assetName?: string): void;
      /**
       * Sets up the anvil test environment by initializing the blockchain state
       */
      setupAnvilTestEnvironment(testBalanceData: IBalanceConfig[]): void;
      /**
       * Sets up the tenderly test environment by initializing the blockchain state
       */
      setupTenderlyTestEnvironment(balanceConfig: IBalanceConfig[]): void;
    }
  }
}

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("setAmount", (amount: number, max?: boolean) => {
  cy.get("[data-cy=Form]").find('button:contains("Enter amount")').should("be.disabled");
  if (max) {
    cy.wait(2000);
    cy.get("[data-cy=Form]").find('button:contains("Max")').click();
  } else {
    cy.get("[data-cy=Form] input").first().type(amount.toString());
  }
});

Cypress.Commands.add("doDepositSubmit", (hasApproval: boolean) => {
  if (!hasApproval) {
    cy.get(`[data-cy=approvalButton]`, { timeout: 20000 }).last().should("not.be.disabled").click({ force: true });
  }
  cy.get("[data-cy=actionButton]", { timeout: 30000 }).last().should("not.be.disabled").click({ force: true });
});

Cypress.Commands.add("setupAnvilTestEnvironment", (balanceConfig: IBalanceConfig[]) => {
  const forkUrl = anvilForkUrl;
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
    await Promise.all(
      balanceConfig.map(({ account, tokenAddress, balance }) =>
        anvilSetErc20Balance({ address: account, tokenAddress, value: balance })
      )
    );
  });
});

Cypress.Commands.add("setupTenderlyTestEnvironment", (balanceConfig: IBalanceConfig[]) => {
  cy.log("Setting up Tenderly test environment");

  cy.wrap(null).then(async () => {
    const forkUrl = tenderlyVirtualTestnet;

    localStorage.setItem(LOCALSTORAGE_TESTNET_URL_KEY, JSON.stringify({ forkUrl }));
    localStorage.setItem(PRIVATE_KEY, JSON.stringify({ KEY: Cypress.env("private_key") }));

    const snapshotId = await tenderlyEvmSnapshot(forkUrl);
    localStorage.setItem(LOCALSTORAGE_TESTNET_SNAPSHOT_KEY, JSON.stringify({ snapshotId }));

    await tenderlyFundAccount(forkUrl);

    await Promise.all(
      balanceConfig.map(({ account, tokenAddress, balance }) =>
        tenderlyFundAccountERC20(forkUrl, tokenAddress, account, balance)
      )
    );
  });
});

export {};
