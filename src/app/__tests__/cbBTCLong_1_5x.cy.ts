import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { cbBTC_ADDRESS, cbBTCLong_1_5x } from "../../meta";

describe("cbBTCLong_1_5x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: cbBTC_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: cbBTCLong_1_5x,
    amount: 1,
    hasApproval: false,
  });
});
