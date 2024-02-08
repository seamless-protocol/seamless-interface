import { parseEther, parseUnits } from "viem";
import {
  useReadAaveOracleGetAssetPrice,
  useReadLoopStrategyPreviewRedeem,
} from "../../../generated/generated";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { ONE_ETHER } from "../../../meta/constants";
import {
  formatToDisplayableOrPlaceholder,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";
import { useFetchShareValue } from "../../common/hooks/useFetchShareValue";

export const useFetchPreviewWithdraw = (
  strategyConfig: StrategyConfig,
  amount: string
) => {
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
    minReceivingAmount: assetsToReceive,
    assetsToReceive: formatUnitsToNumber(assetsToReceive, 18),
    assetsToReceiveInUsd: formatUnitsToNumber(assetsToReceiveInUsd, 8),
    costInUnderlyingAsset: formatUnitsToNumber(costInUnderlyingAsset, 18),
    costInUsd: formatUnitsToNumber(costInUsd, 8),
  };
};

export const useFetchViewPreviewWithdraw = (
  index: number,
  amount: string
): Displayable<ViewPreviewWithdraw> => {
  const {
    isLoading,
    isFetched,
    minReceivingAmount,
    assetsToReceive,
    assetsToReceiveInUsd,
    costInUnderlyingAsset,
    costInUsd,
  } = useFetchPreviewWithdraw(ilmStrategies[index], amount);

  const displayValues = assetsToReceive && assetsToReceive > 0;

  return {
    isLoading,
    isFetched,
    data: {
      minReceivingAmount: minReceivingAmount || 0n,
      assetsToReceive: {
        tokenAmount: {
          value: formatToDisplayableOrPlaceholder(assetsToReceive, "-"),
          symbol: displayValues
            ? ilmStrategies[index].underlyingAsset.symbol
            : "",
        },
        dollarAmount: {
          value: formatToDisplayableOrPlaceholder(assetsToReceiveInUsd, "-"),
          symbol: displayValues ? "$" : "",
        },
      },
      cost: {
        tokenAmount: {
          value: formatToDisplayableOrPlaceholder(costInUnderlyingAsset, "-"),
          symbol: displayValues
            ? ilmStrategies[index].underlyingAsset.symbol
            : "",
        },
        dollarAmount: {
          value: formatToDisplayableOrPlaceholder(costInUsd, "-"),
          symbol: displayValues ? "$" : "",
        },
      },
    },
  };
};
