import { Address } from "viem";
import { fetchTokenData } from "../metadata/useFetchTokenData";
import { getQueryClient } from "../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { config } from "../../config/rainbow.config";
import { loopStrategyAbi } from "../../generated";
import {
  Displayable,
  FetchBigIntWithUsdValue,
  ViewBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
  formatFetchBigIntToViewBigIntTemp,
} from "../../../shared";
import { useQuery } from "@tanstack/react-query";

export async function fetchDetailEquity(strategy: Address): Promise<FetchBigIntWithUsdValue> {
  const queryClient = getQueryClient();

  const { symbol, decimals } = await fetchTokenData(strategy);

  const [equity, equityUsd] = await Promise.all([
    queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equity",
      })
    ),
    queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
      })
    ),
  ]);

  return {
    tokenAmount: fFetchBigIntStructured(equity, decimals, symbol),
    dollarAmount: fUsdValueStructured(equityUsd),
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
