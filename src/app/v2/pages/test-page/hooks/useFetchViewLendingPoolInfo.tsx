import { aaveOracleAbi, aaveOracleAddress } from "../../../../generated/generated";
import { useReadContracts } from "wagmi";
import { mergeQueryStates } from "@shared";
import { useFetchRawReservesData } from "../../../../state/lending-borrowing/queries/useFetchRawReservesData";
import { Address, erc20Abi } from "viem";
import { Displayable, ViewBigInt } from "../../../../../shared/types/Displayable";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../../shared/utils/helpers";
import { useFetchCoinGeckoPriceByAddress } from "../../../../state/common/hooks/useFetchCoinGeckoPrice";
import { useMemo } from "react";
import { assetsConfig } from "../../../../state/settings/config";

interface LendingPoolInfo {
  totalMarketSizeUsd: FetchBigInt;
  totalAvailableUsd: FetchBigInt;
  totalBorrowsUsd: FetchBigInt;
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

  const coinGeckoPrices: { [address: string]: bigint } = {};
  let coinGeckoAllIsFetched = true;
  let coinGeckoAllIsLoading = false;


  // Hook called in a loop. Since baseAssets array is constant this does not violate rules of hooks in React since each hook is always called in the same order
  Object.keys(assetsConfig).forEach((key) => {
    const enabled = !!assetsConfig[key as Address].useCoinGeckoPrice;
    const {
      data: price,
      isLoading: coinGeckoIsLoading,
      isFetched: coinGeckoIsFetched,
      // todo fix this
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useFetchCoinGeckoPriceByAddress({
      address: assetsConfig[key as Address].address,
      precision: 8,
      enabled,
    });
    coinGeckoPrices[assetsConfig[key as Address].address] = price || 0n;
    coinGeckoAllIsFetched = coinGeckoAllIsFetched && (coinGeckoIsFetched || !enabled);
    coinGeckoAllIsLoading = coinGeckoAllIsLoading || coinGeckoIsLoading;
  });

  const [totalSuppliedUsd, totalBorrowedUsd] = useMemo(() => {
    let totalSuppliedUsd = 0n;
    let totalBorrowedUsd = 0n;
    if (results && coinGeckoAllIsFetched) {
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
  }, [results, reservesData, coinGeckoPrices, coinGeckoAllIsFetched]);

  return {
    ...mergeQueryStates([rest, restReservesData]),
    data: {
      totalMarketSizeUsd: {
        bigIntValue: totalSuppliedUsd,
        decimals: 8,
        symbol: "$",
      },
      totalAvailableUsd: {
        bigIntValue: totalSuppliedUsd - totalBorrowedUsd,
        decimals: 8,
        symbol: "$",
      },
      totalBorrowsUsd: {
        bigIntValue: totalBorrowedUsd,
        decimals: 8,
        symbol: "$",
      },
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
