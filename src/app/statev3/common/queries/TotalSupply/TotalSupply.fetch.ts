import { Address, erc20Abi } from "viem";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { getConfig } from "../../../../utils/queryContractUtils";

// erc20 data, goes to common, will be shared across vaults and strategies
export async function fetchTotalSupply(address?: Address): Promise<bigint | undefined> {
  const queryClient = getQueryClient();

  try {
    const totalSupply = await queryClient.fetchQuery({
      ...readContractQueryOptions(getConfig(), {
        address,
        abi: erc20Abi,
        functionName: "totalSupply",
      }),
    });
    return totalSupply;
  } catch (error) {
    console.error("Error fetching total supply:", error);
    throw new Error(`Error fetching total supply: ${error instanceof Error ? error.message : String(error)}`);
  }
}
