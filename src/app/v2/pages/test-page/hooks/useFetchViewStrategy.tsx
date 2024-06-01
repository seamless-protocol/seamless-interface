import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewStrategyApy } from "../../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { Displayable, mergeQueryStates, ViewBigInt, ViewNumber } from "../../../../../shared";
import { useFetchViewTargetMultiple } from "../../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { useFetchViewDetailAssetBalance } from "../../../../state/common/hooks/useFetchViewDetailAssetBalance";
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

export const useFetchViewStrategy = (index: number): Displayable<ViewStrategy> => {
  const strategyConfig = ilmStrategies[index];

  const { data: targetMultiple, ...multipleRest } = useFetchViewTargetMultiple(strategyConfig.address);

  const { data: strategyBalance, ...balanceRest } = useFetchViewDetailAssetBalance(strategyConfig.address);

  const { data: userBalance, ...userBalanceRest } = useFetchViewDetailAssetBalance(
    strategyConfig.underlyingAsset.address
  );

  const { data: apy, ...apyRest } = useFetchViewStrategyApy(ilmStrategies[index].address);

  return {
    ...mergeQueryStates([userBalanceRest, apyRest, multipleRest, balanceRest]),
    data: {
      strategyName: strategyConfig.name,
      depositAsset: {
        name: strategyConfig.underlyingAsset.name,
        symbol: strategyConfig.underlyingAsset.symbol,
        logo: strategyConfig.underlyingAsset.logo,
      },
      targetMultiple,
      loopApy: apy,
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
