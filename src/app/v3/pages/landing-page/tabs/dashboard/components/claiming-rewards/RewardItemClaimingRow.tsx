import React from "react";
import { ClaimStatus, Reward, RewardItem } from "../../contexts/RewardsProvider";
import { DisplayMoney, ExternalLink, Icon, ImageGroup, Typography } from "@shared";
import { SingularReward } from "./SingularReward";

interface Props {
  item: RewardItem;
  showCheckbox?: boolean;
  checked?: boolean;
  onToggle?: () => void;
  stepNumber?: number;
  status?: ClaimStatus;
  txHash?: string;
}

export const RewardItemClaimingRow: React.FC<Props> = ({
  item,
  showCheckbox = false,
  checked = false,
  onToggle,
  stepNumber,
  status = "idle",
  txHash,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <div className="flex flex-row gap-3 items-center">
          {showCheckbox && <input type="checkbox" checked={checked} onChange={onToggle} className="mt-1 checkbox" />}

          {stepNumber !== undefined && <LocalStepIndicator status={status} stepNumber={stepNumber} />}

          <div className="flex flex-row items-center gap-4">
            <Icon src={item.icon} alt={item.name} width={40} height={40} />
            <div className="flex flex-col items-start">
              <Typography type="bold3">{item.name}</Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <DisplayMoney isApproximate typography="bold3" {...item.dollarAmount} {...item.dollarAmount?.data} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 px-14">
        {status === "idle" &&
          item.rewards.map((reward, index) => (
            <SingularReward key={index} icon={reward.logo} amount={reward.tokenAmount} />
          ))}

        {status !== "idle" && (
          <div className="flex items-center gap-4">
            <LocalStatusIndicator status={status} rewards={item.rewards} />
            {txHash && (
              <ExternalLink className="text-[#4F68F7] text-body3" url={`https://basescan.org/tx/${txHash}`}>
                Review tx details
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatusTextMapper: Record<ClaimStatus, string> = {
  idle: "",
  success: "Rewards claimed",
  pending: "Claiming rewards...",
  failed: "Claim failed!",
};

const StatusColorMapper: Record<ClaimStatus, string> = {
  idle: "",
  success: "text-green-900 bg-[#EBF7F0] border-green-900",
  pending: "text-blue-900 bg-[#ECF5FF] border-blue-900",
  failed: "text-red-900 bg-[#FFEBEB] border-red-900",
};

const LocalStatusIndicator = ({ status, rewards }: { status: ClaimStatus; rewards?: Reward[] }) => {
  return (
    <div
      className={`max-w-fit p-2 flex flex-row items-center gap-1 text-bold1 rounded-tag border ${StatusColorMapper[status]}`}
    >
      <ImageGroup
        images={rewards?.map((reward) => reward.logo) || []}
        imageStyle="w-4 h-4 rounded-full"
        spacing="-space-x-3"
      />
      {StatusTextMapper[status]}
    </div>
  );
};

interface StepIndicatorProps {
  status: ClaimStatus;
  stepNumber?: number;
}

const LocalStepIndicator: React.FC<StepIndicatorProps> = ({ status, stepNumber }) => {
  const base = "w-6 h-6 flex items-center justify-center rounded-full border";
  let content: React.ReactNode = stepNumber;
  let classes = `${base} border-gray-400 text-gray-700`;

  switch (status) {
    case "pending":
      content = <div className="w-5 h-5 border-2 border-gray-300 rounded-full animate-spin" />;
      classes = `${base} border-blue-500`;
      break;
    case "success":
      classes = `${base} bg-green-500 border-green-500 text-white`;
      break;
    case "failed":
      classes = `${base} border-red-500 text-red-500`;
      break;
    default:
      break;
  }

  return <span className={classes}>{content}</span>;
};
