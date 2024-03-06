import { Address } from "viem";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useToken } from "./useToken";
import { ViewAssetBalance } from "../types/ViewAssetBalance";
import { useFetchBalanceOf } from "../queries/useFetchBalanceOf";

export interface AssetBalance {
  balance: FetchBigInt;
}

export const useFetchAssetBalance = (asset: Address): Fetch<AssetBalance> => {
  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    symbol,
    decimals,
  } = useToken(asset);

  const {
    data: balance,
    isLoading: isBalanceLoading,
    isFetched: isBalanceFetched,
  } = useFetchBalanceOf(asset);

  return {
    isLoading: isTokenDataLoading || isBalanceLoading,
    isFetched: isTokenDataFetched && isBalanceFetched,
    balance: {
      bigIntValue: balance || 0n,
      symbol: symbol,
      decimals: decimals,
    },
  };
};

export const useFetchViewAssetBalance = (
  asset: Address
): Displayable<ViewAssetBalance> => {
  const { isLoading, isFetched, balance } = useFetchAssetBalance(asset);

  return {
    isLoading,
    isFetched,
    data: {
      balance: formatFetchBigIntToViewBigInt(balance),
    },
  };
};
