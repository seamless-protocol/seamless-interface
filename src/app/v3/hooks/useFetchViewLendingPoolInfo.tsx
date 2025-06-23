import { aaveOracleAbi, aaveOracleAddress } from "../../generated/generated";
import { useReadContracts } from "wagmi";
import { fUsdValueStructured, mergeQueryStates } from "@shared";
import { useFetchRawReservesData } from "../../data/lending-deprecated/queries/useFetchRawReservesData";
import { erc20Abi } from "viem";
import { Displayable, ViewBigInt } from "../../../shared/types/Displayable";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../shared/utils/helpers";
import { useMemo } from "react";
import { useFetchCoinGeckoPricesByAddress } from "../../data/common/hooks/useFetchCoinGeckoPrice";
import { assetsConfigAsCoingGeckoPriceParams, assetsConfig } from "../../data/settings/landingMarketConfig";

interface LendingPoolInfo {
  totalMarketSizeUsd?: FetchBigInt;
  totalAvailableUsd?: FetchBigInt;
  totalBorrowsUsd?: FetchBigInt;
}

function useFetchLendingPoolInfo(): FetchData<LendingPoolInfo> {
  const { data: reservesData, ...restReservesData } = useFetchRawReservesData();

  const multicallParams = useMemo(
    () =>
      reservesData?.[0]?.flatMap((asset) => [
        {
          address: asset.aTokenAddress,
          abi: erc20Abi,
          functionName: "totalSupply",
        },
        {
          address: asset.variableDebtTokenAddress,
          abi: erc20Abi,
          functionName: "totalSupply",
        },
        {
          address: aaveOracleAddress,
          abi: aaveOracleAbi,
          functionName: "getAssetPrice",
          args: [asset.underlyingAsset],
        },
        {
          address: asset.underlyingAsset,
          abi: erc20Abi,
          functionName: "decimals",
        },
      ]),
    [reservesData]
  );

  const { data: results, ...rest } = useReadContracts({
    contracts: multicallParams,
  });

  const {
    data: cgPricesResults,
    isLoading,
    isFetched: cgIsFetched,
  } = useFetchCoinGeckoPricesByAddress(assetsConfigAsCoingGeckoPriceParams);

  const coinGeckoPrices = useMemo(() => {
    if (cgPricesResults && !isLoading && cgIsFetched) {
      const prices: { [address: string]: bigint } = {};

      cgPricesResults.forEach((price, i) => {
        prices[assetsConfigAsCoingGeckoPriceParams[i].address] = price || 0n;
      });

      return prices;
    }

    return {};
  }, [cgPricesResults, isLoading, cgIsFetched]);

  const [totalSuppliedUsd, totalBorrowedUsd] = useMemo(() => {
    let totalSuppliedUsd = 0n;
    let totalBorrowedUsd = 0n;
    if (results && cgIsFetched && reservesData) {
      for (let i = 0; i < results.length; i += 4) {
        const { underlyingAsset } = reservesData![0][i / 4]!;
        const totalSupplied = BigInt((results[i].result as bigint) || 0);
        const totalBorrowed = BigInt((results[i + 1].result as bigint) || 0);
        const assetPrice = assetsConfig[underlyingAsset]?.useCoinGeckoPrice
          ? coinGeckoPrices[underlyingAsset]
          : BigInt((results[i + 2].result as bigint) || 0);
        const assetDecimals = Number(results[i + 3].result || 0);

        totalSuppliedUsd += (totalSupplied * assetPrice) / BigInt(10 ** assetDecimals);

        totalBorrowedUsd += (totalBorrowed * assetPrice) / BigInt(10 ** assetDecimals);
      }
    }
    return [totalSuppliedUsd, totalBorrowedUsd];
  }, [results, reservesData, coinGeckoPrices]);

  return {
    ...mergeQueryStates([rest, restReservesData]),
    data: {
      totalMarketSizeUsd: fUsdValueStructured(totalSuppliedUsd),
      totalAvailableUsd: fUsdValueStructured(totalSuppliedUsd - totalBorrowedUsd),
      totalBorrowsUsd: fUsdValueStructured(totalBorrowedUsd),
    },
  };
}

export interface ViewLendingPoolInfo {
  totalMarketSizeUsd: ViewBigInt;
  totalAvailableUsd: ViewBigInt;
  totalBorrowsUsd: ViewBigInt;
}

export const useFetchViewLendingPoolInfo = (): Displayable<ViewLendingPoolInfo> => {
  const {
    data: { totalMarketSizeUsd, totalAvailableUsd, totalBorrowsUsd },
    ...rest
  } = useFetchLendingPoolInfo();

  return {
    ...rest,
    data: {
      totalMarketSizeUsd: formatFetchBigIntToViewBigInt(totalMarketSizeUsd),
      totalAvailableUsd: formatFetchBigIntToViewBigInt(totalAvailableUsd),
      totalBorrowsUsd: formatFetchBigIntToViewBigInt(totalBorrowsUsd),
    },
  };
};
