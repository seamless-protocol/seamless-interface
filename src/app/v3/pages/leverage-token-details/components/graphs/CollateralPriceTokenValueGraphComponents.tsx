import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexCol, FlexRow, Typography, formatToDisplayable, useNotificationContext, fetchToken } from "@shared";
import { Address, formatUnits } from "viem";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { GraphButton } from "../../../../components/graph/GraphButton";
import { formatDate } from "../../utils/formatDateForGraph";
import { fetchCollateralPriceHistorical } from "../../../../../data/leverage-tokens/queries/collateral-price-historical/CollateralPriceHistorical.fetch";
import { fetchLeverageTokenValueHistorical } from "../../../../../data/leverage-tokens/queries/leverage-token-value-historical/LeverageTokenValueHistorical.fetch";
import {
  CollateralPriceHistoricalQuery,
  LeverageTokenValueHistoricalQuery,
} from "../../../../../../generated-graphql/leverage-token-index";

export const CollateralVsValueGraphComponent: React.FC<{
  tokenAddress?: Address;
  collateralPriceLabel?: string;
}> = ({ tokenAddress, collateralPriceLabel }) => {
  const { showNotification } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showCollateral, setShowCollateral] = useState(true);
  const [showValue, setShowValue] = useState(true);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: (number | null)[] }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!tokenAddress) return;
      setIsLoading(true);

      let collateralResult: CollateralPriceHistoricalQuery | undefined;
      let valueResult: LeverageTokenValueHistoricalQuery | undefined;
      let tokenData: Awaited<ReturnType<typeof fetchToken>> | undefined;

      try {
        [collateralResult, valueResult, tokenData] = await Promise.all([
          fetchCollateralPriceHistorical({ address: tokenAddress }),
          fetchLeverageTokenValueHistorical({ address: tokenAddress }),
          fetchToken(tokenAddress),
        ]);

        if (!collateralResult?.leverageToken) {
          throw new Error(`No collateral data for ${tokenAddress}`);
        }
        if (!valueResult?.leverageToken) {
          throw new Error(`No token value data for ${tokenAddress}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification({
          status: "error",
          content: <Typography>Error loading chart data.</Typography>,
        });
        setIsLoading(false);
        return;
      }

      // Extract and sort collateral price points
      const collateralRaw = collateralResult.leverageToken.lendingAdapter.oracle.priceUpdates || [];
      const collateralDecimals = collateralResult.leverageToken.lendingAdapter.oracle.decimals;
      const collateralPoints = collateralRaw.map((pt) => ({
        ts: Number(pt.timestamp) / 1_000, // micro → ms
        value: Number(pt.price) / 10 ** collateralDecimals,
      }));
      collateralPoints.sort((a, b) => a.ts - b.ts);

      // Extract and sort token value points
      const valueRaw = valueResult.leverageToken.stateHistory || [];
      const valuePoints = valueRaw.map((pt) => ({
        ts: Number(pt.timestamp) / 1_000,
        value: Number(formatUnits(pt.equityPerTokenInCollateral, tokenData.decimals)),
      }));
      valuePoints.sort((a, b) => a.ts - b.ts);

      // Build maps for quick lookup
      const collateralMap = new Map<number, number>();
      collateralPoints.forEach((pt) => collateralMap.set(pt.ts, pt.value));

      const valueMap = new Map<number, number>();
      valuePoints.forEach((pt) => valueMap.set(pt.ts, pt.value));

      // Merge all timestamps
      const allTimestamps = Array.from(
        new Set([...collateralPoints.map((pt) => pt.ts), ...valuePoints.map((pt) => pt.ts)])
      );
      allTimestamps.sort((a, b) => a - b);

      // Build categories (formatted) and series arrays
      const newCategories = allTimestamps.map((ts) => formatDate(new Date(ts), false, false));
      const collateralSeriesData = allTimestamps.map((ts) => (collateralMap.has(ts) ? collateralMap.get(ts)! : null));
      const valueSeriesData = allTimestamps.map((ts) => (valueMap.has(ts) ? valueMap.get(ts)! : null));

      setChartOptions({
        chart: {
          id: "collateral-vs-value-graph",
          type: "line",
          toolbar: { show: false },
          zoom: { enabled: true },
          animations: { enabled: true, speed: 1500, easing: "easeout" },
        },
        colors: ["#4F68F7", "#F47F5E"],
        dataLabels: { enabled: false },
        xaxis: {
          type: "category",
          categories: newCategories,
          tickAmount: 5,
          labels: { rotate: 0, formatter: (val: string) => val },
          tooltip: { enabled: true },
        },
        yaxis: {
          tickAmount: 4,
          labels: {
            formatter: (val: number) => `${formatToDisplayable(val, { singleDigitNumberDecimals: 5 })}`,
          },
        },
        stroke: { curve: "straight", width: 2.5 },
        legend: { show: false },
        grid: { strokeDashArray: 4 },
        tooltip: {
          x: {
            show: true,
            formatter: (index: number) => newCategories[index],
          },
          y: {
            formatter: (val: number) => `${formatToDisplayable(val, { singleDigitNumberDecimals: 5 })}`,
            title: {
              formatter: (seriesName: string) => seriesName,
            },
          },
        },
      });

      // Build series based on toggles (both use the single y-axis)
      const newSeries: { name: string; data: (number | null)[] }[] = [];
      if (showCollateral) {
        newSeries.push({
          name: `Collateral Price (${collateralPriceLabel})`,
          data: collateralSeriesData,
        });
      }
      if (showValue) {
        newSeries.push({
          name: "Equity per Token",
          data: valueSeriesData,
        });
      }
      setChartSeries(newSeries);

      setIsLoading(false);
    };

    loadData();
  }, [tokenAddress, collateralPriceLabel, showCollateral, showValue, showNotification]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 gap-8 p-4">
      <Typography type="bold5">Collateral vs. Token Value</Typography>

      <FlexRow className="gap-2">
        <GraphButton isActive={showCollateral} onClick={() => setShowCollateral((prev) => !prev)}>
          Collateral Price
        </GraphButton>
        <GraphButton isActive={showValue} onClick={() => setShowValue((prev) => !prev)}>
          Equity per Token
        </GraphButton>
      </FlexRow>

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
