import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Heading } from "./Heading";
import { GraphButton } from "../../../../components/graph/GraphButton";
import { ExtendedQueryState, FlexCol, FlexRow, Typography, useNotificationContext, useToken } from "@shared";
import { TimeFilterButton } from "../../../../components/graph/TimeFilterButton";
import {
  fetchStrategyAnalytics,
  FilterOption,
} from "../../../../../statev3/hooks/strategy-analytics/StrategyAnalytics.all";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchFullStrategyData } from "../../../../../statev3/metadata/FullStrategyData.all";
import { wstETHBooster_3x } from "@meta";

export interface DuneData {
  share_value_in_debt_asset: number;
  share_value_usd: number;
  time: string;
}

const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

const displayExtraDisclaimer = (strategy: Address | undefined): boolean => {
  return strategy === wstETHBooster_3x;
};

// TODO: Fix this function and find scalable solution when we decide on long term graph solution
const numberOfDecimals = (value: number): number => {
  return value < 1 ? 5 : 2;
};

const formatDate = (value: string, includeTime = false, includeYear = false) => {
  const date = new Date(value);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: includeYear ? "numeric" : undefined,
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return date.toLocaleDateString(undefined, options);
};

const getSymbolString = (symbol: string, rest: ExtendedQueryState<string>) => {
  if (rest.isLoading || !rest.isFetched) {
    return "Loading..";
  }
  if (rest.isError) {
    return "Symbol cannot be found";
  }
  return symbol;
};

export const GraphComponent = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { data: strategyData } = useFetchFullStrategyData(strategy);
  const {
    data: { symbol },
    ...debtTokenDataRest
  } = useToken(strategyData?.debt);

  const { showNotification } = useNotificationContext();

  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [showPriceInDebtAsset, setShowPriceInDebtAsset] = useState(true);
  const [showPriceInUsd, setShowPriceInUsd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const processData = async () => {
      if (!strategy) return;

      setIsLoading(true);
      let data: DuneData[] | undefined;

      try {
        data = (await fetchStrategyAnalytics(strategy, filterOption)) as DuneData[] | undefined;
      } catch (error) {
        showNotification({
          status: "error",
          content: <Typography>Error fetching data for graph.</Typography>,
        });
      } finally {
        setIsLoading(false);
      }

      const categories = data?.map((item) => item.time);
      const series = [];

      if (showPriceInDebtAsset && data) {
        series.push({
          name: `LP Token Price (${getSymbolString(symbol || "", debtTokenDataRest)})`,
          data: data.map((item) => item.share_value_in_debt_asset),
        });
      }

      if (showPriceInUsd && data) {
        series.push({
          name: "LP Token Price (USD)",
          data: data.map((item) => item.share_value_usd),
        });
      }

      setChartOptions({
        chart: {
          id: "ilm-details-graph",
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },

          animations: {
            enabled: true,
            speed: 2000,
          },
        },
        colors: showPriceInDebtAsset ? ["#4F68F7", "#00E396"] : ["#00E396"],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories,
          tickAmount: 5,
          labels: {
            rotate: 0,
            formatter: (value) => formatDate(value),
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value.toFixed(numberOfDecimals(value))}`,
          },
        },
        tooltip: {
          x: {
            show: true,
            formatter: (value) => {
              const date = new Date(categories?.[value - 1] || "");
              return formatDate(date.toString(), true, true);
            },
          },
          cssClass: "custom-tooltip",
        },
        grid: {
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        stroke: {
          curve: "straight",
          width: 2.5,
        },
        legend: {
          show: false,
        },
      });

      setChartSeries(series);
    };
    processData();
  }, [filterOption, showPriceInDebtAsset, showPriceInUsd, strategy, symbol, debtTokenDataRest.isLoading]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 py-6 px-8 gap-8">
      <Heading />
      <div className="flex gap-2">
        <GraphButton isActive={showPriceInDebtAsset} onClick={() => setShowPriceInDebtAsset((prev) => !prev)}>
          LP Token Price ({getSymbolString(symbol || "", debtTokenDataRest)})
        </GraphButton>
        <GraphButton isActive={showPriceInUsd} onClick={() => setShowPriceInUsd((prev) => !prev)}>
          LP Token Price (USD)
        </GraphButton>
      </div>
      <div>
        <Typography type="regular1">
          Please note that the chart data presented is for <strong>historical</strong> reference <strong>only</strong>{" "}
          and is subject to a <strong>delay</strong> of approximately <strong>one day</strong>.
        </Typography>

        {displayExtraDisclaimer(strategy) && (
          <Typography type="regular1">
            Also note that <strong> wstETH </strong>is using <strong> market price </strong> data not Lido exchange
            rate.
          </Typography>
        )}
      </div>
      <FlexCol>
        <div className="relative">
          {isLoading && <LocalSpinner />}
          <Chart
            options={chartOptions}
            series={chartSeries}
            type={chartOptions.chart?.type}
            height="400"
            width="100%"
            className="mx-[-30px] md:mx-[-14px]"
          />
        </div>
        <FlexRow className="justify-between items-center px-4">
          {FilterOptions.map((option) => (
            <TimeFilterButton key={option} isActive={option === filterOption} onClick={() => setFilterOption(option)}>
              {option}
            </TimeFilterButton>
          ))}
        </FlexRow>
      </FlexCol>
    </div>
  );
};

const LocalSpinner = () => (
  <div className="flex items-center justify-center h-[90%] w-full absolute inset-0 z-10">
    <div className="loading loading-spinner" />
  </div>
);
