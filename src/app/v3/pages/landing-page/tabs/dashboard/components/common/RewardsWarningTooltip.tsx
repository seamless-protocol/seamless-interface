import React from "react";
import { Typography, Tooltip } from "@shared";

export const RewardsWarningTooltip: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Tooltip
      tooltip={
        <Typography type="body1">
          Note: the rewards amount includes any rewards earned across all Morpho vaults and markets, <br />
          but SEAM rewards are earned only through Seamless vaults.
        </Typography>
      }
    >
      <>{children}</>
    </Tooltip>
  );
};
