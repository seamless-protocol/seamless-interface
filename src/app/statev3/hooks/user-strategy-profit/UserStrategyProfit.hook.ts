import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchUserStrategyProfit } from "./UserStrategyProfit.fetch";
import { Displayable, ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../../shared";

interface UseFetchViewUserStrategyProfitInput {
  user: Address | undefined;
  strategy: Address | undefined;
}

interface ViewUserStrategyProfit {
  totalProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

export const useFetchViewUserStrategyProfit = ({
  user,
  strategy,
}: UseFetchViewUserStrategyProfitInput): Displayable<ViewUserStrategyProfit> => {
  const { data, ...rest } = useQuery({
    queryKey: ["fetchViewUserStrategyProfit", user, strategy],
    queryFn: () => fetchUserStrategyProfit({ user: user!, strategy: strategy! }),
    enabled: !!user && !!strategy,
  });

  return {
    ...rest,
    data: {
      totalProfit: formatFetchBigIntToViewBigInt(data?.totalProfit),
      unrealizedProfit: formatFetchBigIntToViewBigInt(data?.unrealizedProfit),
      unrealizedProfitPercentage: formatFetchBigIntToViewBigInt(data?.unrealizedProfitPercentage),
    },
  };
};
