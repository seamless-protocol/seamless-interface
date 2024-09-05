import { Address } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { analyticsDataQueryConfig } from "../../../state/settings/queryConfig";

export type FilterOption = "1w" | "1m" | "3m" | "1y";

const FilterOptionConfig: Record<
  FilterOption,
  {
    duration: number;
    takeEvery: number;
  }
> = {
  "1w": {
    duration: 7,
    takeEvery: 4,
  },
  "1m": {
    duration: 30,
    takeEvery: 16,
  },
  "3m": {
    duration: 90,
    takeEvery: 48,
  },
  "1y": {
    duration: 365,
    takeEvery: 80,
  },
};

export const fetchStrategyAnalytics = async (strategy: Address, filter: FilterOption) => {
  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    queryKey: ["fetchStrategyAnalytics", strategy, filter],
    queryFn: async () => {
      const result = await fetch(
        `${import.meta.env.VITE_DUNE_CACHE_API}results/query_id/${import.meta.env.VITE_DUNE_QUERY_KEY}/strategy/${strategy.toLocaleLowerCase()}/duration/${FilterOptionConfig[filter].duration}`,
        {
          method: "GET",
        }
      );
      const data = await result.json();

      const skippedData = data?.result?.rows.filter(
        (_: any, index: number) => (index + 1) % FilterOptionConfig[filter].takeEvery === 0
      );

      return skippedData;
    },
    ...analyticsDataQueryConfig,
  });

  return result;
};
