import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { FlexCol, FlexRow, formatToDisplayable, Typography, useNotificationContext } from "@shared";
import { Address } from "viem";
import { TimeFilterButton } from "../../../../components/graph/TimeFilterButton";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { TimeseriesOptions } from "../../../../../../generated-graphql";
import { useTimeseriesOptions } from "../../hooks/useTimeseriesOptions";
import { Heading } from "./Heading";
import { formatDate } from "../../utils/formatDateForGraph";
import { fetchNetApyHistorical } from "../../../../../data/morpho/net-apy-historical/NetApyHistorical.fetch";
import { ExtendedNetAPYHistoricalQuery } from "../../../../../data/morpho/types/ExtendedNetAPYHistoricalQuery";

export type FilterOption = "1w" | "1m" | "3m" | "1y";

const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

export const NetApyGraphComponent: React.FC<{
  vault?: Address;
}> = ({ vault }) => {
  const { showNotification } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const timeseriesOptions: TimeseriesOptions = useTimeseriesOptions(filterOption);

  useEffect(() => {
    const processData = async () => {
      let result: ExtendedNetAPYHistoricalQuery | undefined;

      if (vault) {
        try {
          setIsLoading(true);
          result = await fetchNetApyHistorical(vault, 8453, timeseriesOptions);

          if (!result?.vaultTokenData)
            throw new Error(
              `Vault token data not found for address: ${vault}. Make sure the vault exists and the correct address is used.`
            );
          if (!result)
            throw new Error(
              `Failed to retrieve vault data for address: ${vault}. Ensure the query returns data and the endpoint is reachable.`
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

        const netApyWithoutRewardsData = result.vaultByAddress?.historicalState?.netApyWithoutRewards || [];
        const data = [...netApyWithoutRewardsData].reverse();

        const categories = data?.map((point) => formatDate(new Date(point.x * 1000), false, false));

        const series = [
          {
            name: "Native APY",
            data: data.map((point) => {
              return Number(point.y) * 100;
            }),
          },
        ];

        setChartOptions((prevOptions) => {
          return {
            ...prevOptions,
            chart: {
              id: "native-apy-graph",
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
              tickAmount: 4,
              labels: {
                formatter: (value: number) => `${formatToDisplayable(value)}%`,
              },
            },
            tooltip: {
              x: {
                show: true,
                formatter: (value: number) => {
                  const valueData = data[value];
                  if (!valueData) {
                    console.error("formatter in NetApyGraphComponent: Value data not found");
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
  }, [timeseriesOptions, vault]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 py-6 px-8 gap-8">
      <Heading vault={vault} />
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
