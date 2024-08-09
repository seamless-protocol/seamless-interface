import { useSeamlessContractRead } from "@shared";
import { lendingPoolAbi, lendingPoolAddress } from "@generated";

export const useFetchRawReservesList = () => {
  return useSeamlessContractRead({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getReservesList",
  });
};
