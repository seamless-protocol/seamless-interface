import { useFetchAccountAssetBalance } from "../../state/common/hooks/useFetchAccountAssetBalance";
import { ilmStrategies } from "../../state/loop-strategy/config/StrategyConfig";

export const BalanceTestCmp = () => {
  const strategyConfig = ilmStrategies[0];
  const { balance } = useFetchAccountAssetBalance(
    strategyConfig.underlyingAsset.address
  );

  return <div>{balance.viewValue}</div>;
};
