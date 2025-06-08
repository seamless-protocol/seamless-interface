import { readContractQueryOptions } from "wagmi/query";
import { getConfig, queryContract } from "../../../../utils/queryContractUtils";
import { Address } from "viem";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { LendingAdapterAbi } from "../../../../../../abis/LendingAdapter";

export const fetchMorphoMarketIdQueryOptions = (variables: { adapterAddress: Address }) => ({
  queryKey: ["fetchMorphoMarketId", variables.adapterAddress] as const,
  queryFn: () =>
    queryContract({
      ...readContractQueryOptions(getConfig(), {
        abi: LendingAdapterAbi,
        address: variables.adapterAddress,
        functionName: "morphoMarketId",
      }),
    }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export async function fetchMorphoMarketId(variables: { adapterAddress: Address }) {
  const queryClient = getQueryClient();
  try {
    const marketId: string = await queryClient.fetchQuery(fetchMorphoMarketIdQueryOptions(variables));
    return marketId;
  } catch (error) {
    console.error(error);
  }
  return undefined;
}
