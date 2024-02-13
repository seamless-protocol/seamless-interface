import { aaveOracleAbi, aaveOracleAddress } from "../../../generated/generated";
import {
  formatToViewNumber,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { useReadContracts } from "wagmi";
import { baseAssets } from "../../lending-borrowing/config/BaseAssetsConfig";
import { erc20Abi } from "viem";
import { ViewIlmPageHeader } from "../types/ViewIlmPageHeader";
import { Displayable } from "../../../../shared/types/Displayable";
import { Fetch, FetchNumber } from "src/shared/types/Fetch";

interface LendingPoolInfo {
  totalMarketSizeUsd: FetchNumber;
  totalAvailableUsd: FetchNumber;
  totalBorrowsUsd: FetchNumber;
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

  let totalSuppliedUsd = 0n,
    totalBorrowedUsd = 0n;
  if (results) {
    for (let i = 0; i < results.length; i += 4) {
      const totalSupplied = BigInt(results[i].result || 0);
      const totalBorrowed = BigInt(results[i + 1].result || 0);
      const assetPrice = BigInt(results[i + 2].result || 0);
      const assetDecimals = Number(results[i + 3].result || 0);

      totalSuppliedUsd +=
        (totalSupplied * assetPrice) / BigInt(10 ** assetDecimals);

      totalBorrowedUsd +=
        (totalBorrowed * assetPrice) / BigInt(10 ** assetDecimals);
    }
  }

  return {
    isLoading,
    isFetched,
    totalMarketSizeUsd: {
      value: formatUnitsToNumber(totalSuppliedUsd, 8),
      symbol: "$",
    },
    totalAvailableUsd: {
      value: formatUnitsToNumber(totalSuppliedUsd - totalBorrowedUsd, 8),
      symbol: "$",
    },
    totalBorrowsUsd: {
      value: formatUnitsToNumber(totalBorrowedUsd, 8),
      symbol: "$",
    },
  };
}

export const useFetchIlmPageHeader = (): Displayable<ViewIlmPageHeader> => {
  const {
    isLoading,
    isFetched,
    totalMarketSizeUsd,
    totalAvailableUsd,
    totalBorrowsUsd,
  } = useFetchLendingPoolInfo();

  return {
    isLoading,
    isFetched,
    data: {
      totalMarketSizeUsd: formatToViewNumber(totalMarketSizeUsd),
      totalAvailableUsd: formatToViewNumber(totalAvailableUsd),
      totalBorrowsUsd: formatToViewNumber(totalBorrowsUsd),
    },
  };
};
