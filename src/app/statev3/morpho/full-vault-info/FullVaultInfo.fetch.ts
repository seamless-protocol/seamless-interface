import { FullVaultInfoDocument, FullVaultInfoQuery, FullVaultInfoQueryVariables } from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { getPublicClient } from "wagmi/actions";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { queryConfig } from "../../settings/queryConfig";
import { fetchAccrualVault } from "@morpho-org/blue-sdk-viem";

export async function fetchFullVaultInfo2(address: string, chainId: number) {
  const queryClient = getQueryClient();

  const publicClient = getPublicClient(getConfig());
  if (!publicClient) throw new Error("Public client not found");

  const result = await queryClient.fetchQuery({
    queryKey: ["fullVaultInfo", address, chainId],
    queryFn: async () => {
      const result = await fetchAccrualVault(address as Address, publicClient, {
        chainId,
      });
      const t = result.getAllocationProportion("0x9103c3b4e834476c9a62ea009ba2c884ee42e94e6e314a26f04d312434191836" as any);
      console.log({ t })
      console.log({ result })

      return result;
    },
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return result;
}


export async function fetchFullVaultInfo(address: string, chainId: number) {
  const client = getApolloClient();

  const [result, vaultTokenData] = await Promise.all([
    client.query<FullVaultInfoQuery, FullVaultInfoQueryVariables>({
      query: FullVaultInfoDocument,
      variables: { address, chainId },
      fetchPolicy: "no-cache",
    }),
    fetchToken(address as Address),
  ]);
  // await fetchFullVaultInfo2(address, chainId);

  if (result.errors) {
    throw new Error(`Failed to fetch GraphQL data: ${result.errors.map((e) => e.message).join("; ")}`);
  } else if (result.error) {
    throw new Error(`Failed to fetch GraphQL data: ${result.error.message}`);
  }

  return { vaultData: result.data, vaultTokenData };
}
