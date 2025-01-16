// Fetch function
import axios from "axios";
import { Address } from "viem";
import { base } from "viem/chains";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { FetchUserRewardsResponse } from "../types/UserReward";

const BASE_URL = "https://rewards.morpho.org/v1";

export async function fetchMorphoUserDistributions(
  userAddress: Address,
  chainId = base.id
): Promise<FetchUserRewardsResponse> {
  const client = getQueryClient();

  const response = await client.fetchQuery({
    queryKey: ["fetchMorphoUserDistributions", userAddress, chainId],
    queryFn: async () => {
      const url = `${BASE_URL}/users/${userAddress}/distributions?chain_id=${chainId}`;
      const response = await axios.get<FetchUserRewardsResponse>(url);

      return response.data;
    },
  });

  return response;
}