import { FullVaultInfoDocument, FullVaultInfoQuery, FullVaultInfoQueryVariables } from "@generated-graphql";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { getApolloClient } from "../../../config/apollo-client";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../settings/queryConfig";
import { MorphoQueryKeys } from "../query-keys";
import { checkMorphoApiResponse } from "../utils";

export const fetchFullVaultInfoFromMorphoApiQueryOptions = (address: string, chainId: number) => ({
  queryKey: MorphoQueryKeys.fullVaultInfo(address, chainId),
  queryFn: async () => {
    const apolloClient = getApolloClient();

    const result = await apolloClient.query<FullVaultInfoQuery, FullVaultInfoQueryVariables>({
      query: FullVaultInfoDocument,
      variables: { address, chainId },
      fetchPolicy: "no-cache",
    });

    checkMorphoApiResponse(result);

    return result;
  },
});

async function _fetchFullVaultInfoFromMorphoApi(address: string, chainId: number) {
  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    ...fetchFullVaultInfoFromMorphoApiQueryOptions(address, chainId),
    ...queryConfig.morphoDataQueryConfig,
  });

  return result;
}

export async function fetchFullVaultInfo(address: string, chainId: number) {
  const [result, vaultTokenData] = await Promise.all([
    _fetchFullVaultInfoFromMorphoApi(address, chainId),
    fetchToken(address as Address),
  ]);

  return { vaultData: result.data, vaultTokenData };
}
