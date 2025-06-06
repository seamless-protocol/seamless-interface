import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { SWAP_ADAPTER_EXCHANGE_ADDRESSES } from "../../../../meta";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../shared";
import { fetchCollateralAsset } from "../../../statev3/queries/CollateralAsset.all";
import { fetchDebtAsset } from "../../../statev3/queries/DebtAsset.all";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { Exchange } from "../common/enums";
import { getQuoteAndParamsAerodromeSlipstream } from "./useFetchAerodromeRoute";
import { fetchPreviewRedeem, PreviewRedeemData } from "./useFetchPreviewRedeem";
import { getQuoteAndParamsUniswapV2, getQuoteAndParamsUniswapV3 } from "./useFetchUniswapRoute";

export interface FetchBestSwapInput {
  tokenInAddress: Address;
  tokenOutAddress: Address;
  amountOut: bigint;
}

export interface SwapContext {
  path: `0x${string}`[];
  encodedPath: `0x${string}`;
  fees: number[];
  tickSpacing: number[];
  exchange: Exchange;
  exchangeAddresses: typeof SWAP_ADAPTER_EXCHANGE_ADDRESSES;
}

export interface SwapData {
  quote: bigint;
  swapContext: SwapContext;
}

export const fetchBestSwap = async (input: FetchBestSwapInput): Promise<SwapData | undefined> => {
  const [uniswapV2QuoteResp, uniswapV3QuoteResp, aerodromeSlipstreamQuoteResp] = await Promise.allSettled([
    getQuoteAndParamsUniswapV2(input),
    getQuoteAndParamsUniswapV3(input),
    getQuoteAndParamsAerodromeSlipstream(input),
  ]);

  const uniswapV2Quote = uniswapV2QuoteResp.status === "fulfilled" ? uniswapV2QuoteResp.value : undefined;
  const uniswapV3Quote = uniswapV3QuoteResp.status === "fulfilled" ? uniswapV3QuoteResp.value : undefined;
  const aerodromeSlipstreamQuote =
    aerodromeSlipstreamQuoteResp.status === "fulfilled" ? aerodromeSlipstreamQuoteResp.value : undefined;

  console.log("uniswapV2Quote", uniswapV2Quote);
  console.log("uniswapV3Quote", uniswapV3Quote);
  console.log("aerodromeSlipstreamQuote", aerodromeSlipstreamQuote);

  // Best route is the one with the lowest quote

  let bestQuoteSwapData = uniswapV3Quote;

  if (uniswapV2Quote?.quote && bestQuoteSwapData?.quote && uniswapV2Quote.quote < bestQuoteSwapData.quote) {
    bestQuoteSwapData = uniswapV2Quote;
  }

  if (
    aerodromeSlipstreamQuote?.quote &&
    bestQuoteSwapData?.quote &&
    aerodromeSlipstreamQuote.quote < bestQuoteSwapData.quote
  ) {
    bestQuoteSwapData = aerodromeSlipstreamQuote;
  }

  console.log("bestQuoteSwapData", bestQuoteSwapData);

  return bestQuoteSwapData;
};

export interface PreviewRedeemWithSwap {
  equityAfterSwapCost: ViewBigInt;
  swapCost: ViewBigInt;
  previewRedeemData: PreviewRedeemData;
  swapContext: SwapContext | undefined;
}

export const fetchPreviewRedeemWithSwap = async ({
  leverageToken,
  amount,
}: {
  leverageToken: Address;
  amount: string;
}): Promise<PreviewRedeemWithSwap | undefined> => {
  const collateralAsset = await fetchCollateralAsset({ leverageToken });
  const debtAsset = await fetchDebtAsset({ leverageToken });

  const previewRedeemData = await fetchPreviewRedeem({ leverageToken, amount });

  if (
    !previewRedeemData.debt.tokenAmount.bigIntValue ||
    !previewRedeemData.collateral.tokenAmount.bigIntValue ||
    !previewRedeemData.equity.tokenAmount.bigIntValue
  ) {
    return undefined;
  }

  const swapData = await fetchBestSwap({
    tokenInAddress: collateralAsset,
    tokenOutAddress: debtAsset,
    amountOut: previewRedeemData.debt.tokenAmount.bigIntValue,
  });

  let swapCost;
  if (swapData) {
    swapCost =
      swapData.quote -
      (previewRedeemData.collateral.tokenAmount.bigIntValue - previewRedeemData.equity.tokenAmount.bigIntValue);
  }

  const parsedAmount = parseUnits(amount, 18);

  return {
    equityAfterSwapCost: formatFetchBigIntToViewBigInt({
      ...previewRedeemData.equity.tokenAmount,
      bigIntValue: swapCost ? parsedAmount - swapCost : undefined,
    }),
    swapCost: formatFetchBigIntToViewBigInt({
      ...previewRedeemData.collateral.tokenAmount,
      bigIntValue: swapCost,
    }),
    previewRedeemData,
    swapContext: swapData?.swapContext,
  };
};

export const useFetchPreviewRedeemWithSwap = (leverageToken?: Address, amount?: string) => {
  return useQuery({
    queryKey: ["fetchPreviewRedeemWithSwap", leverageToken, amount],
    queryFn: () => fetchPreviewRedeemWithSwap({ leverageToken: leverageToken!, amount: amount! }),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
  });
};
