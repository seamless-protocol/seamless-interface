// Fetch function
import axios from "axios";
import { base } from "viem/chains";
import { Address } from "viem";
import { formatFetchBigIntToViewBigInt } from "../../../../shared";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../settings/queryConfig";
import { extendAndMapMorphoRewards, pricePrecision } from "../mappers/extendAndMapMorphoRewards";
import { MorphoQueryKeys } from "../query-keys";
import { FetchUserRewardsResponse } from "../types/UserReward";

const BASE_URL = "https://rewards.morpho.org/v1";

export const fetchFullhRawMorphoUserRewardsQueryOptions = (userAddress: string, chainId: number) => ({
  queryKey: MorphoQueryKeys.rawMorphoUserRewards(userAddress, chainId),
  queryFn: async () => {
    const url = `${BASE_URL}/users/${userAddress}/rewards?chain_id=${chainId}`;
    const response = await axios.get<FetchUserRewardsResponse>(url);

    return response.data;
  },
});

export async function fetchRawMorphoUserRewards(
  userAddress: Address,
  chainId = base.id
): Promise<FetchUserRewardsResponse> {
  const client = getQueryClient();

  const response = await client.fetchQuery({
    ...fetchFullhRawMorphoUserRewardsQueryOptions(userAddress, chainId),
    ...queryConfig.morphoDataQueryConfig,
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
