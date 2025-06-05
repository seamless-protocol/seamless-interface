import { Typography, DisplayMoney, FetchData } from "@shared";
import { RewardItem } from "../../contexts/RewardsProvider";
import { useSumRewardDollarAmounts } from "../../hooks/SumRewardDollarAmounts";

export const RewardsHeading: React.FC<{
  items: FetchData<RewardItem[] | undefined>;
}> = ({ items }) => {
  const dollarAmount = useSumRewardDollarAmounts(items.data?.map((i) => i.rewards).flat() || []);

  return (
    <div className="flex flex-col gap-2">
      <Typography type="regular5">Claim rewards</Typography>
      <DisplayMoney typography="bold6" {...items} {...dollarAmount} />
    </div>
  );
};
