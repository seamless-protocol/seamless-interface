import { http } from "viem";
import { base } from "wagmi/chains";
import logoSeamless from "@assets/logos/logo-seamless.svg";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { fallback } from "wagmi";

export const rainbowConfig = getDefaultConfig({
  appName: "Seamless Protocol",
  appDescription: `Seamless Protocol is the first decentralized, native lending and borrowing protocol on Base.`,
  appUrl: "https://app.seamlessprotocol.com/",
  appIcon: logoSeamless,
  projectId: import.meta.env.VITE_BASE_WALLET_PROJECT_ID || "",

  chains: [base],
  transports: {
    [base.id]: fallback([
      http(import.meta.env.VITE_BASE_MAIN_RPC_URL),
      // webSocket(import.meta.env.VITE_BASE_PAID_WS_2),
      http(import.meta.env.VITE_BASE_PAID_WS_2),
      // //free
      http(import.meta.env.VITE_BASE_PAID_1),
      http(import.meta.env.VITE_BASE_FREE_2),
      http(import.meta.env.VITE_BASE_FREE_3),
      http(import.meta.env.VITE_BASE_FREE_4),
      http(import.meta.env.VITE_BASE_FREE_WS_5),
    ]),
  },
});
