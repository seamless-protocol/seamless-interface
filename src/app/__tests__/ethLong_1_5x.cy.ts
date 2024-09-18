// import { wstETHBooster_3x } from "../../../meta";

import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, WETH_ADDRESS } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";

// todo: fix aliases, and import this address
const ethLong_1_5x = "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4";

describe("ethLong_1_5x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: WETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: ethLong_1_5x,
    amount: 1,
    hasApproval: false,
  });
});
