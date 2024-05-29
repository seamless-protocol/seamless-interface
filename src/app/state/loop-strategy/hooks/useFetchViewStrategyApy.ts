import { useBlock } from "wagmi";
import { APY_BLOCK_FRAME, COMPOUNDING_PERIODS_APY, SECONDS_PER_YEAR } from "@meta";
import { formatFetchNumberToViewNumber, formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "src/shared/types/Fetch";
import { Displayable, ViewNumber } from "src/shared/types/Displayable";
import { Address } from "viem";
import { useFetchStrategyAssets } from "../metadataQueries/useFetchStrategyAssets";
import { mergeQueryStates } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { semiSensitiveDataQueryConfig } from "../../settings/config";
import { rainbowConfig } from "../../../config/rainbow.config";
import { fetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";
import { StrategyAsset } from "../metadataQueries/useFetchStrategiesAssets";

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

export async function fetchStrategyApy(
  strategy: Address,
  latestBlockData?: any,
  prevBlockData?: any,
  strategyAssets?: StrategyAsset
): Promise<number | undefined> {
  if (latestBlockData == null || prevBlockData == null || strategyAssets == null) return undefined;

  const shareValueInLatestBlock = await fetchAssetPriceInBlock(
    rainbowConfig,
    strategy,
    latestBlockData?.number,
    strategyAssets?.debt
  );
  const shareValueInPrevBlock = await fetchAssetPriceInBlock(
    rainbowConfig,
    strategy,
    prevBlockData.number,
    strategyAssets?.debt
  );

  return calculateApy(
    shareValueInLatestBlock || 0n,
    shareValueInPrevBlock || 0n,
    BigInt(latestBlockData.timestamp - prevBlockData.timestamp)
  );
}

export const useFetchStrategyApy = (strategy?: Address): FetchData<FetchNumber> => {
  const { data: latestBlockData, ...latestBlockRest } = useBlock();

  const enabled = !!latestBlockData?.number;
  const blockNumber = enabled ? latestBlockData.number - APY_BLOCK_FRAME : undefined;

  const { data: prevBlockData, ...prevBlockRest } = useBlock({
    query: { enabled },
    blockNumber,
  });

  const { data: strategyAssets, ...strategyAssetsRest } = useFetchStrategyAssets(strategy);

  const result = useQuery({
    queryKey: ["strategyApy", strategy],
    queryFn: () => fetchStrategyApy(strategy!, latestBlockData, prevBlockData, strategyAssets),
    enabled: !!latestBlockData && !!prevBlockData && !!strategy && !!strategyAssets,
    ...semiSensitiveDataQueryConfig, // is this okay to start using?
  });

  return {
    ...mergeQueryStates([latestBlockRest, prevBlockRest, strategyAssetsRest, result]),
    data: {
      value: result.data,
      symbol: "%",
    },
  };
};

export const useFetchViewStrategyApy = (strategy?: Address): Displayable<ViewNumber> => {
  const { data, ...rest } = useFetchStrategyApy(strategy);

  return { ...rest, data: formatFetchNumberToViewNumber(data) };
};
