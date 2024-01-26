import { useReadLoopStrategyCollateral } from "../generated/generated";
import { formatOnTwoDecimals, formatUnitsToNumber } from "../utils/helpers";

export const useFetchIlmHeaderInfo = () => {
  const { data: collateralUSD, isLoading } = useReadLoopStrategyCollateral();

  return {
    isLoading,
    collateralUSD: formatOnTwoDecimals(formatUnitsToNumber(collateralUSD, 8)),
  };
};
