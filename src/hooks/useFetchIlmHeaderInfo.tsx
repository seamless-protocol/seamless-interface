import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import { useReadLoopStrategyCollateral } from "../generated";

export const useFetchIlmHeaderInfo = () => {
  const { data: collateralUSD } = useReadLoopStrategyCollateral();

  return {
    collateralUSD: formatOnTwoDecimals(formatToNumber(collateralUSD, 8)),
  };
};
