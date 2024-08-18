import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchUserStrategyProfit } from "./UserStrategyProfit.fetch";
import { Displayable, ViewBigInt, ViewBigIntWithDollarValue, formatFetchBigIntToViewBigInt } from "../../../../shared";
import { useAccount } from "wagmi";

interface UseFetchFormattedUserStrategyProfitInput {
  strategy: Address | undefined;
}

interface FormattedUserStrategyProfit {
  strategyBalance: ViewBigIntWithDollarValue;
  realizedProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

export const useFetchFormattedUserStrategyProfit = ({
  strategy,
}: UseFetchFormattedUserStrategyProfitInput): Displayable<FormattedUserStrategyProfit> => {
  const { address: user } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["fetchFormattedUserStrategyProfit", user, strategy],
    queryFn: () => fetchUserStrategyProfit({ user: user!, strategy: strategy! }),
    enabled: !!user && !!strategy,
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
