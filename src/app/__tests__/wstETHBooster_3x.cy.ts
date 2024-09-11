// import { wstETHBooster_3x } from "../../../meta";

import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, WSTETH_ADDRESS } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";

// todo: fix aliases, and import this address
const wstETHBooster_3x_ADDRESS = "0x258730e23cF2f25887Cb962d32Bd10b878ea8a4e";

describe("WstETHBooster_3x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: WSTETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: wstETHBooster_3x_ADDRESS,
    amount: 1,
    hasApproval: false,
  });
});
