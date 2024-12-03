import { useMutation } from "@tanstack/react-query";
import { Address } from "viem";
import { PublicAssetLogosConfig } from "../../../app/config/public-asset-logos.config";
import { useWalletClient } from "wagmi";

interface Asset {
  symbol: string;
  address: Address;
  logo?: string;
  decimals: number;
}

export function useWatchAsset() {
  const { data: walletClient } = useWalletClient();

  const mutationFn = async (token: Asset): Promise<boolean> => {
    if (!walletClient) {
      // eslint-disable-next-line no-console
      console.warn("Wallet client is not available.");
      return false;
    }

    const logoUrl = token.symbol in PublicAssetLogosConfig ? PublicAssetLogosConfig[token.symbol] : undefined;

    if (!logoUrl) {
      // eslint-disable-next-line no-console
      console.warn(
        `Warning: logoUrl not found for symbol ${token.symbol}. Make sure to add your logo to PublicAssetLogosConfig.`
      );
    }

    try {
      const success = await walletClient.watchAsset({
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: logoUrl,
        },
      });

      return success ?? false;
    } catch (error) {
      console.error("Error watching asset:", error);
      return false;
    }
  };

  return useMutation<boolean, Error, Asset>({
    mutationFn,
  });
}
