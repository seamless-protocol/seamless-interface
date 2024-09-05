import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Heading } from "./Heading";
import { GraphButton } from "./GraphButton";
import { FlexCol, FlexRow, Typography, useNotificationContext } from "@shared";
import { TimeFilterButton } from "./TimeFilterButton";
import {
  fetchStrategyAnalytics,
  FilterOption,
} from "../../../../../statev3/hooks/strategy-analytics/StrategyAnalytics.all";
import { useParams } from "react-router-dom";
import { Address } from "viem";

export interface DuneData {
  share_value_usd: number;
  underlying_asset_price: number;
  strategy: string;
  time: string;
}

const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

const formatDate = (value: string, includeTime = false) => {
  const date = new Date(value);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return date.toLocaleDateString(undefined, options);
};

export const GraphComponent = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { showNotification } = useNotificationContext();

  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [showLpTokenPrice, setShowLpTokenPrice] = useState(true);
  const [showLpTokenAmount, setShowLpTokenAmount] = useState(false);
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

      if (showLpTokenPrice && data) {
        series.push({
          name: "Share Value USD",
          data: data.map((item) => item.share_value_usd),
        });
      }

      if (showLpTokenAmount && data) {
        series.push({
          name: "Underlying Asset Price",
          data: data.map((item) => item.underlying_asset_price),
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
            speed: 800, // Increased animation speed for smoothness
          },
        },
        colors: showLpTokenPrice ? ["#4F68F7", "#00E396"] : ["#00E396"],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories,
          labels: {
            show: true,
            formatter: (value) => formatDate(value),
            style: {
              fontSize: "10px",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => value.toFixed(2),
          },
        },
        tooltip: {
          x: {
            format: "yyyy-MM-dd",
          },
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
  }, [filterOption, showLpTokenPrice, showLpTokenAmount, strategy]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 py-6 px-8 gap-8">
      <Heading />
      <div className="flex gap-2">
        <GraphButton isActive={showLpTokenPrice} onClick={() => setShowLpTokenPrice((prev) => !prev)}>
          LP Token Price (ETH)
        </GraphButton>
        <GraphButton isActive={showLpTokenAmount} onClick={() => setShowLpTokenAmount((prev) => !prev)}>
          LP Token (USD)
        </GraphButton>
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
