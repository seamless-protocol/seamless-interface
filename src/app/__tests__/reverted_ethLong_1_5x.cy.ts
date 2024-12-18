import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, WETH_ADDRESS } from "../../../cypress/support/constants";
import { depositExecutionReverted } from "../../../cypress/support/steps/depositExecutionReverted";
import { ethLong_1_5x } from "../../meta";

describe("ethLong_1_5x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: WETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositExecutionReverted({
    address: ethLong_1_5x,
    amount: 1,
    hasApproval: false,
  });
});
