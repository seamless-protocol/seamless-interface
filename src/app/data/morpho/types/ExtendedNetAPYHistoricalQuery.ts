import { NetApyHistoricalQuery } from "../../../../generated-graphql";
import { Token } from "@shared";

export interface ExtendedNetAPYHistoricalQuery extends NetApyHistoricalQuery {
  vaultTokenData: Token;
}
