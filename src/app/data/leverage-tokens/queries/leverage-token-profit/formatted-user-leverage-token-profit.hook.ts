import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { Displayable, ViewBigInt, ViewBigIntWithUsdValue, formatFetchBigIntToViewBigInt } from "@shared";
import { useAccount } from "wagmi";

interface UseFetchFormattedUserLeverageTokenProfitInput {
  leverageToken: Address | undefined;
}

interface FormattedUserLeverageTokenProfit {
  leverageTokenBalance: ViewBigIntWithUsdValue;
  realizedProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

// Shape of the (mocked) raw response from the query function
interface RawUserLeverageTokenProfit {
  leverageTokenBalance: { tokenAmount: bigint; dollarAmount: bigint };
  realizedProfit: bigint;
  unrealizedProfit: bigint;
  unrealizedProfitPercentage: bigint;
}

export const useFetchFormattedUserLeverageTokenProfit = ({
  leverageToken,
}: UseFetchFormattedUserLeverageTokenProfitInput): Displayable<FormattedUserLeverageTokenProfit> => {
  const { address: user } = useAccount();

  const { data, ...rest } = useQuery<RawUserLeverageTokenProfit>({
    queryKey: ["fetchFormattedUserLeverageTokenProfit", user, leverageToken],
    queryFn: async () =>
      Promise.resolve<RawUserLeverageTokenProfit>({
        leverageTokenBalance: {
          tokenAmount: 0n,
          dollarAmount: 0n,
        },
        realizedProfit: 0n,
        unrealizedProfit: 0n,
        unrealizedProfitPercentage: 0n,
      }),
    enabled: !!user && !!leverageToken,
  });

  return {
    ...rest,
    data: {
      leverageTokenBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt({
          bigIntValue: data?.leverageTokenBalance.tokenAmount ?? 0n,
          decimals: 18,
          symbol: "weETH",
        }),
        dollarAmount: formatFetchBigIntToViewBigInt({
          bigIntValue: data?.leverageTokenBalance.dollarAmount ?? 0n,
          decimals: 8,
          symbol: "$",
        }),
      },
      realizedProfit: formatFetchBigIntToViewBigInt({
        bigIntValue: data?.realizedProfit ?? 0n,
        decimals: 8,
        symbol: "$",
      }),
      unrealizedProfit: formatFetchBigIntToViewBigInt({
        bigIntValue: data?.unrealizedProfit ?? 0n,
        decimals: 8,
        symbol: "$",
      }),
      unrealizedProfitPercentage: formatFetchBigIntToViewBigInt({
        bigIntValue: data?.unrealizedProfitPercentage ?? 0n,
        decimals: 2,
        symbol: "%",
      }),
    },
  };
};
