import { Address } from "viem";
import { useFetchUserReserveData } from "../queries/useFetchViewUserReserveData";
import { DecimalsOptions, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable, fUsdValueStructured, mergeQueryStates } from "../../../../shared";
import { ViewDetailUserReserveData } from "../types/ViewDetailUserReserveData";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

export interface DetailUserReserveData {
  aTokenBalance?: FetchBigInt;
  aTokenBalanceUsd?: FetchBigInt;
  variableDebtTokenBalance?: FetchBigInt;
  variableDebtTokenBalanceUsd?: FetchBigInt;
  usageAsCollateralEnabled?: boolean;
}

export const useFetchDetailUserReserveData = (reserve?: Address): FetchData<DetailUserReserveData> => {
  const { data: price, ...priceRest } = useFetchAssetPrice({ asset: reserve });

  const {
    data: { aTokenBalance, variableDebtTokenBalance, usageAsCollateralEnabled },
    ...userReserveRest
  } = useFetchUserReserveData(reserve);

  const aTokenBalanceUsd = cValueInUsd(aTokenBalance?.bigIntValue, price?.bigIntValue, aTokenBalance?.decimals);
  const variableDebtTokenBalanceUsd = cValueInUsd(
    variableDebtTokenBalance?.bigIntValue,
    price?.bigIntValue,
    variableDebtTokenBalance?.decimals
  );

  return {
    ...mergeQueryStates([userReserveRest, priceRest]),
    data: {
      aTokenBalance,
      aTokenBalanceUsd: fUsdValueStructured(aTokenBalanceUsd),
      variableDebtTokenBalance,
      variableDebtTokenBalanceUsd: fUsdValueStructured(variableDebtTokenBalanceUsd),
      usageAsCollateralEnabled,
    },
  };
};

export const useFetchViewDetailUserReserveData = (
  reserve: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewDetailUserReserveData> => {
  const {
    data: {
      aTokenBalance,
      aTokenBalanceUsd,
      variableDebtTokenBalance,
      variableDebtTokenBalanceUsd,
      usageAsCollateralEnabled,
    },
    ...rest
  } = useFetchDetailUserReserveData(reserve);

  return {
    ...rest,
    data: {
      supplied: {
        tokenAmount: formatFetchBigIntToViewBigInt(aTokenBalance, decimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(aTokenBalanceUsd, decimalsOptions),
      },
      borrowed: {
        tokenAmount: formatFetchBigIntToViewBigInt(variableDebtTokenBalance, decimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(variableDebtTokenBalanceUsd, decimalsOptions),
      },
      usageAsCollateralEnabled,
    },
  };
};
