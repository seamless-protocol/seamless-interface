import {
  FullVaultInfoDocument,
  FullVaultInfoQuery,
  FullVaultInfoQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";

export async function fetchFullVaultInfo(address: string, chainId: number) {
  const client = getApolloClient();
  const result = await client.query<FullVaultInfoQuery, FullVaultInfoQueryVariables>({
    query: FullVaultInfoDocument,
    variables: { address, chainId },
    fetchPolicy: "cache-first",
  });

  if (result.errors) {
    throw new Error(
      `Failed to fetch GraphQL data: ${result.errors.map((e) => e.message).join("; ")}`
    );
  } else if (result.error) {
    throw new Error(`Failed to fetch GraphQL data: ${result.error.message}`);
  }

  return result.data;
}
