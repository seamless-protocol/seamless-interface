import { useBlock, useReadContract } from "wagmi";
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
  let {
    isLoading: isEquityLoading,
    isFetched: isEquityFetched,
    data: equity,
  } = useReadContract({
    address: strategyConfig.address,
    abi: loopStrategyAbi,
    functionName: "equity",
    blockNumber,
  });

  let {
    isLoading: isTotalSupplyLoading,
    isFetched: isTotalSupplyFetched,
    data: totalSupply,
  } = useReadContract({
    address: strategyConfig.address,
    abi: loopStrategyAbi,
    functionName: "totalSupply",
    blockNumber,
  });

  let {
    isLoading: isUnderlyingAssetPriceLoading,
    isFetched: isUnderlyingAssetPriceFetched,
    data: underlyingAssetPrice,
  } = useReadContract({
    address: aaveOracleAddress,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [strategyConfig.underlyingAsset.address],
    blockNumber,
  });

  let {
    isLoading: isDebtAssetPriceLoading,
    isFetched: isDebtAssetPriceFetched,
    data: debtAssetPrice,
  } = useReadContract({
    address: aaveOracleAddress,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [strategyConfig.debtAsset.address],
    blockNumber,
  });

  const isLoading =
    isEquityLoading ||
    isTotalSupplyLoading ||
    isUnderlyingAssetPriceLoading ||
    isDebtAssetPriceLoading;
  const isFetched =
    isEquityFetched ||
    isTotalSupplyFetched ||
    isUnderlyingAssetPriceFetched ||
    isDebtAssetPriceFetched;

  let shareValueInUsd, shareValueInEth, shareValueInUnderlyingAsset;
  if (isFetched) {
    equity = equity || 0n;
    totalSupply = totalSupply || 0n;
    underlyingAssetPrice = underlyingAssetPrice || 0n;
    debtAssetPrice = debtAssetPrice || 0n;

    if (totalSupply !== 0n && underlyingAssetPrice !== 0n) {
      shareValueInUnderlyingAsset = (equity * ONE_ETHER) / totalSupply;
      shareValueInEth =
        (equity * underlyingAssetPrice * ONE_ETHER) /
        (debtAssetPrice * totalSupply);
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
