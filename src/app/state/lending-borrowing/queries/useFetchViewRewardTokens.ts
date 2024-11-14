import { Address } from "viem";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { useReadContract } from "wagmi";

export const useFetchViewRewardTokens = (asset?: Address) => {
  return useReadContract({
    address: rewardsControllerAddress,
    abi: rewardsControllerAbi,
    functionName: "getRewardsByAsset",
    args: [asset!],
    query: {
      enabled: !!asset,
    },
  });
};
