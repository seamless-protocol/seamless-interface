import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useSeamlessContractRead } from "./useSeamlessContractRead";

function useFetchTotalBorrows() {
  const account = useAccount();

  const { data: balance } = useSeamlessContractRead({
    contractName: "Seam",
    functionName: "balanceOf",
    args: [account.address] as never[],
  });

  return formatUnits((balance || 0) as unknown as bigint, 18);
}

export const useFetchInfoPanel = () => {
  const balance = useFetchTotalBorrows();

  return {
    totalBorrows: balance,
  };
};
