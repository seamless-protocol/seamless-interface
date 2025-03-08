import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchNetApyHistoricalMapped } from "./NetApyHistorical.fetch";

export const useFetchNativeApyHistorical = (
  address?: Address,
  chainId: number = base.id,
  options?: TimeseriesOptions
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFetchNativeApy", address, chainId, options],
    queryFn: () => fetchNetApyHistoricalMapped(address as string, chainId, options),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data,
  };
};
