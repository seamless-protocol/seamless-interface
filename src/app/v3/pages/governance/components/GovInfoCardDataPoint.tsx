import React from "react";
import { DisplayMoney, DisplayValue, DisplayValueProps, FlexCol, FlexRow, StandardTooltip, Typography } from "@shared";

interface Props extends DisplayValueProps {
  viewValue?: string;
  dollarViewValue?: string;
  label?: string;
  tooltip?: React.ReactNode;
}

export const GovInfoCardDataPoint: React.FC<Props> = ({
  viewValue: tokenViewValue,
  dollarViewValue,
  label,
  tooltip,
  ...rest
}) => {
  return (
    <FlexCol>
      <FlexRow className="itemms-center gap-1">
        <Typography type="medium3">{label || rest.symbol}</Typography>
        {tooltip && <StandardTooltip openOnClick={false}>{tooltip}</StandardTooltip>}
      </FlexRow>
      <DisplayValue typography="bold4" {...rest} symbol={undefined} viewValue={tokenViewValue} loaderSkeleton />
      <DisplayMoney typography="bold1" {...rest} viewValue={dollarViewValue} />
    </FlexCol>
  );
};
