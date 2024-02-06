import { useAccount, useReadContracts } from "wagmi";
import { Displayable } from "../../../../shared";
import { AssetMarketConfig, lendingAssets } from "../config/AssetsConfig";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  lendingPoolAbi,
  lendingPoolAddress,
} from "../../../generated/generated";
import { Address, erc20Abi } from "viem";
import { ONE_ETHER } from "../../../meta/constants";
import {
  convertAprToApy,
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { ViewAssetMarketInfo } from "../types/ViewAssetMarketInfo";

function useFetchAssetMarketInfo(
  assetMarketConfig: AssetMarketConfig | undefined
) {
  const account = useAccount();
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: [
      {
        address: assetMarketConfig?.sTokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: assetMarketConfig?.debtTokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [assetMarketConfig?.address as Address],
      },
      {
        address: lendingPoolAddress,
        abi: lendingPoolAbi,
        functionName: "getReserveData",
        args: [assetMarketConfig?.address as Address],
      },
      {
        address: assetMarketConfig?.address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account?.address as Address],
      },
    ],
  });

  let totalSupplied,
    totalSuppliedUsd,
    totalBorrowed,
    totalBorrowedUsd,
    supplyApy,
    borrowApy;
  if (results) {
    const price = BigInt(results[2].result || 0);

    totalSupplied = BigInt(results[0].result || 0n);
    totalBorrowed = BigInt(results[1].result || 0n);

    totalSuppliedUsd = (totalSupplied * price) / ONE_ETHER;
    totalBorrowedUsd = (totalBorrowed * price) / ONE_ETHER;

    const currentLiquidityRate = BigInt(
      results[3].result?.currentLiquidityRate || 0
    );
    const supplyApr = formatUnitsToNumber(currentLiquidityRate, 27);
    supplyApy = convertAprToApy(supplyApr);

    const currentVariableBorrowRate = BigInt(
      results[3].result?.currentVariableBorrowRate || 0
    );
    const borrowApr = formatUnitsToNumber(currentVariableBorrowRate, 27);
    borrowApy = convertAprToApy(borrowApr);
  }

  return {
    isLoading,
    isFetched,
    totalSupplied: formatUnitsToNumber(totalSupplied, 18),
    totalSuppliedUsd: formatUnitsToNumber(totalSuppliedUsd, 8),
    totalBorrowed: formatUnitsToNumber(totalBorrowed, 18),
    totalBorrowedUsd: formatUnitsToNumber(totalBorrowedUsd, 8),
    supplyApy,
    borrowApy,
  };
}

export const useFetchViewAssetMarketInfo = (
  index: number
): Displayable<ViewAssetMarketInfo> => {
  const {
    isLoading,
    isFetched,
    totalSupplied,
    totalSuppliedUsd,
    totalBorrowed,
    totalBorrowedUsd,
    supplyApy,
    borrowApy,
  } = useFetchAssetMarketInfo(lendingAssets[index]);

  return {
    isLoading,
    isFetched,
    data: {
      depositAsset: {
        name: lendingAssets[index]?.name,
        symbol: lendingAssets[index]?.symbol,
        logo: lendingAssets[index]?.logo,
      },
      totalSupplied: {
        tokenAmount: {
          value: formatToDisplayable(totalSupplied),
          symbol: "",
        },
        dollarAmount: {
          value: formatToDisplayable(totalSuppliedUsd),
          symbol: "$",
        },
      },
      totalBorrowed: {
        tokenAmount: {
          value: formatToDisplayable(totalBorrowed),
          symbol: "",
        },
        dollarAmount: {
          value: formatToDisplayable(totalBorrowedUsd),
          symbol: "$",
        },
      },
      supplyApy: {
        value: formatToDisplayable(supplyApy || 0),
        symbol: "%",
      },
      borrowApyVariable: {
        value: formatToDisplayable(borrowApy || 0),
        symbol: "%",
      },
      borrowApyStable: {
        value: "—",
        symbol: "",
      },
    },
  };
};
