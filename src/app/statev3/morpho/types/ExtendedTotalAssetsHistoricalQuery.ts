import { TotalAssetsHistoricalQuery } from "../../../../generated-graphql";
import { Token } from "@shared";

export interface ExtendedTotalAssetsHistoricalQuery extends TotalAssetsHistoricalQuery {
  vaultTokenData: Token;
}
