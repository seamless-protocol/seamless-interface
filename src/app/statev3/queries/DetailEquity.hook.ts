import { Address } from "viem";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { loopStrategyAbi } from "../../generated";
import {
  Displayable,
  FetchTokenAmountWithUsdValueStrict,
  ViewBigInt,
  formatFetchBigInt,
  formatFetchBigIntToViewBigIntTemp,
  formatUsdValue,
} from "../../../shared";
import { useQuery } from "@tanstack/react-query";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";

export async function fetchDetailEquity(strategy: Address): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { symbol, decimals } = await fetchTokenData(strategy);

  const [equity, equityUsd] = await Promise.all([
    queryContract(
      queryOptions({
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equity",
      })
    ),
    queryContract(
      queryOptions({
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
      })
    ),
  ]);

  return {
    tokenAmount: formatFetchBigInt(equity, decimals, symbol),
    dollarAmount: formatUsdValue(equityUsd),
  };
}

export const useFetchDetailEquity = (strategy: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchDetailEquity", strategy],
    queryFn: () => fetchDetailEquity(strategy!),
    enabled: !!strategy,
  });
};

interface DetailEquity {
  tokenAmount: ViewBigInt | undefined;
  dollarAmount: ViewBigInt | undefined;
}

export const useFetchViewDetailEquity = (strategy: Address | undefined): Displayable<DetailEquity> => {
  const { data, ...rest } = useFetchDetailEquity(strategy);

  return {
    ...rest,
    data: {
      tokenAmount: formatFetchBigIntToViewBigIntTemp(data?.tokenAmount),
      dollarAmount: formatFetchBigIntToViewBigIntTemp(data?.dollarAmount),
    },
  };
};
