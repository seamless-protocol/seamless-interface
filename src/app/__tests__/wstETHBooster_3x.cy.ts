import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, WSTETH_ADDRESS } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { wstETHBooster_3x } from "../../meta";

describe("WstETHBooster_3x DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: WSTETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: wstETHBooster_3x,
    amount: 1,
    hasApproval: false,
  });
});
