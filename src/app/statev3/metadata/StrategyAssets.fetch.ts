import { Address } from "viem";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { loopStrategyAbi } from "../../generated";
import { metadataQueryConfig } from "../../state/settings/queryConfig";

interface StrategyAssets {
  underlying: Address;
  collateral: Address;
  debt: Address;
}

export async function fetchStrategyAssets(strategy: Address): Promise<StrategyAssets> {
  const assets = await queryContract({
    ...queryOptions({
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "getAssets",
    }),
    ...metadataQueryConfig,
  });

  return assets;
}
