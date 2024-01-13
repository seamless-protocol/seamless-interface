import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import { useReadLoopStrategyCollateral } from "../generated";

export const useFetchIlmHeaderInfo = () => {
  const { data: collateralUSD, isLoading } = useReadLoopStrategyCollateral();

  return {
    isLoading,
    collateralUSD: formatOnTwoDecimals(formatToNumber(collateralUSD, 8)),
  };
};
