import React from "react";
import { Typography } from "../../../text/Typography/Typography";
import greenDotImage from "@assets/common/green-dot.svg";
import { FlexRow } from "../../../containers/FlexRow";
import { Icon } from "../../../images/Icon";

export const DisplayChain: React.FC<{
  chainName?: string;
}> = ({ chainName }) => {
  return (
    <FlexRow className="items-center ml-[-10px] ">
      <Icon src={greenDotImage} alt="green-dot-image" />
      <Typography type="subheader1">{chainName}</Typography>
    </FlexRow>
  );
};
