import { TimeseriesOptions } from "@morpho-org/blue-api-sdk";
import { Address } from "viem";
import { base } from "viem/chains";
import { getHashedQueryKey, QueryTypes, Scopes } from "@meta";
import { MorphoFunctions } from "./utils";
import { fetchAssetBalanceQOptions } from "../../queries/AssetBalance.hook";
import { vaultConfig } from "../../settings/config";

const scope = { scope: Scopes.morpho } as const;

export const MorphoQueryKeys = {
  /* ---------------- */
  /*   BASE QUERIES   */
  /* ---------------- */
  graphQlQueries: [
    {
      ...scope,
      queryType: QueryTypes.GRAPH_QL_QUERY,
    },
  ] as const,
  childApiQueries: [
    {
      ...scope,
      queryType: QueryTypes.CHILD_API_QUERY,
    },
  ],
  hookQueries: [
    {
      ...scope,
      queryType: QueryTypes.HOOK,
    },
  ],
  /* --------------------------- */
  /*   CHAILD GRAPH QL QUERIES   */
  /* --------------------------- */
  netApyHistorical: (address?: string, chainId?: number, options?: TimeseriesOptions) => [
    {
      ...MorphoQueryKeys.graphQlQueries[0],
      functionName: MorphoFunctions.netApyHistorical,
      address,
      chainId,
      options,
    },
  ],
  fullVaultInfo: (address?: string, chainId?: number) => [
    {
      ...MorphoQueryKeys.graphQlQueries[0],
      functionName: MorphoFunctions.fullVaultInfo,
      address,
      chainId,
    },
  ],
  fullVaultInfos: (addresses: string[], chainId?: number) => [
    {
      ...MorphoQueryKeys.graphQlQueries[0],
      functionName: MorphoFunctions.fullVaultInfos,
      addresses,
      chainId,
    },
  ],
  fullVaultInfoRaw: (address?: string, chainId?: number) => [
    {
      ...MorphoQueryKeys.graphQlQueries[0],
      functionName: MorphoFunctions.fullVaultInfoRaw,
      address,
      chainId,
    },
  ],
  totalAssetsHistorical: (address?: string, chainId?: number, options?: TimeseriesOptions) => [
    {
      ...MorphoQueryKeys.graphQlQueries[0],
      functionName: MorphoFunctions.totalAssetsHistorical,
      address,
      chainId,
      options,
    },
  ],
  /* --------------------- */
  /*   CHILD API QUERIES   */
  /* --------------------- */
  morphoUserDistributions: (userAddress: string, chainId: number) => [
    {
      ...MorphoQueryKeys.childApiQueries[0],
      functionName: MorphoFunctions.morphoUserDistributions,
      userAddress,
      chainId,
    },
  ],
  rawMorphoUserRewards: (userAddress: string, chainId: number) => [
    {
      ...MorphoQueryKeys.childApiQueries[0],
      functionName: MorphoFunctions.rawMorphoUserRewards,
      userAddress,
      chainId,
    },
  ],
  /* ---------------- */
  /*   HOOK QUERIES   */
  /* ---------------- */
  userVaultPositionsHook: (userAddress: Address, chainId = base.id) => {
    const vaultQueryObjects = Object.entries(vaultConfig).map(([vaultAddress]) => {
      const balanceKey = fetchAssetBalanceQOptions(userAddress, vaultAddress as Address).queryKey;
      return getHashedQueryKey({
        queryKey: balanceKey,
      });
    });

    return [
      {
        ...MorphoQueryKeys.hookQueries[0],
        userAddress,
        chainId,
        functionName: MorphoFunctions.userVaultPositionsHook,
        ...Object.assign({}, ...vaultQueryObjects), // ...
      },
    ];
  },
  extendedUserRewardsHook: (userAddress?: Address, chainId = base.id) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      userAddress,
      chainId,
      functionName: MorphoFunctions.extendedUserRewardsHook,
      ...getHashedQueryKey({
        queryKey: MorphoQueryKeys.morphoUserDistributions(userAddress!, chainId),
      }),
    },
  ],
  fullVaultInfoHook: (address?: string, chainId?: number) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.fullVaultInfoHook,
      address,
      chainId,
      ...getHashedQueryKey({
        queryKey: MorphoQueryKeys.fullVaultInfo(address, chainId),
      }),
    },
  ],
  fullVaultInfoRawHook: (address?: string, chainId?: number) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.fullVaultInfoHook,
      address,
      chainId,
      ...getHashedQueryKey({
        queryKey: MorphoQueryKeys.fullVaultInfoRaw(address, chainId),
      }),
    },
  ],
  netApyHistoricalHook: (address?: string, chainId?: number, options?: TimeseriesOptions) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.netApyHistoricalHook,
      address,
      chainId,
      options,
      ...getHashedQueryKey({
        queryKey: MorphoQueryKeys.netApyHistorical(address, chainId),
      }),
    },
  ],
  totalAssetsHistoricalHook: (address?: string, chainId?: number, options?: TimeseriesOptions) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.totalAssetsHistoricalHook,
      address,
      chainId,
      options,
      ...getHashedQueryKey({
        queryKey: MorphoQueryKeys.totalAssetsHistorical(address, chainId, options),
      }),
    },
  ],
  totalAssetsForWhitelistedHook: () => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.totalAssetsForWhitelistedHook,
    },
  ],
  rawMorphoUserRewardsHook: (userAddress?: Address, chainId = base.id) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      userAddress,
      chainId,
      functionName: MorphoFunctions.rawMorphoUserRewards,
      ...getHashedQueryKey({
        queryKey: MorphoQueryKeys.rawMorphoUserRewards(userAddress!, chainId),
      }),
    },
  ],
};
