import { Address } from "viem";
import { Displayable, useSeamlessContractRead, useToken } from "../../../../shared";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";
import { useAccount } from "wagmi";
import { ViewUserReserveData } from "../types/ViewUserReserveData";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";

interface UserReserveData {
  aTokenBalance: FetchBigInt;
  variableDebtTokenBalance: FetchBigInt;
  usageAsCollateralEnabled?: boolean;
}

export const useFetchUserReserveData = (reserve: Address): FetchData<UserReserveData> => {
  const account = useAccount();

  const {
    data: { decimals, symbol },
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
  } = useToken(reserve);

  const {
    data,
    isLoading: isUserReserveDataLoading,
    isFetched: isUserReserveDataFetched,
    ...rest
  } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getUserReserveData",
    args: [reserve, account.address as Address],
  });

  const [aTokenBalance, , variableDebtTokenBalance, , , , , , usageAsCollateralEnabled] = data || [];

  return {
    ...rest,
    isLoading: isTokenDataLoading || isUserReserveDataLoading,
    isFetched: isTokenDataFetched && isUserReserveDataFetched,
    data: {
      aTokenBalance: {
        bigIntValue: aTokenBalance || 0n,
        decimals,
        symbol,
      },
      variableDebtTokenBalance: {
        bigIntValue: variableDebtTokenBalance || 0n,
        decimals,
        symbol,
      },
      usageAsCollateralEnabled,
    },
  };
};

export const useFetchViewUserReserveData = (reserve: Address): Displayable<ViewUserReserveData> => {
  const {
    isLoading,
    isFetched,
    data: { aTokenBalance, variableDebtTokenBalance, usageAsCollateralEnabled },
  } = useFetchUserReserveData(reserve);

  return {
    isLoading,
    isFetched,
    data: {
      aTokenBalance: formatFetchBigIntToViewBigInt(aTokenBalance),
      variableDebtTokenBalance: formatFetchBigIntToViewBigInt(variableDebtTokenBalance),
      usageAsCollateralEnabled,
    },
  };
};
