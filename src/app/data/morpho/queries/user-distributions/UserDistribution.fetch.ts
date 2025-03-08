import axios from "axios";
import { Address } from "viem";
import { base } from "viem/chains";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { FetchMorphoResponse } from "./UserDistribution.type";
import { MorphoQueryKeys } from "../../query-keys";
import { queryConfig } from "../../../../statev3/settings/queryConfig";

// todo: move this somewhere else
const BASE_URL = "https://rewards.morpho.org/v1";

export const fetchMorphoUserDistributionsQueryOptions = (userAddress: string, chainId: number) => ({
  queryKey: MorphoQueryKeys.morphoUserDistributions(userAddress, chainId),
  queryFn: async () => {
    const url = `${BASE_URL}/users/${userAddress}/distributions?chain_id=${chainId}`;
    const response = await axios.get<FetchMorphoResponse>(url);

    return response.data;
  },
});

export async function fetchMorphoUserDistributions(
  userAddress: Address,
  chainId = base.id
): Promise<FetchMorphoResponse> {
  const client = getQueryClient();

  const response = await client.fetchQuery({
    ...fetchMorphoUserDistributionsQueryOptions(userAddress, chainId),
    ...queryConfig.morphoDataQueryConfig,
  });

  return response;
}
