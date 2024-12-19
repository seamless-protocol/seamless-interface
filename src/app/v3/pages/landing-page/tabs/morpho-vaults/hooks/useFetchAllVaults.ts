import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfo } from "../../../../../../statev3/morpho/FullVaultInfo/FullVaultInfo.fetch";
import { queryConfig } from "../../../../../../statev3/settings/queryConfig";

import { formatFetchBigIntToViewBigInt, formatToDisplayable } from "@shared";

const useFullVaultsInfo = (addresses: Address[], chainId = base.id) => {
  return useQuery({
    queryKey: ["fullVaultsInfo", addresses, chainId],
    queryFn: async () => {
      const results = await Promise.all(
        addresses.map((address) => fetchFullVaultInfo(address, chainId))
      );
      return results.map((res) => res.vaultByAddress);
    },
    ...queryConfig.disableCacheQueryConfig,
  });
};


export const useFormattedVaultsInfo = (addresses: Address[], chainId = base.id) => {
  const { data: rawVaults, isLoading, error } = useFullVaultsInfo(addresses, chainId);

  if (isLoading || error || !rawVaults) {
    return {
      data: undefined,
      isLoading,
      error,
    };
  }

  const formattedVaults = rawVaults
    .filter((v) => !!v?.state)
    .map((vault) => {
      const { address: vaultAddress, name, state, asset } = vault;
      const totalSupply = formatFetchBigIntToViewBigInt({
        bigIntValue: state?.totalSupply ?? 0n,
        decimals: 18, // TODO morpho: even usdc is 18, todo: Double check with morpho team
        symbol: asset.symbol,
      });
      const totalAssetsUsd = formatToDisplayable(state?.totalAssetsUsd ?? 0);
      const netApy = formatToDisplayable(((state?.netApy) ?? 0) * 100);
      const curator = "test"; // state?.curator; TODO morpho: how to get name of curetor from adress?
      const feePercentage = formatToDisplayable(((state?.fee) ?? 0) * 100);
      const allocation = state?.allocation ?? [];
      const collateralLogos: (string | undefined)[] = allocation.map(
        (alloc) => alloc.market.collateralAsset?.logoURI
      ).filter((logo) => logo != null);

      return {
        totalAssetsUsd,
        asset,
        vaultAddress,
        name,
        totalSupply,
        netApy,
        curator,
        feePercentage,
        collateralLogos,
      };
    });

  return {
    data: formattedVaults,
    isLoading,
    error,
  };
};
