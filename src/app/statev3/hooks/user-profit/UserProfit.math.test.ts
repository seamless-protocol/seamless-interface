import { expect, test } from "vitest";
import { formatUnits, parseUnits } from "viem";
import { cUserProfit, cUserProfitInput } from "./UserProfit.math";

function cUserProfitWrapper(profits: cUserProfitInput) {
  const result = cUserProfit(profits);

  return {
    realizedProfit: Number(formatUnits(result.realizedProfit.bigIntValue, 8)),
    unrealizedProfit: Number(formatUnits(result.unrealizedProfit.bigIntValue, 8)),
    unrealizedProfitPercentage: Number(formatUnits(result.unrealizedProfitPercentage.bigIntValue, 2)),
  };
}

function fStrategyProfitData(strategyBalanceUsd: string, realizedProfit: string, unrealizedProfit: string) {
  return {
    strategyBalance: {
      dollarAmount: {
        bigIntValue: parseUnits(strategyBalanceUsd, 8),
        symbol: "",
        decimals: 8,
      },
    },
    realizedProfit: {
      bigIntValue: parseUnits(realizedProfit, 8),
      symbol: "",
      decimals: 8,
    },
    unrealizedProfit: {
      bigIntValue: parseUnits(unrealizedProfit, 8),
      symbol: "",
      decimals: 8,
    },
  };
}

test("cUserProfit", async () => {
  const profits = [
    fStrategyProfitData("1000", "500", "200"),
    fStrategyProfitData("2000", "1000", "1000"),
    fStrategyProfitData("3000", "2800", "-400"),
  ];

  const result = cUserProfitWrapper({ profits });

  expect(result.realizedProfit).toBe(4300);
  expect(result.unrealizedProfit).toBe(800);
  expect(result.unrealizedProfitPercentage).toBe(15.38);
});
