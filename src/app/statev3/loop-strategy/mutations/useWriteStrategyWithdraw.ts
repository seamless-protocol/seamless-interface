import { useConfig, useWriteContract } from "wagmi";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";
import { waitForTransaction } from "../../../../shared/utils/transactionWrapper";
import { useState } from "react";

// todo: replace id with address?
export const useWriteStrategyWithdraw = (subStrategy?: Address) => {
  const config = useConfig();

  const [isPending, setIsPending] = useState(false);
  const { writeContractAsync } = useWriteContract();

  return {
    isPending,
    withdrawAsync: async (shares: bigint, from: Address, receiver: Address, minToReceive: bigint) => {
      setIsPending(true);

      const ret = await waitForTransaction(config, async () => {
        if (!subStrategy) {
          // eslint-disable-next-line no-console
          console.warn("useWriteStrategyWithdraw: subStrategy is undefined.");
          return undefined;
        }

        return writeContractAsync({
          address: subStrategy,
          abi: loopStrategyAbi,
          functionName: "redeem",
          args: [shares, from, receiver, minToReceive],
        });
      });

      setIsPending(false);

      return ret;
    },
  };
};
