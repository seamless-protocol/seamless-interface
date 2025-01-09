import { TotalSupplyHistoricalQuery } from "../../../../generated-graphql";
import { Token } from "@shared";

export interface ExtendedTotalSupplyHistoricalQuery extends TotalSupplyHistoricalQuery {
  vaultTokenData: Token;
}
