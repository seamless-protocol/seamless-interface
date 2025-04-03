import { base } from "wagmi/chains";
import logoSeamless from "@assets/logos/logo-seamless.svg";
import { createConfig, fallback, http, webSocket } from "wagmi";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { VITE_EXTENSIVE_OPERATIONS_RPC_URL } from "../../globals";

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
      groupName: "Smart wallets",
      wallets: [
        () =>
          // todo double check () =>
          coinbaseWallet({
            appName: "Seamless Protocol",
            appIcon: logoSeamless,
          }),
      ],
    },
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, rabbyWallet, walletConnectWallet, rainbowWallet],
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

export const targetChain = base;

// todo: move config outside of app, because of useToken in shared for example.
export const config = createConfig({
  connectors,
  chains: [targetChain],
  transports: {
    [targetChain.id]: fallback(
      rpcConfig.map(({ url, isWebSocket }) => (isWebSocket ? webSocket(url) : http(url))),
      { rank: true }
    ),
  },
});

export const extensiveOperationsConfig = createConfig({
  chains: [targetChain],
  transports: {
    [targetChain.id]: http(VITE_EXTENSIVE_OPERATIONS_RPC_URL),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
