import React from "react";

import { FlexRow, Icon, Typography } from "@shared";

import eye from "@assets/common/eye.svg";
import eyeOff from "@assets/common/eye-off.svg";

export const GraphButton: React.FC<{
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}> = ({ onClick, children, isActive = false }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 rounded-tag ${isActive ? "border-[2px] border-smallElements-blue" : "border border-background-400"} 
        px-3 bg-transparent ${isActive ? "text-text-blue" : "text-navy-1000"}`}
    >
      <FlexRow className="gap-2 items-center">
        {isActive ? (
          <Icon width={16} height={16} src={eye} alt="eye" />
        ) : (
          <Icon width={16} height={16} src={eyeOff} alt="eye-off" />
        )}
        <Typography type="bold1">{children}</Typography>
      </FlexRow>
    </button>
  );
};
