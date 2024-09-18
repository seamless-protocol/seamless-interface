// import { wstETHBooster_3x } from "../../../meta";

import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, usdcAddress } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";

// todo: fix aliases, and import this address
const ethShort_ADDRESS_1_5_x = "0x68DFad1A72c63897FEC5fB9De9FDb5670280291e";

describe("ethShort_ADDRESS_1_5_x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: usdcAddress,
    balance: BigInt(1000 * 1e6),
  });

  depositAndWithdraw({
    address: ethShort_ADDRESS_1_5_x,
    amount: 500,
    hasApproval: false,
  });
});
