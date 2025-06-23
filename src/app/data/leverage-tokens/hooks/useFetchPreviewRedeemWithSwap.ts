import { cValueInUsd } from "@app/data/common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "@app/data/common/queries/AssetPrice.hook";
import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { SWAP_ADAPTER_EXCHANGE_ADDRESSES, walletBalanceDecimalsOptions } from "../../../../meta";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  fUsdValueStructured,
  ViewBigIntWithUsdValue,
} from "../../../../shared";
import { fetchCollateralAsset } from "../queries/CollateralAsset.all";
import { fetchDebtAsset } from "../queries/DebtAsset.all";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
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

  return bestQuoteSwapData;
};

export interface PreviewRedeemWithSwap {
  equityAfterSwapCost: ViewBigIntWithUsdValue;
  swapCost: ViewBigIntWithUsdValue;
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

  const [previewRedeemData, collateralAssetData, collateralAssetPriceData] = await Promise.all([
    fetchPreviewRedeem({ leverageToken, amount }),
    fetchToken(collateralAsset),
    fetchAssetPriceInBlock(collateralAsset),
  ]);

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

  let swapCost: bigint | undefined;
  if (swapData) {
    swapCost =
      swapData.quote -
      (previewRedeemData.collateral.tokenAmount.bigIntValue - previewRedeemData.equity.tokenAmount.bigIntValue);

    if (swapCost < 0n) {
      swapCost = 0n;
    }

    swapCost = (swapCost * 10500n) / 10000n; // Add 5% slippage buffer to the swap cost
  }

  const parsedAmount = parseUnits(amount, collateralAssetData.decimals);

  const equityAfterSwapCost = swapCost ? parsedAmount - swapCost : undefined;

  return {
    equityAfterSwapCost: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...previewRedeemData.equity.tokenAmount,
          bigIntValue: equityAfterSwapCost,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...previewRedeemData.equity.tokenAmount,
          ...fUsdValueStructured(
            cValueInUsd(equityAfterSwapCost, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
    swapCost: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          ...previewRedeemData.collateral.tokenAmount,
          bigIntValue: swapCost,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        {
          ...previewRedeemData.collateral.tokenAmount,
          ...fUsdValueStructured(
            cValueInUsd(swapCost, collateralAssetPriceData?.bigIntValue, collateralAssetData.decimals)
          ),
        },
        walletBalanceDecimalsOptions
      ),
    },
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
    refetchInterval: 10000, // Poll every 10 seconds
  });
};
