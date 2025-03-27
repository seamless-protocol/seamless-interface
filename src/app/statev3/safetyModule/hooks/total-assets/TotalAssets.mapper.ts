import { Address } from "viem";
import { fetchTotalAssets } from "./TotalAssets.fetch";
import { fetchToken, formatFetchBigIntToViewBigInt, fUsdValueStructured } from "@shared";
import { fetchAssetPriceInBlock } from "../../../queries/AssetPrice.hook";
import { cValueInUsd } from "../../../common/math/cValueInUsd";

export const fetchFormattedTotalAssetsUSDValue = async (address: Address) => {
  const [totalAssets, tokenData, price] = await Promise.all([
    fetchTotalAssets(address),
    fetchToken(address),
    fetchAssetPriceInBlock(address),
  ]);

  const totalAssetsUSD = cValueInUsd(totalAssets, price.bigIntValue, tokenData.decimals);

  return {
    totalAssets: formatFetchBigIntToViewBigInt({
      ...tokenData,
      bigIntValue: totalAssets,
    }),
    totalAssetsUSD: formatFetchBigIntToViewBigInt({
      ...fUsdValueStructured(totalAssetsUSD),
    }),
  };
};
