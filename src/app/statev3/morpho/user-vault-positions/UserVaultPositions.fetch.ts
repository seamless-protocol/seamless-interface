import {
  UserVaultPositionsDocument,
  UserVaultPositionsQuery,
  UserVaultPositionsQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";
import { formatFetchNumberToViewNumber } from "@shared";
import { fetchFullVaultInfo } from "../full-vault-info/FullVaultInfo.fetch";
import { mapVaultData } from "../mappers/mapVaultData";

export async function fetchUserVaultPositions(address: string, chainId: number): Promise<UserVaultPositionsQuery> {
  const client = getApolloClient();

  const result = await client.query<UserVaultPositionsQuery, UserVaultPositionsQueryVariables>({
    query: UserVaultPositionsDocument,
    variables: { address, chainId },
    fetchPolicy: "cache-first",
  });

  if (result.errors) {
    throw new Error(
      `GraphQL Query Failed: UserVaultPositionsQuery\n` +
        `Variables: ${JSON.stringify({ address, chainId })}\n` +
        `Errors: ${result.errors.map((e) => e.message).join("; ")}`
    );
  } else if (result.error) {
    throw new Error(
      `GraphQL Query Failed: UserVaultPositionsQuery\n` +
        `Variables: ${JSON.stringify({ address, chainId })}\n` +
        `Error: ${result.error.message}`
    );
  }

  return {
    ...result.data,
  };
}

export async function fetchExtendedMappedVaultPositions(address: string, chainId: number) {
  // Step 1: Fetch raw vault positions
  const rawVaultPositions = await fetchUserVaultPositions(address, chainId);

  // Step 2: Fetch detailed vault info for each position
  const extendedVaultPositions = await Promise.all(
    rawVaultPositions.userByAddress.vaultPositions.map(async (vaultPosition) => {
      const vaultDetails = await fetchFullVaultInfo(vaultPosition.vault.address, chainId);
      const mappedVaultDetails = mapVaultData(vaultDetails.vaultByAddress);

      return {
        ...vaultPosition,
        mappedVaultDetails,
      };
    })
  );

  // Step 3: Compute total USD value
  const totalUsdValue = extendedVaultPositions.reduce((acc, position) => acc + (position.assetsUsd || 0), 0);

  // Step 4: Format the total USD value for display
  const totalUsdValueViewValue = formatFetchNumberToViewNumber({
    value: totalUsdValue,
    symbol: "$",
  });

  // Return extended data
  return {
    vaultPositions: extendedVaultPositions,
    totalUsdValueViewValue,
    totalUsdValue,
  };
}
