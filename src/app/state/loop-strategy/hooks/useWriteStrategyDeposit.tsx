import { useWriteContract } from "wagmi";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";

export const useWriteStrategyDeposit = (id: number) => {
  const strategyConfig = ilmStrategies[id];
  const { isPending, isSuccess, writeContractAsync } = useWriteContract();

  return {
    isPending,
    isSuccess,
    depositAsync: async (amount: bigint, address: Address, shares: bigint) => {
      writeContractAsync({
        address: strategyConfig.address,
        abi: loopStrategyAbi,
        functionName: "deposit",
        args: [amount, address, shares],
      });
    },
  };
};
