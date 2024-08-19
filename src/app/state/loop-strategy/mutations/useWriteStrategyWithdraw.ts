import { Address } from "viem";
import { loopStrategyAbi } from "@generated";
import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";

// todo: replace id with address?
export const useWriteStrategyWithdraw = (subStrategy?: Address) => {
  const { writeContractAsync, ...rest } = useSeamlessContractWrite();

  const withdrawAsync = async (
    args: {
      shares: bigint | undefined, from: Address, receiver: Address, minToReceive: bigint
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    if (!subStrategy) {
      // eslint-disable-next-line no-console
      console.warn("subStrategy is undefined.");
      return;
    }

    await writeContractAsync(
      {
        address: subStrategy,
        abi: loopStrategyAbi,
        functionName: "redeem",
        args: [
          args.shares!,
          args.from,
          args.receiver,
          args.minToReceive
        ],
      },
      { ...settings }
    );
  };

  return {
    withdrawAsync,
    ...rest
  };
};
