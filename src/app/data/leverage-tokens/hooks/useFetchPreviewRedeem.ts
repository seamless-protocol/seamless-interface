import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { walletBalanceDecimalsOptions } from "../../../../meta";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  fUsdValueStructured,
  ViewBigIntWithUsdValue,
} from "../../../../shared";
import { leverageManagerAbi, leverageManagerAddress } from "../../../generated";
import { cValueInUsd } from "../../common/math/utils";
import { fetchAssetPriceInBlock } from "../../common/queries/AssetPrice.hook";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
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

  const amountBigInt = parseUnits(amount, collateralAssetData.decimals);

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
            cValueInUsd(
              previewRedeemData.equity + previewRedeemData.tokenFee,
              collateralAssetPriceData?.bigIntValue,
              collateralAssetData.decimals
            )
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
            cValueInUsd(previewRedeemData.tokenFee, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
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
