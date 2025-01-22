import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { seamlessUSDCMorphoVault, USDC_ADDRESS } from "@meta";

describe("seamlessUSDCMorphoVault DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: USDC_ADDRESS,
    balance: BigInt(5 * 1e6),
  });

  depositAndWithdraw({
    address: seamlessUSDCMorphoVault,
    amount: 1,
    hasApproval: false,
    tab: "vaults",
  });
});
