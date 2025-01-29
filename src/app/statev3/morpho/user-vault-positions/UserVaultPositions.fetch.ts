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
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";

import { readContract } from "wagmi/actions";
import { Address, erc20Abi } from "viem";
import { vaultConfig } from "../../settings/config";
import { getConfig } from "../../../utils/queryContractUtils";
import { fetchFormattedAssetBalanceUsdValue } from "../../queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.fetch";

interface VaultPositionAddress {
  vault: Address;
}

/**
 * Fetches all vaults in which a user has a non-zero balance.
 */
const fetchUserDepositVaults = async (user: string | undefined) => {
  const config = getConfig();
  if (!config || !user) return [];

  // Check the user's balance in each vault
  const promises = Object.entries(vaultConfig).map(async ([vaultAddress]) => {
    const balance = await readContract(config, {
      // todo add query client, use fetchFormattedAssetBalanceUsdValue instead?
      address: vaultAddress as Address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [user as Address],
    });

    if (balance && balance > 0n) {
      return { vault: vaultAddress as Address };
    }
    return undefined;
  });

  const vaultResults = await Promise.all(promises);
  return vaultResults.filter((vault): vault is VaultPositionAddress => vault !== undefined);
};

export async function fetchUserVaultPositions(
  userAddress: string,
  whiteListedVaultAddresses?: string[],
  chainId = base.id
) {
  const queryClient = getQueryClient();

  // Let React Query handle caching/staleness
  const data = await queryClient.fetchQuery<UserVaultPositionsQuery>({
    queryKey: ["fetchUserVaultPositions", userAddress, whiteListedVaultAddresses, chainId],
    queryFn: async () => {
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
        fetchPolicy: "no-cache",
      });

      if (result.errors?.length) {
        throw new Error(
          `GraphQL Query Failed: UserVaultPositionsQuery\n` +
            `Variables: ${JSON.stringify({ userAddress, chainId })}\n` +
            `Errors: ${result.errors.map((e) => e.message).join("; ")}`
        );
      } else if (result.error) {
        throw new Error(
          `GraphQL Query Failed: UserVaultPositionsQuery\n` +
            `Variables: ${JSON.stringify({ userAddress, chainId })}\n` +
            `Error: ${result.error.message}`
        );
      }
      return result.data;
    },
  });

  return data;
}

export async function fetchExtendedMappedVaultPositions(
  userAddress: string,
  whiteListedVaultAddresses?: string[],
  chainId = base.id
) {
  const rawVaultPositions = await fetchUserDepositVaults(userAddress);
  if (!rawVaultPositions) return undefined;

  const extendedVaultPositions = await Promise.all(
    rawVaultPositions.map(async (vaultPosition) => {
      const vaultDetails = await fetchFullVaultInfo(vaultPosition.vault, chainId);
      const mappedVaultDetails = mapVaultData(vaultDetails.vaultData.vaultByAddress, vaultDetails.vaultTokenData);
      const assetBalance = await fetchFormattedAssetBalanceUsdValue({
        asset: vaultPosition.vault,
        userAddress: userAddress as Address,
      });

      const shares = formatFetchBigIntToViewBigInt({
        bigIntValue: undefined, // vaultPosition.shares, TODO!
        decimals: mappedVaultDetails.asset.decimals,
        symbol: mappedVaultDetails.asset.symbol,
      });

      const assetsUsd = formatFetchBigIntToViewBigInt({
        ...assetBalance?.dollarAmount,
        bigIntValue: assetBalance?.dollarAmount.bigIntValue,
      });

      const assets = formatFetchBigIntToViewBigInt({
        ...assetBalance?.tokenAmount,
        bigIntValue: assetBalance?.tokenAmount.bigIntValue,
      });

      return {
        vaultPosition: {
          shares,
          assetsUsd,
          assets,
        },
        mappedVaultDetails,
      };
    })
  );

  const totalUsdValue = extendedVaultPositions.reduce(
    (acc, position) => acc + Number(position?.vaultPosition?.assetsUsd?.value || 0),
    0
  );

  const totalUsdValueViewValue = formatFetchNumberToViewNumber({
    value: totalUsdValue,
    symbol: "$",
  });

  return {
    vaultPositions: extendedVaultPositions,
    totalUsdValueViewValue,
    totalUsdValue,
  } as ExtendedMappedVaultPositionsResult;
}
