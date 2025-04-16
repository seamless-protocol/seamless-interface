import { Address, isAddressEqual } from "viem";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { getConfig } from "../../../../utils/queryContractUtils";
import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";

export interface Powers {
  votingPower: ViewBigInt;
  userVotingPower: ViewBigInt;
  seamTokenPower: ViewBigInt;
  esSEAMTokenPower: ViewBigInt;
  stkseamTokenPower: ViewBigInt;
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

export const getVotesReadContractQueryOptions = (delegatee?: Address, token?: Address) => ({
  ...readContractQueryOptions(getConfig(), {
    address: token,
    abi: StakedTokenAbi,
    functionName: "getVotes",
    args: [delegatee as Address],
  }),
});

export const getAllDelegateeQK = (user?: Address) => [
  delegateeReadContractQueryOptions(user, SEAM_ADDRESS).queryKey,
  delegateeReadContractQueryOptions(user, ESSEAM_ADDRESS).queryKey,
  delegateeReadContractQueryOptions(user, STAKED_SEAM_ADDRESS).queryKey,
];

/**
 * Returns the governance delegated power for the given user across SEAM,
 * esSEAM, and stkSEAM tokens.
 *
 * For each token:
 * 1. Fetch the delegatee address via the `delegates` function.
 * 2. Determine which address to use for fetching votes: if the delegatee is
 *    not the user (case-insensitive), use the delegatee address; otherwise, use the user.
 * 3. Fetch the vote count using `getVotes` on the determined address.
 */
export async function getPowers(user: Address): Promise<Powers> {
  const queryClient = getQueryClient();

  // Fetch delegate addresses concurrently.
  const [seamDelegatee, esSEAMDelegatee, stkseamDelegatee] = await Promise.all([
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
  ]);

  // Fetch votes concurrently using the determined addresses.
  const [seamVotes, esSEAMVotes, stkseamVotes] = await Promise.all([
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(seamDelegatee, SEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(esSEAMDelegatee, ESSEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(stkseamDelegatee, STAKED_SEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
  ]);

  const totalVotes = seamVotes + esSEAMVotes + stkseamVotes;
  const userVotingPower =
    (isAddressEqual(user, seamDelegatee) ? seamVotes : 0n) +
    (isAddressEqual(user, esSEAMDelegatee) ? esSEAMVotes : 0n) +
    (isAddressEqual(user, stkseamDelegatee) ? stkseamVotes : 0n);

  const [seamTokenData, esSEAMTokenData, stkseamTokenData] = await Promise.all([
    fetchToken(SEAM_ADDRESS),
    fetchToken(ESSEAM_ADDRESS),
    fetchToken(STAKED_SEAM_ADDRESS),
  ]);

  const result: Powers = {
    votingPower: formatFetchBigIntToViewBigInt({
      decimals: seamTokenData.decimals,
      bigIntValue: totalVotes,
    }),
    userVotingPower: formatFetchBigIntToViewBigInt({
      decimals: seamTokenData.decimals,
      bigIntValue: userVotingPower,
    }),
    seamTokenPower: formatFetchBigIntToViewBigInt({
      ...seamTokenData,
      bigIntValue: seamVotes,
    }),
    esSEAMTokenPower: formatFetchBigIntToViewBigInt({
      ...esSEAMTokenData,
      bigIntValue: esSEAMVotes,
    }),
    stkseamTokenPower: formatFetchBigIntToViewBigInt({
      ...stkseamTokenData,
      bigIntValue: stkseamVotes,
    }),
    seamVotingDelegatee: seamDelegatee,
    esSEAMVotingDelegatee: esSEAMDelegatee,
    stkseamVotingDelegatee: stkseamDelegatee,
  };

  return result;
}
