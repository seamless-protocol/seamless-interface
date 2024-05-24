import { useSeamlessContractRead } from "@shared";
import { poolDataProviderAddress, poolDataProviderAbi } from "@generated";
import { AAVE_ADDRESS_PROVIDER } from "@meta";

export const useFetchRawReservesData = () => {
  return useSeamlessContractRead({
    address: poolDataProviderAddress,
    abi: poolDataProviderAbi,
    functionName: "getReservesData",
    args: [AAVE_ADDRESS_PROVIDER],
  });
};
