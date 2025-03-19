import { Address } from "viem";
import { fetchAllUserRewards } from "../../../common/hooks/useFetchViewAllRewards";
import { rewardsAccruingAssets } from "../../../settings/config";
import { STAKED_SEAM_ADDRESS, safetyModuleRewardController } from "@meta";
import { fetchToken } from "@shared";
import { fetchAssetRewardsData } from "../../../../state/lending-borrowing/hooks/useFetchAssetRewardsData.all";
import { parseRewardsTokenInformation } from "../../../../../shared/utils/aaveIncentivesHelpers";
import { fetchTotalAssets } from "../TotalAssets.fetch";
import { fetchAssetPriceInBlock } from "../../../queries/AssetPrice.hook";
import { cValueInUsd } from "../../../common/math/cValueInUsd";

export const fetchStakingAssetRewardsData = async (user: Address) => {
  const [userRewards, totalAssets, stakedSeamPrice, stakedSeamToken] = await Promise.all([
    fetchAllUserRewards(user, rewardsAccruingAssets),
    fetchTotalAssets(STAKED_SEAM_ADDRESS),
    fetchAssetPriceInBlock(STAKED_SEAM_ADDRESS),
    fetchToken(STAKED_SEAM_ADDRESS),
  ]);

  const rewardAddresses = userRewards?.rewards.map((x) => x.address);
  const rewardsData = await fetchAssetRewardsData({
    depositAsset: STAKED_SEAM_ADDRESS,
    rewardTokens: rewardAddresses,
    rewardsControllerAddress: safetyModuleRewardController,
  });

  const totalAssetsUSD = cValueInUsd(totalAssets, stakedSeamPrice.bigIntValue, stakedSeamToken.decimals);
  if (totalAssetsUSD == null) throw Error("Couldn't calculate totalAssetsUSD for staked SEAM");

  const incentivesData = parseRewardsTokenInformation(rewardsData, totalAssetsUSD);

  return incentivesData;
};
