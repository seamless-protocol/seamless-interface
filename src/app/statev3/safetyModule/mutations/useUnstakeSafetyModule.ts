import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { stakedTokenAbi } from "@generated";
import { useAccount } from "wagmi";
import { SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { fetchBalanceQueryOptions, fetchBalanceHookQK } from "../../common/queries/useFetchViewAssetBalance";
import { targetChain } from "../../../config/rainbow.config";

export const useUnstakeSafetyModule = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address } = useAccount();
  const { showNotification } = useNotificationContext();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    hideDefaultErrorOnNotification: true,
    queriesToInvalidate: [
      fetchBalanceQueryOptions(STAKED_SEAM_ADDRESS, address!).queryKey,
      fetchBalanceHookQK(STAKED_SEAM_ADDRESS, address),
      fetchBalanceQueryOptions(SEAM_ADDRESS, address!).queryKey,
      fetchBalanceHookQK(SEAM_ADDRESS, address),
    ],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const unstakeAsync = async (
    args: {
      amount: bigint | undefined;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    try {
      const { amount } = args;
      if (!amount) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!address) throw new Error("Account address is not found. Please re-connect your wallet.");

      await writeContractAsync(
        {
          chainId: targetChain.id,
          address: STAKED_SEAM_ADDRESS,
          abi: stakedTokenAbi,
          functionName: "redeem",
          args: [amount, address, address],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to unstake", error);
      showNotification({
        status: "error",
        content: `Failed to unstake: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isWithdrawPending: rest.isPending, unstakeAsync };
};
