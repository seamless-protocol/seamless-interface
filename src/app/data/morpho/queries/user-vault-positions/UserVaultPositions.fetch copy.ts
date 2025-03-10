import { formatFetchBigIntToViewBigInt, formatFetchNumberToViewNumber } from "@shared";
import { ExtendedMappedVaultPositionsResult } from "../full-morpho-info/types/ExtendedFullMorphoInfoData";
import { base } from "viem/chains";

import { Address } from "viem";
import { getConfig } from "../../../../utils/queryContractUtils";
import { fetchAssetBalanceUsdValue } from "../../../../statev3/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.fetch";
import { vaultConfig } from "../../../../statev3/settings/config";
import { fetchFullVaultInfo } from "../full-morpho-info/FullVaultInfo.fetch";
import { mapFullVaultInfo } from "../full-morpho-info/FullVaultInfo.mapper";
import { fetchAssetBalance } from "../../../../statev3/common/queries/useFetchViewAssetBalance";

interface VaultPositionAddress {
  vault: Address;
}

/**
 * Fetches all vaults in which a user has a non-zero balance.
 */
export const fetchUserVaultPositions = async (user: string | undefined) => {
  const config = getConfig();
  if (!config || !user) return [];

  // Check the user's balance in each vault
  const promises = Object.entries(vaultConfig).map(async ([vaultAddress]) => {
    if (user === undefined) return undefined;
    if (vaultAddress === undefined) return undefined;
    const balance = await fetchAssetBalance(user as Address, vaultAddress as Address);

    return {
      balance,
      vault: vaultAddress as Address,
    };
  });

  const vaultResults = await Promise.all(promises);
  return vaultResults
    .filter((item) => item?.balance && item.balance.bigIntValue && item.balance.bigIntValue > 0n)
    .map((item) => ({
      vault: item?.vault,
    })) as VaultPositionAddress[];
};

export async function fetchExtendedMappedVaultPositions(userAddress: string, chainId = base.id) {
  const rawVaultPositions = await fetchUserVaultPositions(userAddress);
  if (!rawVaultPositions) return undefined;

  const extendedVaultPositions = await Promise.all(
    rawVaultPositions.map(async (vaultPosition) => {
      const [vaultDetails, shareBalance] = await Promise.all([
        fetchFullVaultInfo(vaultPosition.vault, chainId),
        fetchAssetBalanceUsdValue({
          asset: vaultPosition.vault,
          userAddress: userAddress as Address,
        }),
      ]);

      const mappedVaultDetails = mapFullVaultInfo(vaultDetails.vaultData.vaultByAddress, vaultDetails.vaultTokenData);

      const sharesUsd = formatFetchBigIntToViewBigInt({
        ...shareBalance?.dollarAmount,
        bigIntValue: shareBalance?.dollarAmount.bigIntValue,
      });

      const shares = formatFetchBigIntToViewBigInt({
        ...shareBalance?.tokenAmount,
        bigIntValue: shareBalance?.tokenAmount.bigIntValue,
      });

      return {
        vaultPosition: {
          sharesUsd,
          shares,
        },
        mappedVaultDetails,
      };
    })
  );

  const totalUsdValue = extendedVaultPositions.reduce(
    (acc, position) => acc + Number(position?.vaultPosition?.sharesUsd?.value || 0),
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
