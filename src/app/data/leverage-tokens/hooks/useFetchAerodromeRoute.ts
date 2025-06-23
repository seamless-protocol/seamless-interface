/* eslint-disable no-unused-vars */
import {
  aerodromeQuoterAbi,
  aerodromeQuoterAddress,
  aerodromeSlipstreamFactoryAbi,
  aerodromeSlipstreamFactoryAddress,
  uniswapV2Router02Abi,
  uniswapV2Router02Address,
} from "@generated";
import { SWAP_ADAPTER_EXCHANGE_ADDRESSES } from "@meta";
import { useQuery } from "@tanstack/react-query";
import { Address, zeroAddress } from "viem";
import { simulateContract } from "wagmi/actions";
import { readContractQueryOptions } from "wagmi/query";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";

interface GetQuoteInput {
  tokenInAddress: Address;
  tokenOutAddress: Address;
  amountOut: bigint;
}

enum Exchange {
  AERODROME = 0,
  AERODROME_SLIPSTREAM = 1,
  ETHERFI = 2,
  UNISWAP_V2 = 3,
  UNISWAP_V3 = 4,
}

export interface SwapContext {
  path: `0x${string}`[];
  encodedPath: `0x${string}`;
  fees: number[];
  tickSpacing: number[];
  exchange: Exchange;
  exchangeAddresses: typeof SWAP_ADAPTER_EXCHANGE_ADDRESSES;
  additionalData?: `0x${string}`;
}

export const getQuoteAndParamsAerodrome = async (args: GetQuoteInput) => {
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
      fees: [],
      tickSpacing: [],
      exchange: Exchange.UNISWAP_V2,
      exchangeAddresses: SWAP_ADAPTER_EXCHANGE_ADDRESSES,
      additionalData: "0x",
    } as SwapContext,
  };
};

export const getQuoteAndParamsAerodromeSlipstream = async (args: GetQuoteInput) => {
  const { tokenInAddress, tokenOutAddress, amountOut } = args;

  const tickSpacings = await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: aerodromeSlipstreamFactoryAddress,
      abi: aerodromeSlipstreamFactoryAbi,
      functionName: "tickSpacings",
    }),
  });

  const pools = await Promise.all(
    tickSpacings.map((tickSpacing: number) =>
      queryContract({
        ...readContractQueryOptions(getConfig(), {
          address: aerodromeSlipstreamFactoryAddress,
          abi: aerodromeSlipstreamFactoryAbi,
          functionName: "getPool",
          args: [tokenInAddress, tokenOutAddress, tickSpacing],
        }),
      })
    )
  );

  const existingTickSpacings = tickSpacings.filter((_: number, index: number) => pools[index] !== zeroAddress);

  const quotes = await Promise.all(
    existingTickSpacings.map((tickSpacing: number) =>
      simulateContract(getConfig(), {
        abi: aerodromeQuoterAbi,
        address: aerodromeQuoterAddress,
        functionName: "quoteExactOutputSingle",
        args: [
          {
            tokenIn: tokenInAddress,
            tokenOut: tokenOutAddress,
            amount: amountOut,
            tickSpacing,
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
      fees: [],
      tickSpacing: [existingTickSpacings[bestQuoteIndex]],
      exchange: Exchange.AERODROME_SLIPSTREAM,
      exchangeAddresses: SWAP_ADAPTER_EXCHANGE_ADDRESSES,
      additionalData: "0x",
    } as SwapContext,
  };
};

export const useFetchAerodromeRoute = (args: GetQuoteInput) => {
  return useQuery({
    queryKey: ["fetchAerodromeRoute", args],
    queryFn: () => getQuoteAndParamsAerodromeSlipstream(args),
    enabled: !!args.tokenInAddress && !!args.tokenOutAddress && !!args.amountOut,
    ...disableCacheQueryConfig,
  });
};
