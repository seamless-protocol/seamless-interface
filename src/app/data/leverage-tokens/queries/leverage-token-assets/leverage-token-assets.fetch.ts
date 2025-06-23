import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { LendingAdapterAbi } from "../../../../../../abis/LendingAdapter";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";
import { fetchToken } from "@shared";

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

export const fetchLeverageTokenAssetsTokenData = async (leverageToken: Address) => {
  const { collateralAsset, debtAsset } = await fetchLeverageTokenAssets(leverageToken);

  const [collateralAssetTokenData, debtAssetTokenData] = await Promise.all([
    fetchToken(collateralAsset),
    fetchToken(debtAsset),
  ]);

  return {
    collateralAssetTokenData,
    debtAssetTokenData,
  };
};
