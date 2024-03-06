import { Address, erc20Abi } from "viem";
import { useAccount } from "wagmi";
import { useToken } from "./useToken";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable, useSeamlessContractRead } from "../../../../shared";
import { useFetchAssetPrice } from "./useFetchViewAssetPrice";
import { ViewDetailAssetBalance } from "../types/ViewDetailAssetBalance";
import { ilmStrategies } from "../../loop-strategy/config/StrategyConfig";

export interface DetailAssetBalance {
  balance: FetchBigInt;
  balanceUsd: FetchBigInt;
}

export const useFetchDetailAssetBalance = (
  token: Address
): Fetch<DetailAssetBalance> => {
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
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });
  let {
    isLoading: isPriceLoading,
    isFetched: isPriceFetched,
    price,
  } = useFetchAssetPrice(token);

  balance = balance || 0n;
  price = price || 0n;

  const strategy = ilmStrategies.find((strategy) => strategy.address === token);

  return {
    isLoading: isTokenDataLoading || isBalanceLoading || isPriceLoading,
    isFetched: isTokenDataFetched && isBalanceFetched && isPriceFetched,
    balance: {
      bigIntValue: balance,
      symbol: strategy ? strategy.symbol : symbol,
      decimals: 18,
    },
    balanceUsd: {
      bigIntValue: (balance * price.bigIntValue) / BigInt(10 ** decimals),
      symbol: "$",
      decimals: 8,
    },
  };
};

export const useFetchViewDetailAssetBalance = (
  token: Address
): Displayable<ViewDetailAssetBalance> => {
  const { isLoading, isFetched, balance, balanceUsd } =
    useFetchDetailAssetBalance(token);

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
