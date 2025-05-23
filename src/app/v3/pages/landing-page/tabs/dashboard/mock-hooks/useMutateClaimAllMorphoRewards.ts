import { Address } from "viem";
import { SeamlessWriteAsyncParams } from "@shared";
import { REWARDS_MOCK_ITEMS } from "../contexts/RewardsProvider.mock";
import { type RewardItem } from "../contexts/RewardsProvider";

export const useMutateClaimAllMorphoRewards = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  return {
    ...REWARDS_MOCK_ITEMS[1],
    claimAllAsync: (txHash = "0x134" as Address) => {
      const isError = Math.random() > 0.99;
      if (isError) {
        settings?.onError?.(new Error("Failed to claim rewards"));
      } else {
        settings?.onSuccess?.(txHash as Address);
      }
      return txHash;
    },
    isClaiming: false,
  };
};
