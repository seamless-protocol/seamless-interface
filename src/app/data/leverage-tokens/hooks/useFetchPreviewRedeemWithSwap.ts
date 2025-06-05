import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { SWAP_ADAPTER_EXCHANGE_ADDRESSES } from "../../../../meta";
import { fetchCollateralAsset } from "../../../statev3/queries/CollateralAsset.all";
import { fetchDebtAsset } from "../../../statev3/queries/DebtAsset.all";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { getQuoteAndParamsAerodromeSlipstream } from "./useFetchAerodromeRoute";
import { fetchPreviewRedeem } from "./useFetchPreviewRedeem";
import { getQuoteAndParamsUniswapV2, getQuoteAndParamsUniswapV3 } from "./useFetchUniswapRoute";
import { Exchange } from "../common/enums";

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

export const fetchBestSwap = async (input: FetchBestSwapInput): Promise<SwapData> => {
  const [uniswapV2Quote, uniswapV3Quote, aerodromeSlipstreamQuote] = await Promise.all([
    getQuoteAndParamsUniswapV2(input),
    getQuoteAndParamsUniswapV3(input),
    getQuoteAndParamsAerodromeSlipstream(input),
  ]);

  const bestQuoteSwapData = [uniswapV2Quote, uniswapV3Quote, aerodromeSlipstreamQuote].sort((a, b) =>
    Number((a.quote || 0n) - (b.quote || 0n))
  )[0];

  return bestQuoteSwapData;
};

export const fetchPreviewRedeemWithSwap = async ({
  leverageToken,
  amount,
}: {
  leverageToken: Address;
  amount: string;
}) => {
  const collateralAsset = await fetchCollateralAsset({ leverageToken });
  const debtAsset = await fetchDebtAsset({ leverageToken });

  const previewRedeemData = await fetchPreviewRedeem({ leverageToken, amount });

  const swapData = await fetchBestSwap({
    tokenInAddress: collateralAsset,
    tokenOutAddress: debtAsset,
    amountOut: previewRedeemData.debt,
  });

  const swapCost = swapData.quote - (previewRedeemData.collateral - previewRedeemData.equity);

  return {
    equityAfterSwapCost: previewRedeemData.equity - swapCost,
    swapCost,
    previewRedeemData,
    swapContext: swapData.swapContext,
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
