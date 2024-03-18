import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { useSeamlessContractRead } from "../../../../shared";
import { metadataQueryConfig } from "../../settings/config";

export const useFetchStrategyAsset = (strategy: Address) => {
  return useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "asset",
    query: metadataQueryConfig,
  });
};
