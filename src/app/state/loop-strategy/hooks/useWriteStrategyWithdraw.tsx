import { useConfig, useWriteContract } from "wagmi";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";
import { waitForTransaction } from "../../../../shared/utils/transactionWrapper";

export const useWriteStrategyWithdraw = (id: number) => {
  const strategyConfig = ilmStrategies[id];
  const config = useConfig();
  const { isPending, writeContractAsync } = useWriteContract();

  return {
    isPending,
    withdrawAsync: async (
      shares: bigint,
      from: Address,
      receiver: Address,
      minToReceive: bigint
    ) => {
      return waitForTransaction(config, async () => {
        return writeContractAsync({
          address: strategyConfig.address,
          abi: loopStrategyAbi,
          functionName: "redeem",
          args: [shares, from, receiver, minToReceive],
        });
      });
    },
  };
};
