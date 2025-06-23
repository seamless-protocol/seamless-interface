import { Address } from "viem";
import { fetchToken, formatFetchBigIntToViewBigInt, fUsdValueStructured } from "@shared";
import { cValueInUsd } from "../../../common/math/utils";
import { fetchAssetPriceInBlock } from "../../../common/queries/AssetPrice.hook";
import { fetchTotalAssets } from "./TotalAssets.fetch";

export const fetchFormattedTotalAssetsUSDValue = async (assetAddress: Address, underlyingAssetAddress: Address) => {
  const [totalAssets, underlyingTokenData, underlyingPrice] = await Promise.all([
    fetchTotalAssets(assetAddress),
    fetchToken(underlyingAssetAddress),
    fetchAssetPriceInBlock(underlyingAssetAddress),
  ]);

  const totalAssetsUSD = cValueInUsd(totalAssets, underlyingPrice.bigIntValue, underlyingTokenData.decimals);

  return {
    totalAssets: formatFetchBigIntToViewBigInt({
      ...underlyingTokenData,
      bigIntValue: totalAssets,
    }),
    totalAssetsUSD: formatFetchBigIntToViewBigInt({
      ...fUsdValueStructured(totalAssetsUSD),
    }),
  };
};
