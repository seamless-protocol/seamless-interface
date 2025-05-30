// src/components/YieldVsBorrowRateGraphComponent.tsx
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexCol, FlexRow, Typography, formatToDisplayable } from "@shared";
import { TimeFilterButton } from "../../../../components/graph/TimeFilterButton";
import { GraphButton } from "../../../../components/graph/GraphButton";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { formatDate } from "../../utils/formatDateForGraph";

export type FilterOption = "1w" | "1m" | "3m" | "1y";
const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

// define our two series colors
const SERIES_COLORS = {
  "Yield Rate": "#10B981",
  "Borrow Rate": "#3B82F6",
};

export const YieldVsBorrowRateGraphComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [showYield, setShowYield] = useState(true);
  const [showBorrow, setShowBorrow] = useState(true);
  const [options, setOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    setIsLoading(true);

    // generate mock labels & data
    const labels = Array.from({ length: 25 })
      .map(() => {
        const daysAgo = Math.floor(Math.random() * 30);
        return formatDate(new Date(Date.now() - daysAgo * 86400_000), false, false);
      })
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const yieldData = labels.map(() => parseFloat((Math.random() * 8 + 2).toFixed(2)));
    const borrowData = labels.map(() => parseFloat((Math.random() * 4 + 1).toFixed(2)));

    const newSeries = [];
    if (showYield) newSeries.push({ name: "Yield Rate", data: yieldData });
    if (showBorrow) newSeries.push({ name: "Borrow Rate", data: borrowData });

    setOptions({
      chart: {
        id: "yield-borrow-graph",
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: true },
        animations: { enabled: true, speed: 1500, easing: "easeout" },
      },
      colors: newSeries.map((s) => SERIES_COLORS[s.name as keyof typeof SERIES_COLORS]),
      stroke: { curve: "straight", width: 2.5 },
      xaxis: {
        categories: labels,
        labels: { rotate: 0 },
        type: "category",
        tickAmount: 5,
      },
      yaxis: {
        tickAmount: 4,
        labels: {
          formatter: (val: number) => `${formatToDisplayable(val)}%`,
        },
      },
      legend: { show: false },
      grid: { strokeDashArray: 4 },
      tooltip: {
        x: {
          formatter: (idx: number) => labels[idx],
        },
        y: {
          formatter: (val: number) => `${val.toFixed(2)}%`,
        },
      },
    });

    setSeries(newSeries);
    setIsLoading(false);
  }, [filterOption, showYield, showBorrow]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 gap-8">
      <Typography type="bold5">Yield vs. Borrow Rate</Typography>

      <div className="flex gap-2">
        <GraphButton onClick={() => setShowYield((p) => !p)} isActive={showYield} color={SERIES_COLORS["Yield Rate"]}>
          Yield
        </GraphButton>
        <GraphButton
          onClick={() => setShowBorrow((p) => !p)}
          isActive={showBorrow}
          color={SERIES_COLORS["Borrow Rate"]}
        >
          Borrow
        </GraphButton>
      </div>

      <FlexCol>
        <div className="relative">
          {isLoading && <GraphSpinner />}
          <Chart
            options={options}
            series={series}
            type="line"
            height="400"
            width="100%"
            className="mx-[-30px] md:mx-[-14px]"
          />
        </div>
        <FlexRow className="justify-between items-center px-4">
          {FilterOptions.map((opt) => (
            <TimeFilterButton key={opt} isActive={opt === filterOption} onClick={() => setFilterOption(opt)}>
              {opt}
            </TimeFilterButton>
          ))}
        </FlexRow>
      </FlexCol>
    </div>
  );
};
