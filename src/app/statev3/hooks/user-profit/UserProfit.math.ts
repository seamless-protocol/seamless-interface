import { FetchBigIntStrict, formatFetchBigInt, formatUsdValue } from "../../../../shared";

interface UserStrategyProfit {
  totalProfit: bigint;
  unrealizedProfit: bigint;
  weightedUnrealizedProfit: bigint;
}

interface CalculateUserProfitInput {
  profits: UserStrategyProfit[];
}

export interface CalculateUserProfitOutput {
  totalProfit: FetchBigIntStrict;
  unrealizedProfit: FetchBigIntStrict;
  unrealizedProfitPercentage: FetchBigIntStrict;
}

export function calculateUserProfit({ profits }: CalculateUserProfitInput): CalculateUserProfitOutput {
  const { totalProfit, unrealizedProfit, unrealizedProfitPercentage } = profits.reduce(
    (acc, { totalProfit, unrealizedProfit, weightedUnrealizedProfit }) => {
      const newTotalProfit = acc.totalProfit + totalProfit;
      const newUnrealizedProfit = acc.unrealizedProfit + unrealizedProfit;
      const newWeightedUnrealizedProfit = acc.weightedUnrealizedProfit + weightedUnrealizedProfit;

      return {
        totalProfit: newTotalProfit,
        unrealizedProfit: newUnrealizedProfit,
        weightedUnrealizedProfit: newWeightedUnrealizedProfit,
        unrealizedProfitPercentage: newUnrealizedProfit ? newWeightedUnrealizedProfit / newUnrealizedProfit : 0n,
      };
    },
    { totalProfit: 0n, unrealizedProfit: 0n, weightedUnrealizedProfit: 0n, unrealizedProfitPercentage: 0n }
  );

  return {
    totalProfit: formatUsdValue(totalProfit),
    unrealizedProfit: formatUsdValue(unrealizedProfit),
    unrealizedProfitPercentage: formatFetchBigInt(unrealizedProfitPercentage, 2, "%"),
  };
}
