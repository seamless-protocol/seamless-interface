import { Address } from "viem";
import { IncentiveApr, parseIncentives } from "../../../../shared/utils/aaveIncentivesHelpers";
import { formatIncentiveAprToViewNumber, mergeQueryStates } from "../../../../shared";
import { useFetchDetailEquity } from "../queries/useFetchViewEquity";
import { useFetchAssetRewardsData } from "../../lending-borrowing/hooks/useFetchAssetRewardsData";
import { IS_DEV_MODE } from "../../../../globals";

export const useFetchStrategyIncentives = (asset?: Address) => {
  const { data: incentives, ...rawRest } = useFetchAssetRewardsData(
    IS_DEV_MODE ? "0x2c159A183d9056E29649Ce7E56E59cA833D32624" : asset
  );

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
