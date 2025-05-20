// src/components/RewardItem.tsx
import React from "react";
import { ClaimStatus, RewardItem } from "../../contexts/RewardsProvider";

interface Props {
  item: RewardItem;
  showCheckbox?: boolean;
  checked?: boolean;
  onToggle?: () => void;
  stepNumber?: number;
  status?: ClaimStatus;
}

export const RewardItemRow: React.FC<Props> = ({
  item,
  showCheckbox = false,
  checked = false,
  onToggle,
  stepNumber,
  status = "idle",
}) => {
  // Determine styles based on status
  const indicatorBase = "w-6 h-6 flex items-center justify-center rounded-full border";
  let indicatorContent: React.ReactNode;
  let indicatorClasses = `${indicatorBase} border-gray-400 text-gray-700`;

  switch (status) {
    case "pending":
      indicatorContent = (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      );
      indicatorClasses = `${indicatorBase} border-blue-500`;
      break;
    case "success":
      indicatorContent = stepNumber;
      indicatorClasses = `${indicatorBase} bg-green-500 border-green-500 text-white`;
      break;
    case "failed":
      indicatorContent = stepNumber;
      indicatorClasses = `${indicatorBase} border-red-500 text-red-500`;
      break;
    default:
      indicatorContent = stepNumber;
      break;
  }

  return (
    <div className="flex items-start gap-4 p-4 border mb-2">
      {showCheckbox && <input type="checkbox" checked={checked} onChange={onToggle} className="mt-1" />}

      {stepNumber !== undefined && <span className={indicatorClasses}>{indicatorContent}</span>}

      <div className="w-8 h-8">{item.icon}</div>

      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-sm">
          {item.tokenAmount} tokens (${item.dollarAmount})
        </p>
        {item.extraText && <p className="text-xs text-gray-500">{item.extraText}</p>}
      </div>
    </div>
  );
};
