import { useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import {
  convertRatioToMultiple,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared/utils/helpers";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address } from "viem";
import { ViewStrategyPageHeader } from "../types/ViewStrategyPageHeader";
import { Displayable } from "../../../../shared/types/Displayable";
import { useFetchViewStrategyApy } from "./useFetchViewStrategyApy";
import { Fetch, FetchBigInt } from "src/shared/types/Fetch";

interface StrategyPageHeader {
  targetMultiple: FetchBigInt;
  oraclePrice: FetchBigInt;
}

export const useFetchStrategyPageHeader = (
  strategyAddress: Address,
  underlyingAssetAddress: Address
): Fetch<StrategyPageHeader> => {
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
    targetMultiple: {
      bigIntValue: targetMultiple,
      decimals: 8,
      symbol: "x",
    },
    oraclePrice: {
      bigIntValue: results?.[1].result || 0n,
      decimals: 8,
      symbol: "$",
    },
  };
};

export const useFetchViewStrategyPageHeader = (
  index: number
): Displayable<ViewStrategyPageHeader> => {
  const strategyConfig = ilmStrategies[index];
  const {
    isLoading: isStrategyHeaderLoading,
    isFetched: isStrategyHeaderFetched,
    targetMultiple,
    oraclePrice,
  } = useFetchStrategyPageHeader(
    strategyConfig.address,
    strategyConfig.underlyingAsset.address
  );
  const {
    isLoading: isApyLoading,
    isFetched: isApyFetched,
    data,
  } = useFetchViewStrategyApy(index);

  return {
    isLoading: isStrategyHeaderLoading || isApyLoading,
    isFetched: isStrategyHeaderFetched && isApyFetched,
    data: {
      targetMultiple: formatFetchBigIntToViewBigInt(targetMultiple),
      oraclePrice: formatFetchBigIntToViewBigInt(oraclePrice),
      apy: data.apy,
      underlyingAsset: strategyConfig.underlyingAsset,
    },
  };
};
