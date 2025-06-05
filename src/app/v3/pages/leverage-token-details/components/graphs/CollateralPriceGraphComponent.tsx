import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexCol, Typography, formatToDisplayable, useNotificationContext } from "@shared";
import { Address } from "viem";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { formatDate } from "../../utils/formatDateForGraph";
import { CollateralPriceHistoricalQuery } from "../../../../../../generated-graphql/leverage-token-index";
import { fetchCollateralPriceHistorical } from "../../../../../data/leverage-tokens/queries/collateral-price-historical/CollateralPriceHistorical.fetch";

export const CollateralPriceGraphComponent: React.FC<{
  collateralAddress?: Address;
}> = ({ collateralAddress }) => {
  const { showNotification } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(false);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!collateralAddress) return;
      let result: CollateralPriceHistoricalQuery | undefined;

      try {
        setIsLoading(true);
        result = await fetchCollateralPriceHistorical({ address: collateralAddress });

        if (!result?.leverageToken) {
          throw new Error(`No data returned for address: ${collateralAddress}`);
        }
      } catch (error) {
        console.error("Error fetching collateral price history:", error);
        showNotification({
          status: "error",
          content: <Typography>Error loading collateral price history.</Typography>,
        });
      } finally {
        setIsLoading(false);
      }

      if (!result?.leverageToken?.lendingAdapter?.oracle) return;
      const { oracle } = result.leverageToken.lendingAdapter;
      const { decimals } = oracle;
      const rawPoints = oracle.priceUpdates || [];

      // Sort by timestamp ascending
      const sorted = [...rawPoints].sort((a, b) => a.timestamp - b.timestamp);

      // Build categories (formatted dates) and series data (price / 10^decimals)
      const categories = sorted.map((pt) => formatDate(new Date(pt.timestamp / 1000), false, false));
      const priceData = sorted.map((pt) => Number(pt.price) / 10 ** decimals);

      setChartOptions({
        chart: {
          id: "collateral-price-graph",
          type: "line",
          toolbar: { show: false },
          zoom: { enabled: true },
          animations: {
            enabled: true,
            speed: 2000,
            easing: "easeout",
          },
        },
        colors: ["#4F68F7"],
        dataLabels: { enabled: false },
        xaxis: {
          type: "category",
          categories,
          tickAmount: 5,
          labels: {
            rotate: 0,
            formatter: (value: string) => value,
          },
          tooltip: { enabled: true },
        },
        yaxis: {
          tickAmount: 4,
          labels: {
            formatter: (val: number) => `$${formatToDisplayable(val)}`,
          },
        },
        tooltip: {
          x: {
            show: true,
            formatter: (index: number) => {
              const point = sorted[index - 1];
              if (!point) return "";
              return formatDate(new Date(Number(point.timestamp) / 1_000), true, true);
            },
          },
          cssClass: "custom-tooltip",
        },
        grid: {
          strokeDashArray: 4,
          xaxis: { lines: { show: false } },
          yaxis: { lines: { show: true } },
        },
        stroke: { curve: "straight", width: 2.5 },
        legend: { show: false },
      });

      setChartSeries([
        {
          name: "Collateral Price (USD)",
          data: priceData,
        },
      ]);
    };

    loadData();
  }, [collateralAddress, showNotification]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 pt-2 gap-8">
      <Typography type="bold5">Collateral Price</Typography>

      <FlexCol>
        <div className="relative">
          {isLoading && <GraphSpinner />}
          <Chart
            options={chartOptions}
            series={chartSeries}
            type={chartOptions.chart?.type || "line"}
            height="400"
            width="100%"
            className="mx-[-30px] md:mx-[-14px]"
          />
        </div>
      </FlexCol>
    </div>
  );
};
