import React from "react";
import { Typography, StandardTooltip } from "@shared";

export const RewardsWarningTooltip: React.FC = () => {
  return (
    <StandardTooltip openOnClick={false}>
      <Typography type="body1">
        Note: the rewards amount includes any rewards
        <br />
        earned across all Morpho vaults and markets, <br />
        but SEAM rewards are earned only through Seamless vaults.
      </Typography>
    </StandardTooltip>
  );
};
