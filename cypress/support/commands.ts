/// <reference types="cypress" />
import { mount } from "cypress/react";
import { forkUrl, VIRTUAL_TESTNET_KEY, VIRTUAL_TESTNET_SNAPSHOT } from "./constants";
import { IBalanceConfig } from "./config/balanceConfig";
import { setErc20Balance } from "./anvil/utils/setErc20Balance";
import { setEthBalance } from "./anvil/utils/setEthBalance";
import { evmSnapshot, fundAccount, fundAccountERC20 } from "./tenderly/utils/apiUtils";

const tenderlyVirtualTestnet = "https://virtual.base.rpc.tenderly.co/ee8497a0-46bc-4a54-8412-11aa72e813c6";

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
       * @example cy.doSubmit(true)
       */
      doSubmit(hasApproval: boolean, actionName?: string, assetName?: string): void;
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

Cypress.Commands.add("doSubmit", (hasApproval: boolean) => {
  if (!hasApproval) {
    cy.get(`[data-cy=approvalButton]`, { timeout: 20000 }).last().should("not.be.disabled").click({ force: true });
  }
  cy.get("[data-cy=actionButton]", { timeout: 30000 }).last().should("not.be.disabled").click({ force: true });
});

Cypress.Commands.add("setupAnvilTestEnvironment", (balanceConfig: IBalanceConfig[]) => {
  cy.log("Setting up test environment");

  // step 1: setup VIRTUAL_TESTNET_KEY
  localStorage.setItem(VIRTUAL_TESTNET_KEY, JSON.stringify({ forkUrl }));

  // step 2: setup balances
  cy.wrap(null).then(async () => {
    await setEthBalance({});

    await Promise.all(
      balanceConfig.map(({ account, tokenAddress, balance }) =>
        setErc20Balance({ address: account, tokenAddress, value: balance })
      )
    );
  });
});

Cypress.Commands.add("setupTenderlyTestEnvironment", (balanceConfig: IBalanceConfig[]) => {
  cy.log("Setting up Tenderly test environment");

  cy.wrap(null).then(async () => {
    const forkUrl = tenderlyVirtualTestnet;

    localStorage.setItem(VIRTUAL_TESTNET_KEY, JSON.stringify({ forkUrl }));

    const snapshotId = await evmSnapshot(forkUrl);
    localStorage.setItem(VIRTUAL_TESTNET_SNAPSHOT, JSON.stringify({ snapshotId }));

    await fundAccount(forkUrl);

    await Promise.all(
      balanceConfig.map(({ account, tokenAddress, balance }) =>
        fundAccountERC20(forkUrl, tokenAddress, account, balance)
      )
    );
  });
});

export {};
