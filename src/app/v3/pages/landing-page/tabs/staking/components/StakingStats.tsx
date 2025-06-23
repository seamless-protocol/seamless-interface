import { DisplayMoney, DisplayPercentage, DisplayTokenAmount, FlexCol, FlexRow, Typography } from "@shared";
import border from "@assets/common/border.svg";
import { SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { useFetchViewAssetsRewardsData } from "../../../../../../data/safetyModule/hooks/asset-rewards-data/FetchAssetRewardsData.hook";
import { useFormattedTotalAssetsUSDValue } from "../../../../../../data/safetyModule/hooks/total-assets/TotalAssets.hook";

const skeletonLoaderSettings = {
  width: "120px",
  height: "30px",
};

export const StakingStats: React.FC = () => {
  const { data: userRewards, ...restUserRewards } = useFetchViewAssetsRewardsData();
  const { data: totalAssetsData, ...restTotalAssets } = useFormattedTotalAssetsUSDValue(
    STAKED_SEAM_ADDRESS,
    SEAM_ADDRESS
  );

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between ">
          <Typography type="medium2" className="text-primary-600">
            Total Staked
          </Typography>
          <FlexCol className="min-h-14">
            <DisplayTokenAmount
              {...totalAssetsData?.totalAssets}
              {...restTotalAssets}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />

            <DisplayMoney
              {...totalAssetsData?.totalAssetsUSD}
              {...restTotalAssets}
              typography="bold2"
              className="text-primary-1000"
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="max-w-max justify-between">
          <Typography type="medium2" className="text-primary-600">
            Total APR
          </Typography>
          <FlexCol className="min-h-14">
            <DisplayPercentage
              {...userRewards?.totalApr}
              {...restUserRewards}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/3">
        <FlexCol className="justify-between">
          <Typography type="medium2" className="text-primary-600">
            Unstaking cooldown
          </Typography>
          <FlexCol className="min-h-14">
            <DisplayTokenAmount
              viewValue="7 days"
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
      </FlexRow>
    </div>
  );
};
