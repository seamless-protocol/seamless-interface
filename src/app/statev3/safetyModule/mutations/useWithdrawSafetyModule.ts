import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { stakedTokenConfig } from "@generated";
import { useAccount } from "wagmi";

export const useWithdrawSafetyModule = () => {
  

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({});
  const account = useAccount();
    const { address } = account;

  // mutation wrapper
  const unstakeAsync = async (
    args: {
      amount: bigint | undefined;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    

    await writeContractAsync(
      {
        ...stakedTokenConfig,
        functionName: "redeem",
        args: [args.amount, address, address],
      },
      { ...settings }
    );
  };

  return { ...rest, isWithdrawPending: rest.isPending, unstakeAsync };
};
