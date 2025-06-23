import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { LendingAdapterAbi } from "../../../../../../abis/LendingAdapter";
import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigIntWithUsdValue } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { platformDataQueryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";
/* eslint-disable import/no-cycle */
import { fetchAssetPriceInBlock } from "../../../common/queries/AssetPrice.hook";

export const getLeverageTokenCollateralQueryOptions = (lendingAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: lendingAdapter,
    abi: LendingAdapterAbi,
    functionName: "getCollateral",
  }),
  ...platformDataQueryConfig,
});

export const fetchLeverageTokenCollateral = async (leverageToken: Address): Promise<ViewBigIntWithUsdValue> => {
  const [{ collateralAsset }, { lendingAdapter }] = await Promise.all([
    fetchLeverageTokenAssets(leverageToken),
    fetchLeverageTokenConfig(leverageToken),
  ]);

  const [collateral, collateralAssetPrice, { decimals: collateralAssetDecimals, symbol: collateralAssetSymbol }] =
    await Promise.all([
      getQueryClient().fetchQuery({
        ...getLeverageTokenCollateralQueryOptions(lendingAdapter),
      }),
      fetchAssetPriceInBlock(collateralAsset),
      fetchToken(collateralAsset),
    ]);

  return {
    tokenAmount: formatFetchBigIntToViewBigInt({
      bigIntValue: collateral,
      decimals: collateralAssetDecimals,
      symbol: collateralAssetSymbol,
    }),
    dollarAmount: formatFetchBigIntToViewBigInt({
      bigIntValue: (collateralAssetPrice.bigIntValue * collateral) / BigInt(10 ** collateralAssetDecimals),
      decimals: collateralAssetPrice.decimals,
      symbol: collateralAssetPrice.symbol,
    }),
  };
};
