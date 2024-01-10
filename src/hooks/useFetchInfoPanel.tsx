import { formatUnits } from "viem";
import { useSeamlessContractReads } from "./useSeamlessContractReads";
import { formatOnTwoDecimals } from "../utils/helpers";

export const useFetchInfoPanel = () => {
  const { data: results } = useSeamlessContractReads([
    {
      contractName: "LoopStrategy",
      functionName: "equityUSD",
      args: [] as never[],
    },
    {
      contractName: "LoopStrategy",
      functionName: "collateral",
      args: [] as never[],
    },
    {
      contractName: "LoopStrategy",
      functionName: "debt",
      args: [] as never[],
    },
  ]);

  return {
    equity: formatOnTwoDecimals(
      formatUnits((results?.[0].result || 0) as unknown as bigint, 8)
    ),
    collateral: formatOnTwoDecimals(
      formatUnits((results?.[1].result || 0) as unknown as bigint, 8)
    ),
    debt: formatOnTwoDecimals(
      formatUnits((results?.[2].result || 0) as unknown as bigint, 8)
    ),
  };
};
