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
import {
  convertAprToApy,
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { ViewAssetMarketInfo } from "../types/ViewAssetMarketInfo";
import { useFetchAssetDecimals } from "../../common/hooks/useFetchAssetDecimals";

function useFetchAssetMarketInfo(
  assetMarketConfig: AssetMarketConfig | undefined
) {
  const account = useAccount();
  const { decimals } = useFetchAssetDecimals(
    assetMarketConfig?.address as Address
  );
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

  const baseUnit = 10 ** (decimals || 0);

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

    totalSuppliedUsd = (totalSupplied * price) / BigInt(baseUnit);
    totalBorrowedUsd = (totalBorrowed * price) / BigInt(baseUnit);

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

  console.log("totalSupplied", totalSupplied);

  return {
    isLoading,
    isFetched,
    totalSupplied: formatUnitsToNumber(totalSupplied, decimals || 18),
    totalSuppliedUsd: formatUnitsToNumber(totalSuppliedUsd, 8),
    totalBorrowed: formatUnitsToNumber(totalBorrowed, decimals || 18),
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
