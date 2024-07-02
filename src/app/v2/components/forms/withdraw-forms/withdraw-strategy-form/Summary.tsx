import React from "react";
import { FlexCol, Typography, DisplayTokenAmount, DisplayMoney, StandardTooltip, Tooltip, FlexRow } from "@shared";
import { DataRow } from "../../DataRow";
import { StrategyState } from "../../../../../state/common/types/StateTypes";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { NOT_CONNECTED_WALLET_MESSAGE } from "../../../../../../meta";
import { useAccount } from "wagmi";
import { useFetchViewWithdrawSharesToReceive } from "../../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";
import { useFetchViewWithdrawCostInUsdAndUnderlying } from "../../../../../state/loop-strategy/hooks/useFetchWithdrawCostInUsdAndUnderlying";

export const Summary: React.FC<{
  debouncedAmount: string;
  strategy: StrategyState;
}> = ({ debouncedAmount }) => {
  const { isConnected } = useAccount();
  const { subStrategy } = useFormSettingsContext();
  const { data: sharesToReceive, ...restShares } = useFetchViewWithdrawSharesToReceive(debouncedAmount, subStrategy);
  const { data: costData, ...restCost } = useFetchViewWithdrawCostInUsdAndUnderlying(debouncedAmount, subStrategy);

  return (
    <FlexCol>
      <FlexCol className="rounded-card bg-background-selected p-6 gap-4">
        <Typography type="bold3">Summary</Typography>
        <DataRow label="Min Assets to receive">
          <Tooltip tooltip={sharesToReceive.assetsToReceive.tokenAmount?.symbol} size="small">
            <DisplayTokenAmount
              errorMessage={!isConnected ? NOT_CONNECTED_WALLET_MESSAGE : undefined}
              {...restShares}
              {...sharesToReceive.assetsToReceive.tokenAmount}
              typography="medium2"
              className="text-navy-1000"
            />
          </Tooltip>
        </DataRow>
        <DataRow label="Min Value to receive">
          <Tooltip tooltip={sharesToReceive.assetsToReceive.tokenAmount?.symbol} size="small">
            <DisplayMoney
              errorMessage={!isConnected ? NOT_CONNECTED_WALLET_MESSAGE : undefined}
              {...restShares}
              typography="medium2"
              {...sharesToReceive.assetsToReceive.dollarAmount}
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
                withdrawal. If transaction <br /> cost is high, try withdrawing smaller amounts over time.
              </Typography>
            </StandardTooltip>
          </FlexRow>
          <DisplayMoney
            errorMessage={!isConnected ? NOT_CONNECTED_WALLET_MESSAGE : undefined}
            {...restCost}
            typography="medium2"
            className="text-navy-1000"
            {...costData?.cost.dollarAmount}
          />
        </FlexRow>
      </FlexCol>
    </FlexCol>
  );
};
