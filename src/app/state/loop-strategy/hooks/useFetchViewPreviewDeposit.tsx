import { parseEther, parseUnits } from "viem";
import {
  useReadAaveOracleGetAssetPrice,
  useReadLoopStrategyPreviewDeposit,
} from "../../../generated/generated";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { useFetchShareValue } from "../../common/hooks/useFetchShareValue";
import { ONE_ETHER } from "../../../meta/constants";
import {
  formatToDisplayableOrDash,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { ViewPreviewDeposit } from "../types/ViewPreviewDeposit";
import { Displayable } from "../../../../shared";

export const useFetchPreviewDeposit = (
  strategyConfig: StrategyConfig,
  amount: string
) => {
  const {
    data: shares,
    isLoading: isPreviewDepositLoading,
    isFetched: isPreviewDepositFetched,
  } = useReadLoopStrategyPreviewDeposit({
    address: strategyConfig.address,
    args: [parseUnits(amount, 18)],
  });

  const {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    shareValueInUsd,
    shareValueInUnderlyingAsset,
  } = useFetchShareValue(strategyConfig);

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    data: assetPrice,
  } = useReadAaveOracleGetAssetPrice({
    args: [strategyConfig.underlyingAsset.address],
  });

  let sharesToReceive, sharesToReceiveInUsd, costInUnderlyingAsset, costInUsd;
  if (shares && shareValueInUsd) {
    sharesToReceive = (shares * 60n) / 100n;
    sharesToReceiveInUsd = (sharesToReceive * shareValueInUsd) / ONE_ETHER;

    costInUnderlyingAsset =
      parseEther(amount) -
      (sharesToReceive * (shareValueInUnderlyingAsset || 0n)) / ONE_ETHER;
    costInUsd = (costInUnderlyingAsset * (assetPrice || 0n)) / ONE_ETHER;
  }

  return {
    isLoading:
      isPreviewDepositLoading || isShareValueLoading || isAssetPriceLoading,
    isFetched:
      isPreviewDepositFetched && isShareValueFetched && isAssetPriceFetched,
    minReceivingShares: sharesToReceive,
    sharesToReceive: formatUnitsToNumber(sharesToReceive, 18),
    sharesToReceiveInUsd: formatUnitsToNumber(sharesToReceiveInUsd, 8),
    costInUnderlyingAsset: formatUnitsToNumber(costInUnderlyingAsset, 18),
    costInUsd: formatUnitsToNumber(costInUsd, 8),
  };
};

export const useFetchViewPreviewDeposit = (
  id: number,
  amount: string
): Displayable<ViewPreviewDeposit> => {
  const {
    isLoading,
    isFetched,
    minReceivingShares,
    sharesToReceive,
    sharesToReceiveInUsd,
    costInUnderlyingAsset,
    costInUsd,
  } = useFetchPreviewDeposit(ilmStrategies[id], amount);

  const displayValues = sharesToReceive && sharesToReceive > 0;

  return {
    isLoading: isLoading,
    isFetched: isFetched,
    data: {
      minReceivingShares: minReceivingShares || 0n,
      sharesToReceive: {
        tokenAmount: {
          value: formatToDisplayableOrDash(sharesToReceive),
          symbol: displayValues ? ilmStrategies[id].symbol : "",
        },
        dollarAmount: {
          value: formatToDisplayableOrDash(sharesToReceiveInUsd),
          symbol: displayValues ? "$" : "",
        },
      },
      cost: {
        tokenAmount: {
          value: formatToDisplayableOrDash(costInUnderlyingAsset),
          symbol: displayValues ? ilmStrategies[id].underlyingAsset.symbol : "",
        },
        dollarAmount: {
          value: formatToDisplayableOrDash(costInUsd),
          symbol: displayValues ? "$" : "",
        },
      },
    },
  };
};
