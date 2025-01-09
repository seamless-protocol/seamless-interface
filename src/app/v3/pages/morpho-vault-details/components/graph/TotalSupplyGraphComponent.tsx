// src/components/graphs/TotalSupplyGraphComponent.tsx

import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { FlexCol, FlexRow, formatToDisplayable, Typography, useNotificationContext } from "@shared";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { TimeFilterButton } from "../../../../components/graph/TimeFilterButton";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { TimeseriesOptions, TotalSupplyHistoricalQuery } from "../../../../../../generated-graphql";
import { FilterOption } from "../../../../../statev3/hooks/strategy-analytics/StrategyAnalytics.all";
import { fetchTotalSupplyHistorical } from "../../../../../statev3/morpho/total-supply-historical/TotalSupplyHistorical.fetch";
import { useTimeseriesOptions } from "../../hooks/useTimeseriesOptions";
import { Heading } from "./Heading";

const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

const formatDate = (date: Date, includeTime = false, includeYear = false) => {
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

export const TotalSupplyGraphComponent = () => {
  const { address } = useParams() as { address: Address };
  const { showNotification } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const timeseriesOptions: TimeseriesOptions = useTimeseriesOptions(filterOption);

  useEffect(() => {
    const processData = async () => {
      let result: TotalSupplyHistoricalQuery | undefined;

      if (address) {
        try {
          setIsLoading(true);
          result = await fetchTotalSupplyHistorical(address, 8453, timeseriesOptions);
        } catch (error) {
          showNotification({
            status: "error",
            content: <Typography>Error fetching data for graph.</Typography>,
          });
        } finally {
          setIsLoading(false);
        }

        let data = result?.vaultByAddress?.historicalState?.totalAssetsUsd || [];
        data = [...data].reverse();

        const categories = data?.map((point) => formatDate(new Date(point.x * 1000), false, false));

        const series = [
          {
            name: "Total Supply",
            data: data.map((point) => {
              return Number(point.y);
            }),
          },
        ];

        setChartOptions((prevOptions) => {
          return {
            ...prevOptions,
            chart: {
              id: "total-supply-graph",
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
            colors: ["#FF5733"],
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              type: "category",
              categories,
              tickAmount: 5,
              labels: {
                rotate: 0,
                formatter: (value: string) => value,
              },
              tooltip: {
                enabled: true,
              },
            },
            yaxis: {
              labels: {
                formatter: (value: number) => formatToDisplayable(value),
              },
            },
            tooltip: {
              x: {
                show: true,
                formatter: (value: number) => {
                  const valueData = data[value];
                  if (!valueData) return "";
                  const date = new Date(valueData.x * 1000 || Date.now());
                  return formatDate(date, true, true);
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
          };
        });

        setChartSeries(series);
      }
    };

    processData();
  }, [timeseriesOptions]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 py-6 px-8 gap-8">
      <Heading />
      <div className="flex gap-2">
        {/* <GraphButton isActive={showPriceInDebtAsset} onClick={() => setShowPriceInDebtAsset((prev) => !prev)}>
          LP Token Price ({getSymbolString(symbol || "", debtTokenDataRest)})
        </GraphButton>
        <GraphButton isActive={showPriceInUsd} onClick={() => setShowPriceInUsd((prev) => !prev)}>
          LP Token Price (USD)
        </GraphButton> */}
      </div>
      <div>
        <Typography type="regular1">
          Please note that the chart data presented is for <strong>historical</strong> reference <strong>only</strong>{" "}
          and is subject to a <strong>delay</strong> of approximately <strong>one day</strong>.
        </Typography>
      </div>
      <FlexCol>
        <div className="relative">
          {isLoading && <GraphSpinner />}
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
