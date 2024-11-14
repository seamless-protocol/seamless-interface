import { poolDataProviderAddress, poolDataProviderAbi } from "@generated";
import { AAVE_ADDRESS_PROVIDER } from "@meta";
import { useReadContract } from "wagmi";

export const useFetchRawReservesData = () => {
  return useReadContract({
    address: poolDataProviderAddress,
    abi: poolDataProviderAbi,
    functionName: "getReservesData",
    args: [AAVE_ADDRESS_PROVIDER],
  });
};
