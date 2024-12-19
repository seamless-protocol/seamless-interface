import {
  FullVaultInfoDocument,
  FullVaultInfoQuery,
  FullVaultInfoQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";

export async function fetchFullVaultInfo(address: string, chainId: number) {
  const client = getApolloClient();
  const { data } = await client.query<FullVaultInfoQuery, FullVaultInfoQueryVariables>({
    query: FullVaultInfoDocument,
    variables: { address, chainId },
    fetchPolicy: "cache-first",
  });
  return data;
}
