import { Address } from "viem";
import { getAllSubStrategies } from "../../../state/settings/configUtils";
import { fetchUserStrategyProfit } from "../user-strategy-profit/UserStrategyProfit.fetch";
import { CalculateUserProfitOutput, calculateUserProfit } from "./UserProfit.math";

export async function fetchUserProfit({ account }: { account: Address }): Promise<CalculateUserProfitOutput> {
  const strategies = getAllSubStrategies();

  const results = await Promise.all(
    strategies.map(async (strategy) => {
      const cur = await fetchUserStrategyProfit({ user: account, strategy });

      const totalProfit = cur.totalProfit.bigIntValue;
      const unrealizedProfit = cur.unrealizedProfit.bigIntValue;
      const weightedUnrealizedProfit = cur.unrealizedProfit.bigIntValue * cur.unrealizedProfitPercentage.bigIntValue;

      return { totalProfit, unrealizedProfit, weightedUnrealizedProfit };
    })
  );

  return calculateUserProfit({ profits: results });
}
