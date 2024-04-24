import { Address } from "viem";
import {
  useFullTokenData,
  FlexRow,
  Icon,
  Typography,
  FlexCol,
  DisplaySymbol,
  Displayable,
  DisplayTokenAmount,
} from "@shared";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { StrategyApy } from "../../../AssetApy";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { DataRow } from "../../DataRow";
import { ViewPreviewDeposit } from "../../../../../state/loop-strategy/types/ViewPreviewDeposit";

export const Summary: React.FC<{
  asset: Address;
  previewDepositData: Displayable<ViewPreviewDeposit>;
}> = ({ asset, previewDepositData }) => {
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    if (asset) console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <SummaryLocal strategy={strategy} previewDepositData={previewDepositData} />;
};

const SummaryLocal: React.FC<{
  strategy: StrategyConfig;
  previewDepositData: Displayable<ViewPreviewDeposit>;
}> = ({ previewDepositData }) => {
  const { asset } = useFormSettingsContext();

  const { data: tokenData, ...restTokenData } = useFullTokenData(asset);

  return (
    <FlexCol className="rounded-card bg-background-selected p-6 gap-4 cursor-default">
      <Typography type="bold3">Summary</Typography>

      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Estimated APY</Typography>
        {asset && <StrategyApy asset={asset} className="text-navy-1000" typography="medium2" />}
      </FlexRow>
      <DataRow label="Starting Asset">
        <FlexRow className="gap-2 items-center">
          <DisplaySymbol {...tokenData} {...restTokenData} />
          <Icon src={tokenData?.logo} {...restTokenData} disableMinHeight alt={tokenData?.shortName || ""} width={16} />
        </FlexRow>
      </DataRow>
      <DataRow label="Min shares to receive">
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
      <DataRow label="Maximum transaction cost">
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
