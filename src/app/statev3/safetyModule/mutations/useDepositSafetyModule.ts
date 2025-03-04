import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { stakedTokenConfig } from "@generated";
import { useAccount } from "wagmi";

export const useDepositSafetyModule = () => {
  

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({});
  const account = useAccount();
    const { address } = account;

  // mutation wrapper
  const stakeAsync = async (
    args: {
      amount: bigint | undefined;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    

    await writeContractAsync(
      {
        ...stakedTokenConfig,
        functionName: "deposit",
        args: [args.amount, address],
      },
      { ...settings }
    );
  };

  return { ...rest, isDepositPending: rest.isPending, stakeAsync };
};
