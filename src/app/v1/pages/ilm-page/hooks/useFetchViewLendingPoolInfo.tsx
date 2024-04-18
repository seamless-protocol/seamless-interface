import { aaveOracleAbi, aaveOracleAddress } from "../../../../generated/generated";
import { useReadContracts } from "wagmi";
import { baseAssets } from "../../../../state/lending-borrowing/config/BaseAssetsConfig";
import { erc20Abi } from "viem";
import { Displayable, ViewBigInt } from "../../../../../shared/types/Displayable";
import { Fetch, FetchBigInt } from "src/shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../../shared/utils/helpers";
import { useFetchCoinGeckoPriceByAddress } from "../../../../state/common/hooks/useFetchCoinGeckoPrice";

interface LendingPoolInfo {
  totalMarketSizeUsd: FetchBigInt;
  totalAvailableUsd: FetchBigInt;
  totalBorrowsUsd: FetchBigInt;
}

function useFetchLendingPoolInfo(): Fetch<LendingPoolInfo> {
  const multicallParams = baseAssets.flatMap((asset) => [
    {
      address: asset.sTokenAddress,
      abi: erc20Abi,
      functionName: "totalSupply",
    },
    {
      address: asset.debtTokenAddress,
      abi: erc20Abi,
      functionName: "totalSupply",
    },
    {
      address: aaveOracleAddress,
      abi: aaveOracleAbi,
      functionName: "getAssetPrice",
      args: [asset.address],
    },
    {
      address: asset.address,
      abi: erc20Abi,
      functionName: "decimals",
    },
  ]);

  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: multicallParams,
  });

  const coinGeckoPrices: bigint[] = [];
  let coinGeckoAllIsFetched = true;
  let coinGeckoAllIsLoading = false;

  // Hook called in a loop. Since baseAssets array is constant this does not violate rules of hooks in React since each hook is always called in the same order
  for (let i = 0; i < baseAssets.length; i++) {
    const enabled = !!baseAssets[i].useCoinGeckoPrice;
    const {
      data: price,
      isLoading: coinGeckoIsLoading,
      isFetched: coinGeckoIsFetched,
    } = useFetchCoinGeckoPriceByAddress({ // eslint-disable-line react-hooks/rules-of-hooks
      address: baseAssets[i].address,
      precision: 8,
      enabled,
    });
    coinGeckoPrices.push(price || 0n);
    coinGeckoAllIsFetched = coinGeckoAllIsFetched && (coinGeckoIsFetched || !enabled);
    coinGeckoAllIsLoading = coinGeckoAllIsLoading || coinGeckoIsLoading;
  }

  let totalSuppliedUsd = 0n;
  let totalBorrowedUsd = 0n;
  if (results && coinGeckoAllIsFetched) {
    for (let i = 0; i < results.length; i += 4) {
      const totalSupplied = BigInt(results[i].result || 0);
      const totalBorrowed = BigInt(results[i + 1].result || 0);
      const assetPrice = baseAssets[i / 4].useCoinGeckoPrice
        ? coinGeckoPrices[i / 4]
        : BigInt(results[i + 2].result || 0);
      const assetDecimals = Number(results[i + 3].result || 0);

      totalSuppliedUsd += (totalSupplied * assetPrice) / BigInt(10 ** assetDecimals);

      totalBorrowedUsd += (totalBorrowed * assetPrice) / BigInt(10 ** assetDecimals);
    }
  }

  return {
    isLoading: isLoading || coinGeckoAllIsLoading,
    isFetched: isFetched && coinGeckoAllIsFetched,
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
  };
}

export interface ViewLendingPoolInfo {
  totalMarketSizeUsd: ViewBigInt;
  totalAvailableUsd: ViewBigInt;
  totalBorrowsUsd: ViewBigInt;
}

export const useFetchViewLendingPoolInfo = (): Displayable<ViewLendingPoolInfo> => {
  const { isLoading, isFetched, totalMarketSizeUsd, totalAvailableUsd, totalBorrowsUsd } = useFetchLendingPoolInfo();

  return {
    isLoading,
    isFetched,
    data: {
      totalMarketSizeUsd: formatFetchBigIntToViewBigInt(totalMarketSizeUsd),
      totalAvailableUsd: formatFetchBigIntToViewBigInt(totalAvailableUsd),
      totalBorrowsUsd: formatFetchBigIntToViewBigInt(totalBorrowsUsd),
    },
  };
};
