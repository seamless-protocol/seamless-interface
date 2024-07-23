import { base } from "viem/chains";
import { connect } from '@wagmi/core';
import { testWagmiConfig } from "../../config/demoConnector/testWagmiConfig";
import { testConnector } from "../../config/demoConnector/testConnector";

// todo: create tenderly and add funds to account, delete virtualnetwork after run?
export const prepareTestForRun = () => {
  before(() => {
    cy.visit("/");
    cy.wrap(null).then(() => {
      return connect(testWagmiConfig, {
        connector: testConnector,
        chainId: base.id,
      });
    });
  });

  // after(() => {
  //   if (!PERSIST_FORK_AFTER_RUN) {
  //     cy.log("deleting fork");
  //     return tenderly.deleteFork();
  //   }
  // });
};
