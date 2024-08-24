import { test, expect } from "vitest";
import { Address, formatUnits, parseUnits, zeroAddress } from "viem";
import { TransfersWithStrategyPrice, cUserStrategyProfit } from "./UserStrategyProfit.math";

const USER: Address = "0x0000000000000000000000000000000000000001";
const STRATEGY_DECIMALS: number = 18;
const DEFAULT_STRATEGY_CURRENT_PRICE: bigint = parseUnits("2000", 8);

function cUserStrategyProfitWrapper(
  transfers: TransfersWithStrategyPrice[],
  currStrategyPrice: bigint = DEFAULT_STRATEGY_CURRENT_PRICE
) {
  const { realizedProfit, unrealizedProfit, unrealizedProfitPercentage } = cUserStrategyProfit({
    transfers,
    user: USER,
    currStrategyPrice: currStrategyPrice || DEFAULT_STRATEGY_CURRENT_PRICE,
    strategyDecimals: STRATEGY_DECIMALS,
  });

  return {
    realizedProfit: Number(formatUnits(realizedProfit, 8)),
    unrealizedProfit: Number(formatUnits(unrealizedProfit, 8)),
    unrealizedProfitPercentage: Number(formatUnits(unrealizedProfitPercentage, 2)),
  };
}

enum Action {
  BUY,
  SELL,
}

function actionLog({ action, amount, price }: { action: Action; amount: string; price: string }) {
  return {
    from: action === Action.BUY ? zeroAddress : USER,
    to: action === Action.BUY ? USER : zeroAddress,
    value: parseUnits(amount, STRATEGY_DECIMALS),
    strategyPrice: parseUnits(price, 8),
  };
}

test("cUserStrategyProfit", async () => {
  const logs: TransfersWithStrategyPrice[] = [];

  let result = cUserStrategyProfitWrapper(logs);
  expect(result.realizedProfit).toBe(0);
  expect(result.unrealizedProfit).toBe(0);
  expect(result.unrealizedProfitPercentage).toBe(0);

  logs.push(actionLog({ amount: "10", price: "1000", action: Action.BUY }));

  result = cUserStrategyProfitWrapper(logs);
  expect(result.realizedProfit).toBe(0);
  expect(result.unrealizedProfit).toBe(10000);
  expect(result.unrealizedProfitPercentage).toBe(100);

  logs.push(actionLog({ amount: "5", price: "1200", action: Action.SELL }));

  result = cUserStrategyProfitWrapper(logs);
  expect(result.realizedProfit).toBe(1000);
  expect(result.unrealizedProfit).toBe(5000);
  expect(result.unrealizedProfitPercentage).toBe(100);

  logs.push(actionLog({ amount: "5", price: "1500", action: Action.BUY }));

  result = cUserStrategyProfitWrapper(logs);
  expect(result.realizedProfit).toBe(1000);
  expect(result.unrealizedProfit).toBe(7500);
  expect(result.unrealizedProfitPercentage).toBe(60);

  result = cUserStrategyProfitWrapper(logs, parseUnits("1000", 8));

  expect(result.realizedProfit).toBe(1000);
  expect(result.unrealizedProfit).toBe(-2500);
  expect(result.unrealizedProfitPercentage).toBe(-20);
});
