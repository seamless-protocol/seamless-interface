import { Address } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { rewardsControllerAbi } from "@generated";
import { useQuery } from "@tanstack/react-query";
import { FetchBigInt } from "../../../../shared";
import { safetyModuleRewardController } from "@meta";
import { getConfig } from "../../../utils/queryContractUtils";
import { queryConfig } from "../../settings/queryConfig";

export interface AllRewards {
  totalRewardsUsd: FetchBigInt | undefined;
  rewards: {
    tokenAmount: FetchBigInt | undefined;
    dollarAmount: FetchBigInt | undefined;
    logo: string;
    address: Address;
  }[];
}

export const fetchGetRewardsListQueryOptions = () => ({
  ...readContractQueryOptions(getConfig(), {
    address: safetyModuleRewardController,
    abi: rewardsControllerAbi,
    functionName: "getRewardsList",
  }),
});

export async function fetchGetRewardsList() {
  const queryClient = getQueryClient();

  const rewardTokenList = await queryClient.fetchQuery({
    ...fetchGetRewardsListQueryOptions(),
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return rewardTokenList;
}

export const fetchGetRewardsListHookQK = () => ["fetchGetRewardsList"];
export const useFetchGetRewardsList = () => {
  return useQuery({
    queryKey: fetchGetRewardsListHookQK(),
    queryFn: () => fetchGetRewardsList(),
  });
};
