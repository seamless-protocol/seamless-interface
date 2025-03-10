import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchNetApyHistoricalMapped } from "./NetApyHistorical.fetch";
import { MorphoQueryKeys } from "../../query-keys";

export const useFetchNativeApyHistorical = (
  address?: Address,
  chainId: number = base.id,
  options?: TimeseriesOptions
) => {
  return useQuery({
    queryKey: MorphoQueryKeys.netApyHistoricalHook(address, chainId, options),
    queryFn: () => fetchNetApyHistoricalMapped(address as string, chainId, options),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });
};
