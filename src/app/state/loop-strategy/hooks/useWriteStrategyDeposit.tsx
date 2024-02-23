import { useConfig, useWriteContract } from "wagmi";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";
import { waitForTransaction } from "../../../../shared/utils/transactionWrapper";
import { useState } from "react";

export const useWriteStrategyDeposit = (id: number) => {
  const strategyConfig = ilmStrategies[id];
  const config = useConfig();

  const [isPending, setIsPending] = useState(false);
  const { writeContractAsync } = useWriteContract();

  return {
    isPending,
    depositAsync: async (amount: bigint, address: Address, shares: bigint) => {
      setIsPending(true);

      const ret = await waitForTransaction(config, async () => {
        return writeContractAsync({
          address: strategyConfig.address,
          abi: loopStrategyAbi,
          functionName: "deposit",
          args: [amount, address, shares],
        });
      });

      setIsPending(false);

      return ret;
    },
  };
};
