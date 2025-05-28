import React from "react";
import { Displayable, DisplayTokenAmount, Icon, ViewBigInt } from "@shared";

export const SingularReward: React.FC<{
  icon: string;
  amount: Displayable<ViewBigInt>;
}> = ({ icon, amount }) => {
  return (
    <div className="bg-neutral-100 rounded-tag p-2">
      <SingularRewardBody icon={icon} amount={amount} />
    </div>
  );
};

const SingularRewardBody: React.FC<{
  icon: string;
  amount: Displayable<ViewBigInt>;
}> = ({ icon, amount }) => {
  return (
    <div className="flex flex-row gap-1">
      <Icon src={icon} alt={amount.data?.symbol || ""} width={16} height={16} />
      <DisplayTokenAmount className="" typography="bold1" {...amount} {...amount.data} />
    </div>
  );
};
