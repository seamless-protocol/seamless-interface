import { useWriteContract } from "wagmi";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";

export const useWriteStrategyWithdraw = (id: number) => {
  const strategyConfig = ilmStrategies[id];
  const { isPending, isSuccess, writeContract } = useWriteContract();

  return {
    isPending,
    isSuccess,
    withdraw: async (
      shares: bigint,
      from: Address,
      receiver: Address,
      minToReceive: bigint
    ) => {
      writeContract({
        address: strategyConfig.address,
        abi: loopStrategyAbi,
        functionName: "redeem",
        args: [shares, from, receiver, minToReceive],
      });
    },
  };
};
