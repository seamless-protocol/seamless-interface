import { useQuery } from "@tanstack/react-query";
import { zeroAddress } from "viem";
import { simulateContract } from "wagmi/actions";
import { readContractQueryOptions } from "wagmi/query";
import { SWAP_ADAPTER_EXCHANGE_ADDRESSES, UNISWAP_FEES } from "../../../../meta";
import {
  uniswapQuoterAbi,
  uniswapQuoterAddress,
  uniswapV2Router02Abi,
  uniswapV2Router02Address,
  uniswapV3FactoryAbi,
  uniswapV3FactoryAddress,
} from "../../../generated";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { Exchange } from "../common/enums";
import { SwapContext } from "./useFetchAerodromeRoute";
import type { FetchBestSwapInput } from "./useFetchPreviewRedeemWithSwap";

export const getQuoteAndParamsUniswapV2 = async (args: FetchBestSwapInput) => {
  const { tokenInAddress, tokenOutAddress, amountOut } = args;

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
};

export const getQuoteAndParamsUniswapV3 = async (args: FetchBestSwapInput) => {
  const { tokenInAddress, tokenOutAddress, amountOut } = args;

  const pools = await Promise.all(
    UNISWAP_FEES.map((fee: number) =>
      queryContract({
        ...readContractQueryOptions(getConfig(), {
          address: uniswapV3FactoryAddress,
          abi: uniswapV3FactoryAbi,
          functionName: "getPool",
          args: [tokenInAddress, tokenOutAddress, fee],
        }),
      })
    )
  );

  const existingFees = UNISWAP_FEES.filter((_: number, index: number) => pools[index] !== zeroAddress);

  const quotes = await Promise.all(
    existingFees.map((fee: number) =>
      simulateContract(getConfig(), {
        abi: uniswapQuoterAbi,
        address: uniswapQuoterAddress,
        functionName: "quoteExactOutputSingle",
        args: [
          {
            tokenIn: tokenInAddress,
            tokenOut: tokenOutAddress,
            amount: amountOut,
            fee,
            sqrtPriceLimitX96: 0n,
          },
        ],
      })
    )
  );

  let bestQuoteIndex = 0;
  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i].result[0] < quotes[bestQuoteIndex].result[0]) {
      bestQuoteIndex = i;
    }
  }

  return {
    quote: quotes[bestQuoteIndex].result[0],
    swapContext: {
      path: [tokenInAddress, tokenOutAddress],
      encodedPath: "0x",
      additionalData: "0x",
      fees: [UNISWAP_FEES[bestQuoteIndex]],
      tickSpacing: [],
      exchange: Exchange.UNISWAP_V3,
      exchangeAddresses: SWAP_ADAPTER_EXCHANGE_ADDRESSES,
    } as SwapContext,
  };
};

export const useFetchUniswapRoute = (args: FetchBestSwapInput) => {
  return useQuery({
    queryKey: ["fetchUniswapRoute", args],
    queryFn: () => getQuoteAndParamsUniswapV3(args),
    enabled: !!args.tokenInAddress && !!args.tokenOutAddress && !!args.amountOut,
    ...disableCacheQueryConfig,
  });
};
