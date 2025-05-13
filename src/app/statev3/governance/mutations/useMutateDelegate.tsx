import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { Address, zeroAddress } from "viem";
import { StakedTokenAbi } from "../../../../../abis/StakedToken";
import { getAllDelegateeQK } from "../queries/delegates/FetchDelegates.fetch";
import { useAccount } from "wagmi";
import { hookFetchGetPowersQK, useFetchDelegates } from "../queries/delegates/FetchDelegates.hook";
import { SEAM_ADDRESS, ESSEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "../../../../meta";
import { targetChain } from "../../../config/rainbow.config";
import { getVotesReadContractQueryOptions } from "../queries/voting-power/FetchVotingPowers.fetch";

export const useMutateDelegate = (isRevoking?: boolean, settings?: SeamlessWriteAsyncParams) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address: user } = useAccount();
  const { showNotification } = useNotificationContext();

  /* ------------- */
  /*   Query keys  */
  /* ------------- */
  const { data: { esSEAMVotingDelegatee, seamVotingDelegatee, stkseamVotingDelegatee } = {} } = useFetchDelegates();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    ...settings,
    queriesToInvalidate: [
      getVotesReadContractQueryOptions(seamVotingDelegatee, SEAM_ADDRESS).queryKey,
      getVotesReadContractQueryOptions(esSEAMVotingDelegatee, ESSEAM_ADDRESS).queryKey,
      getVotesReadContractQueryOptions(stkseamVotingDelegatee, STAKED_SEAM_ADDRESS).queryKey,
      getVotesReadContractQueryOptions(user, SEAM_ADDRESS).queryKey,
      getVotesReadContractQueryOptions(user, ESSEAM_ADDRESS).queryKey,
      getVotesReadContractQueryOptions(user, STAKED_SEAM_ADDRESS).queryKey,
      ...getAllDelegateeQK(user),
      hookFetchGetPowersQK(user),
    ],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const delegateAsync = async (
    // ui arguments
    args: {
      delegatee: Address | undefined;
      token: Address | undefined;
    }
  ) => {
    try {
      const { delegatee, token } = args;

      if (!token) throw new Error("Token address is not found. Something went wrong. Contact support.");
      if (!delegatee && !isRevoking) throw new Error("Delegatee address is not entered.");

      const finalDelegatee = isRevoking ? zeroAddress : delegatee;
      if (!finalDelegatee) throw new Error("Delegatee address is not entered. Something went wrong. Contact support.");

      await writeContractAsync({
        chainId: targetChain.id,
        address: token,
        abi: StakedTokenAbi,
        functionName: "delegate",
        args: [finalDelegatee],
      });
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
