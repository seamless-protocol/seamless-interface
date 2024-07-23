import { prepareTestForRun } from "../utils/configuration.steps";
import { supply } from "../../../../cypress/support/steps/supply.step";

// import { WETH_ADDRESS } from "../../../meta";
// todo: fix aliases, and import this address
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";

describe("WETH SUPPLY SPEC", () => {
  prepareTestForRun();

  supply({
    address: WETH_ADDRESS,
    amount: 1,
    hasApproval: false,
  });
});
