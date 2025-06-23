import { cValueWithSlippage } from "@app/data/common/math/utils";
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
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../../common/queries/AssetPrice.hook";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { fetchLeverageTokenAssets } from "../queries/leverage-token-assets/leverage-token-assets.fetch";

interface FetchPreviewMintInput {
  leverageToken: Address;
  amount: string;
  minSharesSlippage?: number;
}

export interface PreviewMintData {
  collateral: ViewBigIntWithUsdValue;
  debt: ViewBigIntWithUsdValue;
  equity: ViewBigIntWithUsdValue;
  shares: ViewBigIntWithUsdValue;
  minShares: ViewBigIntWithUsdValue;
  minEquity: ViewBigIntWithUsdValue;
  tokenFee: ViewBigIntWithUsdValue;
  treasuryFee: ViewBigIntWithUsdValue;
}

export const fetchPreviewMint = async ({
  leverageToken,
  amount,
  minSharesSlippage,
}: FetchPreviewMintInput): Promise<PreviewMintData> => {
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

  const amountBigInt = parseUnits(amount, leverageTokenData.decimals);

  const previewMintData = await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: leverageManagerAddress,
      abi: leverageManagerAbi,
      functionName: "previewMint",
      args: [leverageToken, amountBigInt],
    }),
  });

  let minShares = previewMintData.shares;
  let minEquity = previewMintData.equity;

  if (minSharesSlippage) {
    minShares = cValueWithSlippage(previewMintData.shares, minSharesSlippage);
    minEquity = cValueWithSlippage(previewMintData.equity, minSharesSlippage);
  }

  return {
    collateral: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetData,
          bigIntValue: previewMintData.collateral,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetData,
          ...fUsdValueStructured(
            cValueInUsd(previewMintData.collateral, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    debt: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...debtTokenData,
          bigIntValue: previewMintData.debt,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...debtTokenPriceData,
          ...fUsdValueStructured(
            cValueInUsd(previewMintData.debt, debtTokenPriceData?.bigIntValue, debtTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    equity: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetData,
          bigIntValue: previewMintData.equity,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetPriceData,
          ...fUsdValueStructured(
            cValueInUsd(previewMintData.equity, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    shares: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: previewMintData.shares,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetPriceData,
          ...fUsdValueStructured(
            cValueInUsd(
              previewMintData.equity - previewMintData.tokenFee,
              collateralAssetPriceData.bigIntValue,
              collateralAssetData.decimals
            )
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    minShares: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: minShares,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenPriceData,
          ...fUsdValueStructured(
            cValueInUsd(minShares, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    minEquity: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetData,
          bigIntValue: minEquity,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetPriceData,
          ...fUsdValueStructured(
            cValueInUsd(minEquity, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    tokenFee: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: previewMintData.tokenFee,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...collateralAssetPriceData,
          ...fUsdValueStructured(
            cValueInUsd(previewMintData.tokenFee, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    treasuryFee: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenData,
          bigIntValue: previewMintData.treasuryFee,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...leverageTokenPriceData,
          ...fUsdValueStructured(
            cValueInUsd(previewMintData.treasuryFee, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
  };
};

export const useFetchPreviewMint = (leverageToken?: Address, amount?: string) => {
  return useQuery({
    queryKey: ["fetchPreviewMint", leverageToken, amount],
    queryFn: () => fetchPreviewMint({ leverageToken: leverageToken!, amount: amount! }),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
  });
};
