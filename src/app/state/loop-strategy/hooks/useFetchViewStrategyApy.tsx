import { useBlock } from "wagmi";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  APY_BLOCK_FRAME,
  COMPOUNDING_PERIODS_APY,
  SECONDS_PER_YEAR,
} from "../../../meta/constants";
import {
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { useFetchShareValueInBlock } from "../../common/hooks/useFetchShareValue";

export function calculateApy(
  endValue: bigint,
  startValue: bigint,
  timeWindow: bigint
) {
  if (startValue === 0n || endValue === 0n || timeWindow === 0n) {
    return undefined;
  }

  const endValueNumber = formatUnitsToNumber(endValue, 18);
  const startValueNumber = formatUnitsToNumber(startValue, 18);
  const timeWindowNumber = Number(timeWindow);

  const apr =
    (endValueNumber / startValueNumber) **
      (SECONDS_PER_YEAR / timeWindowNumber) -
    1;

  return (
    ((1 + apr / COMPOUNDING_PERIODS_APY) ** COMPOUNDING_PERIODS_APY - 1) * 100
  );
}

export const useFetchStrategyApy = (strategyConfig: StrategyConfig) => {
  const {
    data: latestBlockData,
    isLoading: isLatestBlockLoading,
    isFetched: isLatestBlockFetched,
  } = useBlock();
  const {
    data: prevBlockData,
    isLoading: isPrevBlockLoading,
    isFetched: isPrevBlockFetched,
  } = useBlock({
    blockNumber: latestBlockData
      ? latestBlockData?.number - APY_BLOCK_FRAME
      : 0n,
  });

  const {
    shareValueInEth: shareValueInEthLatestBlock,
    isLoading: isLatestBlockShareValueLoading,
    isFetched: isLatestBlockShareValueFetched,
  } = useFetchShareValueInBlock(latestBlockData?.number || 0n, strategyConfig);
  const {
    shareValueInEth: shareValueInEthPrevBlock,
    isLoading: isPrevBlockShareValueLoading,
    isFetched: isPrevBlockShareValueFetched,
  } = useFetchShareValueInBlock(prevBlockData?.number || 0n, strategyConfig);

  return {
    isLoading:
      isLatestBlockShareValueLoading ||
      isPrevBlockShareValueLoading ||
      isLatestBlockLoading ||
      isPrevBlockLoading,
    isFetched:
      isLatestBlockShareValueFetched &&
      isPrevBlockShareValueFetched &&
      isLatestBlockFetched &&
      isPrevBlockFetched,
    apy: calculateApy(
      shareValueInEthLatestBlock || 0n,
      shareValueInEthPrevBlock || 0n,
      (latestBlockData?.timestamp || 0n) - (prevBlockData?.timestamp || 0n)
    ),
  };
};

export const useFetchViewStrategyApy = (index: number) => {
  const { apy, isLoading, isFetched } = useFetchStrategyApy(
    ilmStrategies[index]
  );

  return {
    isLoading,
    isFetched,
    data: {
      apy: {
        value: apy ? formatToDisplayable(apy) : "—",
        symbol: apy ? "%" : "",
      },
    },
  };
};
