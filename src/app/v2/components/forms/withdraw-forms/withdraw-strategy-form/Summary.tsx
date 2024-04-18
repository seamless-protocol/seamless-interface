import React from 'react'
import { FlexCol, Typography, FlexRow, DisplayTokenAmount, DisplayMoney, StandardTooltip, Tooltip, Displayable } from '@shared'
import { ViewPreviewWithdraw } from '../../../../../state/loop-strategy/types/ViewPreviewWithdraw'

export const Summary: React.FC<{
  displayablePreviewData: Displayable<ViewPreviewWithdraw>
}> = ({ displayablePreviewData }) => {
  const { data: previewWithdrawData, isFetched, isLoading } = displayablePreviewData;

  return (
    <FlexCol>
      <Typography type="description">Transaction overview</Typography>
      <FlexCol className="border-divider border-[0.667px] rounded-md  p-3 gap-1">
        <FlexRow className="justify-between">
          <Typography type="description">Min Assets to receive</Typography>
          <Tooltip tooltip={previewWithdrawData.assetsToReceive.tokenAmount.symbol} size="small">
            <DisplayTokenAmount
              {...previewWithdrawData?.assetsToReceive.tokenAmount}
              typography="description"
              isLoading={isLoading}
              isFetched={isFetched}
            />
          </Tooltip>
        </FlexRow>
        <FlexRow className="justify-between">
          <Typography type="description">Min Value to receive</Typography>
          <DisplayMoney
            {...previewWithdrawData?.assetsToReceive.dollarAmount}
            typography="description"
            isLoading={isLoading}
          />
        </FlexRow>
        <FlexRow className="justify-between">
          <FlexRow className="items-center gap-1">
            <Typography type="description">Max Transaction cost</Typography>
            <StandardTooltip width={1}>
              <Typography type="subheader2">
                DEX fees and price impact incurred to keep the strategy <br /> at the target multiple after your withdrawal.
              </Typography>
            </StandardTooltip>
          </FlexRow>
          <DisplayMoney
            {...previewWithdrawData?.cost.dollarAmount}
            typography="description"
            isLoading={isLoading}
          />
        </FlexRow>
      </FlexCol>
    </FlexCol>
  )
}
