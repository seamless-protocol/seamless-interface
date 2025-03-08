import { formatFetchBigIntToViewBigInt, formatFetchNumberToViewNumber } from "@shared";
import { ExtendedTotalAssetsHistoricalData } from "./ExtendedTotalAssetsHistoricalData.type";

export const mapTotalAssetsHistorical = (rawData: ExtendedTotalAssetsHistoricalData) => {
  const data = {
    totalAssetsUsd: formatFetchNumberToViewNumber({
      value: rawData?.vaultByAddress?.state?.totalAssetsUsd || undefined,
      symbol: "$",
    }),
    totalAssets: formatFetchBigIntToViewBigInt({
      bigIntValue: rawData?.vaultByAddress.state?.totalAssets,
      decimals: rawData?.vaultByAddress.asset.decimals,
      symbol: rawData?.vaultByAddress.asset.symbol,
    }),
  };

  return data;
};
