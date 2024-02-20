/**
 * WalletLogosConfig Object
 *
 * This configuration object maps strategy symbols to their corresponding wallet logos URLs.
 * It exists to provide a centralized reference for wallet logo images that are used across the application,
 * especially in scenarios where a direct mapping between the strategy and its visual representation is required.
 *
 * The logos are meant to be displayed within user wallets, such as MetaMask, to offer a visual cue
 * about the specific tokens or strategies managed by the user. Using a URL allows for flexibility
 * and ease of updates to the logos without needing to redeploy or directly embed the images within the application.
 *
 * Each key in the object represents a unique token or strategy symbol, and the value is a URL to an image
 * that visually represents the token or strategy. This setup supports easy expansion to include more tokens
 * or strategies as the application grows.
 *
 * Example Usage:
 * - `ilmwstETH` key maps to the wallet logo for the "ilmwstETH" strategy,
 *   which users can track in their MetaMask or other Ethereum-compatible wallets.
 *
 * Note: Ensure that all URLs are HTTPS to meet security standards and are accessible from public domains
 * to ensure wallet compatibility.
 */
interface WalletLogosConfigType {
  [key: string]: string;
}

export const PublicWalletLogosConfig: WalletLogosConfigType = {
  wstETH:
    "https://exponential.imgix.net/icons/assets/stETH_color.jpg?auto=format&fit=max&w=256",
};
