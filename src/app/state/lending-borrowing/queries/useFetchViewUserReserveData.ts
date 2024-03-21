import { Address } from "viem";
import {
  Displayable,
  useSeamlessContractRead,
  useToken,
} from "../../../../shared";
import {
  protocolDataProviderAbi,
  protocolDataProviderAddress,
} from "../../../generated";
import { useAccount } from "wagmi";
import { ViewUserReserveData } from "../types/ViewUserReserveData";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";

export const useFetchUserReserveData = (reserve: Address) => {
  const account = useAccount();

  const {
    data: { decimals },
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

  const [aTokenBalance, , variableDebtTokenBalance] = data || [];

  return {
    ...rest,
    isLoading: isTokenDataLoading || isUserReserveDataLoading,
    isFetched: isTokenDataFetched && isUserReserveDataFetched,
    data: {
      aTokenBalance: {
        bigIntValue: aTokenBalance || 0n,
        decimals,
        symbol: "",
      },
      variableDebtTokenBalance: {
        bigIntValue: variableDebtTokenBalance || 0n,
        decimals,
        symbol: "",
      },
    },
  };
};

export const useFetchViewUserReserveData = (
  reserve: Address
): Displayable<ViewUserReserveData> => {
  const {
    isLoading,
    isFetched,
    data: { aTokenBalance, variableDebtTokenBalance },
  } = useFetchUserReserveData(reserve);

  return {
    isLoading,
    isFetched,
    data: {
      aTokenBalance: formatFetchBigIntToViewBigInt(aTokenBalance),
      variableDebtTokenBalance: formatFetchBigIntToViewBigInt(
        variableDebtTokenBalance
      ),
    },
  };
};
