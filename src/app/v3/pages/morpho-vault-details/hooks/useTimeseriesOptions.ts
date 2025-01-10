import { useMemo } from "react";
import { TimeseriesOptions, TimeseriesInterval } from "../../../../../generated-graphql";
import { subWeeks, subMonths, subYears, getUnixTime } from "date-fns";

export const useTimeseriesOptions = (filterOption: string): TimeseriesOptions => {
  const timeseriesOptions: TimeseriesOptions = useMemo((): TimeseriesOptions => {
    const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    let startDate: Date;
    let interval = TimeseriesInterval.Day;

    switch (filterOption) {
      case "1w": {
        startDate = subWeeks(new Date(), 1);
        interval = TimeseriesInterval.Hour;
        break;
      }
      case "1m": {
        startDate = subMonths(new Date(), 1);
        interval = TimeseriesInterval.Day;
        break;
      }
      case "3m": {
        startDate = subMonths(new Date(), 3);
        interval = TimeseriesInterval.Day;
        break;
      }
      case "1y": {
        startDate = subYears(new Date(), 1);
        interval = TimeseriesInterval.Week;
        break;
      }
      default: {
        startDate = subWeeks(new Date(), 1);
        interval = TimeseriesInterval.Hour;
        break;
      }
    }

    const startTimestamp = getUnixTime(startDate);

    return {
      startTimestamp,
      endTimestamp: now,
      interval,
    };
  }, [filterOption]);

  return timeseriesOptions;
};
