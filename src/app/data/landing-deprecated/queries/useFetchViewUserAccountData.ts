import { useAccount, useReadContract } from "wagmi";
import { lendingPoolAbi, lendingPoolAddress } from "../../../generated";
import { Address } from "viem";
import { Displayable } from "@shared";
import { FetchBigInt } from "../../../../shared/types/Fetch";
import { ONE_ETHER } from "@meta";
import { ViewUserAccountData } from "../types/ViewUserAccountData";
import { formatFetchBigIntToHealthFactor, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";

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

export const useFetchUserAccountData = () => {
  const account = useAccount();

  const { data, ...rest } = useReadContract({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getUserAccountData",
    args: [account.address as Address],
    query: {
      enabled: !!account.address,
    },
  });

  const [totalCollateralUsd, totalDebtUsd, availableBorrowUsd, currentLiquidationThreshold, ltv, healthFactor] =
    data || [0n, 0n, 0n, 0n, 0n, 0n];

  const borrowPowerUsed =
    totalDebtUsd !== 0n && availableBorrowUsd !== 0n
      ? ((totalDebtUsd * ONE_ETHER) / (totalDebtUsd + availableBorrowUsd)) * 100n
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

export const useFetchViewUserAccountData = (): Displayable<ViewUserAccountData> => {
  const {
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
    ...rest
  } = useFetchUserAccountData();

  return {
    ...rest,
    data: {
      balance: formatFetchBigIntToViewBigInt(balance),
      totalCollateral: formatFetchBigIntToViewBigInt(totalCollateralUsd),
      totalDebt: formatFetchBigIntToViewBigInt(totalDebtUsd),
      availableBorrow: formatFetchBigIntToViewBigInt(availableBorrowUsd),
      borrowPowerUsed: formatFetchBigIntToViewBigInt(borrowPowerUsed),
      currentLiquidationThreshold: formatFetchBigIntToViewBigInt(currentLiquidationThreshold),
      ltv: formatFetchBigIntToViewBigInt(ltv),
      healthFactor: formatFetchBigIntToHealthFactor(healthFactor),
    },
  };
};
