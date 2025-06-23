import { useBlock } from "wagmi";
import { APY_BLOCK_FRAME } from "@meta";
import { formatFetchNumberToViewNumber } from "../../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "src/shared/types/Fetch";
import { Displayable, ViewNumber } from "src/shared/types/Displayable";
import { Address } from "viem";
import { useFetchStrategyAssets } from "../../metadata/useFetchStrategyAssets";
import { mergeQueryStates } from "@shared";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { StrategyAsset } from "../../metadata/useFetchStrategiesAssets";
import { config } from "../../../../config/rainbow.config";
import { fetchAssetPriceInBlock } from "../../../common/queries/useFetchViewAssetPrice";
import { calculateApy } from "./cStrategyApy.math";

interface StrategyApy {
  strategy: Address | undefined;
  apy: number | undefined;
}

export async function fetchStrategyApy(
  strategy: Address,
  latestBlockData?: any,
  prevBlockData?: any,
  strategyAssets?: StrategyAsset
): Promise<StrategyApy | undefined> {
  if (latestBlockData == null || prevBlockData == null || strategyAssets == null) return undefined;

  const shareValueInLatestBlock = await fetchAssetPriceInBlock(
    config,
    strategy,
    latestBlockData?.number,
    strategyAssets?.debt
  );
  const shareValueInPrevBlock = await fetchAssetPriceInBlock(
    config,
    strategy,
    prevBlockData.number,
    strategyAssets?.debt
  );

  if (shareValueInLatestBlock == null || shareValueInPrevBlock == null) return undefined;

  const apy = calculateApy(
    shareValueInLatestBlock,
    shareValueInPrevBlock,
    BigInt(latestBlockData.timestamp - prevBlockData.timestamp)
  );

  return {
    strategy,
    apy,
  };
}

export const fetchStrategyApyQueryOptions = ({
  strategy,
  latestBlockData,
  prevBlockData,
  assetsData,
}: {
  strategy?: Address;
  latestBlockData?: any;
  prevBlockData?: any;
  assetsData?: StrategyAsset;
}) => {
  return queryOptions({
    queryKey: ["strategyApy", strategy],
    queryFn: () => fetchStrategyApy(strategy!, latestBlockData, prevBlockData, assetsData),
    enabled: !!latestBlockData && !!prevBlockData && !!assetsData && !!strategy,
  });
};

export const useFetchStrategyApy = (strategy?: Address): FetchData<FetchNumber> => {
  const { data: latestBlockData, ...latestBlockRest } = useBlock();

  const enabled = !!latestBlockData?.number;
  const blockNumber = enabled ? latestBlockData.number - APY_BLOCK_FRAME : undefined;

  const { data: prevBlockData, ...prevBlockRest } = useBlock({
    query: { enabled },
    blockNumber,
  });

  const { data: strategyAssets, ...strategyAssetsRest } = useFetchStrategyAssets(strategy);

  const result = useQuery(
    fetchStrategyApyQueryOptions({
      strategy,
      latestBlockData,
      prevBlockData,
      assetsData: strategyAssets,
    })
  );

  return {
    ...mergeQueryStates([latestBlockRest, prevBlockRest, strategyAssetsRest, result]),
    data: {
      value: result.data?.apy,
      symbol: "%",
    },
  };
};

export const useFetchViewStrategyApy = (strategy?: Address): Displayable<ViewNumber> => {
  const { data, ...rest } = useFetchStrategyApy(strategy);

  return { ...rest, data: formatFetchNumberToViewNumber(data) };
};
