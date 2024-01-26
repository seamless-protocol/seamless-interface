import { useReadLoopStrategyCollateral } from "../../../../generated/generated";
import {
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../utils/helpers";

function useFetchTotalMarketSize() {
  const {
    data: collateralUSD,
    isLoading,
    isFetched,
  } = useReadLoopStrategyCollateral();

  return {
    isLoading,
    isFetched,
    collateralUSD: formatUnitsToNumber(collateralUSD, 8),
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
