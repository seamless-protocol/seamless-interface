import React from "react";
import { Tooltip } from "./Tooltip";

export const StandardTooltip: React.FC<{
  children: React.ReactNode;
  width?: number;
}> = ({ children, width = 1.2 }) => {
  return (
    <Tooltip tooltip={children} openOnClick>
      <svg
        className={`cursor-pointer hover:stroke-[#7fb0e8]`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        width={width + "rem"}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </Tooltip>
  );
};
