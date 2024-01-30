import React, { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * VerticalDivider Component
 *
 * @example
 * <VerticalDivider />
 */

export const VerticalDivider: React.FC<DividerProps> = ({ ...props }) => {
  return (
    <div className="w-[0.5px] h-1/2 bg-divider self-center mx-4" {...props} />
  );
};
