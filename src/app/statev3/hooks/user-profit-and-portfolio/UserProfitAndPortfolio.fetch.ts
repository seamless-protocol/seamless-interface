import { Address } from "viem";
import { fetchUserStrategyProfit } from "../user-strategy-profit/UserStrategyProfit.fetch";
import { cUserProfitAndPortfolio, cUserProfitAndPortfolioOutput } from "./UserProfitAndPortfolio.math";
import { fetchStrategies } from "../../queries/Strategies.hook";
import { fetchUserVaultPositions } from "../../morpho/user-vault-positions/UserVaultPositions.fetch";

export async function fetchUserProfitAndPortfolio({
  account,
}: {
  account: Address;
}): Promise<cUserProfitAndPortfolioOutput> {
  const strategies = await fetchStrategies();
  const vaults = await fetchUserVaultPositions(account);

  const strategyObjects = strategies.map((strategy) => ({
    address: strategy,
  }));

  const vaultObjects =
    vaults?.map((item) => ({
      address: item.vault,
    })) || [];

  const results = await Promise.all(
    [...strategyObjects, ...vaultObjects].map((item) => fetchUserStrategyProfit({ user: account, ...item }))
  );

  return cUserProfitAndPortfolio({ profits: results });
}
