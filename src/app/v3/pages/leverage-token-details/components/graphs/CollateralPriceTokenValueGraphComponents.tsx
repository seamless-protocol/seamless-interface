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

  // fixed colors:
  const BLUE = "#4F68F7";
  const GREEN = "#22C55E";

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

      // Extract collateral price points and sort by timestamp (ms)
      const collateralRaw = collateralResult.leverageToken.lendingAdapter.oracle.priceUpdates || [];
      const collateralDecimals = collateralResult.leverageToken.lendingAdapter.oracle.decimals;
      const collateralPoints = collateralRaw
        .map((pt) => ({
          ts: Number(pt.timestamp) / 1_000,
          value: Number(pt.price) / 10 ** collateralDecimals,
        }))
        .sort((a, b) => a.ts - b.ts);

      // Extract equity-per-token points and sort by timestamp (ms)
      const valueRaw = valueResult.leverageToken.stateHistory || [];
      const valuePoints = valueRaw
        .map((pt) => ({
          ts: Number(pt.timestamp) / 1_000,
          value: Number(formatUnits(pt.equityPerTokenInDebt, tokenData.decimals)),
        }))
        .sort((a, b) => a.ts - b.ts);

      // Build merged timestamp list
      const allTimestamps = Array.from(
        new Set([...collateralPoints.map((pt) => pt.ts), ...valuePoints.map((pt) => pt.ts)])
      ).sort((a, b) => a - b);

      // Prepare arrays for series data
      const collateralSeriesData: (number | null)[] = [];
      const valueSeriesData: (number | null)[] = [];
      const categories: string[] = [];

      // Use a pointer to forward-fill collateral price
      let j = 0;
      for (const ts of allTimestamps) {
        // Build category label
        categories.push(formatDate(new Date(ts), false, false));
        // Advance j to the latest collateralPoints index where collateralPoints[j].ts <= ts
        while (j + 1 < collateralPoints.length && collateralPoints[j + 1].ts <= ts) {
          j++;
        }
        // If collateralPoints[j].ts <= ts, use collateralPoints[j].value; else null
        if (collateralPoints.length > 0 && collateralPoints[j].ts <= ts) {
          collateralSeriesData.push(collateralPoints[j].value);
        } else {
          collateralSeriesData.push(null);
        }
        // For equity, use exact match or null
        const equPt = valuePoints.find((pt) => pt.ts === ts);
        valueSeriesData.push(equPt ? equPt.value : null);
      }

      // Prepare series & colors based on toggles
      const newSeries: { name: string; data: (number | null)[] }[] = [];
      const seriesColors: string[] = [];

      if (showCollateral) {
        newSeries.push({
          name: `Collateral Price (${collateralPriceLabel})`,
          data: collateralSeriesData,
        });
        seriesColors.push(BLUE);
      }
      if (showValue) {
        newSeries.push({
          name: "Equity per Token",
          data: valueSeriesData,
        });
        seriesColors.push(GREEN);
      }

      setChartSeries(newSeries);

      // Build chart options using the dynamic colors
      setChartOptions({
        chart: {
          id: "collateral-vs-value-graph",
          type: "line",
          toolbar: { show: false },
          zoom: { enabled: true },
          animations: { enabled: true, speed: 1500, easing: "easeout" },
        },
        colors: seriesColors,
        dataLabels: { enabled: false },
        xaxis: {
          type: "category",
          categories,
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
            formatter: (index: number) => categories[index - 1],
          },
          y: {
            formatter: (val: number) => `${formatToDisplayable(val, { singleDigitNumberDecimals: 5 })}`,
            title: {
              formatter: (seriesName: string) => seriesName,
            },
          },
        },
      });

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
