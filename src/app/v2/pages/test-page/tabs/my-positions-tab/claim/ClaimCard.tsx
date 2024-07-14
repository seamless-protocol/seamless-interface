import { DisplayMoney, FlexCol, FlexRow, Typography } from "@shared";
import { ClaimModal } from "./ClaimModal";
import { useFetchViewAllUserRewards } from "../../../../../../state/lending-borrowing/hooks/useFetchViewAllRewards";

export const ClaimCard = () => {
  const { data } = useFetchViewAllUserRewards();

  return (
    <FlexCol className="shadow-card px-8 py-10 w-full bg-neutral-0 rounded-card">
      <Typography type="regular4">Rewards</Typography>
      <FlexRow className="justify-between items-center">
        <DisplayMoney typography="bold6" {...data.totalRewards} symbolPosition="before" />

        <ClaimModal {...data} />
      </FlexRow>
    </FlexCol>
  );
};
