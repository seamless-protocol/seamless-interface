import { formatFetchNumberToViewNumber } from "../../../../shared";
import { ExtendedNetAPYHistoricalQuery } from "../types/ExtendedNetAPYHistoricalQuery";

export const mapNativeApyData = (rawData: ExtendedNetAPYHistoricalQuery) => {
  const netApy = rawData?.vaultByAddress?.state?.netApy;
  const netApyWithoutRewards = rawData?.vaultByAddress?.state?.netApyWithoutRewards;

  const data = {
    netApy: formatFetchNumberToViewNumber({
      value: netApy != null ? netApy * 100 : undefined,
      symbol: "%",
    }),
    netApyWithoutRewards: formatFetchNumberToViewNumber({
      value: netApyWithoutRewards != null ? netApyWithoutRewards * 100 : undefined,
      symbol: "%",
    }),
  };

  return data;
};
