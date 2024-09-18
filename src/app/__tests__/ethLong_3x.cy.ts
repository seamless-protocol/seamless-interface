// import { wstETHBooster_3x } from "../../../meta";

import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, WETH_ADDRESS } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";

// todo: fix aliases, and import this address
const ethLong_3x = "0x5Ed6167232b937B0A5C84b49031139F405C09c8A";

describe("ethLong_3x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: WETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: ethLong_3x,
    amount: 1,
    hasApproval: false,
  });
});
