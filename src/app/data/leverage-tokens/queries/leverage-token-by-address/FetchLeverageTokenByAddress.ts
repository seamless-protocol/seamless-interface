import { fetchToken, formatFetchBigIntToViewBigInt } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address, isAddressEqual } from "viem";
import { USD_VALUE_DECIMALS } from "../../../../../meta";
import { cValueFromUsd } from "../../../common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../../../common/queries/AssetPrice.hook";
import { LeverageToken, leverageTokensConfig } from "../all-leverage-tokens/leverageTokens";
import { fetchLeverageTokenCollateral } from "../collateral/collateral.fetch";
import { fetchLeverageTokenDebt } from "../debt/debt.fetch";
import {
  fetchLeverageTokenAssets,
  fetchLeverageTokenAssetsTokenData,
} from "../leverage-token-assets/leverage-token-assets.fetch";

/**
 * Mock fetchLeverageTokenByAddress: returns a single token by address (or undefined if not found)
 */
export async function fetchLeverageTokenByAddress(address: Address): Promise<LeverageToken | undefined> {
  const [collateral, debt, tokenData, { collateralAssetTokenData, debtAssetTokenData }, leverageTokenAssets] =
    await Promise.all([
      fetchLeverageTokenCollateral(address),
      fetchLeverageTokenDebt(address),
      fetchToken(address),
      fetchLeverageTokenAssetsTokenData(address),
      fetchLeverageTokenAssets(address),
    ]);

  const collateralTokenPrice = await fetchAssetPriceInBlock(leverageTokenAssets.collateralAsset);
  const leverageToken = leverageTokensConfig.find((token) => isAddressEqual(token.address, address));

  if (!leverageToken) {
    console.error(`Leverage token with address ${address} not configured`);
    throw new Error(`Leverage token with address ${address} not configured`);
  }

  let tvlInUsd: bigint | undefined;
  let tvlInCollateral: bigint | undefined;
  if (collateral.dollarAmount.bigIntValue && debt.dollarAmount.bigIntValue) {
    tvlInUsd = collateral.dollarAmount.bigIntValue - debt.dollarAmount.bigIntValue;
    tvlInCollateral = cValueFromUsd(tvlInUsd, collateralTokenPrice.bigIntValue, collateralAssetTokenData.decimals);
  }

  return {
    ...leverageToken,
    tvl: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: tvlInCollateral,
        decimals: collateralAssetTokenData.decimals,
        symbol: collateralAssetTokenData.symbol,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: tvlInUsd,
        decimals: USD_VALUE_DECIMALS,
        symbol: "$",
      }),
    },
    tokenData,
    collateralAssetTokenData,
    debtAssetTokenData,
  };
}

export function useFetchLeverageTokenByAddress(address?: Address) {
  return useQuery<LeverageToken | undefined>({
    queryKey: ["hookFetchLeverageTokenByAddress", address],
    queryFn: () => fetchLeverageTokenByAddress(address!),
    enabled: Boolean(address),
  });
}
