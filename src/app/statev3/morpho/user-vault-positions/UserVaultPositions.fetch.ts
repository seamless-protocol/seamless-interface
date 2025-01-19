import {
  UserVaultPositionsDocument,
  UserVaultPositionsQuery,
  UserVaultPositionsQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";
import { formatFetchBigIntToViewBigInt, formatFetchNumberToViewNumber } from "@shared";
import { fetchFullVaultInfo } from "../full-vault-info/FullVaultInfo.fetch";
import { mapVaultData } from "../mappers/mapVaultData";
import { ExtendedMappedVaultPositionsResult } from "../types/ExtendedVaultPosition";
import { base } from "viem/chains";

export async function fetchUserVaultPositions(
  userAddress: string,
  whiteListedVaultAddresses?: string[],
  chainId = base.id
): Promise<UserVaultPositionsQuery> {
  const client = getApolloClient();

  const result = await client.query<UserVaultPositionsQuery, UserVaultPositionsQueryVariables>({
    query: UserVaultPositionsDocument,
    variables: {
      where: {
        userAddress_in: [userAddress],
        vaultAddress_in: whiteListedVaultAddresses,
        chainId_in: [chainId],
      },
    },
    fetchPolicy: "cache-first",
  });

  if (result.errors) {
    throw new Error(
      `GraphQL Query Failed: UserVaultPositionsQuery\n` +
        `Variables: ${JSON.stringify({ address: userAddress, chainId })}\n` +
        `Errors: ${result.errors.map((e) => e.message).join("; ")}`
    );
  } else if (result.error) {
    throw new Error(
      `GraphQL Query Failed: UserVaultPositionsQuery\n` +
        `Variables: ${JSON.stringify({ address: userAddress, chainId })}\n` +
        `Error: ${result.error.message}`
    );
  }

  return {
    ...result.data,
  };
}

export async function fetchExtendedMappedVaultPositions(
  userAddress: string,
  whiteListedVaultAddresses?: string[],
  chainId = base.id
): Promise<ExtendedMappedVaultPositionsResult | undefined> {
  // Step 1: Fetch raw vault positions
  const rawVaultPositions = await fetchUserVaultPositions(userAddress, whiteListedVaultAddresses, chainId);
  if (!rawVaultPositions.vaultPositions.items) return undefined;

  // Step 2: Fetch detailed vault info for each position
  const extendedVaultPositions = await Promise.all(
    rawVaultPositions.vaultPositions.items?.map(async (vaultPosition) => {
      const vaultDetails = await fetchFullVaultInfo(vaultPosition.vault.address, chainId);
      const mappedVaultDetails = mapVaultData(vaultDetails.vaultByAddress);

      const shares = formatFetchBigIntToViewBigInt({
        bigIntValue: vaultPosition.shares,
        decimals: mappedVaultDetails.asset.decimals,
        symbol: mappedVaultDetails.asset.symbol,
      });

      const assetsUsd = formatFetchNumberToViewNumber({
        value: vaultPosition.assetsUsd || undefined,
        symbol: "$",
      });

      const assets = formatFetchBigIntToViewBigInt({
        bigIntValue: vaultPosition.assets,
        decimals: mappedVaultDetails.asset.decimals,
        symbol: mappedVaultDetails.asset.symbol,
      });

      return {
        vaultPosition: {
          baseData: vaultPosition,
          shares,
          assetsUsd,
          assets,
        },
        mappedVaultDetails,
      };
    })
  );

  // Step 3: Compute total USD value
  const totalUsdValue = extendedVaultPositions.reduce(
    (acc, position) => acc + (position.vaultPosition.assetsUsd.value || 0),
    0
  );

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
