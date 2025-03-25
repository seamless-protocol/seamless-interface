import {
  NetApyHistoricalDocument,
  NetApyHistoricalQuery,
  NetApyHistoricalQueryVariables,
  TimeseriesOptions,
} from "@generated-graphql";
import { fetchToken } from "@shared";
import { Address } from "viem";
import { getApolloClient } from "../../../config/apollo-client";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../settings/queryConfig";
import { MorphoQueryKeys } from "../query-keys";
import { checkMorphoApiResponse } from "../utils";
import { ExtendedNetAPYHistoricalQuery } from "../types/ExtendedNetAPYHistoricalQuery";

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
): Promise<ExtendedNetAPYHistoricalQuery> {
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
