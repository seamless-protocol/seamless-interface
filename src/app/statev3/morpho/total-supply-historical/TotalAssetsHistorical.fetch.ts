import {
  TimeseriesOptions,
  TotalAssetsHistoricalDocument,
  TotalAssetsHistoricalQuery,
  TotalAssetsHistoricalQueryVariables,
} from "@generated-graphql";
import { Address } from "viem";
import { getApolloClient } from "../../../config/apollo-client";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../settings/queryConfig";
import { MorphoQueryKeys } from "../query-keys";
import { checkMorphoApiResponse } from "../utils";
import { ExtendedTotalAssetsHistoricalQuery } from "../types/ExtendedTotalAssetsHistoricalQuery";
import { fetchToken } from "@shared";

export const fetchTotalAssetsHistoricalQueryOptions = (
  address: string,
  chainId: number,
  options?: TimeseriesOptions
) => ({
  queryKey: MorphoQueryKeys.totalAssetsHistorical(address, chainId, options),
  queryFn: async () => {
    const apolloClient = getApolloClient();

    const result = await apolloClient.query<TotalAssetsHistoricalQuery, TotalAssetsHistoricalQueryVariables>({
      query: TotalAssetsHistoricalDocument,
      variables: { address, chainId, options },
      fetchPolicy: "no-cache",
    });

    checkMorphoApiResponse(result);
    return result;
  },
});

export async function fetchTotalAssetsHistorical(
  address: string,
  chainId: number,
  options?: TimeseriesOptions
): Promise<ExtendedTotalAssetsHistoricalQuery> {
  const queryClint = getQueryClient();

  const [result, vaultTokenData] = await Promise.all([
    queryClint.fetchQuery({
      ...fetchTotalAssetsHistoricalQueryOptions(address, chainId, options),
      ...queryConfig.morphoHistoricalDataQueryConfig,
    }),
    fetchToken(address as Address),
  ]);

  return {
    ...result.data,
    vaultTokenData,
  };
}
