/// <reference types="cypress" />
import { IBalanceConfig } from "./config/balanceConfig";
import "./commands/index";

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

export {};
