import { Address } from "viem";
import { fetchUserStrategyProfit } from "../user-strategy-profit/UserStrategyProfit.fetch";
import { cUserProfitAndPortfolio, cUserProfitAndPortfolioOutput } from "./UserProfitAndPortfolio.math";
import { fetchStrategies } from "../../queries/Strategies.hook";

export async function fetchUserProfitAndPortfolio({
  account,
}: {
  account: Address;
}): Promise<cUserProfitAndPortfolioOutput> {
  const strategies = await fetchStrategies();

  const results = await Promise.all(strategies.map((strategy) => fetchUserStrategyProfit({ user: account, strategy })));

  return cUserProfitAndPortfolio({ profits: results });
}
