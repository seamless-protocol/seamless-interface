import type { Conversion } from "@fuul/sdk/dist/types/api";
import { ViewNumber, formatFetchNumberToViewNumber } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";
import { fetchAllConversions } from "./Conversions.fetch";
import { useQuery } from "@tanstack/react-query";
import { IS_DEV_MODE } from "../../../../../globals";

export interface FuulConversionWithMetrics extends Conversion {
  metrics?: {
    tvl: string;
    apr: string;
  };
}

export const APY_DECIMALS = 2;

export interface FuulSingleApr {
  fuulAprRaw: string | null;
  fuulApr: ViewNumber | null;
}

export const fetchConversionByProgramQueryOptions = (id: string) => ({
  queryKey: FuulQueryKeys.conversionById(id),
  queryFn: async (): Promise<FuulSingleApr> => {
    const raw: Conversion[] = await fetchAllConversions({});

    const found = raw.find((item) => item.id === id) as FuulConversionWithMetrics;

    if (!found || !found.metrics) throw new Error("No metrics found");

    const rawApr = found.metrics.apr;
    let aprView: ViewNumber | null = null;

    if (rawApr !== null && rawApr !== undefined) {
      aprView = formatFetchNumberToViewNumber({
        value: Number(rawApr),
        symbol: "%",
      });
    }

    return { fuulAprRaw: rawApr, fuulApr: aprView };
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
  retry: IS_DEV_MODE ? 0 : 3,
});

export async function fetchConversionByProgramId(id: string): Promise<FuulSingleApr> {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    ...fetchConversionByProgramQueryOptions(id),
  });
}

export const useFetchFuulApyByProgramId = (id?: string) => {
  return useQuery({
    queryKey: ["hookFetchFuulApyByAddress", id],
    queryFn: () => fetchConversionByProgramId(id!),
    enabled: Boolean(id),
  });
};
