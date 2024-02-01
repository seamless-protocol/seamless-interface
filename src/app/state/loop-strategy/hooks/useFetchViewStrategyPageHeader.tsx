import { useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import {
  convertRatioToMultiple,
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { ViewStrategyPageHeader } from "../types/ViewStrategyPageHeader";
import { Displayable } from "../../../../shared/types/Displayable";

export const useFetchStrategyPageHeader = (
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
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [underlyingAssetAddress],
      },
    ],
  });
  const targetMultiple = convertRatioToMultiple(results?.[0].result?.target);

  return {
    isLoading,
    isFetched,
    targetMultiple: formatUnitsToNumber(targetMultiple, 8),
    oraclePrice: formatUnitsToNumber(results?.[1].result, 8),
  };
};

export const useFetchViewStrategyPageHeader = (
  index: number
): Displayable<ViewStrategyPageHeader> => {
  const strategyConfig = ilmStrategies[index];
  const { isLoading, isFetched, targetMultiple, oraclePrice } =
    useFetchStrategyPageHeader(
      strategyConfig.address,
      strategyConfig.underlyingAsset.address
    );

  return {
    isLoading,
    isFetched,
    data: {
      targetMultiple: formatToDisplayable(targetMultiple) + "x",
      oraclePrice: {
        value: formatToDisplayable(oraclePrice),
        symbol: "$",
      },
      underlyingAsset: strategyConfig.underlyingAsset,
    },
  };
};
