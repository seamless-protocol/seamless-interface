import React from "react";
import { FlexRow } from "../../../containers/FlexRow";
import { Typography } from "../../../text/Typography/Typography";

export const ActionButton: React.FC<{
  handleClick: () => void;
  icon?: React.ReactNode;
  text?: string;
}> = ({ handleClick, icon, text }) => {
  return (
    <button onClick={handleClick} className="hover:bg-action-hover px-4 py-2">
      <FlexRow className="items-center gap-2">
        {icon}
        <Typography>{text}</Typography>
      </FlexRow>
    </button>
  );
};
