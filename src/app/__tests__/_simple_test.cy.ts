import { TimeOuts } from "../../../cypress/support/constants";

describe("Home should exist", () => {
  cy.get(`[data-cy='home']`, { timeout: TimeOuts.otherTimeout }).click();
});
