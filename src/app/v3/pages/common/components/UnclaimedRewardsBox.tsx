import { Displayable, DisplayMoney, FlexCol, FlexRow, ImageGroup, Typography } from "@shared";
import { ClaimModal } from "./ClaimModal";
import { ViewAllUserRewards } from "../../../../state/lending-borrowing/types/ViewAllUserRewards";

export interface Props extends Displayable<ViewAllUserRewards> {
  noRewardsMessage?: string;
}

export const UnclaimedRewardsBox: React.FC<Props> = ({
  data,
  noRewardsMessage = "Deposit into ILM strategies to receive rewards",
  ...rest
}) => {
  const disabled = Number(data.totalRewards.value || 0) < 0.01 || !rest.isFetched;

  return (
    <FlexCol className="bg-neutral-0 shadow-card rounded-2xl h-full p-8 justify-between">
      <FlexCol>
        <FlexRow className="gap-[88px]">
          <FlexCol className="gap-2">
            <Typography type="regular5">Claimable rewards</Typography>
            <DisplayMoney {...data.totalRewards} {...rest} typography="bold6" />
          </FlexCol>

          <ClaimModal disabled={disabled} {...data} />
        </FlexRow>
        {disabled ? (
          <Typography className="text-primary-600" type="medium1">
            {noRewardsMessage}
          </Typography>
        ) : (
          <ImageGroup imageStyle="w-6" spacing="-space-x-3" images={data.rewards?.map((reward) => reward.logo) || []} />
        )}
      </FlexCol>
    </FlexCol>
  );
};
