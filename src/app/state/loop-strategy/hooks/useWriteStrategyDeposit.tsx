import { useWriteContract } from "wagmi";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";

export const useWriteStrategyDeposit = (id: number) => {
  const strategyConfig = ilmStrategies[id];
  const { isPending, isSuccess, writeContract } = useWriteContract();

  return {
    isDepositPending: isPending,
    isDepositSuccessful: isSuccess,
    deposit: async (amount: bigint, address: Address, shares: bigint) => {
      writeContract({
        address: strategyConfig.address,
        abi: loopStrategyAbi,
        functionName: "deposit",
        args: [amount, address, shares],
      });
    },
  };
};
