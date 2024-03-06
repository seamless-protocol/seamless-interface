import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { Displayable, ViewBigInt, ViewNumber } from "../../../../shared";
import { useFetchViewTargetMultiple } from "../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { useFetchViewDetailAssetBalance } from "../../../state/asset/hooks/useFetchViewDetailAssetBalance";
import { Address } from "viem";

export interface ViewStrategy {
  strategyName?: string;
  depositAsset: {
    address?: Address;
    name?: string;
    symbol?: string;
    logo?: string;
  };
  targetMultiple?: ViewBigInt;
  loopApy?: ViewNumber;
  availableToDeposit?: {
    tokenAmount?: ViewBigInt;
    dollarAmount?: ViewBigInt;
  };
  yourPosition?: {
    tokenAmount?: ViewBigInt;
    dollarAmount?: ViewBigInt;
  };
}

export const useFetchViewStrategy = (
  index: number
): Displayable<ViewStrategy> => {
  const strategyConfig = ilmStrategies[index];

  const {
    data: targetMultiple,
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
  } = useFetchViewTargetMultiple(strategyConfig.address);

  const {
    data: strategyBalance,
    isLoading: isStrategyBalanceLoading,
    isFetched: isStrategyBalanceFetched,
  } = useFetchViewDetailAssetBalance(strategyConfig.address);

  const {
    data: userBalance,
    isLoading: isUserBalanceLoading,
    isFetched: isUserBalanceFetched,
  } = useFetchViewDetailAssetBalance(strategyConfig.underlyingAsset.address);

  const {
    isLoading: isApyLoading,
    isFetched: isApyFetched,
    data: apyData,
  } = useFetchViewStrategyApy(index);

  return {
    isLoading:
      isTargetMultipleLoading ||
      isStrategyBalanceLoading ||
      isApyLoading ||
      isUserBalanceLoading,
    isFetched:
      isTargetMultipleFetched &&
      isStrategyBalanceFetched &&
      isApyFetched &&
      isUserBalanceFetched,
    data: {
      strategyName: strategyConfig.name,
      depositAsset: {
        name: strategyConfig.underlyingAsset.name,
        symbol: strategyConfig.underlyingAsset.symbol,
        logo: strategyConfig.underlyingAsset.logo,
      },
      targetMultiple: targetMultiple.targetMultiple,
      loopApy: apyData.apy,
      availableToDeposit: {
        tokenAmount: { ...userBalance.balance.tokenAmount, symbol: "" },
        dollarAmount: userBalance.balance.dollarAmount,
      },
      yourPosition: {
        tokenAmount: {
          ...strategyBalance.balance.tokenAmount,
          symbol: "",
        },
        dollarAmount: strategyBalance.balance.dollarAmount,
      },
    },
  };
};
