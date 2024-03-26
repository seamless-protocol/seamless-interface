import { useMutation } from "@tanstack/react-query";
import { Address, createWalletClient, custom } from "viem";
import { PublicAssetLogosConfig } from "../../../app/config/public-asset-logos.config";
import { base } from "viem/chains";

// todo: move this somewhere else
export const walletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum!),
});
interface Asset {
  symbol: string;
  address: Address;
  logo?: string;
  decimals?: number;
}

export const watchAsset = async (token: Asset): Promise<boolean> => {
  const logoUrl = PublicAssetLogosConfig[token.symbol] || undefined;

  if (!logoUrl) {
    console.warn(
      "Warning: logoUrl not found in addCoinToWallet. Make sure to add your logo to PublicAssetLogosConfig."
    );
  }

  const success = await walletClient.watchAsset({
    type: "ERC20",
    options: {
      address: token.address,
      symbol: token.symbol,
      decimals: token.decimals || 18,
      image: logoUrl,
    },
  });

  return success;
};

export function useWatchAsset() {
  return useMutation({
    mutationFn: (token: Asset) => {
      return watchAsset(token);
    },
  });
}
