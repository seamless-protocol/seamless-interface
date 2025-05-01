import { Address } from "viem";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { getConfig } from "../../../../utils/queryContractUtils";

export const getVotesReadContractQueryOptions = (delegatee?: Address, token?: Address) => ({
  ...readContractQueryOptions(getConfig(), {
    address: token,
    abi: StakedTokenAbi,
    functionName: "getVotes",
    args: [delegatee as Address],
  }),
});

export interface Powers {
  totalVotingPower: ViewBigInt;
  seamDelegatedVotingPower: ViewBigInt;
  esSEAMDelegatedVotingPower: ViewBigInt;
  stkseamDelegatedVotingPower: ViewBigInt;
}

export async function getVotingPowers(
  SEAMVotingPowerUserAddress: Address,
  esSEAMVotingPowerUserAddress: Address,
  stkSEAMVotingPowerUserAddress: Address
): Promise<Powers> {
  const queryClient = getQueryClient();

  const [seamVotes, esSEAMVotes, stkseamVotes] = await Promise.all([
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(SEAMVotingPowerUserAddress, SEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(esSEAMVotingPowerUserAddress, ESSEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(stkSEAMVotingPowerUserAddress, STAKED_SEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
  ]);

  const totalVotes = seamVotes + esSEAMVotes + stkseamVotes;

  const [seamTokenData, esSEAMTokenData, stkseamTokenData] = await Promise.all([
    fetchToken(SEAM_ADDRESS),
    fetchToken(ESSEAM_ADDRESS),
    fetchToken(STAKED_SEAM_ADDRESS),
  ]);

  const result: Powers = {
    totalVotingPower: formatFetchBigIntToViewBigInt({
      decimals: seamTokenData.decimals,
      bigIntValue: totalVotes,
    }),
    seamDelegatedVotingPower: formatFetchBigIntToViewBigInt({
      ...seamTokenData,
      bigIntValue: seamVotes,
    }),
    esSEAMDelegatedVotingPower: formatFetchBigIntToViewBigInt({
      ...esSEAMTokenData,
      bigIntValue: esSEAMVotes,
    }),
    stkseamDelegatedVotingPower: formatFetchBigIntToViewBigInt({
      ...stkseamTokenData,
      bigIntValue: stkseamVotes,
    }),
  };

  return result;
}
