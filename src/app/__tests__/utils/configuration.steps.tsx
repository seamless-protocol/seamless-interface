import { anvilEvmRevert } from "../../../../cypress/support/anvil/utils/anvilEvmRevert";
import { BalanceConfig } from "../../../../cypress/support/config/balanceConfig";
import { VIRTUAL_TESTNET_KEY, VIRTUAL_TESTNET_SNAPSHOT } from "../../../../cypress/support/constants";
import { tenderlyEvmRevert } from "../../../../cypress/support/tenderly/utils/tenderlyEvmRevert";

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
      const snapshotIdJSON = localStorage.getItem(VIRTUAL_TESTNET_SNAPSHOT);
      const forkUrlJSON = localStorage.getItem(VIRTUAL_TESTNET_KEY);

      const snapshotId = snapshotIdJSON ? JSON.parse(snapshotIdJSON).snapshotId : null;
      const forkUrl = forkUrlJSON ? JSON.parse(forkUrlJSON).forkUrl : null;

      // eslint-disable-next-line no-console
      console.log("reverting snapshot", snapshotId, forkUrl);

      if (testEnv === "tenderly") {
        if (snapshotId && forkUrl) {
          cy.wrap(tenderlyEvmRevert(forkUrl, snapshotId)).then(() => {
            localStorage.removeItem(VIRTUAL_TESTNET_SNAPSHOT);
            localStorage.removeItem(VIRTUAL_TESTNET_KEY);

            // eslint-disable-next-line no-console
            console.log("snapshot reverted");
          });
        }
      } else if (testEnv === "anvil") {
        cy.task("stopAnvil");

        cy.wrap(anvilEvmRevert(snapshotId)).then(() => {
          localStorage.removeItem(VIRTUAL_TESTNET_SNAPSHOT);
          localStorage.removeItem(VIRTUAL_TESTNET_KEY);

          // eslint-disable-next-line no-console
          console.log("reverting snapshot", snapshotId);
        });
      }
    });
  });
};
