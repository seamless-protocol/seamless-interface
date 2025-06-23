import { Address } from "viem";
import { cValueInUsd } from "../../../common/math/utils";

/// TYPES

export interface TransfersWithStrategyPrice {
  from: Address;
  to: Address;
  value: bigint;
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
  transfers: TransfersWithStrategyPrice[];
  user: Address;
  strategyDecimals: number;
}

interface cUserStrategyStatsOutput {
  totalProfit: bigint;
  avgSharePrice: bigint;
  strategyBalance: bigint;
}

export interface cUserStrategyProfitInput {
  transfers: TransfersWithStrategyPrice[];
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
  const divider = strategyBalanceUsd - unrealizedProfit;

  if (divider < 0n) {
    throw new Error("Invalid unrealized profit");
  }

  return divider !== 0n ? (unrealizedProfit * 10000n) / divider : 0n;
}

function cAvgSharePrice(input: cAvgSharePriceInput): bigint {
  const { strategyBalance, strategyBalanceChange, strategyBalanceChangeUsd, avgSharePrice, strategyBase } = input;

  return strategyBalanceChange > 0n
    ? (strategyBalance * avgSharePrice + strategyBalanceChangeUsd * strategyBase) /
        (strategyBalance + strategyBalanceChange)
    : avgSharePrice;
}

function cUserStrategyStats(input: cUserStrategyStatsInput): cUserStrategyStatsOutput {
  const { transfers, user, strategyDecimals } = input;

  const strategyBase = 10n ** BigInt(strategyDecimals);

  const { totalProfit, strategyBalance, avgSharePrice } = transfers.reduce(
    (acc, { from, value, strategyPrice }) => {
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
  transfers,
  user,
  currStrategyPrice,
  strategyDecimals,
}: cUserStrategyProfitInput): cUserStrategyProfitOutput {
  const { totalProfit, strategyBalance, avgSharePrice } = cUserStrategyStats({ user, transfers, strategyDecimals });

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
