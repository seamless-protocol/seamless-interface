import { FullVaultInfoDocument, FullVaultInfoQuery, FullVaultInfoQueryVariables } from "@generated-graphql";
import { getMorphoApolloClient } from "../../../config/apollo-clients";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../settings/queryConfig";

async function fetchFullVaultInfoFromMorphoApi(address: string, chainId: number) {
  const queryClient = getQueryClient();
  const apolloClient = getMorphoApolloClient();

  const result = await queryClient.fetchQuery({
    queryKey: ["fetchFullVaultInfoFromMorphoApi", address, chainId],
    queryFn: async () => {
      const result = await apolloClient.query<FullVaultInfoQuery, FullVaultInfoQueryVariables>({
        query: FullVaultInfoDocument,
        variables: { address, chainId },
        fetchPolicy: "no-cache",
      });
      if (result.errors) {
        throw new Error(`Failed to fetch MorphoApi data: ${result.errors.map((e) => e.message).join("; ")}`);
      } else if (result.error) {
        throw new Error(`Failed to fetch MorphoApi data: ${result.error.message}`);
      }

      return result;
    },
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return result;
}

export async function fetchFullVaultInfo(address: string, chainId: number) {
  const [result, vaultTokenData] = await Promise.all([
    fetchFullVaultInfoFromMorphoApi(address, chainId),
    fetchToken(address as Address),
  ]);

  return { vaultData: result.data, vaultTokenData };
}
