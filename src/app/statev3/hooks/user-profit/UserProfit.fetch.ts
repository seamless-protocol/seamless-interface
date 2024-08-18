import { Address } from "viem";
import { getAllSubStrategies } from "../../../state/settings/configUtils";
import { fetchUserStrategyProfit } from "../user-strategy-profit/UserStrategyProfit.fetch";
import { cUserProfit, cUserProfitOutput } from "./UserProfit.math";

export async function fetchUserProfit({ account }: { account: Address }): Promise<cUserProfitOutput> {
  const strategies = getAllSubStrategies();

  const results = await Promise.all(strategies.map((strategy) => fetchUserStrategyProfit({ user: account, strategy })));

  return cUserProfit({ profits: results });
}
