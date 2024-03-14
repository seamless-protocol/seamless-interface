import { useMutation } from "@tanstack/react-query";
import { Address } from "viem";
import { PublicAssetLogosConfig } from "../../app/config/public-asset-logos.config";

//todo: remove duplicate interface after folder structure hooks refactor
interface Coin {
  symbol: string;
  address: Address;
  logo?: string;
  decimals?: number;
}

export const addCoinToWallet = async (token: Coin): Promise<void> => {
  const logoUrl =
    token.symbol in PublicAssetLogosConfig
      ? PublicAssetLogosConfig[token.symbol]
      : undefined;

  if (!logoUrl)
    console.warn(
      "Warning: logoUrl not found in addCoinToWallet. Make sure to add your logo to PublicWalletLogosConfig"
    );

  await window.ethereum?.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: token.address,
        symbol: token.symbol,
        decimals: token.decimals || 18,
        image: logoUrl,
      },
    },
  });
};

export function useAddCoinToWallet() {
  return useMutation({
    mutationFn: (token: Coin) => {
      return addCoinToWallet(token);
    },
  });
}
