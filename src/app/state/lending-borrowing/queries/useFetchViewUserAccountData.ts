import { useAccount } from "wagmi";
import { lendingPoolAbi, lendingPoolAddress } from "../../../generated";
import { Address } from "viem";
import { Displayable, useSeamlessContractRead } from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { ONE_ETHER } from "../../../meta";
import { ViewUserAccountData } from "../types/ViewUserAccountData";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";

export interface FetchUserAccountData {
  balance: FetchBigInt;
  totalCollateralUsd: FetchBigInt;
  totalDebtUsd: FetchBigInt;
  availableBorrowUsd: FetchBigInt;
  borrowPowerUsed: FetchBigInt;
  currentLiquidationThreshold: FetchBigInt;
  ltv: FetchBigInt;
  healthFactor: FetchBigInt;
}

export const useFetchUserAccountData = (): FetchData<FetchUserAccountData> => {
  const account = useAccount();

  const { data, ...rest } = useSeamlessContractRead({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getUserAccountData",
    args: [account.address as Address],
  });

  const [
    totalCollateralUsd,
    totalDebtUsd,
    availableBorrowUsd,
    currentLiquidationThreshold,
    ltv,
    healthFactor,
  ] = data || [0n, 0n, 0n, 0n, 0n, 0n];

  const borrowPowerUsed =
    totalDebtUsd !== 0n && availableBorrowUsd !== 0n
      ? ((totalDebtUsd * ONE_ETHER) / (totalDebtUsd + availableBorrowUsd)) *
        100n
      : 0n;

  return {
    ...rest,
    data: {
      balance: {
        bigIntValue: totalCollateralUsd - totalDebtUsd,
        decimals: 8,
        symbol: "$",
      },
      totalCollateralUsd: {
        bigIntValue: totalCollateralUsd,
        decimals: 8,
        symbol: "$",
      },
      totalDebtUsd: {
        bigIntValue: totalDebtUsd,
        decimals: 8,
        symbol: "$",
      },
      availableBorrowUsd: {
        bigIntValue: availableBorrowUsd,
        decimals: 8,
        symbol: "$",
      },
      borrowPowerUsed: {
        bigIntValue: borrowPowerUsed,
        decimals: 18,
        symbol: "%",
      },
      currentLiquidationThreshold: {
        bigIntValue: currentLiquidationThreshold,
        decimals: 2,
        symbol: "%",
      },
      ltv: {
        bigIntValue: ltv,
        decimals: 2,
        symbol: "%",
      },
      healthFactor: {
        bigIntValue: healthFactor,
        decimals: 18,
        symbol: "",
      },
    },
  };
};

export const useFetchViewUserAccountData =
  (): Displayable<ViewUserAccountData> => {
    const {
      isLoading,
      isFetched,
      data: {
        balance,
        totalCollateralUsd,
        totalDebtUsd,
        availableBorrowUsd,
        borrowPowerUsed,
        currentLiquidationThreshold,
        ltv,
        healthFactor,
      },
    } = useFetchUserAccountData();

    return {
      isLoading,
      isFetched,
      data: {
        balance: formatFetchBigIntToViewBigInt(balance),
        totalCollateral: formatFetchBigIntToViewBigInt(totalCollateralUsd),
        totalDebt: formatFetchBigIntToViewBigInt(totalDebtUsd),
        availableBorrow: formatFetchBigIntToViewBigInt(availableBorrowUsd),
        borrowPowerUsed: formatFetchBigIntToViewBigInt(borrowPowerUsed),
        currentLiquidationThreshold: formatFetchBigIntToViewBigInt(
          currentLiquidationThreshold
        ),
        ltv: formatFetchBigIntToViewBigInt(ltv),
        healthFactor: formatFetchBigIntToViewBigInt(healthFactor),
      },
    };
  };
