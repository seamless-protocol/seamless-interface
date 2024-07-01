import { WETH_ADDRESS } from "@meta";
import { configEnvWithTenderly } from "../../support/steps/configuration.steps";
import { supply } from "../../support/steps/supply.step";

describe("WETH INTEGRATION SPEC", () => {
  configEnvWithTenderly({});
  supply({
    address: WETH_ADDRESS,
    amount: 1000,
    hasApproval: true,
  });
});
