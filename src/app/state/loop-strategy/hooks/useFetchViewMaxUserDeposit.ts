import { Address } from "viem";
import { useFetchMaxDeposit } from "../queries/useFetchViewMaxDeposit";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { Displayable, ViewBigInt } from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { walletBalanceDecimalsOptions } from "@meta";

export const useFetchMaxUserDeposit = (strategy: Address): FetchData<FetchBigInt> => {
  const {
    data: underlyingAsset,
    isLoading: isUnderlyingAssetLoading,
    isFetched: isUnderlyingAssetFetched,
  } = useFetchStrategyAsset(strategy);

  const {
    isLoading: isMaxDepositLoading,
    isFetched: isMaxDepositFetched,
    data: maxDeposit,
  } = useFetchMaxDeposit(strategy);

  const {
    isLoading: isAssetBalanceLoading,
    isFetched: isAssetBalanceFetched,
    data: assetBalance,
  } = useFetchAssetBalance(underlyingAsset as Address);

  return {
    isLoading: isMaxDepositLoading || isAssetBalanceLoading || isUnderlyingAssetLoading,
    isFetched: isMaxDepositFetched && isAssetBalanceFetched && isUnderlyingAssetFetched,
    data: maxDeposit.bigIntValue > assetBalance.bigIntValue ? assetBalance : maxDeposit,
  };
};

export const useFetchViewMaxUserDeposit = (strategy: Address): Displayable<ViewBigInt> => {
  const { isLoading, isFetched, data: maxUserDeposit } = useFetchMaxUserDeposit(strategy);

  console.log("maxDeposit", maxUserDeposit);

  return {
    isLoading,
    isFetched,
    data: formatFetchBigIntToViewBigInt(maxUserDeposit, walletBalanceDecimalsOptions),
  };
};
