import { DisplayMoney, FlexCol, FlexRow, ImageGroup, Typography } from "@shared";
import {
  MorphoUserRewardsData,
  useMorphoExtendedUserRewards,
} from "../../../../../../../../statev3/morpho/user-rewards/MorphoUserRewards.hook";
import { ClaimModal } from "./ClaimModal";
import { useAccount } from "wagmi";

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
          <DisplayMoney {...rewardData.totalUsdValueViewValue} {...rest} typography="bold6" />
        </FlexCol>

        <ClaimModal
          {...{
            totalUsdValue: rewardData.totalUsdValueViewValue,
            rewards: rewardData.rewards,
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
