import { Address } from "viem";
import { getQueryClient } from "../../contexts/CustomQueryClientProvider";
import { loopStrategyAbi } from "../../generated";
import { readContractQueryOptions } from "wagmi/query";
import { config } from "../../config/rainbow.config";

export async function fetchStrategyAssets(strategy: Address): Promise<{
  underlying: Address | undefined;
  collateral: Address | undefined;
  debt: Address | undefined;
}> {
  const queryClient = getQueryClient();

  return await queryClient.fetchQuery(
    readContractQueryOptions(config, {
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "getAssets",
    })
  );
}
