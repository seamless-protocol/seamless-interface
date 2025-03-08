import {
  TimeseriesOptions,
  TotalAssetsHistoricalDocument,
  TotalAssetsHistoricalQuery,
  TotalAssetsHistoricalQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../../config/apollo-client";
import { ExtendedTotalAssetsHistoricalData } from "./ExtendedTotalAssetsHistoricalData.type";
import { fetchToken } from "../../../../../shared";
import { Address } from "viem";
import { checkMorphoResponse } from "../../common/checkMorphoResponse";
import { MorphoQueryKeys } from "../../query-keys";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";

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

    checkMorphoResponse(result);
    return result;
  },
});

export async function fetchTotalAssetsHistorical(
  address: string,
  chainId: number,
  options?: TimeseriesOptions
): Promise<ExtendedTotalAssetsHistoricalData> {
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
