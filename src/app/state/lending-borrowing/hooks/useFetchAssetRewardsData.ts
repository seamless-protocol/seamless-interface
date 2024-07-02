import { Address, erc20Abi } from "viem";
import { readContract } from "wagmi/actions";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { Config, useConfig } from "wagmi";
import { RewardTokenInformation } from "../../../../shared/utils/aaveIncentivesHelpers";
import { fetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";
import { useQuery } from "@tanstack/react-query";
import { useFetchViewRewardTokens } from "../queries/useFetchViewRewardTokens";

interface FetchAssetRewardsData {
  depositAsset?: Address;
  rewardTokens?: Address[];
  config?: Config;
}

export async function fetchAssetRewardsData({
  depositAsset,
  rewardTokens,
  config,
}: FetchAssetRewardsData): Promise<RewardTokenInformation[] | undefined> {
  if (!depositAsset || !rewardTokens || !config) {
    return;
  }

  const rewardTokensInformation: RewardTokenInformation[] = [];

  for (const rewardToken of rewardTokens) {
    const [, emissionPerSecond, , emissionEndTimestamp] = await readContract(config, {
      address: rewardsControllerAddress,
      abi: rewardsControllerAbi,
      functionName: "getRewardsData",
      args: [depositAsset, rewardToken!],
    });

    const now = Math.floor(Date.now() / 1000);
    if (emissionEndTimestamp < now) {
      continue;
    }

    const rewardTokenSymbol = await readContract(config, {
      address: rewardToken,
      abi: erc20Abi,
      functionName: "symbol",
    });

    const rewardTokenDecimals = await readContract(config, {
      address: rewardToken,
      abi: erc20Abi,
      functionName: "decimals",
    });

    const rewardTokenPrice = await fetchAssetPriceInBlock(config, rewardToken);

    rewardTokensInformation.push({
      rewardTokenSymbol,
      rewardTokenDecimals,
      rewardPriceFeed: rewardTokenPrice!,
      priceFeedDecimals: 8,
      emissionPerSecond,
      emissionEndTimestamp,
    });
  }

  return rewardTokensInformation;
}

export const useFetchAssetRewardsData = (asset?: Address) => {
  const config = useConfig();

  const { data: rewardsTokens } = useFetchViewRewardTokens(asset);

  return useQuery({
    queryKey: ["fetchAssetRewardsData", asset],
    queryFn: () =>
      fetchAssetRewardsData({
        depositAsset: asset,
        rewardTokens: rewardsTokens! as Address[],
        config,
      }),
    enabled: !!asset && !!rewardsTokens && !!config,
  });
};
