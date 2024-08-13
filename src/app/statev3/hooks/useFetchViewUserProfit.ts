import { Address } from "viem";
import { Config, useAccount, useConfig } from "wagmi";
import { getAllSubStrategies } from "../../state/settings/configUtils";
import { fetchUserStrategyProfit } from "./useFetchViewUserStrategyProfit";
import { useQuery } from "@tanstack/react-query";
import {
  Displayable,
  FetchBigInt,
  ViewBigInt,
  fUsdValueStructured,
  formatFetchBigIntToViewBigInt,
} from "../../../shared";

interface UserProfit {
  totalProfit: FetchBigInt | undefined;
  unrealizedProfit: FetchBigInt | undefined;
}

export async function fetchUserProfit({ config, account }: { config: Config; account: Address }): Promise<UserProfit> {
  const strategies = getAllSubStrategies();

  let totalProfit = 0n;
  let unrealizedProfit = 0n;
  await Promise.all(
    strategies.map(async (strategy) => {
      const cur = await fetchUserStrategyProfit({ config, user: account, strategy });

      totalProfit += cur.totalProfit?.bigIntValue || 0n;
      unrealizedProfit += cur.unrealizedProfit?.bigIntValue || 0n;
    })
  );

  const profit = { totalProfit, unrealizedProfit };

  return {
    totalProfit: fUsdValueStructured(profit.totalProfit),
    unrealizedProfit: fUsdValueStructured(profit.unrealizedProfit),
  };
}

export const useFetchUserProfit = () => {
  const config = useConfig();

  const account = useAccount();

  return useQuery({
    queryKey: ["fetchUserProfit", account?.address],
    queryFn: () => fetchUserProfit({ config, account: account!.address! }),
    enabled: !!account?.address,
  });
};

interface ViewUserProfit {
  totalProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
}

export const useFetchViewUserProfit = (): Displayable<ViewUserProfit> => {
  const { data, ...rest } = useFetchUserProfit();

  return {
    ...rest,
    data: {
      totalProfit: formatFetchBigIntToViewBigInt(data?.totalProfit),
      unrealizedProfit: formatFetchBigIntToViewBigInt(data?.unrealizedProfit),
    },
  };
};
