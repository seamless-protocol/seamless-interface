import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexCol, Token, Typography, fetchToken, formatToDisplayable, useNotificationContext } from "@shared";
import { Address, formatUnits } from "viem";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { formatDate } from "../../utils/formatDateForGraph";
import { LeverageTokenValueHistoricalQuery } from "../../../../../../generated-graphql/leverage-token-index";
import { fetchLeverageTokenValueHistorical } from "../../../../../data/leverage-tokens/queries/leverage-token-value-historical/LeverageTokenValueHistorical.fetch";

export const LeverageTokenValueGraphComponent: React.FC<{
  tokenAddress?: Address;
}> = ({ tokenAddress }) => {
  const { showNotification } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(false);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!tokenAddress) return;
      let result: LeverageTokenValueHistoricalQuery | undefined;
      let tokenData: Token | undefined;

      try {
        setIsLoading(true);
        [result, tokenData] = await Promise.all([
          fetchLeverageTokenValueHistorical({ address: tokenAddress }),
          fetchToken(tokenAddress),
        ]);
        if (!result?.leverageToken) {
          throw new Error(`No stateHistory for address: ${tokenAddress}`);
        }
      } catch (error) {
        console.error("Error fetching LT value history:", error);
        showNotification({
          status: "error",
          content: <Typography>Error loading leverage token value.</Typography>,
        });
      } finally {
        setIsLoading(false);
      }

      if (!result?.leverageToken?.stateHistory || !tokenData) return;
      const rawPoints = result.leverageToken.stateHistory || [];

      const sorted = [...rawPoints].sort((a, b) => Number(a.timestamp) - Number(b.timestamp));

      const categories = sorted.map((pt) => {
        const tsNum = Number(pt.timestamp);
        const ms = tsNum / 1_000;
        return formatDate(new Date(ms), false, false);
      });

      const valueData = sorted.map((pt) => {
        return Number(formatUnits(pt.equityPerTokenInCollateral, tokenData?.decimals));
      });

      setChartOptions({
        chart: {
          id: "lt-value-graph",
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
            formatter: (val: string) => val,
          },
          tooltip: { enabled: true },
        },
        yaxis: {
          tickAmount: 4,
          labels: {
            formatter: (val: number) => `${formatToDisplayable(val)}`,
          },
        },
        tooltip: {
          x: {
            show: true,
            formatter: (index: number) => {
              const pt = sorted[index];
              if (!pt) return "";
              const tsNum = Number(pt.timestamp);
              const ms = tsNum / 1_000;
              return formatDate(new Date(ms), true, true);
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
          name: "Equity per Token",
          data: valueData,
        },
      ]);
    };

    loadData();
  }, [tokenAddress, showNotification]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 pt-2 gap-8">
      <Typography type="bold5">Leverage Token Value</Typography>

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
