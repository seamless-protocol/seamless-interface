import { useQuery } from "@tanstack/react-query";
import { Address, encodeAbiParameters, zeroAddress } from "viem";
import {
  ETH_ADDRESS,
  ETHERFI_L2_MODE_SYNC_POOL_ADDRESS,
  SWAP_ADAPTER_EXCHANGE_ADDRESSES,
  WEETH_ADDRESS,
} from "../../../../meta";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { Exchange } from "../common/enums";
import { SwapContext } from "./useFetchAerodromeRoute";
import { fetchPreviewMint } from "./useFetchPreviewMint";

// TODO: This returns hardcoded swap context for now that only works for WETH -> WEETH
const getSwapContext = () => {
  const swapContext: SwapContext = {
    path: [],
    encodedPath: "0x",
    fees: [],
    tickSpacing: [],
    exchange: Exchange.UNISWAP_V2,
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

const fetchPreviewMintWithSwap = async (leverageToken: Address, amount: string) => {
  const previewMint = await fetchPreviewMint({ leverageToken, amount });
  const swapContext = getSwapContext();

  return {
    previewMint,
    swapContext,
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
