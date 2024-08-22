import { Address } from "viem";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { loopStrategyAbi } from "../../generated";
import {
  Displayable,
  FetchTokenAmountWithUsdValueStrict,
  ViewBigIntWithUsdValue,
  formatFetchBigInt,
  formatFetchBigIntToViewBigInt,
  formatUsdValue,
} from "../../../shared";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";

export interface FetchEquityInBlockInput {
  strategy: Address;
  blockNumber?: bigint | undefined;
}

export async function fetchEquityInBlock({
  strategy,
  blockNumber,
}: FetchEquityInBlockInput): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { symbol, decimals } = await fetchTokenData(strategy);

  const [equity, equityUsd] = await Promise.all([
    queryContract(
      queryOptions({
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equity",
        blockNumber,
      })
    ),
    queryContract(
      queryOptions({
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
        blockNumber,
      })
    ),
  ]);

  return {
    tokenAmount: formatFetchBigInt(equity, decimals, symbol),
    dollarAmount: formatUsdValue(equityUsd),
  };
}

export const useFetchFormattedEquity = (strategy: Address): Displayable<ViewBigIntWithUsdValue> => {
  const { data, ...rest } = useQuery({
    queryKey: ["fetchFormattedEquity", strategy],
    queryFn: () => fetchEquityInBlock({ strategy }),
    enabled: !!strategy,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: {
      tokenAmount: formatFetchBigIntToViewBigInt(data?.tokenAmount),
      dollarAmount: formatFetchBigIntToViewBigInt(data?.dollarAmount),
    },
  };
};
