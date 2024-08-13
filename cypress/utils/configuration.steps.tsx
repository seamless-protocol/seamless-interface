import { Address } from "viem";
import { testAnvilClient } from "../support/anvil";
import { BalanceConfig } from "../support/config/balanceConfig";
import { LOCALSTORAGE_TESTNET_SNAPSHOT_KEY, LOCALSTORAGE_TESTNET_URL_KEY } from "../support/constants";
import { tenderlyEvmRevert } from "../support/tenderly/utils/tenderlyEvmRevert";

type TestEnv = "anvil" | "tenderly";

export const prepareTestForRun = () => {
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
      const forkUrlJSON = localStorage.getItem(LOCALSTORAGE_TESTNET_URL_KEY);

      const snapshotId = snapshotIdJSON ? JSON.parse(snapshotIdJSON).snapshotId : null;
      const forkUrl = forkUrlJSON ? JSON.parse(forkUrlJSON).forkUrl : null;

      // eslint-disable-next-line no-console
      console.log("reverting snapshot", snapshotId, forkUrl);

      if (testEnv === "tenderly") {
        if (snapshotId && forkUrl) {
          cy.wrap(tenderlyEvmRevert(forkUrl, snapshotId)).then(() => {
            localStorage.removeItem(LOCALSTORAGE_TESTNET_SNAPSHOT_KEY);
            localStorage.removeItem(LOCALSTORAGE_TESTNET_URL_KEY);

            // eslint-disable-next-line no-console
            console.log("snapshot reverted");
          });
        }
      } else if (testEnv === "anvil") {
        cy.wrap(
          testAnvilClient.revert({
            id: snapshotId as Address,
          })
        ).then(() => {
          localStorage.removeItem(LOCALSTORAGE_TESTNET_SNAPSHOT_KEY);
          localStorage.removeItem(LOCALSTORAGE_TESTNET_URL_KEY);

          // eslint-disable-next-line no-console
          console.log("reverting snapshot", snapshotId);
        });
      }
    });
  });
};
