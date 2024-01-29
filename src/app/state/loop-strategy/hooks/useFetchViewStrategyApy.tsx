import { useBlock, useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  APY_BLOCK_FRAME,
  ONE_ETHER,
  SECONDS_PER_YEAR,
} from "../../../meta/constants";
import {
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";

function calculateApy(
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
  return (
    ((endValueNumber / startValueNumber) **
      (SECONDS_PER_YEAR / timeWindowNumber) -
      1) *
    100
  );
}

export const useFetchShareValue = (
  blockNumber: bigint,
  strategyConfig: StrategyConfig
) => {
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: [
      {
        address: strategyConfig.address,
        abi: loopStrategyAbi,
        functionName: "equity",
      },
      {
        address: strategyConfig.address,
        abi: loopStrategyAbi,
        functionName: "totalSupply",
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [strategyConfig.underlyingAsset.address],
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [strategyConfig.debtAsset.address],
      },
    ],
    blockNumber,
  });

  let shareValueInUsd, shareValueInEth;
  if (results) {
    const equity = results[0].result || 0n;
    const totalSupply = results[1].result || 0n;
    const underlyingAssetPrice = results[2].result || 0n;
    const wethPrice = results[3].result || 0n;

    if (totalSupply !== 0n && underlyingAssetPrice !== 0n) {
      shareValueInEth =
        (equity * wethPrice * ONE_ETHER) / (underlyingAssetPrice * totalSupply);
      shareValueInUsd = (shareValueInEth * wethPrice) / ONE_ETHER;
    }
  }

  return {
    isLoading,
    isFetched,
    shareValueInUsd,
    shareValueInEth,
  };
};

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
  } = useFetchShareValue(latestBlockData?.number || 0n, strategyConfig);
  const {
    shareValueInEth: shareValueInEthPrevBlock,
    isLoading: isPrevBlockShareValueLoading,
    isFetched: isPrevBlockShareValueFetched,
  } = useFetchShareValue(prevBlockData?.number || 0n, strategyConfig);

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
