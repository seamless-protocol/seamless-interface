import { IBalanceConfig } from "../config/balanceConfig";
import {
  LOCALSTORAGE_TESTNET_ID_KEY,
  LOCALSTORAGE_IS_TEST_MODE_KEY,
  LOCALSTORAGE_TESTNET_URL_KEY,
  PRIVATE_KEY,
} from "../constants";
import { tenderlyCreateFork } from "../tenderly/utils/tenderlyCreateFork";
import { tenderlyFundAccount } from "../tenderly/utils/tenderlyFundAccount";
import { tenderlyFundAccountERC20 } from "../tenderly/utils/tenderlyFundAccountERC20";

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
