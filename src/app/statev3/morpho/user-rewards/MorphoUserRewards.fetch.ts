// Fetch function
import axios from "axios";
import { FetchUserRewardsResponse } from "../types/UserReward";
import { base } from "viem/chains";
import { Address } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { extendAndMapMorphoRewards, pricePrecision } from "../mappers/extendAndMapMorphoRewards";
import { formatFetchBigIntToViewBigInt } from "../../../../shared";

const BASE_URL = "https://rewards.morpho.org/v1";

export const MORPHO_USER_REWARDS_QUERY_KEY = "fetchMorphoUserRewards";
export const getFetchRawMorphoUserRewardsQueryKey = (userAddress?: Address, chainId = base.id) => [
  MORPHO_USER_REWARDS_QUERY_KEY,
  userAddress,
  chainId,
];

export async function fetchRawMorphoUserRewards(
  userAddress: Address,
  chainId = base.id
): Promise<FetchUserRewardsResponse> {
  const client = getQueryClient();

  const response = await client.fetchQuery({
    queryKey: [getFetchRawMorphoUserRewardsQueryKey(userAddress, chainId)],
    queryFn: async () => {
      const url = `${BASE_URL}/users/${userAddress}/rewards?chain_id=${chainId}`;
      const response = await axios.get<FetchUserRewardsResponse>(url);

      return response.data;
    },
  });

  return response;
}

export async function fetchMorphoExtendedMappedUserRewards(userAddress: Address, chainId = base.id) {
  const rewardsResponse = await fetchRawMorphoUserRewards(userAddress, chainId);
  const extendedRewards = await extendAndMapMorphoRewards(rewardsResponse);
  const totalUsdValue = extendedRewards?.reduce(
    (acc, reward) => acc + (reward?.combinedClaimableNowUsd?.bigIntValue || 0n),
    0n
  );
  const totalUsdInTheFuture = extendedRewards?.reduce(
    (acc, reward) => acc + (reward?.combinedClaimableNextUsd?.bigIntValue || 0n),
    0n
  );

  return {
    rewards: extendedRewards,
    combinedClaimableNowViewValue: formatFetchBigIntToViewBigInt({
      bigIntValue: totalUsdValue,
      decimals: pricePrecision,
      symbol: "$",
    }),
    combinedClaimableNextViewValue: formatFetchBigIntToViewBigInt({
      bigIntValue: totalUsdInTheFuture,
      decimals: pricePrecision,
      symbol: "$",
    }),
    totalUsdValue,
  };
}
