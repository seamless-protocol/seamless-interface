import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, usdcAddress } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { ethShort_ADDRESS_1_5_x } from "../../meta";

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
