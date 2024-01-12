import { useReadContracts } from "wagmi";
import { formatBigIntOnTwoDecimals } from "../utils/helpers";
import { loopStrategyAbi, loopStrategyAddress } from "../generated/generated";

export const useFetchInfoPanel = () => {
  const { data: results } = useReadContracts({
    contracts: [
      {
        address: loopStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
      },
      {
        address: loopStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "collateral",
      },
      {
        address: loopStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "debt",
      },
    ],
  });

  return {
    equity: formatBigIntOnTwoDecimals(results?.[0].result, 8),
    collateral: formatBigIntOnTwoDecimals(results?.[1].result, 8),
    debt: formatBigIntOnTwoDecimals(results?.[2].result, 8),
  };
};
