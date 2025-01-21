import { FullVaultInfoDocument, FullVaultInfoQuery, FullVaultInfoQueryVariables } from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";
import { Address } from "viem";
import { fetchToken } from "@shared";

export async function fetchFullVaultInfo(address: string, chainId: number) {
  const client = getApolloClient();

  const [result, vaultTokenData] = await Promise.all([
    client.query<FullVaultInfoQuery, FullVaultInfoQueryVariables>({
      query: FullVaultInfoDocument,
      variables: { address, chainId },
      fetchPolicy: "cache-first",
    }),
    fetchToken(address as Address),
  ]);

  if (result.errors) {
    throw new Error(`Failed to fetch GraphQL data: ${result.errors.map((e) => e.message).join("; ")}`);
  } else if (result.error) {
    throw new Error(`Failed to fetch GraphQL data: ${result.error.message}`);
  }

  return { vaultData: result.data, vaultTokenData };
}
