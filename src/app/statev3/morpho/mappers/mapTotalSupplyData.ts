import { TotalSupplyHistoricalQuery } from "@generated-graphql";
import { formatFetchNumberToViewNumber } from "../../../../shared";

export const mapTotalSupplyData = (rawData: TotalSupplyHistoricalQuery["vaultByAddress"]) => {
  const data = {
    totalSupplyUsd: formatFetchNumberToViewNumber({
      value: rawData?.state?.totalAssetsUsd ?? 0,
      symbol: "$",
    }),
  };

  return data;
};
