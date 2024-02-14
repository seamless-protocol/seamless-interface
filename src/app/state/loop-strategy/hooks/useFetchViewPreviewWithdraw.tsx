import { parseEther, parseUnits } from "viem";
import {
  useReadAaveOracleGetAssetPrice,
  useReadLoopStrategyPreviewRedeem,
} from "../../../generated/generated";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { ONE_ETHER } from "../../../meta/constants";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";
import { useFetchShareValue } from "../../common/hooks/useFetchShareValue";
import { Fetch, FetchBigInt } from "src/shared/types/Fetch";

interface PreviewWithdraw {
  assetsToReceive: FetchBigInt;
  assetsToReceiveInUsd: FetchBigInt;
  costInUnderlyingAsset: FetchBigInt;
  costInUsd: FetchBigInt;
}

export const useFetchPreviewWithdraw = (
  strategyConfig: StrategyConfig,
  amount: string
): Fetch<PreviewWithdraw> => {
  const {
    data: assets,
    isLoading: isPreviewRedeemLoading,
    isFetched: isPreviewRedeemFetched,
  } = useReadLoopStrategyPreviewRedeem({
    address: strategyConfig.address,
    args: [parseUnits(amount, 18)],
  });

  const {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    shareValueInUnderlyingAsset,
  } = useFetchShareValue(strategyConfig);

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    data: underlyingAssetPrice,
  } = useReadAaveOracleGetAssetPrice({
    args: [strategyConfig.underlyingAsset.address],
  });

  let assetsToReceive, assetsToReceiveInUsd, costInUnderlyingAsset, costInUsd;
  if (assets && underlyingAssetPrice) {
    assetsToReceive = (assets * 60n) / 100n;
    assetsToReceiveInUsd = (assetsToReceive * underlyingAssetPrice) / ONE_ETHER;

    costInUnderlyingAsset =
      (parseEther(amount) * (shareValueInUnderlyingAsset || 0n)) / ONE_ETHER -
      assetsToReceive;
    costInUsd =
      (costInUnderlyingAsset * (underlyingAssetPrice || 0n)) / ONE_ETHER;
  }

  return {
    isLoading:
      isPreviewRedeemLoading || isAssetPriceLoading || isShareValueLoading,
    isFetched:
      isPreviewRedeemFetched && isAssetPriceFetched && isShareValueFetched,
    assetsToReceive: {
      bigIntValue: assetsToReceive || 0n,
      decimals: 18,
      symbol: strategyConfig.underlyingAsset.symbol,
    },
    assetsToReceiveInUsd: {
      bigIntValue: assetsToReceiveInUsd || 0n,
      decimals: 8,
      symbol: "$",
    },
    costInUnderlyingAsset: {
      bigIntValue: costInUnderlyingAsset || 0n,
      decimals: 18,
      symbol: strategyConfig.underlyingAsset.symbol,
    },
    costInUsd: {
      bigIntValue: costInUsd || 0n,
      decimals: 8,
      symbol: "$",
    },
  };
};

export const useFetchViewPreviewWithdraw = (
  index: number,
  amount: string
): Displayable<ViewPreviewWithdraw> => {
  const {
    isLoading,
    isFetched,
    assetsToReceive,
    assetsToReceiveInUsd,
    costInUnderlyingAsset,
    costInUsd,
  } = useFetchPreviewWithdraw(ilmStrategies[index], amount);

  return {
    isLoading,
    isFetched,
    data: {
      assetsToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(assetsToReceive),
        dollarAmount: formatFetchBigIntToViewBigInt(assetsToReceiveInUsd),
      },
      cost: {
        tokenAmount: formatFetchBigIntToViewBigInt(costInUnderlyingAsset),
        dollarAmount: formatFetchBigIntToViewBigInt(costInUsd),
      },
    },
  };
};
