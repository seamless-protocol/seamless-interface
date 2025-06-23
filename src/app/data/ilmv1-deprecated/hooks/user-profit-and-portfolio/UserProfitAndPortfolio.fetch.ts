import { Address, parseEther } from "viem";
import { leverageTokensConfig } from "../../../leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { fetchUserUnrealized } from "../../../leverage-tokens/queries/leverage-token-profit/unrealized-gain-loss.fetch";
import { fetchUserEquity } from "../../../leverage-tokens/queries/user-equity/user-equity.fetch";
import { fetchUserVaultPositions } from "../../../morpho/user-vault-positions/UserVaultPositions.fetch";
import { fetchStrategies } from "../../queries/Strategies.hook";
import {
  fetchUserStrategyProfit,
  FetchUserStrategyProfitOutput,
} from "../user-strategy-profit/UserStrategyProfit.fetch";
import { cUserProfitAndPortfolio, cUserProfitAndPortfolioOutput } from "./UserProfitAndPortfolio.math";

export const fetchLeverageTokenProfits = async (account: Address) => {
  const leverageTokens = leverageTokensConfig;
  const leverageTokensProfits: FetchUserStrategyProfitOutput[] = [];

  await Promise.all(
    leverageTokens.map(async (token) => {
      const unrealizedProfit = await fetchUserUnrealized(account, token.address);
      const equity = await fetchUserEquity(account, token.address);

      const isEquityInvalid =
        !equity.tokenAmount.bigIntValue ||
        !equity.dollarAmount.bigIntValue ||
        !equity.tokenAmount.decimals ||
        !equity.dollarAmount.decimals ||
        !equity.tokenAmount.symbol ||
        !equity.dollarAmount.symbol;

      const isUnrealizedProfitInvalid =
        !unrealizedProfit.unrealizedUsd.bigIntValue ||
        !unrealizedProfit.unrealizedUsd.decimals ||
        !unrealizedProfit.unrealizedUsd.symbol ||
        !unrealizedProfit.unrealizedPercent.value;

      if (isEquityInvalid || isUnrealizedProfitInvalid) {
        return;
      }

      leverageTokensProfits.push({
        strategyBalance: {
          tokenAmount: {
            bigIntValue: equity.tokenAmount.bigIntValue!,
            decimals: equity.tokenAmount.decimals!,
            symbol: equity.tokenAmount.symbol!,
          },
          dollarAmount: {
            bigIntValue: equity.dollarAmount.bigIntValue!,
            decimals: equity.dollarAmount.decimals!,
            symbol: equity.dollarAmount.symbol!,
          },
        },
        // TODO: replace this with the realized profit from subgraph because this field is not used currently
        realizedProfit: {
          bigIntValue: 0n,
          decimals: 18,
          symbol: "$",
        },
        unrealizedProfit: {
          bigIntValue: unrealizedProfit.unrealizedUsd.bigIntValue!,
          decimals: unrealizedProfit.unrealizedUsd.decimals!,
          symbol: unrealizedProfit.unrealizedUsd.symbol!,
        },
        unrealizedProfitPercentage: {
          bigIntValue: parseEther(unrealizedProfit.unrealizedPercent.value!.toFixed(18)),
          decimals: 18,
          symbol: "%",
        },
      });
    })
  );

  return leverageTokensProfits;
};

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

  const leverageTokensProfits = await fetchLeverageTokenProfits(account);

  return cUserProfitAndPortfolio({
    profits: results.concat(leverageTokensProfits),
  });
}
