import { DisplayMoney, FlexCol, FlexRow, ImageGroup, Typography } from "@shared";
import { ClaimButton } from "./ClaimButton";
import { useFetchViewAllUserRewards } from "../../../../../../state/lending-borrowing/hooks/useFetchViewAllRewards";

export const UnclaimedRewardsBox = () => {
  const { data, ...rest } = useFetchViewAllUserRewards();

  return (
    <div>
      <FlexCol className="bg-neutral-0 rounded-xl border border-b-100 h-full p-8 justify-between">
        <FlexRow className="gap-[88px]">
          <FlexCol className="gap-2">
            <Typography type="regular5">Unclaimed rewards</Typography>
            <DisplayMoney {...data.totalRewards} {...rest} typography="bold6" />
          </FlexCol>

          <ClaimButton />
        </FlexRow>
        <ImageGroup
          imageStyle="w-6"
          spacing="-space-x-3"
          images={data.rewards?.map((reward) => reward.logo) || []}
        />
      </FlexCol>
    </div>
  );
};
