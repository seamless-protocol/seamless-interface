import React from "react";

import { FlexRow, Typography } from "@shared";

export const TimeFilterButton: React.FC<{
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}> = ({ onClick, children, isActive = false }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 rounded-tag px-4 ${isActive ? "text-neutral-0 bg-green-600" : "text-navy-400 bg-neutral-100"}`}
    >
      <FlexRow className="gap-2 items-center">
        <Typography type="bold2">{children}</Typography>
      </FlexRow>
    </button>
  );
};
