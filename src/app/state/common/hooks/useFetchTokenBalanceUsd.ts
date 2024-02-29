import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { aaveOracleAbi, aaveOracleAddress } from "../../../generated";
import { useToken } from "./useToken";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { ViewTokenBalanceUsd } from "../../loop-strategy/types/ViewTokenBalanceUsd";

export interface TokenBalanceUsd {
  balance: FetchBigInt;
  balanceUsd: FetchBigInt;
}

export const useFetchTokenBalanceUsd = (
  token: Address
): Fetch<TokenBalanceUsd> => {
  const account = useAccount();

  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    decimals,
    symbol,
  } = useToken(token);

  let {
    isLoading: isBalanceLoading,
    isFetched: isBalanceFetched,
    data: balance,
  } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });
  let {
    isLoading: isPriceLoading,
    isFetched: isPriceFetched,
    data: price,
  } = useReadContract({
    address: aaveOracleAddress,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [token],
  });

  balance = balance || 0n;
  price = price || 0n;

  return {
    isLoading: isTokenDataLoading || isBalanceLoading || isPriceLoading,
    isFetched: isTokenDataFetched || (isBalanceFetched && isPriceFetched),
    balance: {
      bigIntValue: balance,
      symbol: symbol,
      decimals: 18,
    },
    balanceUsd: {
      bigIntValue: (balance * price) / BigInt(10 ** decimals),
      symbol: "$",
      decimals: 8,
    },
  };
};

export const useFetchViewTokenBalanceUsd = (
  token: Address
): Displayable<ViewTokenBalanceUsd> => {
  const { isLoading, isFetched, balance, balanceUsd } =
    useFetchTokenBalanceUsd(token);

  return {
    isLoading,
    isFetched,
    data: {
      balance: {
        tokenAmount: formatFetchBigIntToViewBigInt(balance),
        dollarAmount: formatFetchBigIntToViewBigInt(balanceUsd),
      },
    },
  };
};
