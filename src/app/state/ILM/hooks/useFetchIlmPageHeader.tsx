import { loopStrategyAbi } from "../../../generated/generated";
import {
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { ilmStrategies } from "../../loop-strategy/config/StrategyConfig";
import { useReadContracts } from "wagmi";

function useFetchTotalMarketSize() {
  const multicallParams = ilmStrategies.map((strategy) => ({
    address: strategy.address,
    abi: loopStrategyAbi,
    functionName: "collateral",
  }));

  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: multicallParams,
  });

  let totalMarketSize = 0n;
  if (results) {
    for (const result of results) {
      if (!result.error) {
        totalMarketSize = totalMarketSize + ((result.result as bigint) || 0n);
      }
    }
  }

  return {
    isLoading,
    isFetched,
    collateralUSD: formatUnitsToNumber(totalMarketSize, 8),
  };
}

export const useFetchIlmHeaderInfo = () => {
  const { collateralUSD, isLoading, isFetched } = useFetchTotalMarketSize();

  return {
    isLoading,
    isFetched,
    data: {
      totalMarketSize: {
        value: formatToDisplayable(collateralUSD),
        symbol: "$",
      },
    },
  };
};
