import { NetApyHistoricalQuery } from "@generated-graphql";
import { Token } from "@shared";

export interface ExtendedNetAPYHistoricalData extends NetApyHistoricalQuery {
  vaultTokenData: Token;
}
