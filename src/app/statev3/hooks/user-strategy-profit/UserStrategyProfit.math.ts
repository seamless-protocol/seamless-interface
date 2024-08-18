import { Address } from "viem";
import { cValueInUsd } from "../../math/cValueInUsd";

/// TYPES

export interface Log {
  args: { from: Address | undefined; to: Address | undefined; value: bigint | undefined };
  blockNumber: bigint;
}

export interface LogWithStrategyPrice {
  log: Log;
  strategyPrice: bigint;
}

interface cAvgSharePriceInput {
  strategyBalance: bigint;
  strategyBalanceChange: bigint;
  strategyBalanceChangeUsd: bigint;
  avgSharePrice: bigint;
  strategyBase: bigint;
}

interface cUserStrategyStatsInput {
  logs: LogWithStrategyPrice[];
  user: Address;
  strategyDecimals: number;
}

interface cUserStrategyStatsOutput {
  totalProfit: bigint;
  avgSharePrice: bigint;
  strategyBalance: bigint;
}

export interface cUserStrategyProfitInput {
  logs: LogWithStrategyPrice[];
  currStrategyPrice: bigint;
  user: Address;
  strategyDecimals: number;
}

interface cUserStrategyProfitOutput {
  strategyBalance: bigint;
  strategyBalanceUsd: bigint;
  realizedProfit: bigint;
  unrealizedProfit: bigint;
  unrealizedProfitPercentage: bigint;
}

/// MATH FUNCTIONS

export function cUnrealizedProfitPercentage({
  strategyBalanceUsd,
  unrealizedProfit,
}: {
  strategyBalanceUsd: bigint;
  unrealizedProfit: bigint;
}): bigint {
  return strategyBalanceUsd - unrealizedProfit > 0n
    ? (unrealizedProfit * 10000n) / (strategyBalanceUsd - unrealizedProfit)
    : 0n;
}

function cAvgSharePrice(input: cAvgSharePriceInput): bigint {
  const { strategyBalance, strategyBalanceChange, strategyBalanceChangeUsd, avgSharePrice, strategyBase } = input;

  return strategyBalanceChange > 0n
    ? (strategyBalance * avgSharePrice + strategyBalanceChangeUsd * strategyBase) /
        (strategyBalance + strategyBalanceChange)
    : avgSharePrice;
}

function cUserStrategyStats(input: cUserStrategyStatsInput): cUserStrategyStatsOutput {
  const { logs, user, strategyDecimals } = input;

  const strategyBase = 10n ** BigInt(strategyDecimals);

  const { totalProfit, strategyBalance, avgSharePrice } = logs.reduce(
    (acc, { log, strategyPrice }) => {
      const { from, value } = log.args;

      if (!from || !value) {
        throw new Error(`Invalid log ${log}`);
      }

      const strategyBalanceChange = from === user ? -value : value;
      const strategyBalanceChangeUsd = cValueInUsd(strategyBalanceChange, strategyPrice, strategyDecimals);

      const { avgSharePrice, totalProfit, strategyBalance } = acc;

      return {
        totalProfit: totalProfit - strategyBalanceChangeUsd,
        avgSharePrice: cAvgSharePrice({
          strategyBalance,
          strategyBalanceChange,
          strategyBalanceChangeUsd,
          avgSharePrice,
          strategyBase,
        }),
        strategyBalance: strategyBalance + strategyBalanceChange,
      };
    },
    {
      totalProfit: 0n,
      avgSharePrice: 0n,
      strategyBalance: 0n,
    }
  );

  return {
    totalProfit,
    avgSharePrice,
    strategyBalance,
  };
}

export function cUserStrategyProfit({
  logs,
  user,
  currStrategyPrice,
  strategyDecimals,
}: cUserStrategyProfitInput): cUserStrategyProfitOutput {
  const { totalProfit, strategyBalance, avgSharePrice } = cUserStrategyStats({ user, logs, strategyDecimals });

  const strategyBalanceUsd = cValueInUsd(strategyBalance, currStrategyPrice, strategyDecimals);
  const totalUsdSpentOnCurrShares = cValueInUsd(strategyBalance, avgSharePrice, strategyDecimals);

  const unrealizedProfit = strategyBalanceUsd - totalUsdSpentOnCurrShares;
  const unrealizedProfitPercentage = cUnrealizedProfitPercentage({ strategyBalanceUsd, unrealizedProfit });

  return {
    strategyBalance,
    strategyBalanceUsd,
    realizedProfit: totalProfit + strategyBalanceUsd - unrealizedProfit,
    unrealizedProfit,
    unrealizedProfitPercentage,
  };
}
