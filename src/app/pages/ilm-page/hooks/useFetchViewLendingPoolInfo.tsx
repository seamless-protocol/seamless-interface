import { aaveOracleAbi, aaveOracleAddress } from "../../../generated/generated";
import { useReadContracts } from "wagmi";
import { baseAssets } from "../../../state/lending-borrowing/config/BaseAssetsConfig";
import { erc20Abi } from "viem";
import { Displayable, ViewBigInt } from "../../../../shared/types/Displayable";
import { Fetch, FetchBigInt } from "src/shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";

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

  let totalSuppliedUsd = 0n;
  let totalBorrowedUsd = 0n;
  if (results) {
    for (let i = 0; i < results.length; i += 4) {
      const totalSupplied = BigInt(results[i].result || 0);
      const totalBorrowed = BigInt(results[i + 1].result || 0);
      const assetPrice = BigInt(results[i + 2].result || 0);
      const assetDecimals = Number(results[i + 3].result || 0);

      totalSuppliedUsd += (totalSupplied * assetPrice) / BigInt(10 ** assetDecimals);

      totalBorrowedUsd += (totalBorrowed * assetPrice) / BigInt(10 ** assetDecimals);
    }
  }

  return {
    isLoading,
    isFetched,
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
