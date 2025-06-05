import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  fUsdValueStructured,
  ViewBigIntWithUsdValue,
} from "../../../../shared";
import { fetchLeverageTokenAssets } from "../../../data/leverage-tokens/queries/leverage-token-assets/leverage-token-assets.fetch";
import { leverageManagerAbi, leverageManagerAddress } from "../../../generated";
import { cValueInUsd } from "../../../statev3/common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../../../statev3/queries/AssetPrice.hook";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";

interface FetchPreviewMintInput {
  leverageToken: Address;
  amount: string;
}

export interface PreviewMintData {
  collateral: ViewBigIntWithUsdValue;
  debt: ViewBigIntWithUsdValue;
  equity: ViewBigIntWithUsdValue;
  shares: ViewBigIntWithUsdValue;
  tokenFee: ViewBigIntWithUsdValue;
  treasuryFee: ViewBigIntWithUsdValue;
}

export const fetchPreviewMint = async ({ leverageToken, amount }: FetchPreviewMintInput): Promise<PreviewMintData> => {
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

  return {
    collateral: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: previewMintData.collateral,
        ...collateralAssetData,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.collateral, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
        ),
        ...collateralAssetPriceData,
      }),
    },
    debt: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: previewMintData.debt,
        ...debtTokenData,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.debt, debtTokenPriceData?.bigIntValue, debtTokenData.decimals)
        ),
        ...debtTokenPriceData,
      }),
    },
    equity: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: previewMintData.equity,
        ...collateralAssetData,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.equity, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
        ),
        ...collateralAssetPriceData,
      }),
    },
    shares: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: previewMintData.shares,
        ...leverageTokenData,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.shares, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
        ),
        ...leverageTokenPriceData,
      }),
    },
    tokenFee: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: previewMintData.tokenFee,
        ...leverageTokenData,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.tokenFee, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
        ),
        ...leverageTokenPriceData,
      }),
    },
    treasuryFee: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: previewMintData.treasuryFee,
        ...leverageTokenData,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.treasuryFee, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
        ),
        ...leverageTokenPriceData,
      }),
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
