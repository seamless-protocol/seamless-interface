import { Address } from "viem";
import { fetchAssetPriceInBlock } from "../../queries/useFetchViewAssetPrice";

interface CalculateUserStrategyProfitInput {
  logs: any[];
  user: Address;
  strategy: Address;
  strategyDecimals: number;
}

interface CalculateUserStrategyProfitOutput {
  totalProfit: bigint;
  unrealizedProfit: bigint;
  unrealizedProfitPercentage: bigint;
}

export async function calculateUserStrategyProfit({
  logs,
  user,
  strategy,
  strategyDecimals,
}: CalculateUserStrategyProfitInput): Promise<CalculateUserStrategyProfitOutput> {
  const strategyBase = 10n ** BigInt(strategyDecimals);

  const results = [] as { transferValueUsd: bigint; shareBalanceChange: bigint }[];

  await Promise.all(
    logs.map(async (log, index) => {
      const { args, blockNumber } = log;
      const { from, value: shares } = args as { from: Address | undefined; value: bigint | undefined };

      if (!from || !shares) {
        console.error("Invalid log", log);
        throw new Error("Invalid log");
      }

      const price = await fetchAssetPriceInBlock(strategy, blockNumber);

      const transferValueUsd = (shares * price.bigIntValue) / strategyBase;

      if (from === user) {
        results[index] = {
          transferValueUsd: -transferValueUsd,
          shareBalanceChange: -shares,
        };
      } else {
        results[index] = {
          transferValueUsd,
          shareBalanceChange: shares,
        };
      }
    })
  );

  const { currTotalProfit, currShares, currSharesAvgPrice } = results.filter(Boolean).reduce(
    (acc, { transferValueUsd, shareBalanceChange }) => {
      let { currSharesAvgPrice } = acc;
      const { currTotalProfit, currShares } = acc;

      if (shareBalanceChange > 0n) {
        currSharesAvgPrice =
          (currShares * currSharesAvgPrice + transferValueUsd * strategyBase) / (currShares + shareBalanceChange);
      }

      return {
        currTotalProfit: currTotalProfit - transferValueUsd,
        currSharesAvgPrice,
        currShares: currShares + shareBalanceChange,
      };
    },
    {
      currTotalProfit: 0n,
      currSharesAvgPrice: 0n,
      currShares: 0n,
    }
  );

  const price = await fetchAssetPriceInBlock(strategy);
  const currSharesUsd = (currShares * price.bigIntValue) / strategyBase;

  const totalProfit = currSharesUsd + currTotalProfit;
  const unrealizedProfit = currSharesUsd - (currShares * currSharesAvgPrice) / strategyBase;
  const unrealizedProfitPercentage = currSharesUsd
    ? (unrealizedProfit * 10000n) / (currSharesUsd - unrealizedProfit)
    : 0n;

  return {
    totalProfit,
    unrealizedProfit,
    unrealizedProfitPercentage,
  };
}
