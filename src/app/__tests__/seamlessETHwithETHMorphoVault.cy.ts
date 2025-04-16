import { prepareTestForRun } from "../../../cypress/support/configuration.steps";
import { depositAndWithdraw } from "../../../cypress/support/steps/depositAndWithdraw";
import { seamlessETHMorphoVault } from "../../meta";

describe("Morpho ETH vault Test ETH DEPOSIT & WITHDRAW SPEC", () => {
  prepareTestForRun();

  depositAndWithdraw({
    address: seamlessETHMorphoVault,
    amount: 1,
    hasApproval: false,
    tab: "vaults",
    depositNativeETH: true,
    skipWithdraw: true,
  });
});
