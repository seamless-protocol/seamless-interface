import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { FlexCol, FlexRow, formatToDisplayable, Typography, useNotificationContext } from "@shared";
import { useParams } from "react-router-dom";
import { Address, formatUnits } from "viem";
import { TimeFilterButton } from "../../../../components/graph/TimeFilterButton";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { TimeseriesOptions } from "../../../../../../generated-graphql";
import { fetchTotalAssetsHistorical } from "../../../../../data/morpho/total-supply-historical/TotalAssetsHistorical.fetch";
import { useTimeseriesOptions } from "../../hooks/useTimeseriesOptions";
import { Heading } from "./Heading";
import { GraphButton } from "../../../../components/graph/GraphButton";
import { ExtendedTotalAssetsHistoricalQuery } from "../../../../../data/morpho/types/ExtendedTotalAssetsHistoricalQuery";

export type FilterOption = "1w" | "1m" | "3m" | "1y";

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

export const TotalAssetsGraphComponent = () => {
  const { address } = useParams() as { address: Address };
  const { showNotification } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const timeseriesOptions: TimeseriesOptions = useTimeseriesOptions(filterOption);
  const [showPriceInUsd, setShowPriceInUsd] = useState(false);

  useEffect(() => {
    const processData = async () => {
      let result: ExtendedTotalAssetsHistoricalQuery | undefined;

      if (address) {
        try {
          setIsLoading(true);
          result = await fetchTotalAssetsHistorical(address, 8453, timeseriesOptions);

          if (!result?.vaultTokenData)
            throw new Error(
              `Vault token data not found for address: ${address}. Make sure the vault exists and the correct address is used.`
            );
          if (!result)
            throw new Error(
              `Failed to retrieve vault data for address: ${address}. Ensure the query returns data and the endpoint is reachable.`
            );
        } catch (error) {
          console.error("Error fetching data for graph:", error);
          showNotification({
            status: "error",
            content: <Typography>Error fetching data for graph.</Typography>,
          });
        } finally {
          setIsLoading(false);
        }
        if (!result) return;
        if (!result.vaultTokenData) return;

        const totalAssetsUsdData = result.vaultByAddress?.historicalState?.totalAssetsUsd || [];
        const totalAssetsData =
          result?.vaultByAddress?.historicalState?.totalAssets?.map((point) => ({
            x: point.x,
            y: formatUnits(point.y, result!.vaultByAddress.asset.decimals),
          })) || [];

        const data = showPriceInUsd ? [...totalAssetsUsdData].reverse() : [...totalAssetsData].reverse();

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
            colors: ["#4F68F7"],
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
                  if (!valueData) {
                    console.error("formatter in TotalSupplyGraphComponent: Value data not found");
                    return "";
                  }
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
                  show: false,
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
  }, [timeseriesOptions, showPriceInUsd, address]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 py-6 px-8 gap-8">
      <Heading showPriceInUsd={showPriceInUsd} address={address} />
      <div className="flex gap-2">
        <GraphButton isActive={showPriceInUsd} onClick={() => setShowPriceInUsd((prev) => !prev)}>
          USD
        </GraphButton>
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
