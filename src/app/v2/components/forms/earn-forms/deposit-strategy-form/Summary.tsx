import { FlexRow, Typography, FlexCol, DisplayTokenAmount, StandardTooltip } from "@shared";
import { AssetApy } from "../../../asset-data/AssetApy";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { DataRow } from "../../DataRow";
import { useAccount } from "wagmi";
import { NOT_CONNECTED_WALLET_MESSAGE } from "../../../../../../meta";
import { useFetchViewDepositSharesToReceive } from "../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import { useFetchPreviewDepositCostInUsdAndUnderlying } from "../../../../../state/loop-strategy/hooks/useFetchDepositCostInUsdAndUnderlying";

export const Summary: React.FC<{
  debouncedAmount: string;
}> = ({ debouncedAmount }) => {
  return <SummaryLocal debouncedAmount={debouncedAmount} />;
};

const SummaryLocal: React.FC<{ debouncedAmount: string }> = ({ debouncedAmount }) => {
  const { isConnected } = useAccount();
  const { asset, subStrategy, isStrategy } = useFormSettingsContext();
  const { data: sharesToReceive, ...restShares } = useFetchViewDepositSharesToReceive(debouncedAmount, subStrategy);
  const { data: costData, ...restCost } = useFetchPreviewDepositCostInUsdAndUnderlying(debouncedAmount, subStrategy);

  return (
    <FlexCol className="rounded-card bg-background-selected p-6 gap-4 cursor-default">
      <Typography type="bold3">Summary</Typography>

      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Estimated APY</Typography>
        {asset && (
          <AssetApy asset={asset} subStrategy={subStrategy} isStrategy={isStrategy} className="text-navy-1000" />
        )}
      </FlexRow>
      <DataRow label="Min tokens to receive">
        <DisplayTokenAmount
          errorMessage={!isConnected ? NOT_CONNECTED_WALLET_MESSAGE : undefined}
          {...restShares}
          {...sharesToReceive.sharesToReceive}
        />
      </DataRow>
      <DataRow label="Min value to receive">
        <DisplayTokenAmount
          errorMessage={!isConnected ? NOT_CONNECTED_WALLET_MESSAGE : undefined}
          {...restShares}
          {...sharesToReceive.sharesToReceiveInUsd}
          symbolPosition="before"
        />
      </DataRow>
      <DataRow
        label={
          <FlexRow className="gap-1">
            Maximum transaction cost
            <StandardTooltip width={1}>
              <Typography type="medium2" className="text-navy-1000">
                DEX fees and price impact incurred to keep the strategy <br /> at the target multiple after your
                deposit. If transaction cost <br /> is high, try depositing smaller amounts over time.
              </Typography>
            </StandardTooltip>
          </FlexRow>
        }
      >
        <DisplayTokenAmount
          errorMessage={!isConnected ? NOT_CONNECTED_WALLET_MESSAGE : undefined}
          {...restCost}
          {...costData?.cost.dollarAmount}
          symbolPosition="before"
        />
      </DataRow>
    </FlexCol>
  );
};
