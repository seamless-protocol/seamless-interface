import { Address } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { analyticsDataQueryConfig } from "../../../state/settings/queryConfig";
import { subHours, subDays, subWeeks, subMonths, subYears } from "date-fns";

export type FilterOption = "1h" | "1d" | "1w" | "1m" | "3m" | "1y";

const FilterOptionSkipRowsOptions: Record<FilterOption, number> = {
  "1h": 1,
  "1d": 3,
  "1w": 10,
  "1m": 40,
  "3m": 100,
  "1y": 300,
};

const getCalculatedTimestamp = (filter: FilterOption): number => {
  const now = new Date();

  let calculatedDate;
  switch (filter) {
    case "1h":
      calculatedDate = subHours(now, 1);
      break;
    case "1d":
      calculatedDate = subDays(now, 1);
      break;
    case "1w":
      calculatedDate = subWeeks(now, 1);
      break;
    case "1m":
      calculatedDate = subMonths(now, 1);
      break;
    case "3m":
      calculatedDate = subMonths(now, 3);
      break;
    case "1y":
      calculatedDate = subYears(now, 1);
      break;
    default:
      calculatedDate = now;
  }

  return Math.floor(calculatedDate.getTime() / 1000);
};

export const fetchStrategyAnalytics = async (strategy: Address, filter: FilterOption) => {
  const queryClient = getQueryClient();

  const queryParams = new URLSearchParams({
    filters: `timestamp > '${getCalculatedTimestamp(filter)}' AND strategy = '${strategy.toLowerCase()}'`,
    columns: "strategy,share_value_usd, time,underlying_asset_price",
    sort_by: "time",
  });

  const result = await queryClient.fetchQuery({
    queryKey: ["fetchStrategyAnalytics", strategy, filter],
    queryFn: async () => {
      const result = await fetch(
        `${import.meta.env.VITE_DUNE_CACHE_API}/results/${import.meta.env.VITE_DUNE_QUERY_KEY}/${queryParams}`,
        {
          method: "GET",
        }
      );
      const json = await result.json();
      const skippedResult = json.result.rows.filter(
        (_: any, index: number) => (index + 1) % FilterOptionSkipRowsOptions[filter] === 0
      );

      return skippedResult;
    },
    ...analyticsDataQueryConfig,
  });
  return result;
};
