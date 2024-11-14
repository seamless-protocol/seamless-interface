import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { metadataQueryConfig } from "../../settings/queryConfig";
import { useReadContract } from "wagmi";

export const useFetchStrategyAsset = (strategy?: Address) => {
  return useReadContract({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "asset",
    query: {
      ...metadataQueryConfig,
      enabled: !!strategy,
    },
  });
};
