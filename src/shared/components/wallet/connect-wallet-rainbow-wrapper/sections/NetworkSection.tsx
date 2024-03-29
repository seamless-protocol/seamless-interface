import React from "react";
import { FlexCol } from "../../../containers/FlexCol";
import { DisplayChain } from "../components/ChainName";
import { Typography } from "../../../text/Typography/Typography";

export const NetworkSection: React.FC<{
  chainName?: string | undefined;
}> = ({ chainName }) => {
  return (
    <FlexCol className="p-2 px-4 gap-2 md:text-primary-dark text-primary-contrast">
      <Typography type="subheader2">Network</Typography>
      <DisplayChain chainName={chainName} />
    </FlexCol>
  );
};
