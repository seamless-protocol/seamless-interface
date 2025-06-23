import { Address } from "viem";
import { STAKED_SEAM_ADDRESS, safetyModuleRewardController } from "@meta";
import { fetchToken } from "@shared";
import { fetchAssetRewardsData } from "../../../lending-deprecated/hooks/useFetchAssetRewardsData.all";
import { parseRewardsTokenInformation } from "../../../../../shared/utils/aaveIncentivesHelpers";
import { fetchTotalAssets } from "../total-assets/TotalAssets.fetch";
import { fetchAssetPriceInBlock } from "../../../common/queries/AssetPrice.hook";
import { cValueInUsd } from "../../../common/math/cValueInUsd";
import { fetchGetRewardsList } from "../useFetchGetRewardsList.all";

export const fetchStakingAssetRewardsData = async () => {
  const [rewardTokens, totalAssets, stakedSeamPrice, stakedSeamToken] = await Promise.all([
    fetchGetRewardsList(),
    fetchTotalAssets(STAKED_SEAM_ADDRESS),
    fetchAssetPriceInBlock(STAKED_SEAM_ADDRESS),
    fetchToken(STAKED_SEAM_ADDRESS),
  ]);

  const rewardsData = await fetchAssetRewardsData({
    depositAsset: STAKED_SEAM_ADDRESS,
    rewardTokens: rewardTokens as Address[],
    rewardsControllerAddress: safetyModuleRewardController,
  });

  const totalAssetsUSD = cValueInUsd(totalAssets, stakedSeamPrice.bigIntValue, stakedSeamToken.decimals);
  if (totalAssetsUSD == null) throw Error("Couldn't calculate totalAssetsUSD for staked SEAM");

  const incentivesData = parseRewardsTokenInformation(rewardsData, totalAssetsUSD, false);

  return incentivesData;
};
