import { prepareTestForRun } from "../../../../cypress/utils/configuration.steps";
import { deposit } from "../../../../cypress/support/steps/deposit.step";

// import { WETH_ADDRESS } from "../../../meta";
// todo: fix aliases, and import this address
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";

describe("WETH SUPPLY SPEC", () => {
  prepareTestForRun();

  deposit({
    address: WETH_ADDRESS,
    amount: 1,
    hasApproval: false,
  });
});
