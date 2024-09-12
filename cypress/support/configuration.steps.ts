import { Address } from "viem";
import { testAnvilClient } from "./anvil";
import {
  LOCALSTORAGE_IS_TEST_MODE_KEY,
  LOCALSTORAGE_TESTNET_ID_KEY,
  LOCALSTORAGE_TESTNET_SNAPSHOT_KEY,
  LOCALSTORAGE_TESTNET_URL_KEY,
} from "./constants";
import { IBalanceConfig } from "./config/balanceConfig";
import { tenderlyDeleteFork } from "./tenderly/utils/tenderlyDeleteFork";

type TestEnv = "anvil" | "tenderly";

export const prepareTestForRun = (BalanceConfig: IBalanceConfig) => {
  const testEnv = (Cypress.env("test_env") || "tenderly") as TestEnv;

  before(() => {
    if (testEnv === "anvil") {
      cy.setupAnvilTestEnvironment(BalanceConfig);
    } else if (testEnv === "tenderly") {
      cy.setupTenderlyTestEnvironment(BalanceConfig);
    }
    cy.visit("/");
  });

  after(() => {
    cy.window().then(({ localStorage }) => {
      const snapshotIdJSON = localStorage.getItem(LOCALSTORAGE_TESTNET_SNAPSHOT_KEY);
      const forkIdJson = localStorage.getItem(LOCALSTORAGE_TESTNET_ID_KEY);

      const snapshotId = snapshotIdJSON ? JSON.parse(snapshotIdJSON).snapshotId : null;
      const forkId = forkIdJson ? JSON.parse(forkIdJson).id : null;

      if (testEnv === "tenderly") {
        // eslint-disable-next-line no-console
        console.log("Deleting fork", forkId);
      } else {
        // eslint-disable-next-line no-console
        console.log("Reverting snapshot", snapshotId);
      }

      if (testEnv === "tenderly") {
        cy.wrap(tenderlyDeleteFork(forkId)).then(() => {
          localStorage.removeItem(LOCALSTORAGE_TESTNET_SNAPSHOT_KEY);
          localStorage.removeItem(LOCALSTORAGE_TESTNET_URL_KEY);
          localStorage.removeItem(LOCALSTORAGE_IS_TEST_MODE_KEY);
          localStorage.removeItem(LOCALSTORAGE_TESTNET_ID_KEY);

          // eslint-disable-next-line no-console
          console.log("fork deleted", forkId);
        });
      } else if (testEnv === "anvil") {
        cy.wrap(
          testAnvilClient.revert({
            id: snapshotId as Address,
          })
        ).then(() => {
          localStorage.removeItem(LOCALSTORAGE_TESTNET_SNAPSHOT_KEY);
          localStorage.removeItem(LOCALSTORAGE_TESTNET_URL_KEY);
          localStorage.removeItem(LOCALSTORAGE_IS_TEST_MODE_KEY);
          localStorage.removeItem(LOCALSTORAGE_TESTNET_ID_KEY);

          // eslint-disable-next-line no-console
          console.log("snapshot reverted", snapshotId);
        });
      }
    });
  });
};
