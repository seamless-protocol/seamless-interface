import React from "react";
import {
  FlexCol,
  Typography,
  DisplayTokenAmount,
  DisplayMoney,
  StandardTooltip,
  Tooltip,
  Displayable,
  FlexRow,
  DisplaySymbol,
  useFullTokenData,
  Icon,
} from "@shared";
import { ViewPreviewWithdraw } from "../../../../../state/loop-strategy/types/ViewPreviewWithdraw";
import { DataRow } from "../../DataRow";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";

export const Summary: React.FC<{
  displayablePreviewData: Displayable<ViewPreviewWithdraw>;
  strategy: StrategyConfig;
}> = ({ displayablePreviewData, strategy }) => {
  const { asset } = useFormSettingsContext();

  const { data: tokenData, ...restTokenData } = useFullTokenData(asset);

  const { data: strategyTokenData, ...restStrategyTokenData } = useFullTokenData(strategy.address);

  const { data: previewWithdrawData, ...rest } = displayablePreviewData;

  return (
    <FlexCol>
      <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
        <Typography type="bold3">Summary</Typography>
        <DataRow label="Starting asset">
          <FlexRow className="gap-2 items-center">
            <DisplaySymbol {...strategyTokenData} {...restStrategyTokenData} />
          </FlexRow>
        </DataRow>
        <DataRow label="Ending asset">
          <FlexRow className="gap-2 items-center">
            <DisplaySymbol {...tokenData} {...restTokenData} />
            <Icon
              src={tokenData?.logo}
              {...restTokenData}
              disableMinHeight
              alt={tokenData?.shortName || ""}
              width={16}
            />
          </FlexRow>
        </DataRow>
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
