import { SeamlessQueryKey } from "@meta";

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

export function getFullQueryKey(queryKey: SeamlessQueryKey[]): {
  // eslint-disable-next-line no-unused-vars
  [K in SeamlessQueryKey["functionName"]]: SeamlessQueryKey[];
} {
  const key = queryKey[0]?.functionName;
  if (!key) {
    throw new Error("The provided query key array does not have a functionName property.");
  }
  return { [key]: queryKey };
}
