import { useConfig, useWriteContract } from "wagmi";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";
import { waitForTransaction } from "../../../../shared/utils/transactionWrapper";

export const useWriteStrategyDeposit = (id: number) => {
  const strategyConfig = ilmStrategies[id];
  const config = useConfig();
  const { isPending, writeContractAsync } = useWriteContract();

  return {
    isPending,
    depositAsync: async (amount: bigint, address: Address, shares: bigint) => {
      return waitForTransaction(config, async () => {
        return writeContractAsync({
          address: strategyConfig.address,
          abi: loopStrategyAbi,
          functionName: "deposit",
          args: [amount, address, shares],
        });
      });
    },
  };
};
