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
