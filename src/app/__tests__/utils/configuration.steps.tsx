
// todo: create tenderly and add funds to account, delete virtualnetwork after run?
export const prepareTestForRun = () => {
  before(() => {
    cy.visit("/");
  });

  // after(() => {
  //   if (!PERSIST_FORK_AFTER_RUN) {
  //     cy.log("deleting fork");
  //     return tenderly.deleteFork();
  //   }
  // });
};
