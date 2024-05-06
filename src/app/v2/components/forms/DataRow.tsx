import React from 'react'
import { FlexRow, Typography } from '@shared';

export const DataRow: React.FC<{
  label: React.ReactElement | string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <FlexRow className="text-navy-600 justify-between">
      <Typography type="bold2">{label}</Typography>
      <Typography type="medium2" className="text-navy-1000">
        {children}
      </Typography>
    </FlexRow>
  );
};
