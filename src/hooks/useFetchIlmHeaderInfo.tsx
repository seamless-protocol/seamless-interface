import { formatOnTwoDecimals, formatUnitsToNumber } from "../utils/helpers";
import { useReadLoopStrategyCollateral } from "../generated/generated";

export const useFetchIlmHeaderInfo = () => {
  const { data: collateralUSD, isLoading } = useReadLoopStrategyCollateral();

  return {
    isLoading,
    collateralUSD: formatOnTwoDecimals(formatUnitsToNumber(collateralUSD, 8)),
  };
};
