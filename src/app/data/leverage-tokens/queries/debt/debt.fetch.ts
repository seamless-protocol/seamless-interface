import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { LendingAdapterAbi } from "../../../../../../abis/LendingAdapter";
import { fetchToken, formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
/* eslint-disable import/no-cycle */
import { fetchAssetPriceInBlock } from "../../../common/queries/AssetPrice.hook";
import { platformDataQueryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

export const getLeverageTokenDebtQueryOptions = (lendingAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: lendingAdapter,
    abi: LendingAdapterAbi,
    functionName: "getDebt",
  }),
  ...platformDataQueryConfig,
});

export const fetchLeverageTokenDebt = async (leverageToken: Address) => {
  const [{ lendingAdapter }, { debtAsset }] = await Promise.all([
    fetchLeverageTokenConfig(leverageToken),
    fetchLeverageTokenAssets(leverageToken),
  ]);

  const [debt, debtAssetPrice, { decimals: debtAssetDecimals, symbol: debtAssetSymbol }] = await Promise.all([
    getQueryClient().fetchQuery({
      ...getLeverageTokenDebtQueryOptions(lendingAdapter),
    }),
    fetchAssetPriceInBlock(debtAsset),
    fetchToken(debtAsset),
  ]);

  return {
    tokenAmount: formatFetchBigIntToViewBigInt({
      bigIntValue: debt,
      decimals: debtAssetDecimals,
      symbol: debtAssetSymbol,
    }),
    dollarAmount: formatFetchBigIntToViewBigInt({
      bigIntValue: (debtAssetPrice.bigIntValue * debt) / BigInt(10 ** debtAssetDecimals),
      decimals: debtAssetPrice.decimals,
      symbol: debtAssetPrice.symbol,
    }),
  };
};
