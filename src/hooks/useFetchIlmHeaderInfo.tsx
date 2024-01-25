import { useReadLoopStrategyCollateral } from "../generated/generated";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";

export const useFetchIlmHeaderInfo = () => {
  const { data: collateralUSD, isLoading } = useReadLoopStrategyCollateral();

  return {
    isLoading,
    collateralUSD: formatOnTwoDecimals(formatToNumber(collateralUSD, 8)),
  };
};
