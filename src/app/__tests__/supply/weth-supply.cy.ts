import { configEnvWithTenderly } from "../../../../cypress/support/steps/configuration.steps";
import { supply } from "../../../../cypress/support/steps/supply.step";
import { startDemoEnv } from "../../../../cypress/support/tenderly";
// import { WETH_ADDRESS } from "../../../meta";

// const WETH_ADDRESS = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452-0x4200000000000000000000000000000000000006";
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";

describe("WETH SUPPLY SPEC", () => {
  // configEnvWithTenderly({});
  beforeEach(() => {
    cy.visit("/");
    localStorage.setItem("demo", String(true));
  });
  supply({
    address: WETH_ADDRESS,
    amount: 1000,
    hasApproval: false,
  });
});
