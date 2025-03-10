import { FullVaultInfoDocument, FullVaultInfoQuery, FullVaultInfoQueryVariables } from "@generated-graphql";
import { getApolloClient } from "../../../../config/apollo-client";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { checkMorphoApiResponse } from "../../common/checkMorphoApiResponse";
import { mapFullVaultInfo } from "./FullVaultInfo.mapper";
import { MorphoQueryKeys } from "../../query-keys";

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

export async function fetchFullVaultInfoMapped(address: string, chainId: number) {
  const { vaultData, vaultTokenData } = await fetchFullVaultInfo(address, chainId);
  const mapped = mapFullVaultInfo(vaultData.vaultByAddress, vaultTokenData);

  return mapped;
}
