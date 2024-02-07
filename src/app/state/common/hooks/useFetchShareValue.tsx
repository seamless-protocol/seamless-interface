import { useBlock, useReadContracts } from "wagmi";
import { StrategyConfig } from "../../loop-strategy/config/StrategyConfig";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import { ONE_ETHER } from "../../../meta/constants";

export const useFetchShareValueInBlock = (
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

  let shareValueInUsd, shareValueInEth, shareValueInUnderlyingAsset;
  if (results) {
    const equity = results[0].result || 0n;
    const totalSupply = results[1].result || 0n;
    const underlyingAssetPrice = results[2].result || 0n;
    const wethPrice = results[3].result || 0n;

    if (totalSupply !== 0n && underlyingAssetPrice !== 0n) {
      shareValueInUnderlyingAsset = (equity * ONE_ETHER) / totalSupply;
      shareValueInEth =
        (equity * underlyingAssetPrice * ONE_ETHER) / (wethPrice * totalSupply);
      shareValueInUsd = (equity * underlyingAssetPrice) / totalSupply;
    }
  }

  return {
    isLoading,
    isFetched,
    shareValueInUsd,
    shareValueInEth,
    shareValueInUnderlyingAsset,
  };
};

export const useFetchShareValue = (strategyConfig: StrategyConfig) => {
  const {
    data: block,
    isLoading: isBlockLoading,
    isFetched: isBlockedFetched,
  } = useBlock();

  const {
    shareValueInUsd,
    shareValueInEth,
    shareValueInUnderlyingAsset,
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
  } = useFetchShareValueInBlock(block?.number || 0n, strategyConfig);

  return {
    isLoading: isBlockLoading || isShareValueLoading,
    isFetched: isBlockedFetched && isShareValueFetched,
    shareValueInUsd,
    shareValueInEth,
    shareValueInUnderlyingAsset,
  };
};
