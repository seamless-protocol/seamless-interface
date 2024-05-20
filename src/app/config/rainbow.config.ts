import { base, baseSepolia } from "wagmi/chains";
import logoSeamless from "@assets/logos/logo-seamless.svg";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig, fallback, http, webSocket } from "wagmi";
import { coinbaseWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";

const rpcConfig = [
  { url: import.meta.env.VITE_BASE_RPC_FREE_1, isWebSocket: false },
  //  Paid
  { url: import.meta.env.VITE_BASE_MAIN_RPC_URL, isWebSocket: false },
  { url: import.meta.env.VITE_BASE_RPC_PAID_WS_2, isWebSocket: true },
  // Free
  { url: import.meta.env.VITE_BASE_RPC_FREE_2, isWebSocket: false },
  { url: import.meta.env.VITE_BASE_RPC_FREE_3, isWebSocket: false },
  { url: import.meta.env.VITE_BASE_RPC_FREE_4, isWebSocket: false },
  { url: import.meta.env.VITE_BASE_RPC_FREE_WS_5, isWebSocket: true },
].filter(({ url }) => url);

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [coinbaseWallet, rainbowWallet],
    },
  ],
  {
    appName: "Seamless Protocol",
    appDescription: "Seamless Protocol is the first decentralized, native lending and borrowing protocol on Base.",
    appUrl: "https://app.seamlessprotocol.com/",
    appIcon: logoSeamless,
    projectId: import.meta.env.VITE_BASE_WALLET_PROJECT_ID || "",
  }
);

export const rainbowConfig = createConfig({
  connectors,
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: fallback(
      rpcConfig.map(({ url, isWebSocket }) => (isWebSocket ? webSocket(url) : http(url))),
      { rank: true }
    ),
  },
});
