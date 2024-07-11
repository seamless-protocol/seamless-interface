import { Address } from "viem";
import { LendingIncentivesButton, StrategyIncentivesButton } from "./AprTooltip";
import { useFetchStrategyBySubStrategyAddressOrAddress } from "../../../state/common/hooks/useFetchStrategyBySubStrategyAddress";
import { useFetchMaxStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewMaxStrategyApy";

interface AprTooltipProps {
  isStrategy?: boolean | undefined;
  asset?: Address | undefined;
}

export const StrategyAprTooltipForMaxApy: React.FC<{ asset: Address | undefined }> = ({ asset }) => {
  const { data: strategyConfig } = useFetchStrategyBySubStrategyAddressOrAddress(asset);

  const {
    data: { strategy: strategyWithMaxApy },
  } = useFetchMaxStrategyApy(asset);

  const strategy = strategyConfig?.multiplier
    ? strategyConfig.subStrategyData[strategyConfig.subStrategyData.length - 1].address
    : strategyWithMaxApy;

  return <StrategyIncentivesButton strategy={strategy} />;
};

export const AprTooltipForMaxApy: React.FC<AprTooltipProps> = ({ isStrategy, asset }) => {
  return isStrategy ? <StrategyAprTooltipForMaxApy asset={asset} /> : <LendingIncentivesButton asset={asset} />;
};
