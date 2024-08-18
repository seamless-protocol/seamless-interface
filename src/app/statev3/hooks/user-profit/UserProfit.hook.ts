import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchUserProfit } from "./UserProfit.fetch";
import { Displayable, ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../../shared";

export const useFetchUserProfit = () => {
  const { address: account } = useAccount();

  return useQuery({
    queryKey: ["fetchUserProfit", account],
    queryFn: () =>
      fetchUserProfit({
        account: account!,
      }),
    enabled: !!account,
  });
};

interface FormattedUserProfit {
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
  });

  return {
    ...rest,
    data: {
      realizedProfit: formatFetchBigIntToViewBigInt(data?.realizedProfit),
      unrealizedProfit: formatFetchBigIntToViewBigInt(data?.unrealizedProfit),
      unrealizedProfitPercentage: formatFetchBigIntToViewBigInt(data?.unrealizedProfitPercentage),
    },
  };
};
