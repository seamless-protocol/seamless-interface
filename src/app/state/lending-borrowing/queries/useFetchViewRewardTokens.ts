import { Address } from "viem";
import { useSeamlessContractRead } from "../../../../shared";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";

export const useFetchViewRewardTokens = (asset?: Address) => {
  return useSeamlessContractRead({
    address: rewardsControllerAddress,
    abi: rewardsControllerAbi,
    functionName: "getRewardsByAsset",
    args: [asset!],
    query: {
      enabled: !!asset,
    },
  });
};
