import { useReadContracts } from "wagmi";
import {
  convertRatioToMultiple,
  formatToDisplayable,
  formatUnitsToNumber,
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

export const useFetchStrategyInfo = (
  strategyAddress: Address,
  underlyingAssetAddress: Address
) => {
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
    collateral = (collateralUSD * ONE_ETHER) / collateralAssetPrice;

    equity = BigInt(results[2].result || 0);
    equityUSD = BigInt(results[3].result || 0);

    currentMultiple = equity !== 0n ? (collateral * ONE_USD) / equity : 0n;
  }

  return {
    isLoading,
    isFetched,
    collateral: formatUnitsToNumber(collateral, 18),
    collateralUSD: formatUnitsToNumber(collateralUSD, 8),
    equity: formatUnitsToNumber(equity, 18),
    equityUSD: formatUnitsToNumber(equityUSD, 8),
    currentMultiple: formatUnitsToNumber(currentMultiple, 8),
    targetMultiple: formatUnitsToNumber(targetMultiple, 8),
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
        tokenAmount: {
          value: formatToDisplayable(collateral),
          symbol: "",
        },
        dollarAmount: {
          value: formatToDisplayable(collateralUSD),
          symbol: "$",
        },
      },
      equity: {
        tokenAmount: {
          value: formatToDisplayable(equity),
          symbol: "",
        },
        dollarAmount: {
          value: formatToDisplayable(equityUSD),
          symbol: "$",
        },
      },
      currentMultiple: formatToDisplayable(currentMultiple) + "x",
      targetMultiple: formatToDisplayable(targetMultiple) + "x",
    },
  };
};
