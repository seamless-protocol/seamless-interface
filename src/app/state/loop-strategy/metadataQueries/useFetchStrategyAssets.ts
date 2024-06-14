import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { useSeamlessContractRead } from "../../../../shared";
import { metadataQueryConfig } from "../../settings/queryConfig";

export const useFetchStrategyAssets = (strategy?: Address) => {
  return useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getAssets",
    query: {
      ...metadataQueryConfig,
      enabled: !!strategy,
    },
  });
};
