import { Address, parseEther } from "viem";
import { useFetchUserAccountData } from "../queries/useFetchViewUserAccountData";
import { useFetchAssetConfiguration } from "../queries/useFetchViewAssetConfiguration";
import { MAX_LIQUIDATION_THRESHOLD, ONE_ETHER } from "../../../../meta";
import { useFetchDetailUserReserveData } from "./useFetchViewDetailUserReserveData";
import {
  DecimalsOptions,
  formatFetchBigIntToViewBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
  mergeQueryStates,
  useToken,
  FetchData,
  FetchBigInt,
} from "@shared";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

const safeHealthFactor = parseEther("1.01");

export const useFetchMaxReserveWithdraw = (
  reserve?: Address
): FetchData<{
  availableToWithdraw: FetchBigInt | undefined;
  availableToWithdrawInUsd: FetchBigInt | undefined;
}> => {
  const { data: tokenData, ...tokenRest } = useToken(reserve);

  const { data: userAccountData, ...userAccountRest } = useFetchUserAccountData();

  const { data: reserveConfig, ...assetConfigRest } = useFetchAssetConfiguration(reserve);

  const { data: userReserveData, ...detailUserReserveDataRest } = useFetchDetailUserReserveData(reserve);

  const { data: assetPrice, ...assetPriceRest } = useFetchAssetPrice({ asset: reserve });

  let availableToWithdraw;
  let availableToWithdrawInUsd;

  // todo left for refactor in separate PR
  if (
    userAccountData != null &&
    userReserveData != null &&
    assetPrice != null &&
    userReserveData?.aTokenBalanceUsd != null &&
    reserveConfig?.liquidationThreshold?.bigIntValue != null &&
    userReserveData?.aTokenBalanceUsd?.bigIntValue != null &&
    assetPrice?.bigIntValue != null &&
    userReserveData.aTokenBalance?.decimals != null
  ) {
    // If the user has not enabled the reserve as collateral or does not have any borrows or liquidation threshold for asset is 0, the user can withdraw the full balance
    if (
      !userReserveData.usageAsCollateralEnabled ||
      userAccountData.totalDebtUsd.bigIntValue === 0n ||
      reserveConfig.liquidationThreshold.bigIntValue === 0n
    ) {
      availableToWithdraw = userReserveData?.aTokenBalance?.bigIntValue;
      availableToWithdrawInUsd = userReserveData?.aTokenBalanceUsd?.bigIntValue;
    } else {
      const healthFactor = userAccountData.healthFactor.bigIntValue;
      const totalBorrowUsd = userAccountData.totalDebtUsd.bigIntValue;
      const totalReserveCollateralUsd = userReserveData?.aTokenBalanceUsd?.bigIntValue;

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
    ...mergeQueryStates([tokenRest, userAccountRest, assetConfigRest, detailUserReserveDataRest, assetPriceRest]),
    data: {
      availableToWithdraw: fFetchBigIntStructured(
        availableToWithdraw,
        userReserveData?.aTokenBalance?.decimals,
        tokenData?.symbol
      ),
      availableToWithdrawInUsd: fUsdValueStructured(availableToWithdrawInUsd),
    },
  };
};

export const useFetchViewMaxReserveWithdraw = (reserve?: Address, decimalsOptions?: Partial<DecimalsOptions>) => {
  const { data, ...rest } = useFetchMaxReserveWithdraw(reserve);

  return {
    ...rest,
    data: {
      tokenAmount: data?.availableToWithdraw
        ? formatFetchBigIntToViewBigInt(data.availableToWithdraw, decimalsOptions)
        : undefined,
      dollarAmount: data?.availableToWithdrawInUsd
        ? formatFetchBigIntToViewBigInt(data.availableToWithdrawInUsd, decimalsOptions)
        : undefined,
    },
  };
};
