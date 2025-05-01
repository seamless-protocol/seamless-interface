import { Address } from "viem";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { getConfig } from "../../../../utils/queryContractUtils";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";
import { getVotingPowers } from "../voting-power/FetchVotingPowers.fetch";
import { fetchAssetBalance } from "../../../common/queries/useFetchViewAssetBalance";

export interface Powers {
  votingPower: ViewBigInt;
  userVotingPower: ViewBigInt;
  seamDelegatedVotingPower: ViewBigInt;
  esSEAMDelegatedVotingPower: ViewBigInt;
  stkseamDelegatedVotingPower: ViewBigInt;
  seamVotingDelegatee: Address;
  esSEAMVotingDelegatee: Address;
  stkseamVotingDelegatee: Address;
}

export const delegateeReadContractQueryOptions = (user?: Address, token?: Address) => ({
  ...readContractQueryOptions(getConfig(), {
    address: token,
    abi: StakedTokenAbi,
    functionName: "delegates",
    args: [user as Address],
  }),
});

export const getAllDelegateeQK = (user?: Address) => [
  delegateeReadContractQueryOptions(user, SEAM_ADDRESS).queryKey,
  delegateeReadContractQueryOptions(user, ESSEAM_ADDRESS).queryKey,
  delegateeReadContractQueryOptions(user, STAKED_SEAM_ADDRESS).queryKey,
];

/**
 * Fetches and computes governance voting power for a user across SEAM, esSEAM, and stkSEAM tokens.
 *
 * Implementation details:
 * 1. Concurrently read each token’s delegatee via the `delegates(user)` call.
 * 2. Call `getVotingPowers(delegatee1, delegatee2, delegatee3)` to fetch:
 *    - `seamTokenPower`, `esSEAMTokenPower`, `stkseamTokenPower` (per-token delegated power)
 *    - `totalVotingPower` (sum of those three)
 * 3. Call `getVotingPowers(user, user, user)` to get `userVotingPower` (power the user holds directly).
 * 4. Return a `Powers` object with:
 *    - `votingPower`: total delegated power across all tokens
 *    - `userVotingPower`: total direct power of the user
 *    - `seamTokenPower`, `esSEAMTokenPower`, `stkseamTokenPower`
 *    - `seamVotingDelegatee`, `esSEAMVotingDelegatee`, `stkseamVotingDelegatee`
 */
export async function getPowers(user: Address): Promise<Powers> {
  const queryClient = getQueryClient();

  // Fetch delegate addresses concurrently.
  const [seamVotingDelegatee, esSEAMVotingDelegatee, stkseamVotingDelegatee, seamBalance, esSeamBalance] =
    await Promise.all([
      queryClient.fetchQuery({
        ...delegateeReadContractQueryOptions(user, SEAM_ADDRESS),
        ...queryConfig.semiSensitiveDataQueryConfig,
      }),
      queryClient.fetchQuery({
        ...delegateeReadContractQueryOptions(user, ESSEAM_ADDRESS),
        ...queryConfig.semiSensitiveDataQueryConfig,
      }),
      queryClient.fetchQuery({
        ...delegateeReadContractQueryOptions(user, STAKED_SEAM_ADDRESS),
        ...queryConfig.semiSensitiveDataQueryConfig,
      }),
      fetchAssetBalance(SEAM_ADDRESS, user),
      fetchAssetBalance(ESSEAM_ADDRESS, user),
    ]);

  if (seamBalance?.bigIntValue == null || esSeamBalance?.bigIntValue == null) {
    throw new Error("getPowers: Failed to fetch user balance");
  }

  const { seamDelegatedVotingPower, esSEAMDelegatedVotingPower, stkseamDelegatedVotingPower, totalVotingPower } =
    await getVotingPowers(seamVotingDelegatee, esSEAMVotingDelegatee, stkseamVotingDelegatee);

  const result: Powers = {
    votingPower: totalVotingPower,
    userVotingPower: formatFetchBigIntToViewBigInt({
      ...seamBalance,
      bigIntValue: (seamBalance.bigIntValue || 0n) + (esSeamBalance.bigIntValue || 0n),
    }),
    seamDelegatedVotingPower,
    esSEAMDelegatedVotingPower,
    stkseamDelegatedVotingPower,
    seamVotingDelegatee,
    esSEAMVotingDelegatee,
    stkseamVotingDelegatee,
  };

  return result;
}
