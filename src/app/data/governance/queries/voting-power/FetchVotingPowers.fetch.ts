import { Address } from "viem";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { getConfig } from "../../../../utils/queryContractUtils";
import { queryConfig } from "../../../settings/queryConfig";

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
  esSeamDelegatedVotingPower: ViewBigInt;
  stkSeamDelegatedVotingPower: ViewBigInt;
}

export async function getVotingPowers(
  seamVotingPowerUserAddress: Address,
  esSeamVotingPowerUserAddress: Address,
  stkSeamVotingPowerUserAddress: Address
): Promise<Powers> {
  const queryClient = getQueryClient();

  const [seamVotes, esSeamVotes, stkSeamVotes] = await Promise.all([
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(seamVotingPowerUserAddress, SEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(esSeamVotingPowerUserAddress, ESSEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
    queryClient.fetchQuery({
      ...getVotesReadContractQueryOptions(stkSeamVotingPowerUserAddress, STAKED_SEAM_ADDRESS),
      ...queryConfig.semiSensitiveDataQueryConfig,
    }),
  ]);

  const totalVotes = seamVotes + esSeamVotes + stkSeamVotes;

  const [seamTokenData, esSeamTokenData, stkSeamTokenData] = await Promise.all([
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
    esSeamDelegatedVotingPower: formatFetchBigIntToViewBigInt({
      ...esSeamTokenData,
      bigIntValue: esSeamVotes,
    }),
    stkSeamDelegatedVotingPower: formatFetchBigIntToViewBigInt({
      ...stkSeamTokenData,
      bigIntValue: stkSeamVotes,
    }),
  };

  return result;
}
