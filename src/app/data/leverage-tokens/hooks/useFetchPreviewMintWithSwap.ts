import { useQuery } from "@tanstack/react-query";
import { Address, encodeAbiParameters, formatUnits, parseUnits, zeroAddress } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import EtherfiL2ExchangeRateProviderAbi from "../../../../../abis/EtherfiL2ExchangeRateProvider";
import { etherfiL2SyncPoolAbi } from "../../../../../abis/EtherfiL2SyncPool";
import {
  ETH_ADDRESS,
  ETHERFI_L2_MODE_SYNC_POOL_ADDRESS,
  SWAP_ADAPTER_EXCHANGE_ADDRESSES,
  WEETH_ADDRESS,
} from "../../../../meta";
import { formatFetchBigIntToViewBigInt, fUsdValueStructured, ViewBigIntWithUsdValue } from "../../../../shared";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { etherfiL2ModeSyncPoolAddress } from "../../../generated";
import { cValueInUsd } from "../../../statev3/common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../../../statev3/queries/AssetPrice.hook";
import { disableCacheQueryConfig, infiniteCacheQueryConfig } from "../../../statev3/settings/queryConfig";
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

  let swapCost;
  if (previewMint.collateral.dollarAmount && previewMint.collateral.tokenAmount.bigIntValue && weethAmountOut) {
    swapCost = previewMint.collateral.tokenAmount.bigIntValue - BigInt(parsedAmountIn) - weethAmountOut;
  }

  if (!previewMint.collateral.tokenAmount.bigIntValue || !swapCost) return undefined;

  const previewMintAfterCostDeduction = await fetchPreviewMint({
    leverageToken,
    amount: formatUnits(parseUnits(amount, 18) - swapCost, 18),
  });

  const collateralTokenPrice = await fetchAssetPriceInBlock(collateralAsset);

  return {
    previewMint: previewMintAfterCostDeduction,
    swapContext,
    swapCost: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: swapCost,
        decimals: collateralTokenPrice.decimals,
        symbol: collateralTokenPrice.symbol,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt(
        fUsdValueStructured(
          cValueInUsd(swapCost, collateralTokenPrice.bigIntValue, previewMint.collateral.tokenAmount.decimals)
        )
      ),
    },
  };
};

export const useFetchPreviewMintWithSwap = (leverageToken?: Address, amount?: string) => {
  return useQuery({
    queryKey: ["previewMintWithSwap", leverageToken, amount],
    queryFn: () => fetchPreviewMintWithSwap(leverageToken!, amount!),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
  });
};
