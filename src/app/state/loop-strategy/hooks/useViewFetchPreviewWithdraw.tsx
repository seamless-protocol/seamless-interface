import { parseUnits } from "viem";
import {
  useReadAaveOracleGetAssetPrice,
  useReadLoopStrategyPreviewRedeem,
} from "../../../generated/generated";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { ONE_ETHER } from "../../../meta/constants";
import {
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";

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
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    data: underlyingAssetPrice,
  } = useReadAaveOracleGetAssetPrice({
    args: [strategyConfig.underlyingAsset.address],
  });

  let assetsToReceive, assetsToReceiveInUsd;
  if (assets && underlyingAssetPrice) {
    assetsToReceive = (assets * 60n) / 100n;
    assetsToReceiveInUsd = (assetsToReceive * underlyingAssetPrice) / ONE_ETHER;
  }

  return {
    isLoading: isPreviewRedeemLoading || isAssetPriceLoading,
    isFetched: isPreviewRedeemFetched && isAssetPriceFetched,
    minReceivingAmount: assetsToReceive,
    assetsToReceive: formatUnitsToNumber(assetsToReceive, 18),
    assetsToReceiveInUsd: formatUnitsToNumber(assetsToReceiveInUsd, 8),
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
  } = useFetchPreviewWithdraw(ilmStrategies[index], amount);

  return {
    isLoading,
    isFetched,
    data: {
      minReceivingAmount: minReceivingAmount || 0n,
      assetsToReceive: {
        tokenAmount: {
          value: formatToDisplayable(assetsToReceive),
          symbol: ilmStrategies[index].underlyingAsset.symbol,
        },
        dollarAmount: {
          value: formatToDisplayable(assetsToReceiveInUsd),
          symbol: "$",
        },
      },
    },
  };
};
