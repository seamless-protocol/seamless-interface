import { lendingPoolAbi, lendingPoolAddress } from "@generated";
import { useReadContract } from "wagmi";

export const useFetchRawReservesList = () => {
  return useReadContract({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getReservesList",
  });
};
