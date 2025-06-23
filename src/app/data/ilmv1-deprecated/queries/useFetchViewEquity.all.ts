import { Address } from "viem";
import {
  Displayable,
  fFetchBigIntStructured,
  formatFetchBigIntToViewBigIntTemp,
  fUsdValueStructured,
  mergeQueryStates,
  useToken,
} from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchStrategyAsset } from "../metadata/useFetchStrategyAsset";
import { loopStrategyAbi } from "../../../generated";
import { ViewDetailEquity } from "../types/ViewDetailEquity";
import { readContractQueryOptions } from "wagmi/query";
import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { queryConfig } from "../../settings/queryConfig";

interface StrategyEquity {
  equity: FetchBigInt | undefined;
  equityUsd: FetchBigInt | undefined;
}

export async function fetchEquity(strategy: Address): Promise<bigint> {
  const queryClient = getQueryClient();

  const equity = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "equity",
    }),
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return equity;
}

export async function fetchEquityUsd(strategy: Address): Promise<bigint> {
  const queryClient = getQueryClient();

  const equityUsd = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "equityUSD",
    }),
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return equityUsd;
}

export async function fetchEquityData(strategy: Address): Promise<{ equity: bigint; equityUsd: bigint }> {
  const [equity, equityUsd] = await Promise.all([fetchEquity(strategy), fetchEquityUsd(strategy)]);

  return { equity, equityUsd };
}

export const useFetchDetailEquity = (strategy?: Address): FetchData<StrategyEquity> => {
  const { data: underlyingAsset, ...underlyingAssetRest } = useFetchStrategyAsset(strategy);
  const { data: tokenData, ...tokenDataRest } = useToken(underlyingAsset);

  const { data: equityData, ...equityDataRest } = useQuery({
    queryKey: ["fetchEquityData", strategy],
    queryFn: () => fetchEquityData(strategy!),
    enabled: !!strategy,
    ...queryConfig.disableCacheQueryConfig,
  });

  return {
    ...mergeQueryStates([underlyingAssetRest, tokenDataRest, equityDataRest]),
    data: {
      equity: fFetchBigIntStructured(equityData?.equity, tokenData?.decimals, tokenData?.symbol),
      equityUsd: fUsdValueStructured(equityData?.equityUsd),
    },
  };
};

// todo: merge this with hook useFetchDetailEquity
export const useFetchViewDetailEquity = (strategy?: Address): Displayable<ViewDetailEquity> => {
  const {
    data: { equity, equityUsd },
    ...rest
  } = useFetchDetailEquity(strategy);

  return {
    ...rest,
    data: {
      tokenAmount: formatFetchBigIntToViewBigIntTemp(equity),
      dollarAmount: formatFetchBigIntToViewBigIntTemp(equityUsd),
    },
  };
};
