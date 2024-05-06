import { FlexCol, FlexRow, Icon, Typography, useFullTokenData } from "@shared";
import { getOverridenName, getTokenTitle } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { CurrentBalance } from "./CurrentBalance";
import { IncentivesDetailCard } from "../../../../components/IncentivesDetailCard";
import { useFetchViewSupplyIncentives } from "../../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { findILMStrategyByAddress } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { AssetApy } from "../../../../components/AssetApy";
import { Address } from "viem";
import { Tag } from "../earn-tab/Tag";
import { IncentivesButton } from "../../../../components/IncentivesButton";
import { TableButtonsMobile } from "./TableButtonsMobile";

export const MyStrategiesMobileTableRow: React.FC<{
  asset: Address;
  strategy?: Address;
}> = ({ asset, strategy }) => {
  const isStrategy = !!strategy;
  const {
    data: { logo, name, symbol },
  } = useFullTokenData(asset);
  const { data: supplyIncentives, ...incentivesRest } = useFetchViewSupplyIncentives(asset);

  const strategyIcon = isStrategy && findILMStrategyByAddress(asset)?.logo;

  return (
    <div className="p-2">
      <FlexCol className="md:hidden p-3 bg-neutral-100 rounded-lg gap-1">
        <FlexRow className="justify-between items-start mb-4">
          <FlexCol className="gap-2 text-start">
            <FlexRow className="gap-2">
              <Icon width={40} src={strategyIcon || logo} alt={strategyIcon || logo || ""} />
              <FlexCol className="gap-1">
                <Typography type="bold3">{getTokenTitle(asset, isStrategy)}</Typography>
                <Typography type="regular1">{getOverridenName(asset, name, isStrategy)}</Typography>
              </FlexCol>
            </FlexRow>
          </FlexCol>
          <Tag tag={strategy ? "ILM" : "LEND"} />
        </FlexRow>
        <div className="grid grid-cols-3">
          <FlexCol className="col-span-2">
            <CurrentBalance asset={isStrategy ? strategy : asset} isStrategy={isStrategy} />
          </FlexCol>
          <FlexCol className="text-end items-end">
            <AssetApy asset={asset} isStrategy={isStrategy} typography="bold3" />
            {!strategy && (
              <IncentivesButton {...supplyIncentives} {...incentivesRest}>
                <IncentivesDetailCard {...supplyIncentives} assetSymbol={symbol} />
              </IncentivesButton>
            )}
          </FlexCol>
        </div>
        <div className="mt-4">
          <TableButtonsMobile asset={asset} isStrategy={isStrategy} />
        </div>
      </FlexCol>
    </div>
  );
};
