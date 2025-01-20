import React from "react";
import { Typography, Tooltip } from "@shared";

export const RewardsWarningTooltip: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Tooltip
      tooltip={
        <Typography type="body1">
          Currently, the <strong>Rewards amount</strong> may include rewards from other markets or vaults
          <br />
          that have allocations in any market shared with Seamless vault.
        </Typography>
      }
    >
      <>{children}</>
    </Tooltip>
  );
};
