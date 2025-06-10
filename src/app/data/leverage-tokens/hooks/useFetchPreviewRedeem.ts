import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { walletBalanceDecimalsOptions } from "../../../../meta";
import {
  fetchDecimals,
  fetchToken,
  formatFetchBigIntToViewBigInt,
  fUsdValueStructured,
  ViewBigIntWithUsdValue,
} from "../../../../shared";
import { leverageManagerAbi, leverageManagerAddress } from "../../../generated";
import { cValueInUsd } from "../../../statev3/math/utils";
import { fetchAssetPriceInBlock } from "../../../statev3/queries/AssetPrice.hook";
import { fetchCollateralAsset } from "../../../statev3/queries/CollateralAsset.all";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { fetchLeverageTokenAssets } from "../queries/leverage-token-assets/leverage-token-assets.fetch";

interface FetchPreviewRedeemInput {
  leverageToken: Address;
  amount: string;
}

export interface PreviewRedeemData {
  collateral: ViewBigIntWithUsdValue;
  debt: ViewBigIntWithUsdValue;
  equity: ViewBigIntWithUsdValue;
  shares: ViewBigIntWithUsdValue;
  tokenFee: ViewBigIntWithUsdValue;
  treasuryFee: ViewBigIntWithUsdValue;
}

export const fetchPreviewRedeem = async ({
  leverageToken,
  amount,
}: FetchPreviewRedeemInput): Promise<PreviewRedeemData> => {
  const leverageTokenAssets = await fetchLeverageTokenAssets(leverageToken);

  const [
    collateralAssetData,
    debtTokenData,
    leverageTokenData,
    collateralAssetPriceData,
    debtTokenPriceData,
    leverageTokenPriceData,
  ] = await Promise.all([
    fetchToken(leverageTokenAssets.collateralAsset),
    fetchToken(leverageTokenAssets.debtAsset),
    fetchToken(leverageToken),
    fetchAssetPriceInBlock(leverageTokenAssets.collateralAsset),
    fetchAssetPriceInBlock(leverageTokenAssets.debtAsset),
    fetchAssetPriceInBlock(leverageToken),
  ]);

  const collateral = await fetchCollateralAsset({ leverageToken });
  const decimals = await fetchDecimals(collateral);
  const amountBigInt = parseUnits(amount, decimals);

  const previewRedeemData = await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: leverageManagerAddress,
      abi: leverageManagerAbi,
      functionName: "previewRedeem",
      args: [leverageToken, amountBigInt],
    }),
  });

  return {
    collateral: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetData,
          bigIntValue: previewRedeemData.collateral,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetData,
          ...fUsdValueStructured(
            cValueInUsd(
              previewRedeemData.collateral,
              collateralAssetPriceData?.bigIntValue,
              collateralAssetData.decimals
            )
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    debt: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...debtTokenData,
          bigIntValue: previewRedeemData.debt,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...debtTokenData,
          ...fUsdValueStructured(
            cValueInUsd(previewRedeemData.debt, debtTokenPriceData?.bigIntValue, debtTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    equity: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: previewRedeemData.equity,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          ...fUsdValueStructured(
            cValueInUsd(previewRedeemData.equity, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    shares: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: previewRedeemData.shares,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          ...fUsdValueStructured(
            cValueInUsd(previewRedeemData.shares, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    tokenFee: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: previewRedeemData.tokenFee,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          ...fUsdValueStructured(
            cValueInUsd(previewRedeemData.tokenFee, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    treasuryFee: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: previewRedeemData.treasuryFee,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          ...fUsdValueStructured(
            cValueInUsd(previewRedeemData.treasuryFee, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
  };
};

export const useFetchPreviewRedeem = (leverageToken?: Address, amount?: string) => {
  return useQuery({
    queryKey: ["fetchPreviewRedeem", leverageToken, amount],
    queryFn: () => fetchPreviewRedeem({ leverageToken: leverageToken!, amount: amount! }),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
  });
};
