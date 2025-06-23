import { Address } from "viem";
import { IncentiveApr, parseIncentives } from "../../../../shared/utils/aaveIncentivesHelpers";
import { formatIncentiveAprToViewNumber } from "../../../../shared";
import { fetchAssetRewardsDataByAsset } from "../../lending-deprecated/hooks/useFetchAssetRewardsData.all";
import { fetchEquityData } from "./useFetchViewEquity.all";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "../../settings/queryConfig";

export const fetchStrategyIncentives = async (asset?: Address): Promise<IncentiveApr | undefined> => {
  if (!asset) {
    console.error("fetchStrategyIncentives: Asset address is required");
    throw new Error("Asset address is required");
  }
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
