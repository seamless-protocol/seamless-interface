import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { LendingAdapterAbi } from "../../../../../../abis/LendingAdapter";
import { fetchToken, formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { platformDataQueryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { getLeverageTokenConfigQueryOptions } from "../leverage-token-config/leverage-token-config.fetch";

export const getLendingAdapterEquityInCollateralAssetQueryOptions = (lendingAdapterAddress: Address) => ({
  ...readContractQueryOptions(config, {
    address: lendingAdapterAddress,
    abi: LendingAdapterAbi,
    functionName: "getEquityInCollateralAsset",
  }),
  ...platformDataQueryConfig,
});

export const getLendingAdapterEquityInDebtAssetQueryOptions = (lendingAdapterAddress: Address) => ({
  ...readContractQueryOptions(config, {
    address: lendingAdapterAddress,
    abi: LendingAdapterAbi,
    functionName: "getEquityInDebtAsset",
  }),
  ...platformDataQueryConfig,
});

export const fetchLeverageTokenEquity = async (leverageToken: Address) => {
  const [{ debtAsset }, leverageTokenConfig] = await Promise.all([
    fetchLeverageTokenAssets(leverageToken),
    getQueryClient().fetchQuery({
      ...getLeverageTokenConfigQueryOptions(leverageToken),
    }),
  ]);

  const [equityInCollateralAsset, equityInDebtAsset] = await Promise.all([
    getQueryClient().fetchQuery({
      ...getLendingAdapterEquityInCollateralAssetQueryOptions(leverageTokenConfig.lendingAdapter),
    }),
    getQueryClient().fetchQuery({
      ...getLendingAdapterEquityInDebtAssetQueryOptions(leverageTokenConfig.lendingAdapter),
    }),
  ]);

  const { decimals: debtAssetDecimals, symbol: debtAssetSymbol } = await fetchToken(debtAsset);

  return {
    equityInCollateralAsset: formatFetchBigIntToViewBigInt({
      bigIntValue: equityInCollateralAsset,
      decimals: debtAssetDecimals,
      symbol: debtAssetSymbol,
    }),
    equityInDebtAsset: formatFetchBigIntToViewBigInt({
      bigIntValue: equityInDebtAsset,
      decimals: debtAssetDecimals,
      symbol: debtAssetSymbol,
    }),
  };
};
