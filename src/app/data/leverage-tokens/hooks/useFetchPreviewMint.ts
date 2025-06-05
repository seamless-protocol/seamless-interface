import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  fUsdValueStructured,
  ViewBigIntWithUsdValue,
} from "../../../../shared";
import { leverageManagerAbi, leverageManagerAddress } from "../../../generated";
import { cValueInUsd } from "../../../statev3/common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../../../statev3/queries/AssetPrice.hook";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { fetchLeverageTokenAssets } from "../queries/leverage-token-assets/leverage-token-assets.fetch";

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
        ...collateralAssetData,
        bigIntValue: previewMintData.collateral,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...collateralAssetData,
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.collateral, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
        ),
      }),
    },
    debt: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        ...debtTokenData,
        bigIntValue: previewMintData.debt,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...debtTokenPriceData,
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.debt, debtTokenPriceData?.bigIntValue, debtTokenData.decimals)
        ),
      }),
    },
    equity: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        ...collateralAssetData,
        bigIntValue: previewMintData.equity,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...collateralAssetPriceData,
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.equity, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
        ),
      }),
    },
    shares: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        ...leverageTokenData,
        bigIntValue: previewMintData.shares,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...leverageTokenPriceData,
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.shares, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
        ),
      }),
    },
    tokenFee: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        ...leverageTokenData,
        bigIntValue: previewMintData.tokenFee,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...collateralAssetPriceData,
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.tokenFee, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
        ),
      }),
    },
    treasuryFee: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        ...leverageTokenData,
        bigIntValue: previewMintData.treasuryFee,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...leverageTokenPriceData,
        ...fUsdValueStructured(
          cValueInUsd(previewMintData.treasuryFee, leverageTokenPriceData?.bigIntValue, leverageTokenData.decimals)
        ),
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
