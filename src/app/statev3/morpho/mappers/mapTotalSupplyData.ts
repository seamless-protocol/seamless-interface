import { formatFetchBigIntToViewBigInt, formatFetchNumberToViewNumber } from "@shared";
import { ExtendedTotalSupplyHistoricalQuery } from "../types/ExtendedTotalSupplyHistoricalQuery";

export const mapTotalSupplyData = (rawData: ExtendedTotalSupplyHistoricalQuery) => {
  const data = {
    totalSupplyUsd: formatFetchNumberToViewNumber({
      value: rawData?.vaultByAddress?.state?.totalAssetsUsd || undefined,
      symbol: "$",
    }),
    totalSupply: formatFetchBigIntToViewBigInt({
      bigIntValue: rawData?.vaultByAddress.state?.totalAssets,
      decimals: rawData?.vaultByAddress.asset.decimals,
      symbol: rawData?.vaultByAddress.asset.symbol,
    }),
  };

  return data;
};
