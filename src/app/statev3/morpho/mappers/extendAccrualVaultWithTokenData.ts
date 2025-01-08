import { fetchToken, Token } from "@shared";
import { AccrualVault, VaultMarketAllocation } from "@morpho-org/blue-sdk";
import { ExtendedAccrualVault } from "../types/ExtendedAccrualVault";

/**
 * Extends an AccrualVault instance with collateralTokenData and loanTokenData for each allocation.
 *
 * @param vault - The AccrualVault instance to be extended.
 * @returns A Promise that resolves to a new ExtendedAccrualVault instance.
 */
export async function extendAccrualVaultWithTokenData(vault: AccrualVault): Promise<ExtendedAccrualVault> {
  const underlyingTokenData = await fetchToken(vault.underlying);

  // Convert the allocations map to an array of [marketId, allocation] tuples
  const allocationEntries: [string, VaultMarketAllocation][] = Array.from(vault.allocations.entries());

  // Fetch token data for all allocations in parallel
  const tokenDataPromises = allocationEntries.map(async ([_marketId, allocation]) => {
    const collateralAddress = allocation.position.market.params.collateralToken;
    const loanTokenAddress = allocation.position.market.params.loanToken;

    // Fetch token data for collateral and loan tokens
    const [collateralTokenData, loanTokenData] = await Promise.all([
      fetchToken(collateralAddress),
      fetchToken(loanTokenAddress),
    ]);

    return { collateralAddress, loanTokenAddress, collateralTokenData, loanTokenData };
  });

  // Resolve all promises
  const tokenDataResults = await Promise.all(tokenDataPromises);

  // Reduce the results into two maps: collateralTokenData and loanTokenData
  const { collateralTokenData, loanTokenData } = tokenDataResults.reduce<{
    collateralTokenData: Map<string, Token>;
    loanTokenData: Map<string, Token>;
  }>(
    (acc, { collateralAddress, loanTokenAddress, collateralTokenData, loanTokenData }) => {
      acc.collateralTokenData.set(collateralAddress, collateralTokenData);
      acc.loanTokenData.set(loanTokenAddress, loanTokenData);
      return acc;
    },
    {
      collateralTokenData: new Map<string, Token>(),
      loanTokenData: new Map<string, Token>(),
    }
  );

  // Return a new vault instance with the token data added
  return Object.assign(vault, {
    collateralTokenData,
    loanTokenData,
    underlyingTokenData,
  });
}
