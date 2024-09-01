import { Address } from "viem";
import { loopStrategyAbi } from "@generated";
import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";

export const useWriteStrategyWithdraw = (strategy?: Address) => {
  const { writeContractAsync, ...rest } = useSeamlessContractWrite();

  const withdrawAsync = async (
    args: {
      shares: bigint | undefined;
      from: Address;
      receiver: Address;
      minToReceive: bigint;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    if (!strategy) {
      // eslint-disable-next-line no-console
      console.warn("strategy is undefined.");
      return;
    }

    await writeContractAsync(
      {
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "redeem",
        args: [args.shares!, args.from, args.receiver, args.minToReceive],
      },
      { ...settings }
    );
  };

  return {
    withdrawAsync,
    ...rest,
  };
};
