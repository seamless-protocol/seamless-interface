import React from "react";
import { FlexRow, Icon, Typography } from "@shared";
import eye from "@assets/common/eye.svg";
import eyeOff from "@assets/common/eye-off.svg";

interface GraphButtonProps {
  onClick: () => void;
  isActive?: boolean;
  color?: string;
  children: React.ReactNode;
}

export const GraphButton: React.FC<GraphButtonProps> = ({ onClick, isActive = false, color = "#3B82F6", children }) => {
  const activeStyle = {
    borderColor: color,
  };

  return (
    <button
      onClick={onClick}
      style={isActive ? activeStyle : undefined}
      className={`py-2 px-3 rounded-tag bg-transparent text-black ${
        isActive ? "border-[2px]" : "border border-background-400 text-navy-1000"
      }`}
    >
      <FlexRow className="gap-2 items-center">
        <Icon width={16} height={16} src={isActive ? eye : eyeOff} alt={isActive ? "eye" : "eye-off"} />
        <Typography type="bold1">{children}</Typography>
      </FlexRow>
    </button>
  );
};
