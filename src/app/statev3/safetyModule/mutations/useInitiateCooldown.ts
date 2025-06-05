import { STAKED_SEAM_ADDRESS } from "@meta";
import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { useAccount } from "wagmi";
import { StakedTokenAbi } from "../../../../../abis/StakedToken";
import { targetChain } from "../../../config/rainbow.config";
import { fetchCooldownQK } from "../hooks/useFetchCooldown";
import { fetchStakerCooldownQK } from "../hooks/useFetchStakerCooldown";

export const useInitiateCooldown = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();
  const { address } = useAccount();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [fetchStakerCooldownQK(STAKED_SEAM_ADDRESS, address), fetchCooldownQK(address)],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const startCooldownAsync = async (settings?: SeamlessWriteAsyncParams) => {
    try {
      await writeContractAsync(
        {
          chainId: targetChain.id,
          address: STAKED_SEAM_ADDRESS,
          abi: StakedTokenAbi,
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
