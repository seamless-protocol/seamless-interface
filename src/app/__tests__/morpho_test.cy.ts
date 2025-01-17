import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount, WETH_ADDRESS } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";

// this test covers only technical side of the things, we still dont have a final morpho(s) vault
describe("Morpho Test DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: WETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: "0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1", // todo change the test after configurating the morpho vault
    amount: 1,
    hasApproval: false,
    tab: "vaults",
    skipWithdraw: true,
  });
});
