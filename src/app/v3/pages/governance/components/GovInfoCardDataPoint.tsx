import React from "react";
import { DisplayValue, DisplayValueProps, FlexCol, FlexRow, StandardTooltip, Typography } from "@shared";

interface Props extends DisplayValueProps {
  label?: string;
  tooltip?: React.ReactNode;
}

export const GovInfoCardDataPoint: React.FC<Props> = ({ label, tooltip, ...rest }) => {
  return (
    <FlexCol>
      <FlexRow className="itemms-center gap-1">
        <Typography type="medium3">{label || rest.symbol}</Typography>
        {tooltip && <StandardTooltip openOnClick={false}>{tooltip}</StandardTooltip>}
      </FlexRow>
      <DisplayValue typography="bold4" {...rest} symbol={undefined} loaderSkeleton />
    </FlexCol>
  );
};
