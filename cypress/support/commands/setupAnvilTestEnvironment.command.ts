import { anvilForkUrl, testAnvilClient } from "../anvil";
import { anvilSetErc20Balance } from "../anvil/utils/anvilSetErc20Balance";
import { IBalanceConfig } from "../config/balanceConfig";
import {
  LOCALSTORAGE_IS_TEST_MODE_KEY,
  LOCALSTORAGE_TESTNET_URL_KEY,
  PRIVATE_KEY,
  LOCALSTORAGE_TESTNET_SNAPSHOT_KEY,
  targetAccount,
} from "../constants";

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
