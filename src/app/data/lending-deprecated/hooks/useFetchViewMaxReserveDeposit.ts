import { Address } from "viem";
import {
  Displayable,
  ViewBigInt,
  formatFetchBigIntToViewBigInt,
  fFetchBigIntStructured,
  mergeQueryStates,
  useToken,
} from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchDetailRemainingCap } from "./useFetchDetailRemainingCap";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";

export const cMaxUserReserveDeposit = (remainingCapValue?: bigint, reserveBalance?: bigint) => {
  if (remainingCapValue == null || reserveBalance == null) return undefined;

  const remaining = remainingCapValue;
  const balance = reserveBalance;
  return remaining > balance ? balance : remaining;
};

export const useFetchMaxUserReserveDeposit = (reserve?: Address): FetchData<FetchBigInt | undefined> => {
  const { data: tokenData, ...tokenRest } = useToken(reserve);

  const { data: reserveBalance, ...assetBalanceRest } = useFetchAssetBalance(reserve);

  const { data: remainingCap, ...remainingCapRest } = useFetchDetailRemainingCap(reserve);

  const maxUserReserveDeposit = cMaxUserReserveDeposit(
    remainingCap?.remainingCap?.bigIntValue,
    reserveBalance?.bigIntValue
  );

  return {
    ...mergeQueryStates([assetBalanceRest, remainingCapRest, tokenRest]),
    data: fFetchBigIntStructured(maxUserReserveDeposit, tokenData.decimals, tokenData.symbol),
  };
};

export const useFetchViewMaxUserReserveDeposit = (reserve?: Address): Displayable<ViewBigInt | undefined> => {
  const { data: maxUserReserveData, ...rest } = useFetchMaxUserReserveDeposit(reserve);

  return {
    ...rest,
    data: maxUserReserveData ? formatFetchBigIntToViewBigInt(maxUserReserveData) : undefined,
  };
};
