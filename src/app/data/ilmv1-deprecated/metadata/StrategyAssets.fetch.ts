import { Address } from "viem";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { loopStrategyAbi } from "../../../generated";
import { metadataQueryConfig } from "../../settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";

interface StrategyAssets {
  underlying: Address;
  collateral: Address;
  debt: Address;
}

export async function fetchStrategyAssets(strategy: Address): Promise<StrategyAssets> {
  const assets = await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "getAssets",
    }),
    ...metadataQueryConfig,
  });

  return assets;
}
