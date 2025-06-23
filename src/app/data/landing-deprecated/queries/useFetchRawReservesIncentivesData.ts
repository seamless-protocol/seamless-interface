import { useReadContract } from "wagmi";
import { incentiveDataProviderAbi, incentiveDataProviderAddress } from "../../../generated";
import { AAVE_ADDRESS_PROVIDER } from "@meta";

/**
 * Fetches incentives data from smart contract for all assets in lending pool
 * @returns Returns raw incentives data from smart contract. Data is not formatted due to complexity of structure
 */
export const useFetchRawReservesIncentivesData = () => {
  return useReadContract({
    address: incentiveDataProviderAddress,
    abi: incentiveDataProviderAbi,
    functionName: "getReservesIncentivesData",
    args: [AAVE_ADDRESS_PROVIDER],
    query: {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  });
};
