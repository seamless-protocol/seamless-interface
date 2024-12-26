import { TotalSupplyHistoricalQuery } from "@generated-graphql";
import { formatFetchBigIntToViewBigInt } from "../../../../shared";

export const mapTotalSupplyData = (rawData: TotalSupplyHistoricalQuery["vaultByAddress"]) => {
  const data = {
    totalSupply: formatFetchBigIntToViewBigInt({
      bigIntValue: rawData?.state?.totalSupply ?? 0n,
      decimals: 18, // TODO morpho: even usdc is 18, todo: Double check with morpho team
      symbol: "$",
    }),
  };

  return data;
};
