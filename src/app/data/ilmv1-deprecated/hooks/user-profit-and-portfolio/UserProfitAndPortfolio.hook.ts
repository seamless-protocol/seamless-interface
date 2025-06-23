import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchUserProfitAndPortfolio } from "./UserProfitAndPortfolio.fetch";
import { Displayable, ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { disableCacheQueryConfig } from "../../../settings/queryConfig";

interface FormattedUserProfitAndPortfolio {
  portfolioValue: ViewBigInt;
  realizedProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

export const useFetchFormattedUserProfitAndPortfolio = (): Displayable<FormattedUserProfitAndPortfolio> => {
  const { address: account } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["hookUserProfitAndPortfolio", account],
    queryFn: () =>
      fetchUserProfitAndPortfolio({
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
