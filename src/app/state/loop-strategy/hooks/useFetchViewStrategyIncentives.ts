import { Address } from "viem";
import { IncentiveApr, parseIncentives } from "../../../../shared/utils/aaveIncentivesHelpers";
import { formatIncentiveAprToViewNumber, mergeQueryStates } from "../../../../shared";
import { useFetchDetailEquity } from "../queries/useFetchViewEquity";
import { useFetchAssetRewardsData } from "../../lending-borrowing/hooks/useFetchAssetRewardsData";

export const useFetchStrategyIncentives = (asset?: Address) => {
  const { data: incentives, ...rawRest } = useFetchAssetRewardsData(asset);

  const { data: equity, ...equityRest } = useFetchDetailEquity(asset);

  let strategyIncentives = { totalApr: 0, rewardTokens: [] } as IncentiveApr;
  if (incentives && equity.equityUsd && equity.equityUsd.bigIntValue) {
    strategyIncentives = parseIncentives(
      {
        rewardsTokenInformation: incentives,
      },
      equity.equityUsd.bigIntValue
    );
  }

  return {
    ...mergeQueryStates([equityRest, rawRest]),
    data: {
      totalApr: formatIncentiveAprToViewNumber(strategyIncentives.totalApr),
      rewardTokens: strategyIncentives.rewardTokens,
    },
  };
};
