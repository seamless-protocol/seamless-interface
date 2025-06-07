import { parseUnits } from "viem";
import type { Conversion } from "@fuul/sdk/dist/types/api";
import { ViewBigInt, formatFetchBigIntToViewBigInt } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";
import { fetchAllConversions } from "./Conversions.fetch";
import { useQuery } from "@tanstack/react-query";

export interface FuulConversionWithMetrics extends Conversion {
  metrics?: {
    tvl: string;
    apr: string;
  };
}

export const APY_DECIMALS = 2;

export interface FuulSingleApr {
  fuulAprRaw: string | null;
  fuulApr: ViewBigInt | null;
}

export const fetchConversionByProjectQueryOptions = (id: string) => ({
  queryKey: FuulQueryKeys.conversionById(id),
  queryFn: async (): Promise<FuulSingleApr> => {
    const raw: Conversion[] = await fetchAllConversions({});

    const found = raw.find((item) => item.id === id) as FuulConversionWithMetrics;

    if (!found || !found.metrics) throw new Error("No metrics found");

    const rawApr = found.metrics.apr;
    let aprView: ViewBigInt | null = null;

    if (rawApr !== null && rawApr !== undefined) {
      const aprBigInt = parseUnits(rawApr, APY_DECIMALS);
      aprView = formatFetchBigIntToViewBigInt({
        bigIntValue: aprBigInt * 100n,
        decimals: APY_DECIMALS,
        symbol: "%",
      });
    }

    return { fuulAprRaw: rawApr, fuulApr: aprView };
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
});

export async function fetchConversionByTokenId(id: string): Promise<FuulSingleApr> {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    ...fetchConversionByProjectQueryOptions(id),
  });
}

export const useFetchConversionByTokenId = (id: string) => {
  return useQuery({
    queryKey: ["hookFetchConversionByTokenId", id],
    queryFn: () => fetchConversionByTokenId(id),
  });
};
