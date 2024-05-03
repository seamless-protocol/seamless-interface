import { useBlock } from "wagmi";
import { ilmAssetStrategiesMap } from "../config/StrategyConfig";
import { APY_BLOCK_FRAME, COMPOUNDING_PERIODS_APY, SECONDS_PER_YEAR } from "@meta";
import { formatFetchNumberToViewNumber, formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "src/shared/types/Fetch";
import { Displayable, ViewNumber } from "src/shared/types/Displayable";
import { useFetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";
import { Address } from "viem";
import { useFetchStrategyAssets } from "../metadataQueries/useFetchStrategyAssets";
import { mergeQueryStates } from "@shared";

export function calculateApy(endValue: bigint, startValue: bigint, timeWindow: bigint): number {
  if (startValue === 0n || endValue === 0n || timeWindow === 0n) {
    return 0;
  }

  const endValueNumber = formatUnitsToNumber(endValue, 18);
  const startValueNumber = formatUnitsToNumber(startValue, 18);
  const timeWindowNumber = Number(timeWindow);

  const apr = (endValueNumber / startValueNumber) ** (SECONDS_PER_YEAR / timeWindowNumber) - 1;

  return ((1 + apr / COMPOUNDING_PERIODS_APY) ** COMPOUNDING_PERIODS_APY - 1) * 100;
}

export const useFetchStrategyApy = (strategy: Address): FetchData<FetchNumber> => {
  const { data: latestBlockData, ...latestBlockRest } = useBlock();
  const { data: prevBlockData, ...prevBlockRest } = useBlock({
    query: { enabled: !!latestBlockData },
    blockNumber: latestBlockData ? latestBlockData.number - APY_BLOCK_FRAME : 0n,
  });

  // todo update enabled everywhere(in hooks)
  const { data: strategyAssets, ...strategyAssetsRest } = useFetchStrategyAssets(strategy);
  const { data: shareValueInLatestBlock, ...latestBlockShareValueRest } = useFetchAssetPriceInBlock(
    strategy,
    latestBlockData?.number,
    strategyAssets?.debt
  );
  const { data: shareValueInPrevBlock, ...prevBlockShareValueRest } = useFetchAssetPriceInBlock(
    strategy,
    prevBlockData?.number,
    strategyAssets?.debt
  );

  // todo refactor this
  const apy =
    latestBlockData?.timestamp &&
    prevBlockData?.timestamp &&
    shareValueInLatestBlock?.bigIntValue &&
    shareValueInPrevBlock?.bigIntValue
      ? calculateApy(
          shareValueInLatestBlock.bigIntValue,
          shareValueInPrevBlock.bigIntValue,
          // todo fix this
          latestBlockData?.timestamp - prevBlockData?.timestamp
        )
      : 0;

  const strategies = strategyAssets ? ilmAssetStrategiesMap.get(strategyAssets?.underlying) || [] : [];
  const strategyConfig = strategies.find((s) => s.address === strategy);

  return {
    ...mergeQueryStates([
      latestBlockRest,
      prevBlockRest,
      strategyAssetsRest,
      latestBlockShareValueRest,
      prevBlockShareValueRest,
    ]),
    data: {
      value: strategyConfig?.defaultApy ? strategyConfig.defaultApy : apy,
      symbol: "%",
    },
  };
};

export const useFetchViewStrategyApy = (strategy: Address): Displayable<ViewNumber> => {
  const { data, ...rest } = useFetchStrategyApy(strategy);

  return { ...rest, data: formatFetchNumberToViewNumber(data) };
};
