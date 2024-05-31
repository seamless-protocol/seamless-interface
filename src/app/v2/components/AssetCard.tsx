import { FlexRow, FlexCol, Typography, Icon } from "@shared";
import { Tag } from "../pages/test-page/tabs/earn-tab/Tag";
import { Address } from "viem";
import { AssetApy } from "./AssetApy";
import { TokenDescriptionDict, getTokenTitle } from "../../../shared/state/meta-data-queries/useTokenDescription";
import { IncentivesButton } from "./IncentivesButton";
import { useFetchViewSupplyIncentives } from "../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { IncentivesDetailCard } from "./IncentivesDetailCard";
import { GauntletOptimized } from "./specific-components/GauntletOptimized";
import { useFullTokenData } from "src/app/state/common/meta-data-queries/useFullTokenData";
import { useAssetsContext } from "@state";

export interface AssetCardProps {
  address: Address;
  isStrategy: boolean;
  hideBorder?: boolean;
  apy?: string;
  incentivesButton?: React.ReactNode;
  isSelected?: boolean;
}

export const AssetCard: React.FC<AssetCardProps> = ({ address, hideBorder, isSelected, isStrategy }) => {
  const { getHasMultipleAPYs, getAssetIsGauntletOptimized, getAssetTag } = useAssetsContext();
  const {
    data: { logo, name, symbol },
  } = useFullTokenData(address);

  const { data: supplyIncentives, ...supplyRest } = useFetchViewSupplyIncentives(address);

  return (
    <div
      className={`p-6 pr-8  ${hideBorder ? "" : "border-solid border-b border-b-navy-100"}
        ${isSelected ? "bg-background-selected" : "bg-neutral-0"} cursor-pointer`}
    >
      <FlexRow className="gap-10 justify-between">
        <FlexRow className="gap-4 items-start">
          <Icon width={40} src={logo} alt={logo || ""} />
          <FlexCol className="gap-2 max-w-58 text-start">
            <FlexCol className="gap-[2px]">
              <Typography type="bold3">{getTokenTitle(address, isStrategy)}</Typography>
              <Typography type="regular1">
                {isStrategy ? TokenDescriptionDict[address].secondaryStrategyTitle : name}
              </Typography>
            </FlexCol>
            <FlexRow className="gap-2">
              <Tag tag={getAssetTag(address)} />

              {getAssetIsGauntletOptimized(address) && <GauntletOptimized />}
            </FlexRow>
          </FlexCol>
        </FlexRow>
        <FlexCol className="gap-1 text-center items-center">
          <FlexCol className="gap-1">
            {getHasMultipleAPYs(address) && (
              <Typography type="bold" className="text-end">
                Up To
              </Typography>
            )}
            <AssetApy asset={address} isStrategy={isStrategy} typography="bold3" />
          </FlexCol>
          {!isStrategy && (
            <IncentivesButton {...supplyIncentives} {...supplyRest}>
              <IncentivesDetailCard {...supplyIncentives} assetSymbol={symbol} />
            </IncentivesButton>
          )}
        </FlexCol>
      </FlexRow>
    </div>
  );
};
