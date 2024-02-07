import { parseUnits } from "viem";
import { useReadLoopStrategyPreviewDeposit } from "../../../generated/generated";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { useFetchShareValue } from "../../common/hooks/useFetchShareValue";
import { ONE_ETHER } from "../../../meta/constants";
import {
  formatToDisplayable,
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
  } = useFetchShareValue(strategyConfig);

  let sharesToReceive, sharesToReceiveInUsd;
  if (shares && shareValueInUsd) {
    sharesToReceive = (shares * 60n) / 100n;
    sharesToReceiveInUsd = (sharesToReceive * shareValueInUsd) / ONE_ETHER;
  }

  return {
    isLoading: isPreviewDepositLoading || isShareValueLoading,
    isFetched: isPreviewDepositFetched && isShareValueFetched,
    minReceivingShares: sharesToReceive,
    sharesToReceive: formatUnitsToNumber(sharesToReceive, 18),
    sharesToReceiveInUsd: formatUnitsToNumber(sharesToReceiveInUsd, 8),
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
  } = useFetchPreviewDeposit(ilmStrategies[id], amount);

  return {
    isLoading: isLoading,
    isFetched: isFetched,
    data: {
      minReceivingShares: minReceivingShares || 0n,
      sharesToReceive: {
        tokenAmount: {
          value: formatToDisplayable(sharesToReceive),
          symbol: ilmStrategies[id].symbol,
        },
        dollarAmount: {
          value: formatToDisplayable(sharesToReceiveInUsd),
          symbol: "$",
        },
      },
    },
  };
};
