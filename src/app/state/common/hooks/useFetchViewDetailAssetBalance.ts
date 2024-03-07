import { Address } from "viem";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { useFetchAssetPrice } from "../queries/useFetchViewAssetPrice";
import { ilmStrategies } from "../../loop-strategy/config/StrategyConfig";
import { ViewDetailAssetBalance } from "../types/ViewDetailAssetBalance";
import { useFetchAssetBalance } from "../queries/useFetchViewAssetBalance";

export interface DetailAssetBalance {
  data: {
    balance: FetchBigInt;
    balanceUsd: FetchBigInt;
  };
}

export const useFetchDetailAssetBalance = (
  token: Address
): Fetch<DetailAssetBalance> => {
  const {
    isLoading: isBalanceLoading,
    isFetched: isBalanceFetched,
    data: balance,
  } = useFetchAssetBalance(token);

  const {
    isLoading: isPriceLoading,
    isFetched: isPriceFetched,
    data: price,
  } = useFetchAssetPrice(token);

  const strategy = ilmStrategies.find((strategy) => strategy.address === token);

  return {
    isLoading: isBalanceLoading || isPriceLoading,
    isFetched: isBalanceFetched && isPriceFetched,
    data: {
      balance: {
        bigIntValue: balance.bigIntValue,
        symbol: strategy ? strategy.symbol : balance.symbol,
        decimals: 18,
      },
      balanceUsd: {
        bigIntValue:
          (balance.bigIntValue * price.bigIntValue) /
          BigInt(10 ** balance.decimals),
        symbol: "$",
        decimals: 8,
      },
    },
  };
};

export const useFetchViewDetailAssetBalance = (
  token: Address
): Displayable<ViewDetailAssetBalance> => {
  const {
    isLoading,
    isFetched,
    data: { balance, balanceUsd },
  } = useFetchDetailAssetBalance(token);

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
