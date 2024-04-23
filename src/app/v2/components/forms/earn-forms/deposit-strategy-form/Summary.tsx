import { Address } from "viem";
import { useFullTokenData, FlexRow, Icon, Typography, FlexCol, DisplaySymbol } from "@shared";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { StrategyApy } from "../../../AssetApy";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { DataRow } from "../../DataRow";

export const Summary: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    if (asset) console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <SummaryLocal strategy={strategy} />;
};

const SummaryLocal: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const { asset } = useFormSettingsContext();

  const { data: tokenData, ...restTokenData } = useFullTokenData(asset);
  const { data: strategyTokenData, ...strategyRest } = useFullTokenData(strategy.address);

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4 cursor-default">
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
      <DataRow label="Ending Asset">
        <DisplaySymbol {...strategyTokenData} {...strategyRest} />
      </DataRow>
    </FlexCol>
  );
};
