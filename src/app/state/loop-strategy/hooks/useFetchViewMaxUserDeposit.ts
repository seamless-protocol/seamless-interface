import { Address } from "viem";
import { useFetchMaxDeposit } from "../queries/useFetchViewMaxDeposit";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { Displayable, fFetchBigIntStructured, mergeQueryStates, useToken, ViewBigInt } from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchAssetBalance } from "../../../statev3/common/queries/useFetchViewAssetBalance";

export const cMaxUserDeposit = (maxDepositValue?: bigint, assetBalanceValue?: bigint) => {
  if (maxDepositValue == null && assetBalanceValue == null) return undefined;
  if (maxDepositValue == null && assetBalanceValue != null) return assetBalanceValue;
  if (maxDepositValue != null && assetBalanceValue == null) return maxDepositValue;

  return maxDepositValue! > assetBalanceValue! ? assetBalanceValue : maxDepositValue;
};

export const useFetchMaxUserDeposit = (strategy?: Address): FetchData<FetchBigInt | undefined> => {
  const { data: underlyingAsset, ...underlyingAssetRest } = useFetchStrategyAsset(strategy);
  const { data: underlyingAssetTokenData, ...underlyingAssetTokenDataRest } = useToken(underlyingAsset);

  const { data: maxDeposit, ...maxDepositRest } = useFetchMaxDeposit(strategy);

  const { data: assetBalance, ...assetBalanceRest } = useFetchAssetBalance(underlyingAsset as Address);

  const max = cMaxUserDeposit(maxDeposit?.bigIntValue, assetBalance?.bigIntValue);

  return {
    ...mergeQueryStates([underlyingAssetRest, maxDepositRest, underlyingAssetTokenDataRest, assetBalanceRest]),
    data: fFetchBigIntStructured(max, underlyingAssetTokenData.decimals, underlyingAssetTokenData.symbol),
  };
};

export const useFetchViewMaxUserDeposit = (strategy?: Address): Displayable<ViewBigInt> => {
  const { data: maxUserDeposit, ...rest } = useFetchMaxUserDeposit(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(maxUserDeposit, walletBalanceDecimalsOptions),
  };
};
