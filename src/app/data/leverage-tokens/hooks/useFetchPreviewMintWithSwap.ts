import { useQuery } from "@tanstack/react-query";
import { Address, encodeAbiParameters, formatUnits, parseUnits, zeroAddress } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import EtherfiL2ExchangeRateProviderAbi from "../../../../../abis/EtherfiL2ExchangeRateProvider";
import { etherfiL2SyncPoolAbi } from "../../../../../abis/EtherfiL2SyncPool";
import {
  ETH_ADDRESS,
  ETHERFI_L2_MODE_SYNC_POOL_ADDRESS,
  SWAP_ADAPTER_EXCHANGE_ADDRESSES,
  walletBalanceDecimalsOptions,
  WEETH_ADDRESS,
} from "../../../../meta";
import { formatFetchBigIntToViewBigInt, fUsdValueStructured, ViewBigIntWithUsdValue } from "../../../../shared";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { etherfiL2ModeSyncPoolAddress } from "../../../generated";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../../common/queries/AssetPrice.hook";
import { disableCacheQueryConfig, infiniteCacheQueryConfig } from "../../settings/queryConfig";
import { getConfig } from "../../../utils/queryContractUtils";
import { Exchange } from "../common/enums";
import { fetchLeverageTokenAssets } from "../queries/leverage-token-assets/leverage-token-assets.fetch";
import { SwapContext } from "./useFetchAerodromeRoute";
import { fetchPreviewMint, PreviewMintData } from "./useFetchPreviewMint";

export const getWeethAmountOut = async (amount: bigint | undefined): Promise<bigint | undefined> => {
  if (!amount) return undefined;

  const exchangeRateProvider = await getQueryClient().fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: etherfiL2ModeSyncPoolAddress,
      abi: etherfiL2SyncPoolAbi,
      functionName: "getL2ExchangeRateProvider",
    }),
    ...infiniteCacheQueryConfig,
  });

  const weethAmountOut = await getQueryClient().fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: exchangeRateProvider,
      abi: EtherfiL2ExchangeRateProviderAbi,
      functionName: "getConversionAmount",
      args: [ETH_ADDRESS, amount],
    }),
  });

  return weethAmountOut;
};

// TODO: This returns hardcoded swap context for now that only works for WETH -> WEETH
const getSwapContext = () => {
  const swapContext: SwapContext = {
    path: [],
    encodedPath: "0x",
    fees: [],
    tickSpacing: [],
    exchange: Exchange.ETHERFI,
    exchangeAddresses: SWAP_ADAPTER_EXCHANGE_ADDRESSES,
    additionalData: encodeAbiParameters(
      [
        {
          name: "etherFiL2ModeSyncPool",
          type: "address",
        },
        {
          name: "tokenIn",
          type: "address",
        },
        {
          name: "weETH",
          type: "address",
        },
        {
          name: "referral",
          type: "address",
        },
      ],
      [ETHERFI_L2_MODE_SYNC_POOL_ADDRESS, ETH_ADDRESS, WEETH_ADDRESS, zeroAddress]
    ),
  };

  return swapContext;
};

export interface PreviewMintWithSwapData {
  previewMint: PreviewMintData;
  swapContext: SwapContext;
  swapCost: ViewBigIntWithUsdValue;
}

const fetchPreviewMintWithSwap = async (
  leverageToken: Address,
  amount: string
): Promise<PreviewMintWithSwapData | undefined> => {
  const { collateralAsset } = await fetchLeverageTokenAssets(leverageToken);
  const previewMint = await fetchPreviewMint({ leverageToken, amount });
  const swapContext = getSwapContext();

  const weethAmountOut = await getWeethAmountOut(previewMint.debt.tokenAmount.bigIntValue);
  const parsedAmountIn = parseUnits(amount, previewMint.collateral.tokenAmount.decimals || 18);

  let swapCost: bigint | undefined;
  if (previewMint.collateral.dollarAmount && previewMint.collateral.tokenAmount.bigIntValue && weethAmountOut) {
    swapCost = previewMint.collateral.tokenAmount.bigIntValue - BigInt(parsedAmountIn) - weethAmountOut;

    // If the swap cost is negative, set it to 0
    if (swapCost < 0) {
      swapCost = 0n;
    }

    swapCost += 1000n; // Add 1 wei to the swap cost for rounding errors
  }

  if (!previewMint.collateral.tokenAmount.bigIntValue || !swapCost) throw new Error("Preview mint with swap failed");

  const previewMintAfterCostDeduction = await fetchPreviewMint({
    leverageToken,
    amount: formatUnits(parseUnits(amount, 18) - swapCost, 18),
    // The slippage on minShares is 0.001%. This is required as between oracle updates its possible for the exchange rate
    // to decrease continuously due to borrow interest
    minSharesSlippage: 1,
  });

  const collateralTokenPrice = await fetchAssetPriceInBlock(collateralAsset);

  return {
    previewMint: previewMintAfterCostDeduction,
    swapContext,
    swapCost: {
      tokenAmount: formatFetchBigIntToViewBigInt(
        {
          bigIntValue: swapCost,
          decimals: collateralTokenPrice.decimals,
          symbol: collateralTokenPrice.symbol,
        },
        walletBalanceDecimalsOptions
      ),
      dollarAmount: formatFetchBigIntToViewBigInt(
        fUsdValueStructured(
          cValueInUsd(swapCost, collateralTokenPrice.bigIntValue, previewMint.collateral.tokenAmount.decimals)
        ),
        walletBalanceDecimalsOptions
      ),
    },
  };
};

export const useFetchPreviewMintWithSwap = (
  leverageToken?: Address,
  amount?: string
) => {
  return useQuery({
    queryKey: ["previewMintWithSwap", leverageToken, amount],
    queryFn: () => fetchPreviewMintWithSwap(leverageToken!, amount!),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
    refetchInterval: 10000, // Poll every 10 seconds
  });
};
