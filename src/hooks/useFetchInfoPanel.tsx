import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import { useReadContracts } from "wagmi";
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
    equity: formatOnTwoDecimals(formatToNumber(results?.[0].result, 8)),
    collateral: formatOnTwoDecimals(formatToNumber(results?.[1].result, 8)),
    debt: formatOnTwoDecimals(formatToNumber(results?.[2].result, 8)),
  };
};
