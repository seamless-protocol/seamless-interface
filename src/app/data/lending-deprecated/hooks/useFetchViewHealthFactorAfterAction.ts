import { Address, parseEther } from "viem";
import { formatFetchBigIntToHealthFactor, fFetchBigIntStructured, mergeQueryStates } from "@shared";
import { useFetchUserAccountData } from "../queries/useFetchViewUserAccountData";
import { MAX_LIQUIDATION_THRESHOLD, ONE_ETHER } from "@meta";
import { useFetchAssetConfiguration } from "../queries/useFetchViewAssetConfiguration";
import { useFetchUserReserveData } from "../queries/useFetchViewUserReserveData";
import { useFullTokenData } from "../../common/meta-data-queries/useFullTokenData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

export enum Action {
  // eslint-disable-next-line no-unused-vars
  Deposit = "Deposit",
  // eslint-disable-next-line no-unused-vars
  Withdraw = "Withdraw",
}

interface HealthFactorAfterActionParams {
  reserve?: Address;
  amount?: string;
  action: Action;
}

export const useFetchHealthFactorAfterAction = ({ reserve, amount, action }: HealthFactorAfterActionParams) => {
  const { data: tokenData, ...tokenRest } = useFullTokenData(reserve);

  const { data: assetConfig, ...assetConfigRest } = useFetchAssetConfiguration(reserve);

  const { data: userAccountData, ...accountRest } = useFetchUserAccountData();

  const { data: userReserveData, ...reserveRest } = useFetchUserReserveData(reserve);

  const { data: price, ...priceRest } = useFetchAssetPrice({ asset: reserve });

  let futureHealthFactor;
  if (
    assetConfig &&
    tokenData &&
    userAccountData &&
    price &&
    userReserveData &&
    price?.bigIntValue != null &&
    assetConfig?.liquidationThreshold?.bigIntValue != null
  ) {
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
    ...mergeQueryStates([tokenRest, assetConfigRest, accountRest, reserveRest, priceRest]),
    data: fFetchBigIntStructured(futureHealthFactor, 18, ""),
  };
};

export const useFetchViewHealthFactorAfterAction = ({ reserve, amount, action }: HealthFactorAfterActionParams) => {
  const { data: futureHealthFactor, ...rest } = useFetchHealthFactorAfterAction({ reserve, amount, action });

  return {
    ...rest,
    data: futureHealthFactor ? formatFetchBigIntToHealthFactor(futureHealthFactor) : undefined,
  };
};
