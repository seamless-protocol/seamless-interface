import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { targetChain } from "../../../config/rainbow.config";
import { useAccount } from "wagmi";
import { ESSEAM_ADDRESS, generateInvalidationKeys, SEAM_ADDRESS } from "@meta";
import { EscrowSEAMAbi } from "../../../../../abis/EscrowSEAM";
import { fetchVestedSeamQueryOptions } from "../queries/vested-seam/FetchVetchVestedSeam.fetch";
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
      fetchVestedSeamQueryOptions(userAddress!).queryKey
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
          abi: EscrowSEAMAbi,
          functionName: "claim",
          args: [userAddress],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to claim vested SEAM.", error);
      showNotification({
        status: "error",
        content: `Failed to claim vested SEAM: ${getParsedError(error)}`,
      });
    }
  };

  return {
    claimVestedAsync,
    isClaimVestedPending: isPending,
    ...rest,
  };
};
