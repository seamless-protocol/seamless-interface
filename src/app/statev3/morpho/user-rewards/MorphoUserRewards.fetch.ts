// Fetch function
import axios from "axios";
import { FetchUserRewardsResponse } from "../types/UserReward";
import { base } from "viem/chains";
import { Address } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";

const BASE_URL = "https://rewards.morpho.org/v1";

export async function fetchMorphoUserRewards(
  userAddress: Address,
  chainId = base.id
): Promise<FetchUserRewardsResponse> {
  const client = getQueryClient();

  const response = await client.fetchQuery({
    queryKey: ["fetchMorphoUserRewards", userAddress, chainId],
    queryFn: async () => {
      const url = `${BASE_URL}/users/${userAddress}/rewards?chain_id=${chainId}`;
      const response = await axios.get<FetchUserRewardsResponse>(url);

      return response.data;
    },
  });

  return response;
}
