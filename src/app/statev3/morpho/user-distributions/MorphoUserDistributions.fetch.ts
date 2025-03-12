// Fetch function
import axios from "axios";
import { Address } from "viem";
import { base } from "viem/chains";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { FetchMorphoResponse } from "../types/UserDistribution";
import { MorphoQueryKeys } from "../query-keys";

// todo: move this somewhere else
const BASE_URL = "https://rewards.morpho.org/v1";

export async function fetchMorphoUserDistributions(
  userAddress: Address,
  chainId = base.id
): Promise<FetchMorphoResponse> {
  const client = getQueryClient();

  const response = await client.fetchQuery({
    queryKey: MorphoQueryKeys.morphoUserDistributions(userAddress, chainId),
    queryFn: async () => {
      // todo is pagination an issue??
      const url = `${BASE_URL}/users/${userAddress}/distributions?chain_id=${chainId}`;
      const response = await axios.get<FetchMorphoResponse>(url);

      return response.data;
    },
  });

  return response;
}
