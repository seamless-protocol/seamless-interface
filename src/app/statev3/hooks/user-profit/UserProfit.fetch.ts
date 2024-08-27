import { Address } from "viem";
import { fetchUserStrategyProfit } from "../user-strategy-profit/UserStrategyProfit.fetch";
import { cUserProfit, cUserProfitOutput } from "./UserProfit.math";
import { fetchStrategies } from "../../queries/Strategies.hook";

export async function fetchUserProfit({ account }: { account: Address }): Promise<cUserProfitOutput> {
  const strategies = await fetchStrategies();

  const results = await Promise.all(strategies.map((strategy) => fetchUserStrategyProfit({ user: account, strategy })));

  return cUserProfit({ profits: results });
}
