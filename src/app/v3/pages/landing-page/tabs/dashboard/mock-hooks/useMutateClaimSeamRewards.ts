import { Address } from "viem";
import { SeamlessWriteAsyncParams } from "@shared";
import { REWARDS_MOCK_ITEMS } from "../contexts/RewardsProvider.mock";
import { type RewardItem } from "../contexts/RewardsProvider";

export const useMutateClaimSeamRewards = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  return {
    ...REWARDS_MOCK_ITEMS[0],
    claimAllAsync: async (txHash = "0x123" as Address) => {
      const isError = Math.random() > 0.99;
      // wait 2 sec
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
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
