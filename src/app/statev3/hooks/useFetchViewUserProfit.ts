import { Address } from "viem";
import { useAccount } from "wagmi";
import { getAllSubStrategies } from "../../state/settings/configUtils";
import { fetchUserStrategyProfit } from "./useFetchViewUserStrategyProfit";
import { useQuery } from "@tanstack/react-query";
import {
  Displayable,
  FetchBigIntStrict,
  ViewBigInt,
  formatFetchBigInt,
  formatFetchBigIntToViewBigInt,
  formatUsdValue,
} from "../../../shared";

interface UserProfit {
  totalProfit: FetchBigIntStrict;
  unrealizedProfit: FetchBigIntStrict;
  unrealizedProfitPercentage: FetchBigIntStrict;
}

export async function fetchUserProfit(account: Address): Promise<UserProfit> {
  const strategies = getAllSubStrategies();

  const results = await Promise.all(
    strategies.map(async (strategy) => {
      const cur = await fetchUserStrategyProfit({ user: account, strategy });

      const totalProfit = cur.totalProfit?.bigIntValue || 0n;
      const unrealizedProfit = cur.unrealizedProfit?.bigIntValue || 0n;
      const weightedUnrealizedProfit =
        (cur.unrealizedProfit?.bigIntValue || 0n) * (cur.unrealizedProfitPercentage?.bigIntValue || 0n);

      return { totalProfit, unrealizedProfit, weightedUnrealizedProfit };
    })
  );

  const { totalProfit, unrealizedProfit, unrealizedProfitPercentage } = results.reduce(
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

export const useFetchUserProfit = () => {
  const { address: account } = useAccount();

  return useQuery({
    queryKey: ["fetchUserProfit", account],
    queryFn: () => fetchUserProfit(account!),
    enabled: !!account,
  });
};

interface ViewUserProfit {
  totalProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

export const useFetchViewUserProfit = (): Displayable<ViewUserProfit> => {
  const { data, ...rest } = useFetchUserProfit();

  return {
    ...rest,
    data: {
      totalProfit: formatFetchBigIntToViewBigInt(data?.totalProfit),
      unrealizedProfit: formatFetchBigIntToViewBigInt(data?.unrealizedProfit),
      unrealizedProfitPercentage: formatFetchBigIntToViewBigInt(data?.unrealizedProfitPercentage),
    },
  };
};
