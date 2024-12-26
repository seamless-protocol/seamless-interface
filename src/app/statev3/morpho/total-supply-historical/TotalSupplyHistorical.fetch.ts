import {
  TimeseriesOptions,
  TotalSupplyHistoricalDocument,
  TotalSupplyHistoricalQuery,
  TotalSupplyHistoricalQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";

export async function fetchTotalSupplyHistorical(
  address: string,
  chainId: number,
  options: TimeseriesOptions
): Promise<TotalSupplyHistoricalQuery> {
  const client = getApolloClient();
  const result = await client.query<TotalSupplyHistoricalQuery, TotalSupplyHistoricalQueryVariables>({
    query: TotalSupplyHistoricalDocument,
    variables: { address, chainId, options },
    fetchPolicy: "cache-first",
  });

  if (result.errors) {
    throw new Error(`Failed to fetch GraphQL data: ${result.errors.map((e) => e.message).join("; ")}`);
  } else if (result.error) {
    throw new Error(`Failed to fetch GraphQL data: ${result.error.message}`);
  }

  return result.data;
}
