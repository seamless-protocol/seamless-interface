import { DisplayMoney, FlexCol, FlexRow, ImageGroup, Typography } from "@shared";
import {
  MorphoUserRewardsData,
  useMorphoExtendedUserRewards,
} from "../../../../../../../../statev3/morpho/user-rewards/MorphoUserRewards.hook";
import { ClaimModal } from "./ClaimModal";
import { useAccount } from "wagmi";
import { RewardsWarningTooltip } from "../../../components/common/RewardsWarningTooltip";

export const MorphoUnclaimedRewardsBox = () => {
  const { address } = useAccount();

  const { data, ...rest } = useMorphoExtendedUserRewards(address);
  const rewardData = data || ({} as MorphoUserRewardsData);

  const disabled = Number(data?.totalUsdValue || 0) < 0.01 || rest.isLoading;

  return (
    <FlexCol className="bg-neutral-0 rounded-xl border border-b-100 h-full p-8 justify-between">
      <FlexRow className="gap-[88px]">
        <FlexCol className="gap-2">
          <Typography type="regular5">Unclaimed vault rewards</Typography>

          <FlexRow className="gap-2 items-center">
            <DisplayMoney {...rewardData.combinedClaimableNowViewValue} {...rest} typography="bold6" />
            <RewardsWarningTooltip />
          </FlexRow>
        </FlexCol>

        <ClaimModal
          {...{
            totalUsdValue: rewardData.combinedClaimableNowViewValue,
            rewards: rewardData.rewards?.map((reward) => ({
              claimableNow: reward.formatted.claimableNow,
              claimableNowUsd: reward.formatted.claimableNowUsd,
              token: reward.token,
            })),
            disabled,
          }}
        />
      </FlexRow>
      {disabled ? (
        <Typography className="text-primary-600" type="medium1">
          Deposit into vaults to receive rewards
        </Typography>
      ) : (
        <ImageGroup
          imageStyle="w-6"
          spacing="-space-x-3"
          images={rewardData.rewards?.map((reward) => reward.token.logo) || []}
        />
      )}
    </FlexCol>
  );
};
