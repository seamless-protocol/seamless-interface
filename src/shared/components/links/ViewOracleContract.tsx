import React from "react";
import { SmallExternalLinkButton } from "./SmallExternalLinkButton";
import { RouterConfig } from "@router";

export const ViewOracleContract: React.FC<{ address: string }> = ({
  address,
}) => {
  return (
    <SmallExternalLinkButton
      tooltipText="View oracle contract"
      url={RouterConfig.Builder.baseScanAddress(address)}
    />
  );
};
