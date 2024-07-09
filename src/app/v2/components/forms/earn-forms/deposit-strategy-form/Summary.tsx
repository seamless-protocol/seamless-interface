import { FlexRow, Typography, FlexCol, Displayable, DisplayTokenAmount, StandardTooltip } from "@shared";
import { AssetApy } from "../../../asset-data/AssetApy";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { DataRow } from "../../DataRow";
import { ViewPreviewDeposit } from "../../../../../state/loop-strategy/types/ViewPreviewDeposit";
import { AssetApr } from "../../../asset-data/AssetApr";

export const Summary: React.FC<{
  previewDepositData: Displayable<ViewPreviewDeposit>;
}> = ({ previewDepositData }) => {
  return <SummaryLocal previewDepositData={previewDepositData} />;
};

const SummaryLocal: React.FC<{
  previewDepositData: Displayable<ViewPreviewDeposit>;
}> = ({ previewDepositData }) => {
  const { asset, subStrategy, isStrategy } = useFormSettingsContext();

  return (
    <FlexCol className="rounded-card bg-background-selected p-6 gap-4 cursor-default">
      <Typography type="bold3">Summary</Typography>

      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Estimated APY</Typography>
        {asset && (
          <AssetApy asset={asset} subStrategy={subStrategy} isStrategy={isStrategy} className="text-navy-1000" />
        )}
      </FlexRow>

      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Rewards APR</Typography>
        {asset && (
          <AssetApr asset={asset} subStrategy={subStrategy} isStrategy={isStrategy} className="text-navy-1000" />
        )}
      </FlexRow>

      <DataRow label="Min tokens to receive">
        <DisplayTokenAmount
          isLoading={previewDepositData.isLoading}
          isFetched={previewDepositData.isFetched}
          viewValue={previewDepositData.data.sharesToReceive.tokenAmount.viewValue}
        />
      </DataRow>
      <DataRow label="Min value to receive">
        <DisplayTokenAmount
          isLoading={previewDepositData.isLoading}
          isFetched={previewDepositData.isFetched}
          {...previewDepositData.data.sharesToReceive.dollarAmount}
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
          isLoading={previewDepositData.isLoading}
          isFetched={previewDepositData.isFetched}
          {...previewDepositData.data.cost.dollarAmount}
          symbolPosition="before"
        />
      </DataRow>
    </FlexCol>
  );
};
