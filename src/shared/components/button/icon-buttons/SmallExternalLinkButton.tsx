import React from "react";
import { Tooltip } from "../../tooltip/Tooltip";
import { Typography } from "../../text/Typography/Typography";

export const SmallExternalLinkButton: React.FC<{
  onClick?: () => void;
  tooltipText?: string;
}> = ({ onClick, tooltipText }) => {
  return (
    <Tooltip tooltip={<Typography type="description">{tooltipText}</Typography>} size="small" theme="dark">
      <button
        onClick={onClick}
        // eslint-disable-next-line react/no-invalid-html-attribute
        rel="noopener noreferrer"
        className="group bg-primary-main w-6 h-6 p-1 cursor-pointer rounded-full border-other-borderButton border-thin flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          className="stroke-current text-[#b6a5a8] group-hover:text-white" // Tailwind classes for stroke color and hover effect
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </button>
    </Tooltip>
  );
};
