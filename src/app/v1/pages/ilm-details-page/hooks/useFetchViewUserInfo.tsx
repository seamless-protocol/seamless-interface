import { formatFetchBigIntToViewBigInt } from "../../../../../shared/utils/helpers";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { Displayable, ViewBigInt } from "../../../../../shared/types/Displayable";
import { useFetchDetailAssetBalance } from "../../../../state/common/hooks/useFetchViewDetailAssetBalance";
import { walletBalanceDecimalsOptions } from "@meta";
import { mergeQueryStates } from "@shared";

export interface ViewUserInfo {
  underlyingAssetBalance: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };

  strategyBalance: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}

export const useFetchViewUserInfo = (index: number): Displayable<ViewUserInfo> => {
  const strategyConfig = ilmStrategies[index];

  const {
    data: { balance: underlyingAssetBalance, balanceUsd: underlyingAssetBalanceUsd },
    ...underlyingRest
  } = useFetchDetailAssetBalance(strategyConfig.underlyingAsset.address);
  const {
    data: { balance: strategyBalance, balanceUsd: strategyBalanceUsd },
    ...strategyBalanceRest
  } = useFetchDetailAssetBalance(strategyConfig.address);

  return {
    ...mergeQueryStates([underlyingRest, strategyBalanceRest]),
    data: {
      underlyingAssetBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(underlyingAssetBalance, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(underlyingAssetBalanceUsd, walletBalanceDecimalsOptions),
      },
      strategyBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(strategyBalance, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(strategyBalanceUsd, walletBalanceDecimalsOptions),
      },
    },
  };
};
