import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { FlexRow } from "../containers/FlexRow";
import React from "react";

export const ExternalLink: React.FC<{
  url: string;
  iconSize?: number;
  className?: string;
  children?: React.ReactNode;
}> = ({ url, className = "", children, iconSize = 10 }) => {
  return (
    <Link to={url} target="_blank" className={`underline ${className}`}>
      <FlexRow className="gap-[2px] items-start">
        {children}
        <ArrowTopRightOnSquareIcon width={iconSize} />
      </FlexRow>
    </Link>
  );
};
