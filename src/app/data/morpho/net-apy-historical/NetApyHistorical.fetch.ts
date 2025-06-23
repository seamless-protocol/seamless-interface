import {
  NetApyHistoricalDocument,
  NetApyHistoricalQuery,
  NetApyHistoricalQueryVariables,
  TimeseriesOptions,
} from "@generated-graphql";
import { getMorphoApolloClient } from "../../../config/apollo-clients";
import { fetchToken } from "@shared";
import { Address } from "viem";
import { ExtendedNetAPYHistoricalQuery } from "../types/ExtendedNetAPYHistoricalQuery";

export async function fetchNetApyHistorical(
  address: string,
  chainId: number,
  options?: TimeseriesOptions
): Promise<ExtendedNetAPYHistoricalQuery> {
  const client = getMorphoApolloClient();

  const [result, vaultTokenData] = await Promise.all([
    client.query<NetApyHistoricalQuery, NetApyHistoricalQueryVariables>({
      query: NetApyHistoricalDocument,
      variables: { address, chainId, options },
      fetchPolicy: "cache-first",
    }),
    fetchToken(address as Address),
  ]);

  if (result.errors) {
    throw new Error(
      `GraphQL Query Failed: NetApyHistoricalQuery\n` +
      `Variables: ${JSON.stringify({ address, chainId, options })}\n` +
      `Errors: ${result.errors.map((e) => e.message).join("; ")}`
    );
  } else if (result.error) {
    throw new Error(
      `GraphQL Query Failed: NetApyHistoricalQuery\n` +
      `Variables: ${JSON.stringify({ address, chainId, options })}\n` +
      `Error: ${result.error.message}`
    );
  }

  return {
    ...result.data,
    vaultTokenData,
  };
}
