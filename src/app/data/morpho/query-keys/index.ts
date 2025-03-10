import { TimeseriesOptions } from "@morpho-org/blue-api-sdk";
import { Address } from "viem";
import { base } from "viem/chains";
import { QueryTypes, Scopes } from "@meta";

export const MorphoQueryKeys = {
  /* --------------------------- */
  /*   CHAILD GRAPH QL QUERIES   */
  /* --------------------------- */
  netApyHistorical: (address?: string, chainId?: number, options?: TimeseriesOptions) => [
    {
      scope: Scopes.morpho,
      queryType: QueryTypes.GRAPH_QL_QUERY,
      functionName: "netApyHistorical",
      address,
      chainId,
      options,
    },
  ],
  fullVaultInfo: (address?: string, chainId?: number) => [
    {
      scope: Scopes.morpho,
      queryType: QueryTypes.GRAPH_QL_QUERY,
      functionName: "fullVaultInfo",
      address,
      chainId,
    },
  ],
  fullVaultInfos: (addresses: string[], chainId?: number) => [
    {
      scope: Scopes.morpho,
      queryType: QueryTypes.GRAPH_QL_QUERY,
      functionName: "fullVaultInfos",
      addresses,
      chainId,
    },
  ],
  fullVaultInfoRaw: (address?: string, chainId?: number) => [
    {
      scope: Scopes.morpho,
      queryType: QueryTypes.GRAPH_QL_QUERY,
      functionName: "fullVaultInfoRaw",
      address,
      chainId,
    },
  ],
  totalAssetsHistorical: (address: string, chainId: number, options?: TimeseriesOptions) => [
    {
      scope: Scopes.morpho,
      queryType: QueryTypes.GRAPH_QL_QUERY,
      functionName: "totalAssetsHistorical",
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
      scope: Scopes.morpho,
      queryType: QueryTypes.CHILD_API_QUERY,
      functionName: "morphoUserDistributions",
      userAddress,
      chainId,
    },
  ],
  rawMorphoUserRewards: (userAddress: string, chainId: number) => [
    {
      scope: Scopes.morpho,
      queryType: QueryTypes.CHILD_API_QUERY,
      functionName: "rawMorphoUserRewards",
      userAddress,
      chainId,
    },
  ],
  /* ---------------- */
  /*   HOOK QUERIES   */
  /* ---------------- */
  userVaultPositionsHook: (userAddress?: Address, chainId = base.id) => [
    { scope: Scopes.morpho, queryType: QueryTypes.HOOK, userAddress, chainId, functionName: "userVaultPositionsHook" },
  ],
  extendedUserRewardsHook: (userAddress?: Address, chainId = base.id) => [
    { scope: Scopes.morpho, queryType: QueryTypes.HOOK, userAddress, chainId, functionName: "extendedUserRewardsHook" },
  ],
  fullVaultInfoHook: (address?: string, chainId?: number) => [
    {
      scope: Scopes.morpho,
      queryType: QueryTypes.HOOK,
      functionName: "fullVaultInfoHook",
      address,
      chainId,
    },
  ],
};
