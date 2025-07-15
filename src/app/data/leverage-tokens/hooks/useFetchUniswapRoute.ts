import { useQuery } from "@tanstack/react-query";
import { ContractFunctionExecutionError, parseUnits } from "viem";
import { getEthersProvider } from "../../../utils/ethersProvider";
import { readContractQueryOptions } from "wagmi/query";
import { AlphaRouter, SwapOptions, SwapType } from "@uniswap/smart-order-router";
import { ChainId, CurrencyAmount, Percent, Token, TradeType } from "@uniswap/sdk-core";
import { SWAP_ADAPTER_EXCHANGE_ADDRESSES } from "../../../../meta";
import {
  uniswapV2Router02Abi,
  uniswapV2Router02Address,
  leverageRouterAddress,
} from "../../../generated";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { Exchange } from "../common/enums";
import { SwapContext } from "./useFetchAerodromeRoute";
import type { FetchBestSwapInput, SwapData } from "./useFetchPreviewRedeemWithSwap";
import { encodeRouteToPath } from "@uniswap/v3-sdk";
import { Protocol } from "@uniswap/router-sdk";

export const getQuoteAndParamsUniswapV2 = async (args: FetchBestSwapInput): Promise<SwapData | undefined> => {
  const { tokenInAddress, tokenOutAddress, amountOut } = args;

  try {
    const amountsIn = await queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: uniswapV2Router02Address,
        abi: uniswapV2Router02Abi,
        functionName: "getAmountsIn",
        args: [amountOut, [tokenInAddress, tokenOutAddress]],
      }),
    });

    return {
      quote: amountsIn[0],
      swapContext: {
        path: [tokenInAddress, tokenOutAddress],
        encodedPath: "0x",
        additionalData: "0x",
        fees: [],
        tickSpacing: [],
        exchange: Exchange.UNISWAP_V2,
        exchangeAddresses: SWAP_ADAPTER_EXCHANGE_ADDRESSES,
      } as SwapContext,
    };
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      if (error.message.includes("ds-math-sub-underflow")) {
        // Math subtraction underflow occurred when fetching UniswapV2 quote - due to insufficient liquidity
        // eslint-disable-next-line no-console
        console.warn("UniswapV2 quote failed: Insufficient liquidity for the swap pair");
        return undefined;
      }
    }

    throw error;
  }
};

export const getQuoteAndParamsUniswapV3 = async (args: FetchBestSwapInput) => {
  try {
    const { tokenInAddress, tokenOutAddress, amountOut, tokenInDecimals, tokenOutDecimals } = args;

    const tokenIn = new Token(ChainId.BASE, tokenInAddress, tokenInDecimals);
    const tokenOut = new Token(ChainId.BASE, tokenOutAddress, tokenOutDecimals);

    // Fallback ethers provider is not supported by AlphaRouter (it calls provider.send which is not supported by ethers FallbackProvider)
    const ethersProvider = getEthersProvider(getConfig(), { chainId: ChainId.BASE, allowFallback: false });

    const router = new AlphaRouter({
      chainId: ChainId.BASE,
      provider: ethersProvider,
      v2Supported: [],
      v4Supported: [],
      mixedSupported: [],
    });

    const amountOutCurrency = CurrencyAmount.fromRawAmount(tokenOut, amountOut.toString());

    const options: SwapOptions = {
      recipient: leverageRouterAddress,
      slippageTolerance: new Percent(50, 10_000),
      deadline: Math.floor(Date.now() / 1000 + 1800), // 30 minutes from the current Unix time
      type: SwapType.SWAP_ROUTER_02,
    };

    const route = await router.route(amountOutCurrency, tokenIn, TradeType.EXACT_OUTPUT, options);

    const v3Route = route?.route.find((route) => route.protocol === Protocol.V3);

    if (!v3Route || !v3Route.quote || !v3Route.route) {
      console.log(
        `Uniswap V3: No route found for swap ${tokenInAddress} -> ${tokenOutAddress} with amount out ${amountOut}`
      );
      return null;
    }

    return {
      quote: parseUnits(v3Route.quote.toExact(), tokenInDecimals),  // returns amountIn
      swapContext: {
        path: v3Route.tokenPath.map((token) => token.address),
        encodedPath: encodeRouteToPath(v3Route.route, true) as `0x${string}`,
        additionalData: "0x",
        fees: [],
        tickSpacing: [],
        exchange: Exchange.UNISWAP_V3,
        exchangeAddresses: SWAP_ADAPTER_EXCHANGE_ADDRESSES,
      } as SwapContext,
    };
  } catch (error) {
    console.log("getQuoteAndParamsUniswapV3 error: ", error);
    throw error;
  }
};

export const useFetchUniswapRoute = (args: FetchBestSwapInput) => {
  return useQuery({
    queryKey: ["fetchUniswapRoute", args],
    queryFn: () => getQuoteAndParamsUniswapV3(args),
    enabled: !!args.tokenInAddress && !!args.tokenOutAddress && !!args.amountOut,
    ...disableCacheQueryConfig,
  });
};
