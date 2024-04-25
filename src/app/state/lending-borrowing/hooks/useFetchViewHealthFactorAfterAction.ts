import { Address, parseEther } from "viem";
import { formatFetchBigIntToHealthFactor, useFullTokenData } from "../../../../shared";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchUserAccountData } from "../queries/useFetchViewUserAccountData";
import { MAX_LIQUIDATION_THRESHOLD, ONE_ETHER } from "../../../../meta";
import { useFetchAssetConfiguration } from "../queries/useFetchViewAssetConfiguration";
import { useFetchUserReserveData } from "../queries/useFetchViewUserReserveData";

export enum Action {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
}

interface HealthFactorAfterActionParams {
  reserve: Address;
  amount: string;
  action: Action;
}

export const useFetchHealthFactorAfterAction = ({ reserve, amount, action }: HealthFactorAfterActionParams) => {
  const { data: tokenData, isLoading: isTokenDataLoading, isFetched: isTokenDataFetched } = useFullTokenData(reserve);

  const {
    data: assetConfig,
    isLoading: isAssetConfigurationLoading,
    isFetched: isAssetConfigurationFetched,
  } = useFetchAssetConfiguration(reserve);

  const {
    data: userAccountData,
    isLoading: isUserAccountDataLoading,
    isFetched: isUserAccountDataFetched,
  } = useFetchUserAccountData();

  const {
    data: userReserveData,
    isLoading: isUserReserveDataLoading,
    isFetched: isUserReserveDataFetched,
  } = useFetchUserReserveData(reserve);

  const { data: price, isLoading: isPriceLoading, isFetched: isPriceFetched } = useFetchAssetPrice({ asset: reserve });

  const isFetched =
    isTokenDataFetched &&
    isAssetConfigurationFetched &&
    isUserAccountDataFetched &&
    isPriceFetched &&
    isUserReserveDataFetched;

  let futureHealthFactor;
  if (assetConfig && tokenData && userAccountData && price && userReserveData && isFetched) {
    // If the user has not enabled the reserve as collateral or there is no debt, the health factor will not change
    if (!userReserveData?.usageAsCollateralEnabled || userAccountData.totalDebtUsd.bigIntValue === 0n) {
      futureHealthFactor = userAccountData.healthFactor.bigIntValue;
    } else {
      const totalCollateralUsd = userAccountData.totalCollateralUsd.bigIntValue;
      const currentLiquidationThreshold = userAccountData.currentLiquidationThreshold.bigIntValue;
      const amountUsd = (parseEther(amount || "0") * price.bigIntValue) / ONE_ETHER;
      const totalCollateralAfter = totalCollateralUsd - amountUsd;

      let liquidationThresholdAfter;
      let collateralAfterAction;

      if (action === Action.Withdraw) {
        liquidationThresholdAfter =
          (totalCollateralUsd * currentLiquidationThreshold -
            amountUsd * assetConfig.liquidationThreshold.bigIntValue) /
          totalCollateralAfter;

        collateralAfterAction = userAccountData.totalCollateralUsd.bigIntValue - amountUsd;
      } else {
        liquidationThresholdAfter =
          (totalCollateralUsd * currentLiquidationThreshold +
            amountUsd * assetConfig.liquidationThreshold.bigIntValue) /
          (totalCollateralUsd + amountUsd);

        collateralAfterAction = userAccountData.totalCollateralUsd.bigIntValue + amountUsd;
      }

      futureHealthFactor =
        (collateralAfterAction * liquidationThresholdAfter * ONE_ETHER) /
        (MAX_LIQUIDATION_THRESHOLD * userAccountData.totalDebtUsd.bigIntValue);
    }
  }

  return {
    isLoading:
      isTokenDataLoading ||
      isAssetConfigurationLoading ||
      isUserAccountDataLoading ||
      isPriceLoading ||
      isUserReserveDataLoading,
    isFetched,
    data: futureHealthFactor && {
      bigIntValue: futureHealthFactor,
      decimals: 18,
      symbol: "",
    },
  };
};

export const useFetchViewHealthFactorAfterAction = ({ reserve, amount, action }: HealthFactorAfterActionParams) => {
  const {
    isLoading,
    isFetched,
    data: futureHealthFactor,
  } = useFetchHealthFactorAfterAction({ reserve, amount, action });

  return {
    isLoading,
    isFetched,
    data: futureHealthFactor ? formatFetchBigIntToHealthFactor(futureHealthFactor) : undefined,
  };
};
