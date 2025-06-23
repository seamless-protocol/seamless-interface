import {
  Displayable,
  FetchBigInt,
  FetchData,
  fFetchBigIntStructured,
  formatFetchBigIntToViewBigInt,
  mergeQueryStates,
  ViewBigInt,
} from "@shared";
import { Address } from "viem";
import { useFetchStrategyAssetsCap } from "./useFetchStrategyAssetsCap";
import { useFullTokenData } from "../../common/meta-data-queries/useFullTokenData";
import { useFetchDetailEquity } from "./useFetchViewEquity.all";

const cRemainingCapPercentage = (assetCap?: bigint, equity?: bigint, decimals?: number): bigint | undefined => {
  if (assetCap == null || equity == null || decimals == null) return undefined;

  const remainingCap = assetCap - equity;

  const divider = assetCap;
  if (divider === 0n) return undefined;

  const remainingCapPercentage = (remainingCap * 100n * 10n ** BigInt(decimals)) / divider;
  return remainingCapPercentage;
};

const cRemainingCap = (assetCap?: bigint, equity?: bigint) => {
  if (equity == null || assetCap == null) return undefined;
  return assetCap - equity;
};

interface RemainingCap {
  remainingCap: FetchBigInt | undefined;
  remainingCapPercentage: FetchBigInt | undefined;
}

export const useFetchStrategyRemainingCap = (strategy?: Address): FetchData<RemainingCap> => {
  const { data: assetCap, ...assetCapRest } = useFetchStrategyAssetsCap(strategy);
  const { data: equity, ...equityRest } = useFetchDetailEquity(strategy);
  const { data: tokenData, ...tokenDataRest } = useFullTokenData(strategy);

  const remaining = cRemainingCap(assetCap?.bigIntValue, equity?.equity?.bigIntValue);
  const remainingPercentage = cRemainingCapPercentage(
    assetCap?.bigIntValue,
    equity?.equity?.bigIntValue,
    assetCap?.decimals
  );

  return {
    ...mergeQueryStates([assetCapRest, equityRest, tokenDataRest]),
    data: {
      remainingCap: fFetchBigIntStructured(remaining, tokenData?.decimals, tokenData?.symbol),
      remainingCapPercentage: fFetchBigIntStructured(remainingPercentage, tokenData?.decimals, "%"),
    },
  };
};

export interface ViewRemainingCap {
  remainingCap?: ViewBigInt;
  remainingCapPercentage?: ViewBigInt;
}
export const useFetchViewStrategyRemainingCap = (strategy?: Address): Displayable<ViewRemainingCap> => {
  const {
    data: { remainingCap, remainingCapPercentage },
    ...rest
  } = useFetchStrategyRemainingCap(strategy);

  const formattedRemainingCap = remainingCap
    ? formatFetchBigIntToViewBigInt(
        remainingCap.bigIntValue !== undefined && remainingCap.bigIntValue < 0n
          ? { ...remainingCap, bigIntValue: 0n }
          : remainingCap
      )
    : undefined;

  const formattedRemainingCapPercentage = remainingCapPercentage
    ? formatFetchBigIntToViewBigInt(
        remainingCapPercentage.bigIntValue !== undefined && remainingCapPercentage.bigIntValue < 0n
          ? { ...remainingCapPercentage, bigIntValue: 0n }
          : remainingCapPercentage
      )
    : undefined;

  return {
    ...rest,
    data: {
      remainingCap: formattedRemainingCap,
      remainingCapPercentage: formattedRemainingCapPercentage,
    },
  };
};
