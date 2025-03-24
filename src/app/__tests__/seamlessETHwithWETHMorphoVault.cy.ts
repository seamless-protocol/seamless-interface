import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { targetAccount } from "../../../cypress/support/constants";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { seamlessETHMorphoVault, WETH_ADDRESS } from "../../meta";

describe("Morpho WETH vault Test WETH DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun({
    account: targetAccount,
    tokenAddress: WETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  });

  depositAndWithdraw({
    address: seamlessETHMorphoVault,
    amount: 1,
    hasApproval: false,
    tab: "vaults",
    depositNativeETH: false,
    skipWithdraw: true,
  });
});
