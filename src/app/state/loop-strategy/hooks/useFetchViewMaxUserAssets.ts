import { Address } from "viem";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { walletBalanceDecimalsOptions } from "../../../meta";
import { useFetchMaxAssets } from "../queries/useFetchViewMaxAssets";
import { StrategyAction } from "../../../pages/ilm-details-page/components/your-info/amount-input/AmountInputWrapper";

export const useFetchMaxUserAssets = (
  strategy: Address,
  action: StrategyAction
) => {
  const {
    data: underlyingAsset,
    isLoading: isUnderlyingAssetLoading,
    isFetched: isUnderlyingAssetFetched,
  } = useFetchStrategyAsset(strategy);

  const {
    isLoading: isMaxDepositLoading,
    isFetched: isMaxDepositFetched,
    data: maxDeposit,
  } = useFetchMaxAssets(strategy, action);

  const {
    isLoading: isAssetBalanceLoading,
    isFetched: isAssetBalanceFetched,
    data: assetBalance,
  } = useFetchAssetBalance(underlyingAsset as Address);

  return {
    isLoading:
      isMaxDepositLoading || isAssetBalanceLoading || isUnderlyingAssetLoading,
    isFetched:
      isMaxDepositFetched && isAssetBalanceFetched && isUnderlyingAssetFetched,
    data:
      maxDeposit.bigIntValue > assetBalance.bigIntValue
        ? assetBalance
        : maxDeposit,
  };
};

export const useFetchViewMaxUserAssets = (
  strategy: Address,
  action: StrategyAction
) => {
  const {
    isLoading,
    isFetched,
    data: maxUserDeposit,
  } = useFetchMaxUserAssets(strategy, action);

  return {
    isLoading,
    isFetched,
    data: formatFetchBigIntToViewBigInt(
      maxUserDeposit,
      walletBalanceDecimalsOptions
    ),
  };
};
