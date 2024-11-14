import { Address } from "viem";
import { Displayable, fFetchBigIntStructured, mergeQueryStates, useToken } from "../../../../shared";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";
import { useAccount, useReadContract } from "wagmi";
import { ViewUserReserveData } from "../types/ViewUserReserveData";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";

interface UserReserveData {
  aTokenBalance?: FetchBigInt;
  variableDebtTokenBalance?: FetchBigInt;
  usageAsCollateralEnabled?: boolean;
}

export const useFetchUserReserveData = (reserve?: Address): FetchData<UserReserveData> => {
  const account = useAccount();

  const {
    data: { decimals, symbol },
    ...tokenRest
  } = useToken(reserve);

  const { data, ...rest } = useReadContract({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getUserReserveData",
    args: [reserve!, account.address as Address],
    query: {
      enabled: !!reserve && !!account.address,
    },
  });

  const [aTokenBalance, , variableDebtTokenBalance, , , , , , usageAsCollateralEnabled] = data || [];

  return {
    ...mergeQueryStates([tokenRest, rest]),
    data: {
      aTokenBalance: fFetchBigIntStructured(aTokenBalance, decimals, symbol),
      variableDebtTokenBalance: fFetchBigIntStructured(variableDebtTokenBalance, decimals, symbol),
      usageAsCollateralEnabled,
    },
  };
};

export const useFetchViewUserReserveData = (reserve: Address): Displayable<ViewUserReserveData> => {
  const {
    data: { aTokenBalance, variableDebtTokenBalance, usageAsCollateralEnabled },
    ...rest
  } = useFetchUserReserveData(reserve);

  return {
    ...rest,
    data: {
      aTokenBalance: formatFetchBigIntToViewBigInt(aTokenBalance),
      variableDebtTokenBalance: formatFetchBigIntToViewBigInt(variableDebtTokenBalance),
      usageAsCollateralEnabled,
    },
  };
};
