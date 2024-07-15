import { Address } from "viem";
import { useFetchViewSupplyIncentives } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { DisplayPercentage, DisplayPercentageProps, Tooltip, useToken } from "@shared";
import { IncentivesDetailCard } from "../incentives/IncentivesDetailCard";
import { useFetchStrategyIncentives } from "../../../state/loop-strategy/hooks/useFetchViewStrategyIncentives";

interface AssetAprProps extends DisplayPercentageProps {
  asset?: Address;
  isStrategy?: boolean;
  subStrategy?: Address;
}

export const SupplyApr: React.FC<AssetAprProps> = ({ asset, ...rest }) => {
  const { data: tokenData } = useToken(asset);

  const { data: supplyIncentives, ...restIncentives } = useFetchViewSupplyIncentives(asset);

  return (
    <Tooltip tooltip={<IncentivesDetailCard {...supplyIncentives} assetSymbol={tokenData?.symbol} />}>
      <DisplayPercentage {...restIncentives} {...rest} {...supplyIncentives.totalApr} />
    </Tooltip>
  );
};

export const StrategyApr: React.FC<AssetAprProps> = ({ asset, subStrategy, ...rest }) => {
  const { data: tokenData } = useToken(subStrategy);

  const { data: strategyIncentives, ...restIncentives } = useFetchStrategyIncentives(subStrategy);

  return (
    <Tooltip tooltip={<IncentivesDetailCard {...strategyIncentives} assetSymbol={tokenData?.symbol} />}>
      <DisplayPercentage {...restIncentives} {...rest} {...strategyIncentives.totalApr} />
    </Tooltip>
  );
};

export const AssetApr: React.FC<AssetAprProps> = ({ asset, subStrategy, isStrategy, ...rest }) => {
  return isStrategy ? (
    <StrategyApr subStrategy={subStrategy} asset={asset} {...rest} />
  ) : (
    <SupplyApr asset={asset} {...rest} />
  );
};
