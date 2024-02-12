import { useWriteContract } from "wagmi";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";

export const useWriteStrategyWithdraw = (id: number) => {
  const strategyConfig = ilmStrategies[id];
  const { isPending, isSuccess, writeContractAsync } = useWriteContract();

  return {
    isPending,
    isSuccess,
    withdrawAsync: async (
      shares: bigint,
      from: Address,
      receiver: Address,
      minToReceive: bigint
    ) => {
      return await writeContractAsync({
        address: strategyConfig.address,
        abi: loopStrategyAbi,
        functionName: "redeem",
        args: [shares, from, receiver, minToReceive],
      });
    },
  };
};
