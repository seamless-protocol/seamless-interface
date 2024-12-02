import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { metadataQueryConfig } from "../../../statev3/settings/queryConfig";
import { useReadContract } from "wagmi";

export const useFetchStrategyAssets = (strategy?: Address) => {
  return useReadContract({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getAssets",
    query: {
      ...metadataQueryConfig,
      enabled: !!strategy,
    },
  });
};
