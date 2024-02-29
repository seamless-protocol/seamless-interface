import { useBlock } from "wagmi";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  APY_BLOCK_FRAME,
  COMPOUNDING_PERIODS_APY,
  SECONDS_PER_YEAR,
} from "../../../meta/constants";
import {
  formatFetchNumberToViewNumber,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { Fetch, FetchNumber } from "src/shared/types/Fetch";
import { ViewStrategyApy } from "../types/ViewStrategyApy";
import { Displayable } from "src/shared/types/Displayable";
import { useFetchAssetPriceInBlock } from "../../asset/hooks/useFetchViewAssetPrice";

export function calculateApy(
  endValue: bigint,
  startValue: bigint,
  timeWindow: bigint
): number {
  if (startValue === 0n || endValue === 0n || timeWindow === 0n) {
    return 0;
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

interface StrategyApy {
  apy: FetchNumber;
}

export const useFetchStrategyApy = (
  strategyConfig: StrategyConfig
): Fetch<StrategyApy> => {
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
    price: shareValueInUsdLatestBlock,
    isLoading: isLatestBlockShareValueLoading,
    isFetched: isLatestBlockShareValueFetched,
  } = useFetchAssetPriceInBlock(
    strategyConfig.address,
    latestBlockData?.number || 0n
  );
  const {
    price: shareValueInUsdPrevBlock,
    isLoading: isPrevBlockShareValueLoading,
    isFetched: isPrevBlockShareValueFetched,
  } = useFetchAssetPriceInBlock(
    strategyConfig.address,
    prevBlockData?.number || 0n
  );

  const apy = calculateApy(
    shareValueInUsdLatestBlock.bigIntValue,
    shareValueInUsdPrevBlock.bigIntValue,
    (latestBlockData?.timestamp || 0n) - (prevBlockData?.timestamp || 0n)
  );

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
    apy: {
      value: apy ? apy : strategyConfig.defaultApy,
      symbol: "%",
    },
  };
};

export const useFetchViewStrategyApy = (
  index: number
): Displayable<ViewStrategyApy> => {
  const { apy, isLoading, isFetched } = useFetchStrategyApy(
    ilmStrategies[index]
  );

  return {
    isLoading,
    isFetched,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
