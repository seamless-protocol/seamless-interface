import {
  UserVaultPositionsDocument,
  UserVaultPositionsQuery,
  UserVaultPositionsQueryVariables,
} from "@generated-graphql";
import { getApolloClient } from "../../../config/apollo-client";
import { fetchToken, formatFetchBigIntToViewBigInt, formatFetchNumberToViewNumber } from "@shared";
import { fetchFullVaultInfo } from "../full-vault-info/FullVaultInfo.fetch";
import { mapVaultData } from "../mappers/mapVaultData";
import { ExtendedMappedVaultPositionsResult } from "../types/ExtendedVaultPosition";
import { base } from "viem/chains";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";

export async function fetchUserVaultPositions(
  userAddress: string,
  whiteListedVaultAddresses?: string[],
  chainId = base.id
): Promise<UserVaultPositionsQuery> {
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
): Promise<ExtendedMappedVaultPositionsResult | undefined> {
  const rawVaultPositions = await fetchUserVaultPositions(userAddress, whiteListedVaultAddresses, chainId);
  if (!rawVaultPositions.vaultPositions.items) return undefined;

  const extendedVaultPositions = await Promise.all(
    rawVaultPositions.vaultPositions.items?.map(async (vaultPosition) => {
      const vaultDetails = await fetchFullVaultInfo(vaultPosition.vault.address, chainId);
      const mappedVaultDetails = mapVaultData(vaultDetails.vaultData.vaultByAddress, vaultDetails.vaultTokenData);

      const rewards = await Promise.all(
        (vaultPosition.vault.state?.rewards || []).map(async (reward) => {
          if (!reward.asset.logoURI) {
            const tokenData = await fetchToken(reward.asset.address);
            return {
              ...reward,
              asset: {
                ...reward.asset,
                logoURI: tokenData.logo,
              },
            };
          }
          return reward;
        })
      );

      const extendedPosition = {
        ...vaultPosition,
        vault: {
          ...vaultPosition.vault,
          state: {
            ...vaultPosition.vault.state,
            owner: vaultPosition.vault.state?.owner,
            rewards,
          },
        },
      };

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
          baseData: extendedPosition,
          shares,
          assetsUsd,
          assets,
        },
        mappedVaultDetails,
      };
    })
  );

  const totalUsdValue = extendedVaultPositions.reduce(
    (acc, position) => acc + (position.vaultPosition.assetsUsd.value || 0),
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
  };
}
