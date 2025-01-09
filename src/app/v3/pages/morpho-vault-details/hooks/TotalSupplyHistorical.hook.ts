import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { mapTotalSupplyData } from "../../../../statev3/morpho/mappers/mapTotalAssetsData";
import { fetchTotalAssetsHistorical } from "../../../../statev3/morpho/total-supply-historical/TotalAssetsHistorical.fetch";
import { queryConfig } from "../../../../statev3/settings/queryConfig";

export const useFetchTotalSupply = (address?: Address, chainId: number = base.id, options?: TimeseriesOptions) => {
  const { data, ...rest } = useQuery({
    queryKey: ["totalSupplyHistorical", address, chainId, options],
    queryFn: () => fetchTotalAssetsHistorical(address as string, chainId, options),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data: data ? mapTotalSupplyData(data) : undefined,
  };
};
