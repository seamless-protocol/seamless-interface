import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { weETH_ADDRESS, weETHBooster_3x } from "../../meta";

describe("WeETHBooster_3x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: weETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: weETHBooster_3x,
    amount: 1,
    hasApproval: false,
  });
});
