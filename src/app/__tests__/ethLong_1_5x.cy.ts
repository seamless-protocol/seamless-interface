import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, WETH_ADDRESS } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { ethLong_1_5x } from "../../meta";

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
