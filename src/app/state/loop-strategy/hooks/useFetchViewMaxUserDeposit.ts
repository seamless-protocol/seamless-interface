import { Address } from "viem";
import { useFetchMaxDeposit } from "../queries/useFetchViewMaxDeposit";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { Displayable, fFetchBigIntStructured, mergeQueryStates, useToken, ViewBigInt } from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { walletBalanceDecimalsOptions } from "@meta";

export const cMaxUserDeposit = (maxDepositValue?: bigint, assetBalanceValue?: bigint) => {
  if (maxDepositValue == null && assetBalanceValue == null) return undefined;
  if (maxDepositValue == null && assetBalanceValue != null) return assetBalanceValue;
  if (maxDepositValue != null && assetBalanceValue == null) return maxDepositValue;

  return maxDepositValue! > assetBalanceValue! ? maxDepositValue : assetBalanceValue;
};

export const useFetchMaxUserDeposit = (strategy: Address): FetchData<FetchBigInt | undefined> => {
  const { data: tokenData, ...tokenDataRest } = useToken(strategy);
  const { data: underlyingAsset, ...underlyingAssetRest } = useFetchStrategyAsset(strategy);

  const { data: maxDeposit, ...maxDepositRest } = useFetchMaxDeposit(strategy);

  const { data: assetBalance, ...assetBalanceRest } = useFetchAssetBalance(underlyingAsset as Address);

  const max = cMaxUserDeposit(maxDeposit?.bigIntValue, assetBalance?.bigIntValue);

  return {
    ...mergeQueryStates([tokenDataRest, underlyingAssetRest, maxDepositRest, assetBalanceRest]),
    // todo check if decimals and symbol is correct here?
    data: fFetchBigIntStructured(max, tokenData.decimals, tokenData.symbol),
  };
};

export const useFetchViewMaxUserDeposit = (strategy: Address): Displayable<ViewBigInt> => {
  const { data: maxUserDeposit, ...rest } = useFetchMaxUserDeposit(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(maxUserDeposit, walletBalanceDecimalsOptions),
  };
};
