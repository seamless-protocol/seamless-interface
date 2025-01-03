import { Address } from "viem";

/**
 * Returns the Trust Wallet asset logo URL for an ERC-20 token on Ethereum.
 * Replace `base` with a different chain name for other EVM blockchains, if needed.
 */
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
  } catch (e) {
    console.error(e);
  }

  return null;
}
