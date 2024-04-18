import { Address } from "viem";
import { useFetchUserReserveData } from "../queries/useFetchViewUserReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewDetailUserReserveData } from "../types/ViewDetailUserReserveData";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";

export interface DetailUserReserveData {
  aTokenBalance: FetchBigInt;
  aTokenBalanceUsd: FetchBigInt;
  variableDebtTokenBalance: FetchBigInt;
  variableDebtTokenBalanceUsd: FetchBigInt;
}

export const useFetchDetailUserReserveData = (reserve: Address): FetchData<DetailUserReserveData> => {
  const {
    data: price,
    isLoading: isPriceLoading,
    isFetched: isPriceFetched,
  } = useFetchAssetPrice({ asset: reserve });

  const {
    data: { aTokenBalance, variableDebtTokenBalance },
    isLoading: isUserReserveDataLoading,
    isFetched: isUserReserveDataFetched,
  } = useFetchUserReserveData(reserve);

  let aTokenBalanceUsd;
  let variableDebtTokenBalanceUsd;
  if (aTokenBalance && variableDebtTokenBalance && price) {
    aTokenBalanceUsd = (aTokenBalance.bigIntValue * price.bigIntValue) / BigInt(10 ** aTokenBalance.decimals);

    variableDebtTokenBalanceUsd =
      (variableDebtTokenBalance.bigIntValue * price.bigIntValue) / BigInt(10 ** variableDebtTokenBalance.decimals);
  }

  return {
    isLoading: isPriceLoading || isUserReserveDataLoading,
    isFetched: isPriceFetched && isUserReserveDataFetched,
    data: {
      aTokenBalance,
      aTokenBalanceUsd: {
        bigIntValue: aTokenBalanceUsd || 0n,
        decimals: 8,
        symbol: "$",
      },
      variableDebtTokenBalance,
      variableDebtTokenBalanceUsd: {
        bigIntValue: variableDebtTokenBalanceUsd || 0n,
        decimals: 8,
        symbol: "$",
      },
    },
  };
};

export const useFetchViewDetailUserReserveData = (reserve: Address): Displayable<ViewDetailUserReserveData> => {
  const {
    isLoading,
    isFetched,
    data: { aTokenBalance, aTokenBalanceUsd, variableDebtTokenBalance, variableDebtTokenBalanceUsd },
  } = useFetchDetailUserReserveData(reserve);

  return {
    isLoading,
    isFetched,
    data: {
      supplied: {
        tokenAmount: formatFetchBigIntToViewBigInt(aTokenBalance),
        dollarAmount: formatFetchBigIntToViewBigInt(aTokenBalanceUsd),
      },
      borrowed: {
        tokenAmount: formatFetchBigIntToViewBigInt(variableDebtTokenBalance),
        dollarAmount: formatFetchBigIntToViewBigInt(variableDebtTokenBalanceUsd),
      },
    },
  };
};
