import React from "react";
import { RewardItem } from "../../contexts/RewardsProvider";
import { DisplayMoney, FetchData, Icon, ImageGroup, Typography } from "@shared";
import { useSumRewardDollarAmounts } from "../../hooks/SumRewardDollarAmounts";

interface Props {
  item: FetchData<RewardItem | undefined>;
  showCheckbox?: boolean;
  checked?: boolean;
  onToggle?: () => void;
  stepNumber?: number;
}

export const RewardItemRow: React.FC<Props> = ({ item, showCheckbox = false, checked = false, onToggle }) => {
  const dollarAmount = useSumRewardDollarAmounts(item?.data?.rewards || []);

  if ((dollarAmount?.bigIntValue || 0n) < 1n && showCheckbox && !item.isError) return null;

  return (
    <div>
      <div
        className="flex flex-row justify-between items-center gap-4 p-4 mb-2 bg-neutral-0 
    border-t border-navy-100"
      >
        <div className="flex flex-row gap-3 items-center">
          {showCheckbox && <input type="checkbox" checked={checked} onChange={onToggle} className="checkbox" />}

          <div className="flex flex-row items-center gap-4">
            <Icon src={item?.data?.icon} alt={item?.data?.name || "Reward"} width={40} height={40} />

            <div className="flex flex-col items-start">
              <Typography type="bold3">{item?.data?.name}</Typography>
              <Typography type="body1">{item?.data?.description}</Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <DisplayMoney isApproximate typography="bold3" {...dollarAmount} {...item} />
        </div>
      </div>

      {(item?.data?.rewards?.length || 0) > 0 && (
        <div className="w-full bg-neutral-100 py-4 px-6 flex flex-row gap-2 rounded-[16px] mb-6">
          <Typography type="bold1">Accruing: {dollarAmount.viewValue} $</Typography>
          <ImageGroup
            images={item?.data?.rewards?.map((reward) => reward.logo) || []}
            imageStyle="w-4 h-4 rounded-full"
            spacing="-space-x-3"
          />
        </div>
      )}
    </div>
  );
};
