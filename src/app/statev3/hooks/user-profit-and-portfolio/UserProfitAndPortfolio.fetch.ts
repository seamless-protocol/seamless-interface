import { Address } from "viem";
import { fetchUserStrategyProfit } from "../user-strategy-profit/UserStrategyProfit.fetch";
import { cUserProfitAndPortfolio, cUserProfitAndPortfolioOutput } from "./UserProfitAndPortfolio.math";
import { fetchStrategies } from "../../queries/Strategies.hook";
import { fetchUserVaultPositions } from "../../morpho/user-vault-positions/UserVaultPositions.fetch";
import { base } from "viem/chains";
import { whiteListedMorphoVaults } from "@meta";

export async function fetchUserProfitAndPortfolio({
  account,
}: {
  account: Address;
}): Promise<cUserProfitAndPortfolioOutput> {
  const strategies = await fetchStrategies();
  const vaults = await fetchUserVaultPositions(account, whiteListedMorphoVaults, base.id);

  const strategyObjects = strategies.map((strategy) => ({
    address: strategy,
  }));

  const vaultObjects =
    vaults?.vaultPositions.items?.map((vault) => ({
      address: vault.vault.address,
    })) || [];

  const results = await Promise.all(
    [...strategyObjects, ...vaultObjects].map((item) => fetchUserStrategyProfit({ user: account, ...item }))
  );

  return cUserProfitAndPortfolio({ profits: results });
}
