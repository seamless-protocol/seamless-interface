// import { wstETHBooster_3x } from "../../../meta";

import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { deposit } from "../../../cypress/support/steps/deposit.step";

// todo: fix aliases, and import this address
const wstETHBooster_3x_ADDRESS = "0x258730e23cF2f25887Cb962d32Bd10b878ea8a4e";

describe("WstETHBooster_3x SUPPLY SPEC", () => {
  prepareTestForRun();

  deposit({
    address: wstETHBooster_3x_ADDRESS,
    amount: 1,
    hasApproval: false,
  });
});
