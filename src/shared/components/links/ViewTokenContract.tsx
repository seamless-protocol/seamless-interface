import React from "react";
import { SmallExternalLinkButton } from "./SmallExternalLinkButton";
import { RouterConfig } from "@router";

export const ViewTokenContract: React.FC<{ address: string }> = ({
  address,
}) => {
  return (
    <SmallExternalLinkButton
      tooltipText="View Token Contract"
      url={RouterConfig.Builder.baseScanAddress(address)}
    />
  );
};
