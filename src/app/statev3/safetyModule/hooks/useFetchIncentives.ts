import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { formatIncentiveAprToViewNumber } from "../../../../shared";
import { IncentiveApr, parseIncentives } from "../../../../shared/utils/aaveIncentivesHelpers";
import { fetchEquityData } from "../../../state/loop-strategy/queries/useFetchViewEquity.all";
import { rewardsAccruingAssets } from "../../settings/config";
import { queryConfig } from "../../settings/queryConfig";
import { fetchAssetRewardsDataByAsset } from "../../../state/lending-borrowing/hooks/useFetchAssetRewardsData.all";

export const fetchStrategyIncentives = async (): Promise<IncentiveApr | undefined> => {
  const assets = rewardsAccruingAssets;

  const [incentives, equity] = await Promise.all([fetchAssetRewardsDataByAsset(asset), fetchEquityData(asset)]);

  let strategyIncentives;
  if (incentives && equity.equityUsd && equity.equityUsd) {
    strategyIncentives = parseIncentives(
      {
        rewardsTokenInformation: incentives,
      },
      equity.equityUsd
    );
  }

  return strategyIncentives;
};

export const useFetchStrategyIncentives = (asset?: Address) => {
  let strategyIncentives = { totalApr: 0, rewardTokens: [] } as IncentiveApr;

  const { data, ...rest } = useQuery({
    queryKey: ["hookFetchStrategyIncentives", asset],
    queryFn: () => fetchStrategyIncentives(asset!),
    enabled: !!asset,
    ...queryConfig.disableCacheQueryConfig,
  });

  strategyIncentives = data || strategyIncentives;

  return {
    ...rest,
    data: {
      totalApr: formatIncentiveAprToViewNumber(strategyIncentives.totalApr),
      rewardTokens: strategyIncentives.rewardTokens,
    },
  };
};
