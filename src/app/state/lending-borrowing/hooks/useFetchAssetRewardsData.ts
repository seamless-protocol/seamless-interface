import { Address, erc20Abi } from "viem";
import { readContract } from "wagmi/actions";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { Config, useConfig } from "wagmi";
import { RewardTokenInformation } from "../../../../shared/utils/aaveIncentivesHelpers";
import { fetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";
import { useQuery } from "@tanstack/react-query";
import { useFetchViewRewardTokens } from "../queries/useFetchViewRewardTokens";

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
  const now = Math.floor(Date.now() / 1000);

  const rewardTokensInformation = await Promise.all(
    rewardTokens.map(async (rewardToken) => {
      const [, emissionPerSecond, , emissionEndTimestamp] = await readContract(config, {
        address: rewardsControllerAddress,
        abi: rewardsControllerAbi,
        functionName: "getRewardsData",
        args: [depositAsset, rewardToken!],
      });

      if (emissionEndTimestamp < now) {
        return null;
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
