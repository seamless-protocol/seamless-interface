import { useBlock } from "wagmi";
import { APY_BLOCK_FRAME } from "@meta";
import { formatFetchNumberToViewNumber } from "../../../../shared/utils/helpers";
import { Displayable, ViewNumber } from "src/shared/types/Displayable";
import { Address } from "viem";
import { useFetchStrategiesAssets } from "../metadataQueries/useFetchStrategiesAssets";
import { ilmAssetStrategiesMap } from "../config/StrategyConfig";
import { useQueries } from "@tanstack/react-query";
import { mergeQueryStates } from "@shared";
import { fetchStrategyApyQueryOptions } from "./useFetchViewStrategyApy";

export const useFetchMaxStrategyApy = (strategy?: Address) => {
  const { data: latestBlockData } = useBlock();
  const { data: prevBlockData } = useBlock({
    blockNumber: latestBlockData ? latestBlockData.number - APY_BLOCK_FRAME : undefined,
  });

  const strategiesData = strategy ? ilmAssetStrategiesMap.get(strategy) || [] : [];
  const { data: assetsData, ...assetsRest } = useFetchStrategiesAssets(strategiesData.map((s) => s.address));

  const queryResults = useQueries({
    queries: strategiesData.map((strategy) =>
      fetchStrategyApyQueryOptions({
        strategy: strategy?.address,
        latestBlockData,
        prevBlockData,
        assetsData: assetsData[strategy?.address],
      })
    ),
  });

  const maxApy = queryResults.reduce((max, result) => {
    if (result.status === "success" && result.data !== undefined && result.data > max) {
      return result.data;
    }
    return max;
  }, 0);

  return {
    ...mergeQueryStates([...queryResults, assetsRest]),
    data: {
      value: maxApy,
      symbol: "%",
    },
  };
};

export const useFetchViewMaxStrategyApy = (strategy?: Address): Displayable<ViewNumber> => {
  const { data, ...rest } = useFetchMaxStrategyApy(strategy);

  return { ...rest, data: formatFetchNumberToViewNumber(data) };
};
