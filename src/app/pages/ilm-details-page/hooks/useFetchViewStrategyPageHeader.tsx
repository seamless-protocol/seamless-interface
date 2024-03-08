import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { Address } from "viem";
import {
  Displayable,
  ViewBigInt,
  ViewNumber,
} from "../../../../shared/types/Displayable";
import { useFetchViewStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { useFetchViewTargetMultiple } from "../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { useFetchViewAssetPrice } from "../../../state/common/queries/useFetchViewAssetPrice";

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
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
    data: { targetMultiple },
  } = useFetchViewTargetMultiple(strategyConfig.address);

  const {
    isLoading: isPriceLoading,
    isFetched: isPriceFetched,
    data: { price: oraclePrice },
  } = useFetchViewAssetPrice(strategyConfig.underlyingAsset.address);

  const {
    isLoading: isApyLoading,
    isFetched: isApyFetched,
    data,
  } = useFetchViewStrategyApy(index);

  return {
    isLoading: isTargetMultipleLoading || isPriceLoading || isApyLoading,
    isFetched: isTargetMultipleFetched || (isPriceFetched && isApyFetched),
    data: {
      targetMultiple,
      oraclePrice,
      apy: data.apy,
      underlyingAsset: strategyConfig.underlyingAsset,
    },
  };
};
