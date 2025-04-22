import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { targetChain } from "../../../config/rainbow.config";
import { useAccount } from "wagmi";
import { ESSEAM_ADDRESS, generateInvalidationKeys, SEAM_ADDRESS } from "@meta";
import { EscroSEAMAbi } from "../../../../../abis/EscroSEAM";
import { fetchSeamRewardsQueryOptions } from "../queries/rewards/FetchSeamRewards.fetch";
import { fetchBalanceQueryOptions } from "../../common/queries/useFetchViewAssetBalance";

export const useMutateClaimVestedEsSEAM = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address: userAddress } = useAccount();
  const { showNotification } = useNotificationContext();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, isPending, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: generateInvalidationKeys(
      fetchBalanceQueryOptions(SEAM_ADDRESS, userAddress!).queryKey,
      fetchBalanceQueryOptions(ESSEAM_ADDRESS, userAddress!).queryKey,
      fetchSeamRewardsQueryOptions(userAddress!).queryKey
    ),
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const claimVestedAsync = async (settings?: SeamlessWriteAsyncParams) => {
    try {
      if (!userAddress) throw new Error("Wallet not connected");

      await writeContractAsync(
        {
          chainId: targetChain.id,
          address: ESSEAM_ADDRESS,
          abi: EscroSEAMAbi,
          functionName: "claim",
          args: [userAddress],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to claim esSEAM as SEAM rewards.", error);
      showNotification({
        status: "error",
        content: `Failed to claim esSEAM as SEAM rewards: ${getParsedError(error)}`,
      });
    }
  };

  return {
    claimVestedAsync,
    isClaimVestedPending: isPending,
    ...rest,
  };
};
