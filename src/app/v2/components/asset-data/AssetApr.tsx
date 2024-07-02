import { Address } from "viem";
import { useFetchViewSupplyIncentives } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { DisplayPercentage, DisplayPercentageProps, Tooltip, useToken } from "@shared";
import { IncentivesDetailCard } from "../incentives/IncentivesDetailCard";
import { useFetchStrategyIncentives } from "../../../state/loop-strategy/hooks/useFetchViewStrategyIncentives";
import { strategiesConfig } from "../../../state/settings/config";

interface AssetAprProps extends DisplayPercentageProps {
  asset: Address;
  isStrategy?: boolean;
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

export const StrategyApr: React.FC<AssetAprProps> = ({ asset, ...rest }) => {
  const { data: tokenData } = useToken(asset);

  console.log("asset", asset);
  //TODO: Remove hardcoded strategy index
  const { data: strategyIncentives, ...restIncentives } = useFetchStrategyIncentives(
    strategiesConfig[asset]?.subStrategyData?.[0]?.address
  );

  return (
    <Tooltip tooltip={<IncentivesDetailCard {...strategyIncentives} assetSymbol={tokenData?.symbol} />}>
      <DisplayPercentage {...restIncentives} {...rest} {...strategyIncentives.totalApr} />
    </Tooltip>
  );
};

export const AssetApr: React.FC<AssetAprProps> = ({ asset, isStrategy, ...rest }) => {
  return isStrategy ? <StrategyApr asset={asset} {...rest} /> : <SupplyApr asset={asset} {...rest} />;
};
