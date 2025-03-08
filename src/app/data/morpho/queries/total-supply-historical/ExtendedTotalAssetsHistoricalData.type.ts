import { TotalAssetsHistoricalQuery } from "@generated-graphql";
import { Token } from "@shared";

export interface ExtendedTotalAssetsHistoricalData extends TotalAssetsHistoricalQuery {
  vaultTokenData: Token;
}
