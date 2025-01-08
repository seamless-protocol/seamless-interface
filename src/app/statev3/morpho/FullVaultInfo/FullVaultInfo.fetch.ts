import { fetchAccrualVault } from "@morpho-org/blue-sdk-viem";
import { getPublicClient } from "wagmi/actions";
import { getConfig } from "../../../utils/queryContractUtils";
import { Address } from "viem";
import { extendAccrualVaultWithTokenData } from "../mappers/extendAccrualVaultWithTokenData";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../settings/queryConfig";

export async function fetchFullVaultInfo(address: string, chainId: number) {
  const queryClient = getQueryClient();

  const publicClient = getPublicClient(getConfig());
  if (!publicClient) throw new Error("Public client not found");

  const result = await queryClient.fetchQuery({
    queryKey: ["fullVaultInfo", address, chainId],
    queryFn: async () => {
      const result = await fetchAccrualVault(address as Address, publicClient, {
        chainId,
      });
      const data = await extendAccrualVaultWithTokenData(result);

      return data;
    },
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return result;
}
