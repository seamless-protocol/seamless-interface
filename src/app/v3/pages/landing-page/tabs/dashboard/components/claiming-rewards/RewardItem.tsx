import React from "react";
import { RewardItem } from "../../contexts/RewardsProvider";
import { DisplayMoney, Icon, Typography } from "@shared";

interface Props {
  item: RewardItem;
  showCheckbox?: boolean;
  checked?: boolean;
  onToggle?: () => void;
  stepNumber?: number;
}

export const RewardItemRow: React.FC<Props> = ({ item, showCheckbox = false, checked = false, onToggle }) => {
  return (
    <div
      className="flex flex-row justify-between items-center gap-4 p-4 mb-2 bg-neutral-0 
    border-t border-navy-100"
    >
      <div className="flex flex-row gap-3 items-center">
        {showCheckbox && <input type="checkbox" checked={checked} onChange={onToggle} className="checkbox" />}

        <div className="flex flex-row items-center gap-4">
          <Icon src={item.icon} alt={item.name} width={40} height={40} />

          <div className="flex flex-col items-start">
            <Typography type="bold3">{item.name}</Typography>
            <Typography type="body1">{item.description}</Typography>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <DisplayMoney isApproximate typography="bold3" {...item.dollarAmount} {...item.dollarAmount?.data} />
      </div>
    </div>
  );
};
