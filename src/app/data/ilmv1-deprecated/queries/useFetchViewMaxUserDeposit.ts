import { walletBalanceDecimalsOptions } from "@meta";
import { Displayable, fFetchBigIntStructured, mergeQueryStates, useToken, ViewBigInt } from "@shared";
import { Address } from "viem";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { useFetchStrategyAsset } from "../metadata/useFetchStrategyAsset";
import { useFetchMaxDeposit } from "./useFetchViewMaxDeposit";

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
  const { ...rest } = useFetchMaxUserDeposit(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(
      {
        bigIntValue: 1111111111111111111111111111111111111111n,
        decimals: 18,
        symbol: "weETH",
      },
      walletBalanceDecimalsOptions
    ),
  };
};
