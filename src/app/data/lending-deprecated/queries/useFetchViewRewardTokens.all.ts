import { Address } from "viem";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "../../settings/queryConfig";

export async function fetchRewardTokens(asset: Address) {
  const queryClient = getQueryClient();

  const rewardTokens = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: rewardsControllerAddress,
      abi: rewardsControllerAbi,
      functionName: "getRewardsByAsset",
      args: [asset],
    }),
  });

  return rewardTokens;
}

export const useFetchViewRewardTokens = (asset?: Address) => {
  return useQuery({
    queryKey: ["hookFetchViewRewardTokens", asset],
    queryFn: () => fetchRewardTokens(asset!),
    enabled: !!asset,
    ...queryConfig.disableCacheQueryConfig,
  });
};
