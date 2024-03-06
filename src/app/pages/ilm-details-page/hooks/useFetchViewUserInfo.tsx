import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { Displayable, ViewBigInt } from "../../../../shared/types/Displayable";
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchDetailAssetBalance } from "../../../state/common/hooks/useFetchViewDetailAssetBalance";
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

export const useFetchViewUserInfo = (
  index: number
): Displayable<ViewUserInfo> => {
  const strategyConfig = ilmStrategies[index];

  const {
    isLoading: isUnderlyingAssetBalanceLoading,
    isFetched: isUnderlyingAssetBalanceFetched,
    data: {
      balance: underlyingAssetBalance,
      balanceUsd: underlyingAssetBalanceUsd,
    },
  } = useFetchDetailAssetBalance(strategyConfig.underlyingAsset.address);
  const {
    isLoading: isStrategyBalanceLoading,
    isFetched: isStrategyBalanceFetched,
    data: { balance: strategyBalance, balanceUsd: strategyBalanceUsd },
  } = useFetchDetailAssetBalance(strategyConfig.address);

  return {
    isLoading: isUnderlyingAssetBalanceLoading || isStrategyBalanceLoading,
    isFetched: isUnderlyingAssetBalanceFetched && isStrategyBalanceFetched,
    data: {
      underlyingAssetBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(
          underlyingAssetBalance,
          walletBalanceDecimalsOptions
        ),
        dollarAmount: formatFetchBigIntToViewBigInt(
          underlyingAssetBalanceUsd,
          walletBalanceDecimalsOptions
        ),
      },
      strategyBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(
          strategyBalance,
          walletBalanceDecimalsOptions
        ),
        dollarAmount: formatFetchBigIntToViewBigInt(
          strategyBalanceUsd,
          walletBalanceDecimalsOptions
        ),
      },
    },
  };
};
