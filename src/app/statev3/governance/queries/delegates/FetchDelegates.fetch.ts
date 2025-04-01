import { Address } from "viem";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { readContract } from "wagmi/actions";
import { getConfig } from "../../../../utils/queryContractUtils";
import { IS_DEV_MODE } from "../../../../../globals";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";

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

  // Fetch votes concurrently using the determined addresses.
  const [seamVotes, esSEAMVotes, stkseamVotes] = await Promise.all([
    readContract(config, {
      address: SEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "getVotes",
      args: [seamDelegatee as Address],
    }),
    readContract(config, {
      address: ESSEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "getVotes",
      args: [esSEAMDelegatee as Address],
    }),
    readContract(config, {
      address: IS_DEV_MODE ? SEAM_ADDRESS : STAKED_SEAM_ADDRESS,
      abi: StakedTokenAbi,
      functionName: "getVotes",
      args: [stkseamDelegatee as Address],
    }),
  ]);

  const totalVotes = seamVotes + esSEAMVotes + stkseamVotes;

  const result: Powers = {
    votingPower: formatFetchBigIntToViewBigInt({
      bigIntValue: totalVotes,
    }),
    seamTokenPower: formatFetchBigIntToViewBigInt({
      bigIntValue: seamVotes,
    }),
    esSEAMTokenPower: formatFetchBigIntToViewBigInt({
      bigIntValue: esSEAMVotes,
    }),
    stkseamTokenPower: formatFetchBigIntToViewBigInt({
      bigIntValue: stkseamVotes,
    }),
    seamVotingDelegatee: seamDelegatee,
    esSEAMVotingDelegatee: esSEAMDelegatee,
    stkseamVotingDelegatee: stkseamDelegatee,
  };

  return result;
}
