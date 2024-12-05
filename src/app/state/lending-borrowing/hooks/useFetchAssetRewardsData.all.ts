import { Address, erc20Abi } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { RewardTokenInformation } from "../../../../shared/utils/aaveIncentivesHelpers";
import { useQuery } from "@tanstack/react-query";
import { fetchRewardTokens } from "../queries/useFetchViewRewardTokens.all";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { fetchAssetPriceInBlock } from "../../../statev3/common/queries/useFetchViewAssetPrice";
import { getConfig } from "../../../utils/queryContractUtils";
import { queryConfig } from "../../../statev3/settings/queryConfig";

interface FetchAssetRewardsData {
  depositAsset: Address;
  rewardTokens: Address[];
}

export async function fetchAssetRewardsData({
  depositAsset,
  rewardTokens,
}: FetchAssetRewardsData): Promise<RewardTokenInformation[]> {
  const queryClient = getQueryClient();
  const config = getConfig();

  const now = Math.floor(Date.now() / 1000);

  const rewardTokensInformation = await Promise.all(
    rewardTokens.map(async (rewardToken) => {
      const [, emissionPerSecond, , emissionEndTimestamp] = await queryClient.fetchQuery(
        readContractQueryOptions(config, {
          address: rewardsControllerAddress,
          abi: rewardsControllerAbi,
          functionName: "getRewardsData",
          args: [depositAsset, rewardToken!],
        })
      );

      if (emissionEndTimestamp < now) {
        return null;
      }

      const rewardTokenSymbol = await queryClient.fetchQuery({
        ...readContractQueryOptions(config, {
          address: rewardToken,
          abi: erc20Abi,
          functionName: "symbol",
        }),
        staleTime: Infinity,
      });

      const rewardTokenDecimals = await queryClient.fetchQuery({
        ...readContractQueryOptions(config, {
          address: rewardToken,
          abi: erc20Abi,
          functionName: "decimals",
        }),
        staleTime: Infinity,
      });

      const rewardTokenPrice = await fetchAssetPriceInBlock(config, rewardToken);

      return {
        rewardTokenSymbol,
        rewardTokenDecimals,
        rewardPriceFeed: rewardTokenPrice!,
        priceFeedDecimals: 8,
        emissionPerSecond,
        emissionEndTimestamp,
      };
    })
  );

  return rewardTokensInformation.filter((info) => info !== null) as RewardTokenInformation[];
}

export async function fetchAssetRewardsDataByAsset(asset: Address) {
  const rewardsTokens = await fetchRewardTokens(asset);
  if (!rewardsTokens) return []; // todo or throw error?
  const rewardTokens = await fetchAssetRewardsData({
    depositAsset: asset!,
    rewardTokens: rewardsTokens! as Address[],
  })

  return rewardTokens;
}

export const useFetchAssetRewardsData = (asset?: Address) => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFetchAssetRewardsData", asset],
    queryFn: () =>
      fetchAssetRewardsDataByAsset(asset!),
    enabled: !!asset,
    ...queryConfig.disableCacheQueryConfig
  });

  return { data, ...rest };
};
