import { Address } from "viem";
import { useSeamlessContractRead } from "@shared";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";
import { FetchData } from "../../../../shared/types/Fetch";

export interface ReserveTokenAddresses {
  aTokenAddress: Address | undefined;
  stableDebtTokenAddress: Address | undefined;
  variableDebtTokenAddress: Address | undefined;
}

export const useFetchReserveTokenAddresses = (reserve: Address): FetchData<ReserveTokenAddresses> => {
  const { data, ...rest } = useSeamlessContractRead({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: "getReserveTokensAddresses",
    args: [reserve],
    query: {
      staleTime: Infinity,
    },
  });

  return {
    ...rest,
    data: {
      aTokenAddress: data?.[0] as Address,
      stableDebtTokenAddress: data?.[1] as Address,
      variableDebtTokenAddress: data?.[2] as Address,
    },
  };
};
