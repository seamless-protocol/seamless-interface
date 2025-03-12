import { TimeseriesOptions } from "@morpho-org/blue-api-sdk";
import { Address } from "viem";
import { base } from "viem/chains";
import { QueryTypes, Scopes } from "@meta";
import { getFullQueryKey, MorphoFunctions } from "./morpho-function-names";
import { fetchAssetBalanceQOptions } from "../../queries/AssetBalance.hook";
import { vaultConfig } from "../../settings/config";

const scope = [{ scope: Scopes.morpho }] as const;

export const MorphoQueryKeys = {
  /* ---------------- */
  /*   BASE QUERIES   */
  /* ---------------- */
  graphQlQueries: [
    {
      ...scope[0],
      queryType: QueryTypes.GRAPH_QL_QUERY,
    },
  ] as const,
  childApiQueries: [
    {
      ...scope[0],
      queryType: QueryTypes.CHILD_API_QUERY,
    },
  ],
  hookQueries: [
    {
      ...scope[0],
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
      const balanceKey = fetchAssetBalanceQOptions(userAddress, vaultAddress as Address).queryKey[1];
      return getFullQueryKey([balanceKey]);
    });

    return [
      {
        ...MorphoQueryKeys.hookQueries[0],
        userAddress,
        chainId,
        functionName: MorphoFunctions.userVaultPositionsHook,
        ...vaultQueryObjects,
      },
    ];
  },
  extendedUserRewardsHook: (userAddress?: Address, chainId = base.id) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      userAddress,
      chainId,
      functionName: MorphoFunctions.extendedUserRewardsHook,
      ...getFullQueryKey(MorphoQueryKeys.morphoUserDistributions(userAddress!, chainId)),
    },
  ],
  fullVaultInfoHook: (address?: string, chainId?: number) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.fullVaultInfoHook,
      address,
      chainId,
      ...getFullQueryKey(MorphoQueryKeys.fullVaultInfo(address, chainId)),
    },
  ],
  fullVaultInfoRawHook: (address?: string, chainId?: number) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.fullVaultInfoHook,
      address,
      chainId,
      ...getFullQueryKey(MorphoQueryKeys.fullVaultInfoRaw(address, chainId)),
    },
  ],
  netApyHistoricalHook: (address?: string, chainId?: number, options?: TimeseriesOptions) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.netApyHistoricalHook,
      address,
      chainId,
      options,
      ...getFullQueryKey(MorphoQueryKeys.netApyHistorical(address, chainId, options)),
    },
  ],
  totalAssetsHistoricalHook: (address?: string, chainId?: number, options?: TimeseriesOptions) => [
    {
      ...MorphoQueryKeys.hookQueries[0],
      functionName: MorphoFunctions.totalAssetsHistoricalHook,
      address,
      chainId,
      options,
      ...getFullQueryKey(MorphoQueryKeys.totalAssetsHistorical(address, chainId, options)),
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
      functionName: MorphoFunctions.rawMorphoUserRewardsHook,
      ...getFullQueryKey(MorphoQueryKeys.rawMorphoUserRewards(userAddress!, chainId)),
    },
  ],
};
