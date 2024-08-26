import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchUserProfit } from "./UserProfit.fetch";
import { Displayable, ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../../shared";
import { disableCacheQueryConfig } from "../../../state/settings/queryConfig";

interface FormattedUserProfit {
  portfolioValue: ViewBigInt;
  realizedProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

export const useFetchFormattedUserProfit = (): Displayable<FormattedUserProfit> => {
  const { address: account } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["fetchUserProfit", account],
    queryFn: () =>
      fetchUserProfit({
        account: account!,
      }),
    enabled: !!account,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: {
      portfolioValue: formatFetchBigIntToViewBigInt(data?.currPortfolioValue),
      realizedProfit: formatFetchBigIntToViewBigInt(data?.realizedProfit),
      unrealizedProfit: formatFetchBigIntToViewBigInt(data?.unrealizedProfit),
      unrealizedProfitPercentage: formatFetchBigIntToViewBigInt(data?.unrealizedProfitPercentage),
    },
  };
};
