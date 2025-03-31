import { Address } from "viem";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { readContract } from "wagmi/actions";
import { getConfig } from "../../../../utils/queryContractUtils";
import { IS_DEV_MODE } from "../../../../../globals";
import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";

export interface Powers {
  votingPower: ViewBigInt;
  seamTokenPower: ViewBigInt;
  esSEAMTokenPower: ViewBigInt;
  stkseamTokenPower: ViewBigInt;
  seamVotingDelegatee: Address;
  esSEAMVotingDelegatee: Address;
  stkseamVotingDelegatee: Address;
}

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
  const config = getConfig();

  // Fetch delegate addresses concurrently.
  const [seamDelegatee, esSEAMDelegatee, stkseamDelegatee] = await Promise.all([
    readContract(config, {
      address: SEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "delegates",
      args: [user],
    }),
    readContract(config, {
      address: ESSEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "delegates",
      args: [user],
    }),
    readContract(config, {
      address: IS_DEV_MODE ? SEAM_ADDRESS : STAKED_SEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "delegates",
      args: [user],
    }),
  ]);

  // Determine the address from which to read votes for each token.
  const seamVotesAddress =
    (seamDelegatee as string).toLowerCase() === user.toLowerCase() ? user : (seamDelegatee as string);
  const esSEAMVotesAddress =
    (esSEAMDelegatee as string).toLowerCase() === user.toLowerCase() ? user : (esSEAMDelegatee as string);
  const stkseamVotesAddress =
    (stkseamDelegatee as string).toLowerCase() === user.toLowerCase() ? user : (stkseamDelegatee as string);

  // Fetch votes concurrently using the determined addresses.
  const [seamVotes, esSEAMVotes, stkseamVotes] = await Promise.all([
    readContract(config, {
      address: SEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "getVotes",
      args: [seamVotesAddress as Address],
    }),
    readContract(config, {
      address: ESSEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "getVotes",
      args: [esSEAMVotesAddress as Address],
    }),
    readContract(config, {
      address: IS_DEV_MODE ? SEAM_ADDRESS : STAKED_SEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "getVotes",
      args: [stkseamVotesAddress as Address],
    }),
  ]);

  // Ensure votes are treated as bigint.
  const seamVotesBig = seamVotes as bigint;
  const esSEAMVotesBig = esSEAMVotes as bigint;
  const stkseamVotesBig = stkseamVotes as bigint;

  const totalVotes = seamVotesBig + esSEAMVotesBig + stkseamVotesBig;

  const tokenData = await fetchToken(SEAM_ADDRESS);

  const result: Powers = {
    votingPower: formatFetchBigIntToViewBigInt({
      ...tokenData,
      bigIntValue: totalVotes,
    }),
    seamTokenPower: formatFetchBigIntToViewBigInt({
      ...tokenData,
      bigIntValue: seamVotesBig,
    }),
    esSEAMTokenPower: formatFetchBigIntToViewBigInt({
      ...tokenData,
      bigIntValue: esSEAMVotesBig,
    }),
    stkseamTokenPower: formatFetchBigIntToViewBigInt({
      ...tokenData,
      bigIntValue: stkseamVotesBig,
    }),
    seamVotingDelegatee: seamDelegatee,
    esSEAMVotingDelegatee: esSEAMDelegatee,
    stkseamVotingDelegatee: stkseamDelegatee,
  };

  return result;
}
