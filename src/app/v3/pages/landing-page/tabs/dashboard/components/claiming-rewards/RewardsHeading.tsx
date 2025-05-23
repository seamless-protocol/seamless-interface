import { Typography, DisplayMoney } from "@shared";

export const RewardsHeading = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography type="regular5">Claim rewards</Typography>
      <DisplayMoney typography="bold6" viewValue="906.64" />
    </div>
  );
};
