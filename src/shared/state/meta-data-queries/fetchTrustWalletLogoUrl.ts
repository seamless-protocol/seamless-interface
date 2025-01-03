import { Address } from "viem";

export function getTrustWalletLogoUrl(tokenAddress: string): string {
  const baseUrl = "https://raw.githubusercontent.com/trustwallet/assets/master";
  return `${baseUrl}/blockchains/base/assets/${tokenAddress}/logo.png`;
}

export async function fetchTokenLogoFromTrustWallet(tokenAddress: Address): Promise<string | null> {
  const trustWalletLogoUrl = getTrustWalletLogoUrl(tokenAddress);
  try {
    const resp = await fetch(trustWalletLogoUrl, { method: "HEAD" });
    if (resp.ok) {
      return trustWalletLogoUrl;
    }
  } catch (error) {
    console.error("Failed to fetch token logo from TrustWallet", error);
    return null;
  }

  return null;
}
