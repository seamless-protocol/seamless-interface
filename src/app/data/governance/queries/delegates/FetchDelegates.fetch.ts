import { Address, isAddressEqual, zeroAddress } from "viem";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { getConfig } from "../../../../utils/queryContractUtils";
import { FetchBigInt, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { getVotingPowers } from "../voting-power/FetchVotingPowers.fetch";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchBalanceQueryOptions, fetchAssetBalance } from "../../../common/queries/useFetchViewAssetBalance";

export interface Powers {
  userVotingPower: ViewBigInt;
  seamDelegatedVotingPower: ViewBigInt;
  esSeamDelegatedVotingPower: ViewBigInt;
  stkSeamDelegatedVotingPower: ViewBigInt;
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
  fetchBalanceQueryOptions(SEAM_ADDRESS, user!)?.queryKey,
  fetchBalanceQueryOptions(ESSEAM_ADDRESS, user!)?.queryKey,
  fetchBalanceQueryOptions(STAKED_SEAM_ADDRESS, user!)?.queryKey,
];

function hasDelegate(d?: Address) {
  return d && !isAddressEqual(d, zeroAddress);
}

function getDelegateVoringPowerFormatted(delegeteeAddress: Address, balance: FetchBigInt | undefined) {
  if (hasDelegate(delegeteeAddress)) {
    return formatFetchBigIntToViewBigInt(balance);
  }
  return formatFetchBigIntToViewBigInt({
    decimals: balance?.decimals,
    symbol: balance?.symbol,
    bigIntValue: 0n,
  });
}

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
  const [
    seamVotingDelegatee,
    esSEAMVotingDelegatee,
    stkseamVotingDelegatee,
    seamBalance,
    esSeamBalance,
    stkSeamBalance,
  ] = await Promise.all([
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
    fetchAssetBalance(STAKED_SEAM_ADDRESS, user),
  ]);
  const { totalVotingPower: userVotingPower } = await getVotingPowers(user, user, user);

  const result: Powers = {
    userVotingPower,
    seamDelegatedVotingPower: getDelegateVoringPowerFormatted(seamVotingDelegatee, seamBalance),
    esSeamDelegatedVotingPower: getDelegateVoringPowerFormatted(esSEAMVotingDelegatee, esSeamBalance),
    stkSeamDelegatedVotingPower: getDelegateVoringPowerFormatted(stkseamVotingDelegatee, stkSeamBalance),
    seamVotingDelegatee,
    esSEAMVotingDelegatee,
    stkseamVotingDelegatee,
  };

  return result;
}
