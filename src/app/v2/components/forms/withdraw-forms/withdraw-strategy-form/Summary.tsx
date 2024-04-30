import React from "react";
import {
  FlexCol,
  Typography,
  DisplayTokenAmount,
  DisplayMoney,
  StandardTooltip,
  Tooltip,
  RQResponse,
  FlexRow,
} from "@shared";
import { ViewPreviewWithdraw } from "../../../../../state/loop-strategy/types/ViewPreviewWithdraw";
import { DataRow } from "../../DataRow";
import { StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";

export const Summary: React.FC<{
  displayablePreviewData: RQResponse<ViewPreviewWithdraw>;
  strategy: StrategyConfig;
}> = ({ displayablePreviewData }) => {
  const { data: previewWithdrawData, ...rest } = displayablePreviewData;

  return (
    <FlexCol>
      <FlexCol className="rounded-card bg-background-selected p-6 gap-4">
        <Typography type="bold3">Summary</Typography>
        <DataRow label="Min Assets to receive">
          <Tooltip tooltip={previewWithdrawData.assetsToReceive.tokenAmount.symbol} size="small">
            <DisplayTokenAmount
              {...previewWithdrawData?.assetsToReceive.tokenAmount}
              {...rest}
              typography="medium2"
              className="text-navy-1000"
            />
          </Tooltip>
        </DataRow>
        <DataRow label="Min Value to receive">
          <Tooltip tooltip={previewWithdrawData.assetsToReceive.tokenAmount.symbol} size="small">
            <DisplayMoney
              {...previewWithdrawData?.assetsToReceive.dollarAmount}
              typography="medium2"
              {...rest}
              className="text-navy-1000"
            />
          </Tooltip>
        </DataRow>

        <FlexRow className="justify-between text-navy-600">
          <FlexRow className="gap-1 items-center">
            <Typography type="bold2">Max Transaction cost</Typography>
            <StandardTooltip width={1}>
              <Typography type="medium2" className="text-navy-1000">
                DEX fees and price impact incurred to keep the strategy <br /> at the target multiple after your
                withdrawal.
              </Typography>
            </StandardTooltip>
          </FlexRow>
          <DisplayMoney
            {...previewWithdrawData?.cost.dollarAmount}
            typography="medium2"
            className="text-navy-1000"
            {...rest}
          />
        </FlexRow>
      </FlexCol>
    </FlexCol>
  );
};
