import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchNetApyHistorical } from "../../../../statev3/morpho/net-apy-historical/NetApyHistorical.fetch";
import { mapNativeApyData } from "../../../../statev3/morpho/mappers/mapNativeApyData";
import { MorphoQueryKeys } from "../../../../statev3/morpho/query-keys";

export const useFetchNativeApyHistorical = (
  address?: Address,
  chainId: number = base.id,
  options?: TimeseriesOptions
) => {
  const { data, ...rest } = useQuery({
    queryKey: MorphoQueryKeys.netApyHistoricalHook(address, chainId, options),
    queryFn: () => fetchNetApyHistorical(address as string, chainId, options),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data: data ? mapNativeApyData(data) : undefined,
  };
};
