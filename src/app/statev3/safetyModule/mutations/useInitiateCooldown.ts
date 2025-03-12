import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { stakedTokenAbi } from "@generated";
import { stakedSeamAddress } from "@meta";

export const useInitiateCooldown = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    hideDefaultErrorOnNotification: true,
    queriesToInvalidate: [undefined], // todo: add propery query invalidation, instead of invalidating all
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const startCooldownAsync = async (settings?: SeamlessWriteAsyncParams) => {
    try {
      await writeContractAsync(
        {
          address: stakedSeamAddress,
          abi: stakedTokenAbi,
          functionName: "cooldown",
          args: [],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to initiate cooldown", error);
      showNotification({
        status: "error",
        content: `Failed to unstake: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isResultPending: rest.isPending, startCooldownAsync };
};
