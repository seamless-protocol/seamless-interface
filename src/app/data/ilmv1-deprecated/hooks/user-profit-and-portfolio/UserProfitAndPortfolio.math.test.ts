import { expect, test } from "vitest";
import { formatUnits, parseUnits } from "viem";
import { cUserProfitAndPortfolio, cUserProfitAndPortfolioInput } from "./UserProfitAndPortfolio.math";
import { PERCENTAGE_VALUE_DECIMALS, USD_VALUE_DECIMALS } from "../../../../../meta";

function cUserProfitAndPortfolioWrapper(profits: cUserProfitAndPortfolioInput) {
  const result = cUserProfitAndPortfolio(profits);

  return {
    realizedProfit: Number(formatUnits(result.realizedProfit.bigIntValue, USD_VALUE_DECIMALS)),
    unrealizedProfit: Number(formatUnits(result.unrealizedProfit.bigIntValue, USD_VALUE_DECIMALS)),
    unrealizedProfitPercentage: Number(
      formatUnits(result.unrealizedProfitPercentage.bigIntValue, PERCENTAGE_VALUE_DECIMALS)
    ),
  };
}

function fStrategyProfitData(strategyBalanceUsd: string, realizedProfit: string, unrealizedProfit: string) {
  return {
    strategyBalance: {
      dollarAmount: {
        bigIntValue: parseUnits(strategyBalanceUsd, USD_VALUE_DECIMALS),
        symbol: "",
        decimals: USD_VALUE_DECIMALS,
      },
    },
    realizedProfit: {
      bigIntValue: parseUnits(realizedProfit, USD_VALUE_DECIMALS),
      symbol: "",
      decimals: USD_VALUE_DECIMALS,
    },
    unrealizedProfit: {
      bigIntValue: parseUnits(unrealizedProfit, USD_VALUE_DECIMALS),
      symbol: "",
      decimals: USD_VALUE_DECIMALS,
    },
  };
}

test("User profit - User has multiple positions", async () => {
  const profits = [
    fStrategyProfitData("1000", "500", "200"),
    fStrategyProfitData("2000", "1000", "1000"),
    fStrategyProfitData("3000", "2800", "-400"),
  ];

  const result = cUserProfitAndPortfolioWrapper({ profits });

  expect(result.realizedProfit).toBe(4300);
  expect(result.unrealizedProfit).toBe(800);
  expect(result.unrealizedProfitPercentage).toBe(15.38);
});

test("User profit - User has no positions", async () => {
  const profits = [fStrategyProfitData("0", "500", "0"), fStrategyProfitData("0", "1000", "0")];

  const result = cUserProfitAndPortfolioWrapper({ profits });

  expect(result.realizedProfit).toBe(1500);
  expect(result.unrealizedProfit).toBe(0);
  expect(result.unrealizedProfitPercentage).toBe(0);
});

test("User profit - Unrealized profit bigger then user's balance", async () => {
  const profits = [fStrategyProfitData("0", "500", "1")];

  expect(() => cUserProfitAndPortfolioWrapper({ profits })).toThrow();
});
