import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { safetyModuleRewardController } from "@meta";
import { rewardsControllerAbi } from "@generated";
import { rewardsAccruingAssets } from "../../settings/config";
import { useAccount } from "wagmi";
import { fetchBalanceQueryOptions } from "../../common/queries/useFetchViewAssetBalance";
import {
  useFetchViewAllUserRewards,
  fetchGetAllUserRewardsHookQK,
  fetchGetAllUserRewardsQueryOptions,
} from "../../common/hooks/useFetchViewAllUserRewards";
import { targetChain } from "../../../config/rainbow.config";

export const useMutateClaimAllRewards = (settings?: SeamlessWriteAsyncParams) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();
  const { address } = useAccount();

  /* ------------- */
  /*   Query keys  */
  /* ------------- */
  const { data: allUsersRewards } = useFetchViewAllUserRewards(rewardsAccruingAssets);

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    ...settings,
    queriesToInvalidate: [
      fetchGetAllUserRewardsHookQK(rewardsAccruingAssets, address),
      fetchGetAllUserRewardsQueryOptions(address!, rewardsAccruingAssets).queryKey,
      allUsersRewards?.rewards?.map((reward) => fetchBalanceQueryOptions(address!, reward.address).queryKey),
    ],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const claimAllAsync = async () => {
    let txHash;
    try {
      txHash = await writeContractAsync({
        chainId: targetChain.id,
        address: safetyModuleRewardController,
        abi: rewardsControllerAbi,
        functionName: "claimAllRewardsToSelf",
        args: [rewardsAccruingAssets],
      });
    } catch (error) {
      console.error("Failed to claim rewards", error);
      showNotification({
        status: "error",
        content: `Failed to claim rewards: ${getParsedError(error)}`,
      });
    }
    return txHash;
  };

  return { ...rest, isClaimAllPending: rest.isPending, claimAllAsync };
};
