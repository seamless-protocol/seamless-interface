export const MorphoFunctions = {
  netApyHistorical: "netApyHistorical",
  fullVaultInfo: "fullVaultInfo",
  fullVaultInfos: "fullVaultInfos",
  fullVaultInfoRaw: "fullVaultInfoRaw",
  totalAssetsHistorical: "totalAssetsHistorical",
  netApyHistoricalHook: "netApyHistoricalHook",
  userVaultPositionsHook: "userVaultPositionsHook",
  totalAssetsHistoricalHook: "totalAssetsHistoricalHook",
  fullVaultInfoHook: "fullVaultInfoHook",
  totalAssetsForWhitelistedHook: "totalAssetsForWhitelistedHook",
  morphoUserDistributions: "morphoUserDistributions",
  rawMorphoUserRewards: "rawMorphoUserRewards",
  extendedUserRewardsHook: "extendedUserRewardsHook",
  rawMorphoUserRewardsHook: "rawMorphoUserRewardsHook",
};

// eslint-disable-next-line no-unused-vars
export function getFullQueryKey<T extends { functionName: string }>(queryKey: T[]): { [K in T["functionName"]]: T[] } {
  const key = queryKey[0]?.functionName;
  if (!key) {
    throw new Error("The provided query key array does not have a functionName property.");
  }
  // eslint-disable-next-line no-unused-vars
  return { [key]: queryKey } as { [K in T["functionName"]]: T[] };
}
