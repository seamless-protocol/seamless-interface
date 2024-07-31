import { prepareTestForRun } from "../utils/configuration.steps";
import { deposit } from "../../../../cypress/support/steps/deposit.step";

// import { WETH_ADDRESS } from "../../../meta";
// todo: fix aliases, and import this address
const AssetCardId = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452-0x4200000000000000000000000000000000000006";

describe("Boost WSTETH 3x SPEC", () => {
  prepareTestForRun();

  deposit({
    address: AssetCardId,
    amount: 1,
    hasApproval: false,
  });
});
