export type FullVaultInfoQuery = {
  __typename?: "Query";
  vaultByAddress: {
    __typename?: "Vault";
    address: any;
    name: string;
    asset: { __typename?: "Asset"; name: string; decimals: number; logoURI?: string | null; symbol: string };
    state?: {
      __typename?: "VaultState";
      totalSupply: any;
      totalAssetsUsd?: number | null;
      netApy?: number | null;
      allTimeApy?: number | null;
      dailyApy?: number | null;
      fee: number;
      timelock: any;
      curator: any;
      allocation?: Array<{
        __typename?: "VaultAllocation";
        supplyCap: any;
        supplyAssets: any;
        supplyAssetsUsd?: number | null;
        market: {
          __typename?: "Market";
          uniqueKey: any;
          irmAddress: any;
          oracleAddress: any;
          lltv: any;
          loanAsset: { __typename?: "Asset"; name: string; symbol: string; logoURI?: string | null };
          collateralAsset?: { __typename?: "Asset"; name: string; symbol: string; logoURI?: string | null } | null;
        };
      }> | null;
    } | null;
  };
};
