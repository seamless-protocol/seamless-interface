import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { Address, zeroAddress } from "viem";
import { StakedTokenAbi } from "../../../../../abis/StakedToken";

export const useMutateDelegate = (isRevoking?: boolean) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();

  /* -------------------- */
  /*   Query cache keys   */
  /* -------------------- */
  // todo ?

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    // array of query keys to invalidate, when mutation happens!
    queriesToInvalidate: [undefined], // todo: proper invalidation
    hideDefaultErrorOnNotification: true,
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const delegateAsync = async (
    // ui arguments
    args: {
      delegatee: Address | undefined;
      token: Address | undefined;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    try {
      const { delegatee, token } = args;

      if (!token) throw new Error("Token address is not found. Something went wrong. Contact support.");
      if (!delegatee && !isRevoking) throw new Error("Delegatee address is not entered.");

      const finalDelegatee = isRevoking ? zeroAddress : delegatee;
      if (!finalDelegatee) throw new Error("Delegatee address is not entered. Something went wrong. Contact support.");

      await writeContractAsync(
        {
          address: token,
          abi: StakedTokenAbi,
          functionName: "delegate",
          args: [finalDelegatee],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to delegate voting power.", error);
      showNotification({
        status: "error",
        content: `Failed to delegate voting power: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isDelegationPending: rest.isPending, delegateAsync };
};
