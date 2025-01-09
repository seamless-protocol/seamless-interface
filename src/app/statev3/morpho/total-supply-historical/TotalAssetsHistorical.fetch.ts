import {
  TimeseriesOptions,
  TotalSupplyHistoricalDocument,
  TotalSupplyHistoricalQuery,
  TotalSupplyHistoricalQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";
import { ExtendedTotalSupplyHistoricalQuery } from "../types/ExtendedTotalSupplyHistoricalQuery";
import { fetchToken } from "../../../../shared";
import { Address } from "viem";

export async function fetchTotalAssetsHistorical(
  address: string,
  chainId: number,
  options?: TimeseriesOptions
): Promise<ExtendedTotalSupplyHistoricalQuery> {
  const client = getApolloClient();

  const [result, vaultTokenData] = await Promise.all([
    client.query<TotalSupplyHistoricalQuery, TotalSupplyHistoricalQueryVariables>({
      query: TotalSupplyHistoricalDocument,
      variables: { address, chainId, options },
      fetchPolicy: "cache-first",
    }),
    fetchToken(address as Address),
  ]);

  if (result.errors) {
    throw new Error(
      `GraphQL Query Failed: TotalSupplyHistoricalQuery\n` +
        `Variables: ${JSON.stringify({ address, chainId, options })}\n` +
        `Errors: ${result.errors.map((e) => e.message).join("; ")}`
    );
  } else if (result.error) {
    throw new Error(
      `GraphQL Query Failed: TotalSupplyHistoricalQuery\n` +
        `Variables: ${JSON.stringify({ address, chainId, options })}\n` +
        `Error: ${result.error.message}`
    );
  }

  return {
    ...result.data,
    vaultTokenData,
  };
}
