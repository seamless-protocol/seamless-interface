import { Address, parseEther } from "viem";
import { useFetchUserAccountData } from "../queries/useFetchViewUserAccountData";
import { useFetchAssetConfiguration } from "../queries/useFetchViewAssetConfiguration";
import { MAX_LIQUIDATION_THRESHOLD, ONE_ETHER } from "../../../../meta";
import { useFetchDetailUserReserveData } from "./useFetchViewDetailUserReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { formatFetchBigIntToViewBigInt, useToken } from "@shared";

const safeHealthFactor = parseEther("1.01");

export const useFetchMaxReserveWithdraw = (reserve: Address) => {
  const { data: tokenData, isLoading: isTokenDataLoading, isFetched: isTokenDataFetched } = useToken(reserve);

  const {
    data: userAccountData,
    isLoading: isUserAccountDataLoading,
    isFetched: isUserAccountDataFetched,
  } = useFetchUserAccountData();

  const {
    data: reserveConfig,
    isLoading: isAssetConfigurationLoading,
    isFetched: isAssetConfigurationFetched,
  } = useFetchAssetConfiguration(reserve);

  const {
    data: userReserveData,
    isLoading: isUserReserveDataLoading,
    isFetched: isUserReserveDataFetched,
  } = useFetchDetailUserReserveData(reserve);

  const {
    data: assetPrice,
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
  } = useFetchAssetPrice({ asset: reserve });

  let availableToWithdraw;
  let availableToWithdrawInUsd;

  if (userAccountData && userReserveData && assetPrice) {
    // If the user has not enabled the reserve as collateral or does not have any borrows or liquidation threshold for asset is 0, the user can withdraw the full balance
    if (
      !userReserveData.usageAsCollateralEnabled ||
      userAccountData.totalDebtUsd.bigIntValue === 0n ||
      reserveConfig.liquidationThreshold.bigIntValue === 0n
    ) {
      availableToWithdraw = userReserveData.aTokenBalance.bigIntValue;
      availableToWithdrawInUsd = userReserveData.aTokenBalanceUsd.bigIntValue;
    } else {
      const healthFactor = userAccountData.healthFactor.bigIntValue;
      const totalBorrowUsd = userAccountData.totalDebtUsd.bigIntValue;
      const totalReserveCollateralUsd = userReserveData.aTokenBalanceUsd.bigIntValue;

      const excessHealthFactor = healthFactor - safeHealthFactor;

      const maxWithdrawUsd =
        (totalBorrowUsd * excessHealthFactor * MAX_LIQUIDATION_THRESHOLD) /
        (reserveConfig.liquidationThreshold.bigIntValue * ONE_ETHER);

      availableToWithdrawInUsd =
        totalReserveCollateralUsd > maxWithdrawUsd ? maxWithdrawUsd : totalReserveCollateralUsd;
      availableToWithdraw =
        (availableToWithdrawInUsd * BigInt(10 ** userReserveData.aTokenBalance.decimals)) / assetPrice.bigIntValue;
    }
  }

  return {
    isLoading:
      isUserAccountDataLoading ||
      isAssetConfigurationLoading ||
      isUserReserveDataLoading ||
      isAssetPriceLoading ||
      isTokenDataLoading,
    isFetched:
      isUserAccountDataFetched &&
      isAssetConfigurationFetched &&
      isUserReserveDataFetched &&
      isAssetPriceFetched &&
      isTokenDataFetched,

    data: {
      availableToWithdraw: availableToWithdraw && {
        bigIntValue: availableToWithdraw,
        decimals: userReserveData.aTokenBalance.decimals,
        symbol: tokenData?.symbol,
      },
      availableToWithdrawInUsd: availableToWithdrawInUsd && {
        bigIntValue: availableToWithdrawInUsd,
        decimals: 8,
        symbol: "$",
      },
    },
  };
};

export const useFetchViewMaxReserveWithdraw = (reserve: Address) => {
  const { data, isLoading, isFetched } = useFetchMaxReserveWithdraw(reserve);

  return {
    isLoading,
    isFetched,
    data: {
      tokenAmount: data?.availableToWithdraw ? formatFetchBigIntToViewBigInt(data.availableToWithdraw) : undefined,
      dollarAmount: data?.availableToWithdrawInUsd
        ? formatFetchBigIntToViewBigInt(data.availableToWithdrawInUsd)
        : undefined,
    },
  };
};
