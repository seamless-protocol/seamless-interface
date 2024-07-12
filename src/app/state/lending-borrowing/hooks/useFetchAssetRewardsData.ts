import { Address, erc20Abi } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { Config, useConfig } from "wagmi";
import { RewardTokenInformation } from "../../../../shared/utils/aaveIncentivesHelpers";
import { fetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";
import { useQuery } from "@tanstack/react-query";
import { useFetchViewRewardTokens } from "../queries/useFetchViewRewardTokens";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";

interface FetchAssetRewardsData {
  depositAsset: Address;
  rewardTokens: Address[];
  config: Config;
}

export async function fetchAssetRewardsData({
  depositAsset,
  rewardTokens,
  config,
}: FetchAssetRewardsData): Promise<RewardTokenInformation[]> {
  const queryClient = getQueryClient();

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

export const useFetchAssetRewardsData = (asset?: Address) => {
  const config = useConfig();

  const { data: rewardsTokens } = useFetchViewRewardTokens(asset);

  return useQuery({
    queryKey: ["fetchAssetRewardsData", asset, rewardsTokens],
    queryFn: () =>
      fetchAssetRewardsData({
        depositAsset: asset!,
        rewardTokens: rewardsTokens! as Address[],
        config,
      }),
    enabled: !!asset && !!rewardsTokens,
  });
};
