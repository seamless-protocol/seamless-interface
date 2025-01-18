import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchUserStrategyProfit } from "./UserStrategyProfit.fetch";
import { Displayable, ViewBigInt, ViewBigIntWithUsdValue, formatFetchBigIntToViewBigInt } from "../../../../shared";
import { useAccount } from "wagmi";
import { disableCacheQueryConfig } from "../../settings/queryConfig";

interface UseFetchFormattedUserStrategyProfitInput {
  address: Address | undefined;
  assetAddress?: Address;
}

interface FormattedUserStrategyProfit {
  strategyBalance: ViewBigIntWithUsdValue;
  realizedProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

export const useFetchFormattedUserStrategyProfit = ({
  address,
  assetAddress,
}: UseFetchFormattedUserStrategyProfitInput): Displayable<FormattedUserStrategyProfit> => {
  const { address: user } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["fetchFormattedUserStrategyProfit", user, address, assetAddress],
    queryFn: () => fetchUserStrategyProfit({ user: user!, address: address!, assetAddress }),
    enabled: !!user && !!address,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: {
      strategyBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(data?.strategyBalance.tokenAmount),
        dollarAmount: formatFetchBigIntToViewBigInt(data?.strategyBalance.dollarAmount),
      },
      realizedProfit: formatFetchBigIntToViewBigInt(data?.realizedProfit),
      unrealizedProfit: formatFetchBigIntToViewBigInt(data?.unrealizedProfit),
      unrealizedProfitPercentage: formatFetchBigIntToViewBigInt(data?.unrealizedProfitPercentage),
    },
  };
};
