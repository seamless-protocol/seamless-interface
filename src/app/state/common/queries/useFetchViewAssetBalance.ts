import { Address, erc20Abi } from "viem";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable, useSeamlessContractRead } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useToken } from "./useToken";
import { ViewAssetBalance } from "../types/ViewAssetBalance";
import { useAccount } from "wagmi";

export interface AssetBalance {
  data: FetchBigInt;
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
  } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });

  return {
    isLoading: isTokenDataLoading || isBalanceLoading,
    isFetched: isTokenDataFetched && isBalanceFetched,
    data: {
      bigIntValue: balance || 0n,
      symbol: symbol,
      decimals: decimals,
    },
  };
};

export const useFetchViewAssetBalance = (
  asset: Address
): Displayable<ViewAssetBalance> => {
  const { isLoading, isFetched, data: balance } = useFetchAssetBalance(asset);

  return {
    isLoading,
    isFetched,
    data: {
      balance: formatFetchBigIntToViewBigInt(balance),
    },
  };
};
