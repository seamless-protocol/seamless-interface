import {
  TimeseriesOptions,
  TotalAssetsHistoricalDocument,
  TotalAssetsHistoricalQuery,
  TotalAssetsHistoricalQueryVariables,
} from "@generated-graphql";
import { getMorphoApolloClient } from "../../../config/apollo-clients";
import { ExtendedTotalAssetsHistoricalQuery } from "../types/ExtendedTotalAssetsHistoricalQuery";
import { fetchToken } from "../../../../shared";
import { Address } from "viem";

export async function fetchTotalAssetsHistorical(
  address: string,
  chainId: number,
  options?: TimeseriesOptions
): Promise<ExtendedTotalAssetsHistoricalQuery> {
  const client = getMorphoApolloClient();

  const [result, vaultTokenData] = await Promise.all([
    client.query<TotalAssetsHistoricalQuery, TotalAssetsHistoricalQueryVariables>({
      query: TotalAssetsHistoricalDocument,
      variables: { address, chainId, options },
      fetchPolicy: "cache-first",
    }),
    fetchToken(address as Address),
  ]);

  if (result.errors) {
    throw new Error(
      `GraphQL Query Failed: TotalAssetsHistoricalQuery\n` +
      `Variables: ${JSON.stringify({ address, chainId, options })}\n` +
      `Errors: ${result.errors.map((e) => e.message).join("; ")}`
    );
  } else if (result.error) {
    throw new Error(
      `GraphQL Query Failed: TotalAssetsHistoricalQuery\n` +
      `Variables: ${JSON.stringify({ address, chainId, options })}\n` +
      `Error: ${result.error.message}`
    );
  }

  return {
    ...result.data,
    vaultTokenData,
  };
}
