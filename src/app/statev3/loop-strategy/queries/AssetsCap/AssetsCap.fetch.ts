import { Address } from "viem";
import { loopStrategyAbi } from "@generated";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { getConfig } from "../../../../utils/queryContractUtils";
import { queryConfig } from "../../../settings/queryConfig";

// consider this lib for fetching: https://www.npmjs.com/package/ethers-types
export async function fetchAssetsCap(address?: Address): Promise<bigint | undefined> {
  const queryClient = getQueryClient();

  try {
    const assetsCap = await queryClient.fetchQuery({
      ...readContractQueryOptions(getConfig(), {
        address,
        abi: loopStrategyAbi,
        functionName: "getAssetsCap",
      }),
      ...queryConfig.metadataQueryConfig,
    });

    // Format and return the assets cap using the helper function
    return assetsCap;
  } catch (error) {
    console.error("Error fetching assets cap:", error);
    throw new Error(`Error fetching assets cap: ${error instanceof Error ? error.message : String(error)}`);
  }
}
