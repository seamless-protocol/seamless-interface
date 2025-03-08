import { TimeseriesOptions } from "@morpho-org/blue-api-sdk";
import { Address } from "viem";
import { base } from "viem/chains";

export const MorphoQueryKeys = {
  netApyHistorical: (address: string, chainId: number, options?: TimeseriesOptions) => [
    { scope: "readMorphoApi", keyType: "cache", address, chainId, options, functionName: "netApyHistorical" },
  ],
  totalAssetsHistorical: (address: string, chainId: number, options?: TimeseriesOptions) => [
    { scope: "readMorphoApi", keyType: "cache", address, chainId, options, functionName: "totalAssetsHistorical" },
  ],
  morphoUserDistributions: (userAddress: string, chainId: number) => [
    { scope: "readMorphoApi", keyType: "cache", userAddress, chainId, functionName: "morphoUserDistributions" },
  ],
  fullVaultInfo: (address: string, chainId: number) => [
    { scope: "readMorphoApi", keyType: "cache", address, chainId, functionName: "fullVaultInfo" },
  ],
  userVaultPositionsHook: (userAddress?: Address, chainId = base.id) => [
    { scope: "morphoHook", keyType: "hook", userAddress, chainId, functionName: "userVaultPositions" },
  ],
  extendedUserRewards: (userAddress?: Address, chainId = base.id) => [
    { scope: "morphoHook", keyType: "hook", userAddress, chainId, functionName: "extendedUserRewards" },
  ],
  rawMorphoUserRewards: (userAddress: string, chainId: number) => [
    { scope: "readMorphoApi", keyType: "cache", userAddress, chainId, functionName: "rawMorphoUserRewards" },
  ],
};

// fetchAssetBalanceQueryOptions
