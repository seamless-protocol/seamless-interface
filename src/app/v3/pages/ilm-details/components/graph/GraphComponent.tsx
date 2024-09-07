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
import "./GraphComoonent.css";

export interface DuneData {
  share_value_in_debt_asset: number;
  share_value_usd: number;
  time: string;
}

const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

// TODO: Fix this function and find scalable solution when we decide on long term graph solution
const numberOfDecimals = (value: number): number => {
  return value < 1 ? 5 : 2;
};

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
          name: "Share Value In Debt Asset",
          data: data.map((item) => item.share_value_in_debt_asset),
        });
      }

      if (showPriceInUsd && data) {
        series.push({
          name: "Share Value USD",
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
            easing: "easeout",
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
              return date?.toLocaleDateString();
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
  }, [filterOption, showPriceInDebtAsset, showPriceInUsd, strategy]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 py-6 px-8 gap-8">
      <Heading />
      <div className="flex gap-2">
        <GraphButton isActive={showPriceInDebtAsset} onClick={() => setShowPriceInDebtAsset((prev) => !prev)}>
          Share Value (Debt Asset)
        </GraphButton>
        <GraphButton isActive={showPriceInUsd} onClick={() => setShowPriceInUsd((prev) => !prev)}>
          Share Value (USD)
        </GraphButton>
      </div>
      <div>
        <Typography type="regular1">
          Please note that the chart data presented is for <strong>historical</strong> reference <strong>only</strong>{" "}
          and is subject to a <strong>delay</strong> of approximately <strong>one day</strong>.
        </Typography>
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
