import { Address } from "viem";
import { FlexRow, Icon, FlexCol, Typography } from "@shared";
import { useFullTokenData } from "../../../state/common/meta-data-queries/useFullTokenData";
import { Tag } from "../asset-data/Tag";
import { GauntletOptimized } from "../specific-components/GauntletOptimized";
import { AssetApy } from "../asset-data/AssetApy";
import { useFetchAssetByAddress } from "../../../state/common/hooks/useFetchAssetByAddress";
import { useFetchStrategyHasMultipleAPYs } from "../../../state/common/hooks/useFetchStrategyHasMultipleAPYs";
import { AprTooltipForMaxApy } from "../incentives/AprTooltipForMaxApy";
import { useFetchStrategyByAddress } from "../../../state/common/hooks/useFetchStrategyByAddress";
import { multiplyETH_ADDRESS_STRATEGY_ID } from "../../../../meta";
import { StrategyIncentivesButton } from "../incentives/AprTooltip";

export interface AssetCardProps {
  address: Address;
  isStrategy: boolean;
  hideBorder?: boolean;
  apy?: string;
  incentivesButton?: React.ReactNode;
  isSelected?: boolean;
  lendingNamePrefix?: string;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  address,
  hideBorder,
  isSelected,
  isStrategy,
  lendingNamePrefix = "Supply",
}) => {
  const { data: asset } = useFetchAssetByAddress(address);
  const { data: hasMultipleApys } = useFetchStrategyHasMultipleAPYs(address);
  const { data: strategy } = useFetchStrategyByAddress(address);
  const {
    data: { logo, name, subTitle, isGauntletOptimized },
  } = useFullTokenData(address);

  return (
    <div
      className={`p-6 pr-8  ${hideBorder ? "" : "border-solid border-b border-b-navy-100"}
        ${isSelected ? "bg-background-selected" : "bg-neutral-0"} cursor-pointer`}
    >
      <FlexRow className="justify-between">
        <FlexRow className="gap-4 items-start max-w-[60%]">
          <Icon width={40} src={logo} alt="logo" />
          <FlexCol className="gap-2 max-w-58 text-start">
            <FlexCol className="gap-[2px]">
              <Typography type="bold3">{`${asset?.isStrategy ? "" : lendingNamePrefix} ${name}`}</Typography>
              <Typography type="regular1">{subTitle || name}</Typography>
            </FlexCol>
            <FlexRow className="gap-2">
              {asset?.tags.map((tag, index) => <Tag tag={tag} key={index} />)}

              {isGauntletOptimized && <GauntletOptimized />}
            </FlexRow>
          </FlexCol>
        </FlexRow>
        <FlexCol className="gap-1 text-end items-end">
          <FlexCol className="gap-1">
            {hasMultipleApys && !strategy?.multiplier && (
              <Typography type="bold" className="text-end">
                Up To
              </Typography>
            )}
            <AssetApy multiplier={strategy?.multiplier} asset={address} isStrategy={isStrategy} typography="bold3" />
          </FlexCol>

          <FlexCol>
            {address === multiplyETH_ADDRESS_STRATEGY_ID && (
              <Typography type="bold" className="text-end mr-3">
                Rewards Up to
              </Typography>
            )}
            {address === multiplyETH_ADDRESS_STRATEGY_ID ? (
              <StrategyIncentivesButton strategy={strategy?.subStrategyData[0]?.address} />
            ) : (
              <AprTooltipForMaxApy asset={address} isStrategy={isStrategy} />
            )}
          </FlexCol>
        </FlexCol>
      </FlexRow>
    </div>
  );
};
