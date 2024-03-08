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
import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { Address } from "viem";
import {
  Displayable,
  ViewBigInt,
  ViewNumber,
} from "../../../../shared/types/Displayable";
import { useFetchViewStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
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

export interface ViewStrategyPageHeader {
  targetMultiple: ViewBigInt;
  oraclePrice: ViewBigInt;
  apy: ViewNumber;
  underlyingAsset: {
    name: string;
    symbol: string;
    address: Address;
    logo: string;
  };
}

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
