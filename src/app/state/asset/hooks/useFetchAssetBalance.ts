import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { ViewAssetBalance } from "../types/ViewAssetBalance";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useToken } from "./useToken";

export interface AssetBalance {
  balance: FetchBigInt;
}

export const useFetchAssetBalance = (asset: Address): Fetch<AssetBalance> => {
  const account = useAccount();
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
  } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });

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
