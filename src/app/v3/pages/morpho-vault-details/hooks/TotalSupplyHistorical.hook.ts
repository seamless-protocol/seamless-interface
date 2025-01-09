import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { mapTotalSupplyData } from "../../../../statev3/morpho/mappers/mapTotalSupplyData";
import { fetchTotalSupplyHistorical } from "../../../../statev3/morpho/total-supply-historical/TotalSupplyHistorical.fetch";
import { queryConfig } from "../../../../statev3/settings/queryConfig";

export const useFetchTotalSupply = (address?: Address, chainId: number = base.id, options?: TimeseriesOptions) => {
  const { data, ...rest } = useQuery({
    queryKey: ["totalSupplyHistorical", address, chainId, options],
    queryFn: () => fetchTotalSupplyHistorical(address as string, chainId, options),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data: data ? mapTotalSupplyData(data) : undefined,
  };
};
