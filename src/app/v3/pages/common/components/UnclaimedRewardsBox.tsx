import { Displayable, DisplayMoney, FlexCol, FlexRow, ImageGroup, SeamlessWriteAsyncParams, Typography } from "@shared";
import { ClaimModal } from "./ClaimModal";
import { ViewAllUserRewards } from "../../../../data/lending-deprecated/types/ViewAllUserRewards";
import { Hash } from "viem";

export interface UnclaimedRewardsBoxProps extends Displayable<ViewAllUserRewards> {
  noRewardsMessage?: string;
  className?: string;
  claimAllAsync: (settings?: SeamlessWriteAsyncParams) => Promise<Hash | undefined>;
  isPending?: boolean;
}

export const UnclaimedRewardsBox: React.FC<UnclaimedRewardsBoxProps> = ({
  data,
  noRewardsMessage = "Deposit into ILM strategies to receive rewards",
  className,
  claimAllAsync,
  isPending,
  ...rest
}) => {
  const disabled = Number(data.totalRewards.value || 0) < 0.01 || !rest.isFetched;

  return (
    <FlexCol className={`bg-neutral-0 shadow-card rounded-2xl h-full p-8 justify-between ${className || ""}`}>
      <FlexCol>
        <FlexRow className="gap-[88px] justify-between">
          <FlexCol className="gap-2">
            <Typography type="regular5">Claimable rewards</Typography>
            <DisplayMoney {...data.totalRewards} {...rest} typography="bold6" />
          </FlexCol>

          <ClaimModal disabled={disabled} {...data} claimAllAsync={claimAllAsync} isPending={isPending} />
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
