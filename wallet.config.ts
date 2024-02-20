import { Chain, http } from "viem";
import { base } from "wagmi/chains";
import logoSeamless from "@assets/logos/logo-seamless.svg";

export type WalletConfig = {
  appName: string;

  targetNetwork: Chain; // make this array?
  walletConnectProjectId: string;

  chains: Chain[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transports: any;

  appDescription: string;
  appUrl: string;
  appIcon: string;
};

export const walletConfig = {
  appName: "Seamless Protocol",
  appDescription: `Seamless Protocol is the first decentralized, native lending and borrowing protocol on Base.`,
  appUrl: "https://app.seamlessprotocol.com/",
  appIcon: logoSeamless,
  targetNetwork: base,
  walletConnectProjectId: import.meta.env.VITE_BASE_WALLET_PROJECT_ID || "",

  chains: [base],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL),
  },
} satisfies WalletConfig;
