import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { stakedTokenConfig } from "@generated";

export const useInitiateCooldown = () => {
  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({});
  
  // mutation wrapper
  const startCooldownAsync = async (
    
    settings?: SeamlessWriteAsyncParams
  ) => {
    

    await writeContractAsync(
      {
        ...stakedTokenConfig,
        functionName: "cooldown",
        args: [],
      },
      { ...settings }
    );
  };

  return { ...rest, isWithdrawPending: rest.isPending, startCooldownAsync };
};
