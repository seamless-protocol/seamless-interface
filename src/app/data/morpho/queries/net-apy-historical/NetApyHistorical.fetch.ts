import {
  NetApyHistoricalDocument,
  NetApyHistoricalQuery,
  NetApyHistoricalQueryVariables,
  TimeseriesOptions,
} from "@generated-graphql";
import { getApolloClient } from "../../../../config/apollo-client";
import { fetchToken } from "@shared";
import { Address } from "viem";
import { ExtendedNetAPYHistoricalData } from "./ExtendedNetAPYHistoricalData.type";
import { checkMorphoApiResponse } from "../../utils/checkMorphoApiResponse";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { mapNativeApyHistoricalData } from "./NativeApyHistoricalData.mapper";
import { MorphoQueryKeys } from "../../query-keys";

export const fetchNetApyHistoricalQueryOptions = (address: string, chainId: number, options?: TimeseriesOptions) => ({
  queryKey: MorphoQueryKeys.netApyHistorical(address, chainId, options),
  queryFn: async () => {
    const apolloClient = getApolloClient();

    const result = await apolloClient.query<NetApyHistoricalQuery, NetApyHistoricalQueryVariables>({
      query: NetApyHistoricalDocument,
      variables: { address, chainId, options },
      fetchPolicy: "no-cache",
    });

    checkMorphoApiResponse(result);
    return result;
  },
});

export async function fetchNetApyHistorical(
  address: string,
  chainId: number,
  options?: TimeseriesOptions
): Promise<ExtendedNetAPYHistoricalData> {
  const queryClient = getQueryClient();

  const [result, vaultTokenData] = await Promise.all([
    queryClient.fetchQuery({
      ...fetchNetApyHistoricalQueryOptions(address, chainId, options),
      ...queryConfig.morphoHistoricalDataQueryConfig,
    }),
    fetchToken(address as Address),
  ]);

  checkMorphoApiResponse(result);

  return {
    ...result.data,
    vaultTokenData,
  };
}

export async function fetchNetApyHistoricalMapped(address: string, chainId: number, options?: TimeseriesOptions) {
  const result = await fetchNetApyHistorical(address, chainId, options);
  return mapNativeApyHistoricalData(result);
}
