import React from "react";
import { Typography } from "../../../text/Typography/Typography";
import greenDotImage from "@assets/common/green-dot.svg";
import { FlexRow } from "../../../containers/FlexRow";

export const DisplayChain: React.FC<{
  chainName?: string;
}> = ({ chainName }) => {
  return (
    <FlexRow className="items-center ml-[-10px] ">
      <img src={greenDotImage} />
      <Typography type="subheader1">{chainName}</Typography>
    </FlexRow>
  );
};
