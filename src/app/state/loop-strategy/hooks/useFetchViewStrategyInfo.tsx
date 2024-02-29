import { useReadContract } from "wagmi";
import {
  convertRatioToMultiple,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared/utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import { ONE_ETHER, ONE_USD } from "../../../meta/constants";
import { Address } from "viem";
import { ilmStrategies } from "../config/StrategyConfig";
import { ViewStrategyInfo } from "../types/ViewStrategyInfo";
import { Displayable } from "../../../../shared/types/Displayable";
import { Fetch, FetchBigInt } from "src/shared/types/Fetch";

interface StrategyInfo {
  collateral: FetchBigInt;
  collateralUSD: FetchBigInt;
  equity: FetchBigInt;
  equityUSD: FetchBigInt;
  currentMultiple: FetchBigInt;
  targetMultiple: FetchBigInt;
}

export const useFetchStrategyInfo = (
  strategyAddress: Address,
  underlyingAssetAddress: Address
): Fetch<StrategyInfo> => {
  let {
    data: collateralRatioTargets,
    isLoading: isCollateralRatioTargetLoading,
    isFetched: isCollateralRatioTargetFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "getCollateralRatioTargets",
  });
  let {
    data: collateralUSD,
    isLoading: isCollateralLoading,
    isFetched: isCollateralFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "collateral",
  });
  let {
    data: equity,
    isLoading: isEquityLoading,
    isFetched: isEquityFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "equity",
  });
  let {
    data: equityUSD,
    isLoading: isEquityUSDLoading,
    isFetched: isEquityUSDFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "equityUSD",
  });
  let {
    data: underlyingAssetPrice,
    isLoading: isUnderlyingAssetPriceLoading,
    isFetched: isUnderlyingAssetPriceFetched,
  } = useReadContract({
    address: aaveOracleAddress,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [underlyingAssetAddress],
  });

  const isLoading =
    isCollateralRatioTargetLoading ||
    isCollateralLoading ||
    isEquityLoading ||
    isEquityUSDLoading ||
    isUnderlyingAssetPriceLoading;
  const isFetched =
    isCollateralRatioTargetFetched ||
    isCollateralFetched ||
    isEquityFetched ||
    isEquityUSDFetched ||
    isUnderlyingAssetPriceFetched;

  let targetMultiple, collateral, currentMultiple;
  if (isFetched) {
    const targetRatio = BigInt(collateralRatioTargets?.target || 0);
    targetMultiple = convertRatioToMultiple(targetRatio);

    collateralUSD = collateralUSD || 0n;
    underlyingAssetPrice = underlyingAssetPrice || 0n;
    collateral =
      underlyingAssetPrice !== 0n
        ? (collateralUSD * ONE_ETHER) / underlyingAssetPrice
        : 0n;

    equity = equity || 0n;
    equityUSD = equityUSD || 0n;
    currentMultiple = equity !== 0n ? (collateral * ONE_USD) / equity : 0n;
  }

  return {
    isLoading,
    isFetched,
    collateral: {
      bigIntValue: collateral || 0n,
      decimals: 18,
      symbol: "",
    },
    collateralUSD: {
      bigIntValue: collateralUSD || 0n,
      decimals: 8,
      symbol: "$",
    },
    equity: {
      bigIntValue: equity || 0n,
      decimals: 18,
      symbol: "",
    },
    equityUSD: {
      bigIntValue: equityUSD || 0n,
      decimals: 8,
      symbol: "$",
    },
    currentMultiple: {
      bigIntValue: currentMultiple || 0n,
      decimals: 8,
      symbol: "x",
    },
    targetMultiple: {
      bigIntValue: targetMultiple || 0n,
      decimals: 8,
      symbol: "x",
    },
  };
};

export const useFetchViewStrategyInfo = (
  index: number
): Displayable<ViewStrategyInfo> => {
  const strategyConfig = ilmStrategies[index];
  const {
    isLoading,
    isFetched,
    collateral,
    collateralUSD,
    equity,
    equityUSD,
    currentMultiple,
    targetMultiple,
  } = useFetchStrategyInfo(
    strategyConfig.address,
    strategyConfig.underlyingAsset.address
  );

  return {
    isLoading,
    isFetched,
    data: {
      collateral: {
        tokenAmount: formatFetchBigIntToViewBigInt(collateral),
        dollarAmount: formatFetchBigIntToViewBigInt(collateralUSD),
      },
      equity: {
        tokenAmount: formatFetchBigIntToViewBigInt(equity),
        dollarAmount: formatFetchBigIntToViewBigInt(equityUSD),
      },
      currentMultiple: formatFetchBigIntToViewBigInt(currentMultiple),
      targetMultiple: formatFetchBigIntToViewBigInt(targetMultiple),
    },
  };
};
