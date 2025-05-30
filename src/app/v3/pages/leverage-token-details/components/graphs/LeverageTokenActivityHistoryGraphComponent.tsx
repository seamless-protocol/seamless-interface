// src/components/LeverageTokenActivityHistoryGraphComponent.tsx
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexCol, FlexRow, Typography } from "@shared";
import { Address } from "viem";
import { GraphButton } from "../../../../components/graph/GraphButton";
import { GraphSpinner } from "../../../../components/graph/GraphSpinner";
import { TimeFilterButton } from "../../../../components/graph/TimeFilterButton";
import { formatDate } from "../../utils/formatDateForGraph";

export type FilterOption = "1w" | "1m" | "3m" | "1y";
const FilterOptions: FilterOption[] = ["1w", "1m", "3m", "1y"];

// define your three series colors:
const SERIES_COLORS = {
  Deposits: "#10B981",
  Withdrawals: "#F59E0B",
  Rebalances: "#3B82F6",
};

export interface LeverageTokenActivityHistoryGraphProps {
  tokenAddress?: Address;
  userAddress?: Address;
}

export const LeverageTokenActivityHistoryGraphComponent: React.FC<LeverageTokenActivityHistoryGraphProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>("1w");
  const [showDeposits, setShowDeposits] = useState(true);
  const [showWithdrawals, setShowWithdrawals] = useState(true);
  const [showRebalances, setShowRebalances] = useState(true);
  const [options, setOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    setIsLoading(true);

    // ---- MOCK DATA ----
    const now = Date.now();
    let rangeMs: number;
    switch (filterOption) {
      case "1w":
        rangeMs = 7 * 24 * 3600_000;
        break;
      case "1m":
        rangeMs = 30 * 24 * 3600_000;
        break;
      case "3m":
        rangeMs = 90 * 24 * 3600_000;
        break;
      case "1y":
        rangeMs = 365 * 24 * 3600_000;
        break;
      default:
        rangeMs = 7 * 24 * 3600_000;
    }

    const points = 20;
    const labels = Array.from({ length: points })
      .map(() => formatDate(new Date(now - Math.random() * rangeMs), false, false))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const depositData = labels.map(() => Math.floor(Math.random() * 5));
    const withdrawalData = labels.map(() => Math.floor(Math.random() * 4));
    const rebalanceData = labels.map(() => Math.floor(Math.random() * 3));

    const mockSeries: { name: string; data: number[] }[] = [];
    if (showDeposits) mockSeries.push({ name: "Deposits", data: depositData });
    if (showWithdrawals) mockSeries.push({ name: "Withdrawals", data: withdrawalData });
    if (showRebalances) mockSeries.push({ name: "Rebalances", data: rebalanceData });
    // -------------------

    setOptions({
      chart: {
        id: "lt-activity-history",
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: true },
        animations: { enabled: true, speed: 800, easing: "easeout" },
      },
      colors: mockSeries.map((s) => SERIES_COLORS[s.name as keyof typeof SERIES_COLORS]),
      stroke: { curve: "smooth", width: 2.5 },
      xaxis: {
        categories: labels,
        type: "category",
        labels: { rotate: -45 },
        tickAmount: 4,
      },
      yaxis: {
        tickAmount: 4,
        labels: {
          formatter: (val: number) => `${Math.round(val)}`, // no .00
        },
        title: { text: "Events" },
      },
      tooltip: {
        x: { formatter: (idx) => labels[idx] },
        y: { formatter: (val) => `${Math.round(val)}` }, // no .00
      },
      legend: { show: false },
    });

    setSeries(mockSeries);
    setIsLoading(false);
  }, [filterOption, showDeposits, showWithdrawals, showRebalances]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 gap-8">
      <Typography type="bold5">Activity History</Typography>

      <div className="flex gap-2">
        <GraphButton onClick={() => setShowDeposits((p) => !p)} isActive={showDeposits} color={SERIES_COLORS.Deposits}>
          Deposits
        </GraphButton>

        <GraphButton
          onClick={() => setShowWithdrawals((p) => !p)}
          isActive={showWithdrawals}
          color={SERIES_COLORS.Withdrawals}
        >
          Withdrawals
        </GraphButton>

        <GraphButton
          onClick={() => setShowRebalances((p) => !p)}
          isActive={showRebalances}
          color={SERIES_COLORS.Rebalances}
        >
          Rebalances
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
