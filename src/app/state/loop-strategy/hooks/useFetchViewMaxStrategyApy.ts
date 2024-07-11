import { useBlock } from "wagmi";
import { APY_BLOCK_FRAME } from "@meta";
import { formatFetchNumberToViewNumber } from "../../../../shared/utils/helpers";
import { Displayable, ViewNumber } from "src/shared/types/Displayable";
import { Address } from "viem";
import { useFetchStrategiesAssets } from "../metadataQueries/useFetchStrategiesAssets";
import { useQueries } from "@tanstack/react-query";
import { mergeQueryStates } from "@shared";
import { fetchStrategyApyQueryOptions } from "./useFetchViewStrategyApy";
import { useFetchStrategyByAddress } from "../../common/hooks/useFetchStrategyByAddress";

export const useFetchMaxStrategyApy = (strategy?: Address) => {
  const { data: latestBlockData } = useBlock();
  const { data: prevBlockData } = useBlock({
    blockNumber: latestBlockData ? latestBlockData.number - APY_BLOCK_FRAME : undefined,
  });
  const { data: strategyState } = useFetchStrategyByAddress(strategy);
  const { data: assetsData, ...assetsRest } = useFetchStrategiesAssets(
    strategyState?.subStrategyData.map((s) => s.address) || []
  );

  const queryResults = useQueries({
    queries: strategyState
      ? strategyState.subStrategyData.map((strategy) =>
          fetchStrategyApyQueryOptions({
            strategy: strategy?.address,
            latestBlockData,
            prevBlockData,
            assetsData: assetsData[strategy?.address],
          })
        )
      : [],
  });

  const maxApyData = queryResults.reduce(
    (currMaxApyData, result) => {
      if (
        result.status === "success" &&
        result.data !== undefined &&
        result.data.apy !== undefined &&
        result.data.apy > currMaxApyData.apy
      ) {
        return { strategy: result.data.strategy, apy: result.data.apy };
      }
      return {
        strategy: currMaxApyData.strategy,
        apy: currMaxApyData.apy,
      };
    },
    { strategy: undefined as Address | undefined, apy: 0 }
  );

  return {
    ...mergeQueryStates([...queryResults, assetsRest]),
    data: {
      strategy: maxApyData.strategy,
      apy: {
        value: maxApyData.apy,
        symbol: "%",
      },
    },
  };
};

export const useFetchViewMaxStrategyApy = (strategy?: Address): Displayable<ViewNumber> => {
  const { data, ...rest } = useFetchMaxStrategyApy(strategy);

  return { ...rest, data: formatFetchNumberToViewNumber(data.apy) };
};
