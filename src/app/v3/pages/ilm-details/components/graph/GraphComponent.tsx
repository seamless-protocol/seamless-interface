import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Heading } from "./Heading";
import { GraphButton } from "./GraphButton";
import { FlexCol, FlexRow } from "../../../../../../shared";
import { TimeFilterButton } from "./TimeFilterButton";

export interface DuneData {
  Time: string;
  LpTokenPrice: number;
  LpTokenAmount: number;
}

type FilterOption = "1h" | "1d" | "1w" | "1m" | "3m" | "1y";
const FilterOptions: FilterOption[] = ["1h", "1d", "1w", "1m", "3m", "1y"];

const createRandomMockData = () => {
  const data: DuneData[] = [];
  const startDate = new Date();

  for (let i = 0; i < 30; i++) {
    // Generate data for a year
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    data.push({
      Time: date.toISOString(),
      LpTokenPrice: Math.random() * 100,
      LpTokenAmount: Math.random() * 100,
    });
  }

  return data;
};

const formatDate = (value: string, includeTime = false) => {
  const date = new Date(value);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return date.toLocaleDateString(undefined, options);
};

export const GraphComponent = () => {
  const [filterOption, setFilterOption] = useState<FilterOption>("1h");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [showLpTokenPrice, setShowLpTokenPrice] = useState(true);
  const [showLpTokenAmount, setShowLpTokenAmount] = useState(false);

  useEffect(() => {
    const mockData = createRandomMockData();

    const categories = mockData.map((item) => item.Time);
    const series = [];

    if (showLpTokenPrice) {
      series.push({
        name: "Lp Token Price",
        data: mockData.map((item) => item.LpTokenPrice),
      });
    }

    if (showLpTokenAmount) {
      series.push({
        name: "Lp Token Amount",
        data: mockData.map((item) => item.LpTokenAmount),
      });
    }

    setChartOptions({
      chart: {
        id: "ilm-details-graph",
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      colors: showLpTokenPrice ? ["#4F68F7", "#00E396"] : ["#00E396"],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories,
        labels: {
          show: true,
          formatter: (value) => formatDate(value),
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => value.toFixed(2),
        },
      },
      tooltip: {
        x: {
          format: "yyyy-MM-dd",
        },
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
    });

    setChartSeries(series);
  }, [filterOption, showLpTokenPrice, showLpTokenAmount]);

  return (
    <div className="flex flex-col w-full rounded-card bg-neutral-0 py-6 px-8 gap-8">
      <Heading />
      <div className="flex gap-2">
        <GraphButton isActive={showLpTokenPrice} onClick={() => setShowLpTokenPrice((prev) => !prev)}>
          LP Token Price (ETH)
        </GraphButton>
        <GraphButton isActive={showLpTokenAmount} onClick={() => setShowLpTokenAmount((prev) => !prev)}>
          LP Token (USD)
        </GraphButton>
      </div>
      <FlexCol>
        <Chart options={chartOptions} series={chartSeries} type={chartOptions.chart?.type} height="400" width="100%" />
        <FlexRow className="justify-between items-center mt-[-10px] px-4">
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
