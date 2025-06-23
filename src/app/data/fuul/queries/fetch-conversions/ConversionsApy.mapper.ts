import { Address, isAddressEqual } from "viem";
import type { Conversion } from "@fuul/sdk/dist/types/api";
import { ViewNumber, formatFetchNumberToViewNumber } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { fetchAllConversions } from "./Conversions.fetch";
import { useQuery } from "@tanstack/react-query";
import { IS_DEV_MODE } from "../../../../../globals";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export interface FuulConversionWithMetrics extends Conversion {
  metrics?: {
    tvl: string;
    apr: string;
  };
}

export const APY_DECIMALS = 2;

export interface FuulSingleApr {
  fuulAprRaw: string | undefined;
  fuulApr: ViewNumber | undefined;
}

export const fetchConversionByProgramQueryOptions = (id: string) => ({
  queryKey: FuulQueryKeys.conversionById(id),
  queryFn: async (): Promise<FuulSingleApr> => {
    const raw: Conversion[] = await fetchAllConversions({});

    const found = raw.find((item) => item.id === id) as FuulConversionWithMetrics;

    if (!found || !found.metrics) throw new Error("No metrics found");

    const rawApr = found.metrics.apr;
    let aprView: ViewNumber | undefined;

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

export const useFetchFuulAprByProgramId = (id?: string) => {
  return useQuery({
    queryKey: ["useFetchFuulAprByProgramId", id],
    queryFn: () => fetchConversionByProgramId(id!),
    enabled: Boolean(id),
  });
};

export const fetchConversionByTokenAddressQueryOptions = (address: Address) => ({
  queryKey: FuulQueryKeys.conversionByTokenAddress(address),
  queryFn: async (): Promise<FuulSingleApr> => {
    const raw: Conversion[] = await fetchAllConversions({});

    const found = raw.find((item) =>
      item.triggers.some((trigger) =>
        trigger.contracts?.some((contract) => isAddressEqual(contract.address as Address, address))
      )
    ) as FuulConversionWithMetrics;

    if (!found || !found.metrics) {
      return { fuulAprRaw: "0", fuulApr: formatFetchNumberToViewNumber({ value: 0, symbol: "%" }) };
    }
    const rawApr = found.metrics.apr;
    let aprView: ViewNumber | undefined;

    if (rawApr !== null && rawApr !== undefined) {
      aprView = formatFetchNumberToViewNumber({
        value: Number(rawApr) * 100,
        symbol: "%",
      });
    }

    return { fuulAprRaw: rawApr, fuulApr: aprView };
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
});

export async function fetchConversionByTokenAddress(address: Address): Promise<FuulSingleApr> {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    ...fetchConversionByTokenAddressQueryOptions(address),
  });
}

export const useFetchFuulAprByTokenAddress = (address?: Address) => {
  return useQuery({
    queryKey: ["useFetchFuulAprByTokenAddress", address],
    queryFn: () => fetchConversionByTokenAddress(address!),
    enabled: Boolean(address),
  });
};
