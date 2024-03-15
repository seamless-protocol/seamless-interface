import { useReadContracts } from "wagmi";
import {
  convertRatioToMultiple,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared/utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import { ONE_ETHER, ONE_USD } from "../../../../shared/meta/constants";
import { Address } from "viem";
import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { Displayable, ViewBigInt } from "../../../../shared/types/Displayable";
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
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: [
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "getCollateralRatioTargets",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "collateral",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "equity",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [underlyingAssetAddress],
      },
    ],
  });

  let collateral,
    collateralUSD,
    equity,
    equityUSD,
    currentMultiple,
    targetMultiple;

  if (results) {
    const collateralRatioTargets = results[0].result;
    const targetRatio = BigInt(collateralRatioTargets?.target || 0);
    targetMultiple = convertRatioToMultiple(targetRatio);

    collateralUSD = BigInt(results[1].result || 0);
    const collateralAssetPrice = BigInt(results[4].result || 0);
    collateral = collateralAssetPrice
      ? (collateralUSD * ONE_ETHER) / collateralAssetPrice
      : 0n;

    equity = BigInt(results[2].result || 0);
    equityUSD = BigInt(results[3].result || 0);

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

export interface ViewStrategyInfo {
  currentMultiple: ViewBigInt;
  targetMultiple: ViewBigInt;
  collateral: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  equity: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}

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
