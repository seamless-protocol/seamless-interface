import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexCol, FlexRow, Typography, formatToDisplayable } from "@shared";
import { TimeFilterButton } from "../../../../components/graph/TimeFilterButton";
import { GraphButton } from "../../../../components/graph/GraphButton";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { formatDate } from "../../../morpho-vault-details/utils/formatDateForGraph";

export type FilterOption = "1w" | "1m" | "3m" | "1y";
const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

export const YieldVsBorrowRateGraphComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [showYield, setShowYield] = useState(true);
  const [showBorrow, setShowBorrow] = useState(true);
  const [options, setOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    setIsLoading(true);

    // generate 25 random dates within the last 30 days
    const labels = Array.from({ length: 25 }).map(() => {
      const daysAgo = Math.floor(Math.random() * 30); // 0–29 days ago
      const date = new Date(Date.now() - daysAgo * 86400_000);
      return formatDate(date, false, false);
    });

    // sort chronologically (oldest → newest)
    labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const yieldData = labels.map(() => parseFloat((Math.random() * 8 + 2).toFixed(2)));
    const borrowData = labels.map(() => parseFloat((Math.random() * 4 + 1).toFixed(2)));

    const newSeries: { name: string; data: number[] }[] = [];
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
      xaxis: {
        categories: labels,
        labels: { rotate: 0 },
        type: "category",
        tickAmount: 5,
        tooltip: { enabled: true },
      },
      yaxis: {
        tickAmount: 4,
        labels: { formatter: (val: number) => `${formatToDisplayable(val)}%` },
      },
      stroke: { curve: "straight", width: 2.5 },
      legend: { show: false },
      grid: { strokeDashArray: 4 },
      tooltip: {
        x: {
          show: true,
          formatter: (val: number) => labels[val],
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
        <GraphButton isActive={showYield} onClick={() => setShowYield((prev) => !prev)}>
          Yield
        </GraphButton>
        <GraphButton isActive={showBorrow} onClick={() => setShowBorrow((prev) => !prev)}>
          Borrow
        </GraphButton>
      </div>
      <FlexCol>
        <div className="relative">
          {isLoading && <GraphSpinner />}
          <Chart
            options={options}
            series={series}
            type={options.chart?.type || "line"}
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
