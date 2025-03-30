import { Address, erc20Abi } from "viem";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { getConfig } from "../../../../utils/queryContractUtils";
import { queryConfig } from "../../../settings/queryConfig";

export const getTotalSupplyContractQueryOptions = (address?: Address) => {
  return readContractQueryOptions(getConfig(), {
    address,
    abi: erc20Abi,
    functionName: "totalSupply",
  });
};

// erc20 data, goes to common, will be shared across vaults and strategies
export async function fetchTotalSupply(address?: Address): Promise<bigint | undefined> {
  const queryClient = getQueryClient();

  try {
    const totalSupply = await queryClient.fetchQuery({
      ...getTotalSupplyContractQueryOptions(address),
      ...queryConfig.semiSensitiveDataQueryConfig,
    });
    console.log("Total supply fetched:", totalSupply);
    return totalSupply;
  } catch (error) {
    console.error("Error fetching total supply:", error);
    throw new Error(`Error fetching total supply: ${error instanceof Error ? error.message : String(error)}`);
  }
}
