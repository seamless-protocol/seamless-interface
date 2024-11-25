import { Address } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { analyticsDataQueryConfig } from "../../../state/settings/queryConfig";

export type FilterOption = "1w" | "1m" | "3m" | "1y";

const FilterOptionConfig: Record<FilterOption, { duration: number }> = {
  "1w": {
    duration: 7,
  },
  "1m": {
    duration: 30,
  },
  "3m": {
    duration: 90,
  },
  "1y": {
    duration: 365,
  },
};

export const fetchStrategyAnalytics = async (strategy: Address, filter: FilterOption) => {
  const queryClient = getQueryClient();

  console.log({ strategy });

  const result = await queryClient.fetchQuery({
    queryKey: ["fetchStrategyAnalytics", strategy, filter],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_DUNE_CACHE_API}results/query_id/${import.meta.env.VITE_DUNE_QUERY_KEY}/strategy/${strategy.toLocaleLowerCase()}/duration/${FilterOptionConfig[filter].duration}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      const totalPoints = data?.result?.rows?.length || 0;
      const targetPoints = 70;

      const skip = totalPoints > targetPoints ? Math.ceil(totalPoints / targetPoints) : 1;

      const modifiedData = data?.result?.rows
        ?.filter((_: any, index: number) => index % skip === 0)
        .map((row: any) => {
          return {
            share_value_usd: row.share_value_usd,
            share_value_in_debt_asset: row.share_value_usd / row.debt_token_price,
            time: row.time,
          };
        });

      return modifiedData;
    },
    ...analyticsDataQueryConfig,
  });

  return result;
};
