import React from "react";
import { FlexCol } from "../../../../containers/FlexCol";
import { FlexRow } from "../../../../containers/FlexRow";
import { Typography } from "../../../../text/Typography/Typography";
import { ChainName } from "../ChainName";

export const NetworkSection: React.FC<{
  chainName?: string | undefined;
}> = ({ chainName }) => {
  return (
    <FlexCol className="p-2 px-4 gap-2 md:text-primary-dark text-primary-contrast">
      <Typography type="subheader2">Network</Typography>
      <FlexRow className="items-center ml-[-10px]">
        <ChainName chainName={chainName} />
      </FlexRow>
    </FlexCol>
  );
};
