import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { LendingAdapterAbi } from "../../../../../../abis/LendingAdapter";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

export const getLeverageTokenCollateralAssetQueryOptions = (lendingAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: lendingAdapter,
    abi: LendingAdapterAbi,
    functionName: "getCollateralAsset",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const getLeverageTokenDebtAssetQueryOptions = (lendingAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: lendingAdapter,
    abi: LendingAdapterAbi,
    functionName: "getDebtAsset",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export interface LeverageTokenAssets {
  collateralAsset: Address;
  debtAsset: Address;
}

export const fetchLeverageTokenAssets = async (leverageToken: Address) => {
  const { lendingAdapter } = await fetchLeverageTokenConfig(leverageToken);

  const [collateralAsset, debtAsset] = await Promise.all([
    getQueryClient().fetchQuery({
      ...getLeverageTokenCollateralAssetQueryOptions(lendingAdapter),
    }),
    getQueryClient().fetchQuery({
      ...getLeverageTokenDebtAssetQueryOptions(lendingAdapter),
    }),
  ]);

  return {
    collateralAsset,
    debtAsset,
  };
};
