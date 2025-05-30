// src/components/StatCell.tsx
import React from "react";
import { Typography } from "@shared";

export interface StatCellProps {
  /** The label shown at the top */
  label: string;
  /** The value node rendered at the bottom */
  children: React.ReactNode;
}

export const StatCell: React.FC<StatCellProps> = ({ label, children }) => (
  <div
    className="
      p-6
      flex flex-col justify-between
      min-h-[80px]
    "
  >
    <Typography type="medium3" className="text-primary-600">
      {label}
    </Typography>
    {children}
  </div>
);
